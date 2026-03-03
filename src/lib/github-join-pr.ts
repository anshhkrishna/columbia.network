/**
 * Creates a GitHub branch, adds the new member to src/data/members.ts, and opens a PR.
 * Requires: GITHUB_TOKEN (or JOIN_GITHUB_TOKEN), GITHUB_REPO_OWNER, GITHUB_REPO_NAME in env.
 */

const MEMBERS_PATH = "src/data/members.ts";

/** Format one member as a 2-space indented block for members.ts */
function formatMemberEntry(entry: Record<string, unknown>): string {
  const lines: string[] = ["  {"];
  const keys = [
    "id",
    "name",
    "website",
    "program",
    "roles",
    "verticals",
    "profilePic",
    "twitter",
    "linkedin",
    "connections",
  ] as const;
  for (const key of keys) {
    const v = entry[key];
    if (v === undefined || v === "") continue;
    if (key === "roles" || key === "verticals" || key === "connections") {
      const arr = Array.isArray(v) ? v : [];
      if (arr.length === 0) continue;
      const inner = arr.map((x) => `"${String(x).replace(/"/g, '\\"')}"`).join(", ");
      lines.push(`    ${key}: [${inner}],`);
    } else {
      const s = String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      lines.push(`    ${key}: "${s}",`);
    }
  }
  lines.push("  },");
  return lines.join("\n");
}

/** Insert new member block into members.ts content (after example, before first real entry) */
function insertMemberIntoFile(content: string, newEntryBlock: string): string {
  const marker = "  // },\n\n  {";
  const idx = content.indexOf(marker);
  if (idx === -1) return content;
  const before = content.slice(0, idx + marker.length - 3);
  const after = content.slice(idx + marker.length);
  return `${before}\n${newEntryBlock},\n  {${after}`;
}

export interface CreateJoinPRParams {
  owner: string;
  repo: string;
  token: string;
  memberSnippet: Record<string, unknown>;
  payload: { name: string; notes?: string; github?: string; profilePic?: string };
}

export async function createJoinPR({
  owner,
  repo,
  token,
  memberSnippet,
  payload,
}: CreateJoinPRParams): Promise<{ prUrl: string | null; error: string | null }> {
  const slug = (memberSnippet.id as string) || "new-member";
  const branchName = `join-${slug}-${Date.now()}`;
  const auth = `Bearer ${token}`;

  try {
    const refRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/ref/heads/main`,
      { headers: { Authorization: auth, Accept: "application/vnd.github+json" } }
    );
    if (!refRes.ok) {
      const t = await refRes.text();
      return { prUrl: null, error: `Failed to get main ref: ${refRes.status} ${t}` };
    }
    const refData = (await refRes.json()) as { object: { sha: string } };
    const mainSha = refData.object.sha;

    const createRefRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/git/refs`,
      {
        method: "POST",
        headers: {
          Authorization: auth,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ref: `refs/heads/${branchName}`, sha: mainSha }),
      }
    );
    if (!createRefRes.ok) {
      const t = await createRefRes.text();
      return { prUrl: null, error: `Failed to create branch: ${createRefRes.status} ${t}` };
    }

    const fileRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${MEMBERS_PATH}?ref=main`,
      { headers: { Authorization: auth, Accept: "application/vnd.github+json" } }
    );
    if (!fileRes.ok) {
      const t = await fileRes.text();
      return { prUrl: null, error: `Failed to get file: ${fileRes.status} ${t}` };
    }
    const fileData = (await fileRes.json()) as { content?: string; sha?: string };
    const contentBase64 = fileData.content;
    const fileSha = fileData.sha;
    if (!contentBase64 || !fileSha) {
      return { prUrl: null, error: "Missing file content or sha" };
    }
    const content = Buffer.from(contentBase64, "base64").toString("utf-8");

    const entryForFile = { ...memberSnippet };
    if (
      payload.profilePic &&
      String(payload.profilePic).startsWith("data:")
    ) {
      (entryForFile as Record<string, unknown>).profilePic = `/photos/${slug}.png`;
    }

    const newEntryBlock = formatMemberEntry(entryForFile);
    const newContent = insertMemberIntoFile(content, newEntryBlock);

    const updateRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${MEMBERS_PATH}`,
      {
        method: "PUT",
        headers: {
          Authorization: auth,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: `Add ${payload.name} to webring`,
          content: Buffer.from(newContent, "utf-8").toString("base64"),
          sha: fileSha,
          branch: branchName,
        }),
      }
    );
    if (!updateRes.ok) {
      const t = await updateRes.text();
      return { prUrl: null, error: `Failed to update file: ${updateRes.status} ${t}` };
    }

    const prBody = [
      "## Join request (from columbia.network form)",
      "",
      `**Name:** ${payload.name}`,
      payload.notes ? `**Notes:**\n${payload.notes}` : "",
      payload.github ? `**GitHub:** ${payload.github}` : "",
      payload.profilePic && String(payload.profilePic).startsWith("data:")
        ? `**Profile photo:** Uploaded — add image to \`public/photos/${slug}.png\` if desired.`
        : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const prRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/pulls`,
      {
        method: "POST",
        headers: {
          Authorization: auth,
          Accept: "application/vnd.github+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Join: ${payload.name}`,
          head: branchName,
          base: "main",
          body: prBody,
        }),
      }
    );
    if (!prRes.ok) {
      const t = await prRes.text();
      return { prUrl: null, error: `Failed to create PR: ${prRes.status} ${t}` };
    }
    const prData = (await prRes.json()) as { html_url?: string };
    const prUrl = prData.html_url || null;
    return { prUrl, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { prUrl: null, error: message };
  }
}
