import { NextResponse } from "next/server";
import { createJoinPR } from "@/lib/github-join-pr";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload || !payload.name) {
    return NextResponse.json({ ok: false, error: "name is required" }, { status: 400 });
  }
  if (!payload.profilePic?.trim()) {
    return NextResponse.json({ ok: false, error: "profile photo is required" }, { status: 400 });
  }

  const slug = String(payload.name)
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const clean = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
  const cleanArr = (v: unknown) => (Array.isArray(v) && v.length ? v : undefined);
  const toUrl = (v: string | undefined, base: string) => {
    if (!v) return undefined;
    if (/^https?:\/\//i.test(v)) return v;
    if (/^www\./i.test(v)) return `https://${v}`;
    return `${base}${v.replace(/^@/, "")}`;
  };

  const memberEntry: Record<string, unknown> = {
    id: slug || "new-member",
    name: payload.name,
    website: clean(payload.website) || "",
    program: clean(payload.program),
    email: clean(payload.email),
    roles: cleanArr(payload.roles),
    verticals: cleanArr(payload.verticals),
    profilePic: clean(payload.profilePic),
    instagram: toUrl(clean(payload.instagram), "https://www.instagram.com/"),
    twitter: toUrl(clean(payload.twitter), "https://x.com/"),
    linkedin: toUrl(clean(payload.linkedin), "https://www.linkedin.com/in/"),
    github: toUrl(clean(payload.github), "https://github.com/"),
    connections: cleanArr(payload.connections),
  };

  const ghToken = process.env.GITHUB_TOKEN || process.env.JOIN_GITHUB_TOKEN;
  const ghOwner = process.env.GITHUB_OWNER || process.env.GITHUB_REPO_OWNER;
  const ghRepo = process.env.GITHUB_REPO || process.env.GITHUB_REPO_NAME;

  if (!ghToken || !ghOwner || !ghRepo) {
    const missing = [!ghToken && "GITHUB_TOKEN", !ghOwner && "GITHUB_OWNER", !ghRepo && "GITHUB_REPO"].filter(Boolean);
    console.log("Auto-PR skipped (missing env vars):", missing.join(", "));
    return NextResponse.json({
      ok: true,
      memberEntry,
      prUrl: null,
      prError: `PR creation not configured. Add these env vars on Vercel: ${missing.join(", ")}`,
    });
  }

  const result = await createJoinPR({
    owner: ghOwner,
    repo: ghRepo,
    token: ghToken,
    memberEntry,
    submitterName: payload.name,
    notes: payload.notes,
  });

  if (result.error) {
    console.error("Auto-PR failed:", result.error);
    let userMessage = result.error;
    if (result.error.includes("404")) userMessage += " Check GITHUB_OWNER and GITHUB_REPO in Vercel.";
    else if (result.error.includes("403") || result.error.includes("401")) userMessage += " Check GITHUB_TOKEN has repo access.";
    return NextResponse.json({ ok: true, memberEntry, prUrl: null, prError: userMessage });
  }

  return NextResponse.json({ ok: true, memberEntry, prUrl: result.prUrl });
}
