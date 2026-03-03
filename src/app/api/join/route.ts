import { NextResponse } from "next/server";
import { createJoinPR } from "@/lib/github-join-pr";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  if (!payload || !payload.name) {
    return NextResponse.json({ ok: false, error: "name is required" }, { status: 400 });
  }

  const slug = String(payload.name)
    .toLowerCase().trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const clean = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
  const cleanArr = (v: unknown) => (Array.isArray(v) && v.length ? v : undefined);

  const memberEntry: Record<string, unknown> = {
    id: slug || "new-member",
    name: payload.name,
    website: clean(payload.website) || "",
    program: clean(payload.program),
    email: clean(payload.email),
    roles: cleanArr(payload.roles),
    verticals: cleanArr(payload.verticals),
    profilePic: clean(payload.profilePic),
    instagram: clean(payload.instagram),
    twitter: clean(payload.twitter),
    linkedin: clean(payload.linkedin),
    github: clean(payload.github),
    connections: cleanArr(payload.connections),
  };

  const ghToken = process.env.GITHUB_TOKEN || process.env.JOIN_GITHUB_TOKEN;
  const ghOwner = process.env.GITHUB_OWNER || process.env.GITHUB_REPO_OWNER;
  const ghRepo = process.env.GITHUB_REPO || process.env.GITHUB_REPO_NAME;

  if (!ghToken || !ghOwner || !ghRepo) {
    console.log("Auto-PR skipped (missing env vars). Submission:", JSON.stringify(memberEntry, null, 2));
    return NextResponse.json({ ok: true, memberEntry, prUrl: null });
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
    return NextResponse.json({ ok: true, memberEntry, prUrl: null, prError: result.error });
  }

  return NextResponse.json({ ok: true, memberEntry, prUrl: result.prUrl });
}
