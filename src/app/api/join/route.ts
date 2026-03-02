import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || !payload.name) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  const slug =
    typeof payload.name === "string"
      ? payload.name
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
      : "";

  const memberSnippet = {
    id: slug || "your-id-here",
    name: payload.name,
    website: payload.website || "",
    program: payload.program || undefined,
    roles: payload.roles && payload.roles.length ? payload.roles : undefined,
    verticals:
      payload.verticals && payload.verticals.length
        ? payload.verticals
        : undefined,
    profilePic: payload.profilePic || undefined,
    twitter: payload.twitter || undefined,
    linkedin: payload.linkedin || undefined,
    connections:
      payload.connections && payload.connections.length
        ? payload.connections
        : undefined,
  };

  // Logs a ready-to-paste snippet for src/data/members.ts
  console.log("New join submission (raw)", payload);
  console.log(
    "Add this to members.ts:\n",
    JSON.stringify(memberSnippet, null, 2),
  );
  if (payload.github || payload.notes) {
    console.log("Extra context (github / notes):", {
      github: payload.github,
      notes: payload.notes,
    });
  }

  return NextResponse.json({ ok: true });
}

