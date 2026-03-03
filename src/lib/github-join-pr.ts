const MEMBERS_PATH = "src/data/members.ts";

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
  const marker = "// ADD YOUR ENTRY BELOW THIS LINE";
  const idx = content.indexOf(marker);
  if (idx === -1) return content;
  const insertAt = content.indexOf("\n", idx);
  if (insertAt === -1) return content;
  return content.slice(0, insertAt) + "\n\n" + newBlock + "\n" + content.slice(insertAt);
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
    const refRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`, token,
    );
    if (!refRes.ok) return { prUrl: null, error: `main ref: ${refRes.status}` };
    const mainSha = ((await refRes.json()) as { object: { sha: string } }).object.sha;

    const branchRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs`, token,
      { method: "POST", body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: mainSha }) },
    );
    if (!branchRes.ok) return { prUrl: null, error: `branch: ${branchRes.status}` };

    const fileRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${MEMBERS_PATH}?ref=main`, token,
    );
    if (!fileRes.ok) return { prUrl: null, error: `file: ${fileRes.status}` };
    const fileData = (await fileRes.json()) as { content?: string; sha?: string };
    if (!fileData.content || !fileData.sha) return { prUrl: null, error: "missing file data" };

    const original = Buffer.from(fileData.content, "base64").toString("utf-8");
    const block = formatMemberEntry(memberEntry);
    const updated = insertMemberIntoFile(original, block);

    const putRes = await ghFetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${MEMBERS_PATH}`, token,
      {
        method: "PUT",
        body: JSON.stringify({
          message: `Add ${submitterName} to webring`,
          content: Buffer.from(updated, "utf-8").toString("base64"),
          sha: fileData.sha,
          branch: branchName,
        }),
      },
    );
    if (!putRes.ok) return { prUrl: null, error: `put: ${putRes.status}` };

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
