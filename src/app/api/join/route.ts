import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload || !payload.name || !payload.email) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 },
    );
  }

  // In this version we just acknowledge the request.
  // You can later plug this into email, Airtable, or another system.
  console.log("New join submission", payload);

  return NextResponse.json({ ok: true });
}

