const MEMBERS_PATH = "src/data/members";
const PHOTOS_DIR = "public/photos";

function formatMemberEntry(entry: Record<string, unknown>): string {
  const lines: string[] = ["  {"];
  const keys = [
    "id", "name", "website", "program", "email",
    "roles", "verticals", "profilePic",
    "instagram", "twitter", "linkedin", "github",
    "connections",
  ] as const;
  for (const key of keys) {
    const v = entry[key];
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v)) {
      if (v.length === 0) continue;
      const inner = v.map((x) => `"${String(x).replace(/"/g, '\\"')}"`).join(", ");
      lines.push(`    ${key}: [${inner}],`);
    } else {
      const s = String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      lines.push(`    ${key}: "${s}",`);
    }
  }
  lines.push("  },");
  return lines.join("\n");
}

function insertMemberIntoFile(content: string, newBlock: string): string {
  const markerBlock = "  // ============================================\n  // ADD YOUR ENTRY ABOVE THIS LINE";
  const idx = content.indexOf(markerBlock);
  if (idx === -1) return content;
  return content.slice(0, idx) + newBlock + "\n\n" + content.slice(idx);
}

/** Parse data URL and return { buffer, ext } or null */
function parseDataUrl(dataUrl: string): { buffer: Buffer; ext: string } | null {
  const m = dataUrl.match(/^data:image\/(\w+);base64,(.+)$/);
  if (!m) return null;
  const ext = m[1].toLowerCase() === "jpeg" ? "jpg" : m[1];
  try {
    const buffer = Buffer.from(m[2], "base64");
    return buffer.length > 0 ? { buffer, ext } : null;
  } catch {
    return null;
  }
}

export interface CreateJoinPRParams {
  owner: string;
  repo: string;
  token: string;
  memberEntry: Record<string, unknown>;
  submitterName: string;
  notes?: string;
}

async function ghFetch(url: string, token: string, init?: RequestInit) {
  return fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
}

export async function createJoinPR({
  owner, repo, token, memberEntry, submitterName, notes,
}: CreateJoinPRParams): Promise<{ prUrl: string | null; error: string | null }> {
  const slug = String(memberEntry.id || "new-member");
  const branchName = `join/${slug}-${Date.now()}`;

  try {
    // 1. Get main's latest commit
    const refRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`, token,
    );
    if (!refRes.ok) return { prUrl: null, error: `main ref: ${refRes.status}` };
    const mainSha = ((await refRes.json()) as { object: { sha: string } }).object.sha;

    // 2. Get main's commit to read tree SHA
    const commitRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/git/commits/${mainSha}`, token,
    );
    if (!commitRes.ok) return { prUrl: null, error: `commit: ${commitRes.status}` };
    const mainTreeSha = ((await commitRes.json()) as { tree: { sha: string } }).tree.sha;

    // 3. Fetch members.ts content
    const fileRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${MEMBERS_PATH}.ts?ref=main`, token,
    );
    if (!fileRes.ok) return { prUrl: null, error: `file: ${fileRes.status}` };
    const fileData = (await fileRes.json()) as { content?: string; sha?: string };
    if (!fileData.content || !fileData.sha) return { prUrl: null, error: "missing file data" };

    const original = Buffer.from(fileData.content, "base64").toString("utf-8");

    // 4. Handle profile pic: decode data URL -> add image file; use /photos/ path in member entry
    const rawProfilePic = memberEntry.profilePic;
    let profilePicPath: string | null = null;
    let imageBlobSha: string | null = null;
    let photoExt = "png";

    if (typeof rawProfilePic === "string" && rawProfilePic.startsWith("data:")) {
      const parsed = parseDataUrl(rawProfilePic);
      if (parsed) {
        photoExt = parsed.ext;
        profilePicPath = `/photos/${slug}.${photoExt}`;
        const blobRes = await ghFetch(
          `https://api.github.com/repos/${owner}/${repo}/git/blobs`, token,
          {
            method: "POST",
            body: JSON.stringify({
              content: parsed.buffer.toString("base64"),
              encoding: "base64",
            }),
          },
        );
        if (!blobRes.ok) return { prUrl: null, error: `blob: ${blobRes.status}` };
        imageBlobSha = ((await blobRes.json()) as { sha: string }).sha;
      }
    }

    // Use /photos/ path when we extracted image; otherwise keep original (e.g. external URL)
    const finalMemberEntry = { ...memberEntry, profilePic: profilePicPath ?? rawProfilePic };
    const block = formatMemberEntry(finalMemberEntry);
    const updatedMembers = insertMemberIntoFile(original, block);

    // 5. Build tree: members.ts + optional photo
    const treeItems: { path: string; mode: string; type: string; sha?: string; content?: string; encoding?: string }[] = [
      {
        path: `${MEMBERS_PATH}.ts`,
        mode: "100644",
        type: "blob",
        content: Buffer.from(updatedMembers, "utf-8").toString("base64"),
        encoding: "base64",
      },
    ];
    if (imageBlobSha) {
      treeItems.push({
        path: `${PHOTOS_DIR}/${slug}.${photoExt}`,
        mode: "100644",
        type: "blob",
        sha: imageBlobSha,
      });
    }

    const treeRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/git/trees`, token,
      {
        method: "POST",
        body: JSON.stringify({ base_tree: mainTreeSha, tree: treeItems }),
      },
    );
    if (!treeRes.ok) {
      const errText = await treeRes.text();
      return { prUrl: null, error: `tree: ${treeRes.status} ${errText}` };
    }
    const newTreeSha = ((await treeRes.json()) as { sha: string }).sha;

    // 6. Create commit
    const createCommitRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/git/commits`, token,
      {
        method: "POST",
        body: JSON.stringify({
          message: `Add ${submitterName} to webring`,
          tree: newTreeSha,
          parents: [mainSha],
        }),
      },
    );
    if (!createCommitRes.ok) return { prUrl: null, error: `commit: ${createCommitRes.status}` };
    const newCommitSha = ((await createCommitRes.json()) as { sha: string }).sha;

    // 7. Create branch
    const branchRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs`, token,
      { method: "POST", body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: newCommitSha }) },
    );
    if (!branchRes.ok) return { prUrl: null, error: `branch: ${branchRes.status}` };

    // 8. Create PR
    const prBody = [
      `## Join request from columbia.network/join`,
      "",
      `**Name:** ${submitterName}`,
      notes ? `**Notes:** ${notes}` : "",
    ].filter(Boolean).join("\n");

    const prRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls`, token,
      {
        method: "POST",
        body: JSON.stringify({
          title: `Join: ${submitterName}`,
          head: branchName,
          base: "main",
          body: prBody,
        }),
      },
    );
    if (!prRes.ok) return { prUrl: null, error: `pr: ${prRes.status}` };
    const prUrl = ((await prRes.json()) as { html_url?: string }).html_url || null;
    return { prUrl, error: null };
  } catch (err) {
    return { prUrl: null, error: err instanceof Error ? err.message : String(err) };
  }
}
