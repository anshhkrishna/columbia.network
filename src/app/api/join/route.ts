import { NextResponse } from "next/server";
import { createJoinPR } from "@/lib/github-join-pr";

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

  // Auto-open a PR that adds this member to members.ts (optional).
  const ghToken = process.env.JOIN_GITHUB_TOKEN || process.env.GITHUB_TOKEN;
  const ghOwner = process.env.GITHUB_REPO_OWNER;
  const ghRepo = process.env.GITHUB_REPO_NAME;
  let prUrl: string | null = null;
  if (ghToken && ghOwner && ghRepo) {
    const result = await createJoinPR({
      owner: ghOwner,
      repo: ghRepo,
      token: ghToken,
      memberSnippet,
      payload: {
        name: payload.name,
        notes: payload.notes,
        github: payload.github,
        profilePic: payload.profilePic,
      },
    });
    if (result.error) console.error("Auto-PR failed:", result.error);
    else prUrl = result.prUrl;
  }

  // Optionally forward to a webhook (Slack / email / Airtable / etc.)
  // Set JOIN_WEBHOOK_URL in your environment to use this.
  const webhookUrl = process.env.JOIN_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "columbia-network.join-submission",
          createdAt: new Date().toISOString(),
          payload,
          memberSnippet,
        }),
      });
    } catch (err) {
      console.error("Failed to send join submission to webhook", err);
    }
  }

  // Optionally send you an email with the submission details.
  // To enable, set RESEND_API_KEY (and optionally JOIN_NOTIFY_EMAIL) in your env.
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.JOIN_NOTIFY_EMAIL || "ak5578@columbia.edu";

  if (resendApiKey) {
    try {
      const subject = `New columbia.network join request: ${memberSnippet.name}`;
      const textBody = [
        `New join submission for columbia.network`,
        "",
        `Name: ${payload.name}`,
        `Website: ${payload.website || "(none)"}`,
        `Program: ${payload.program || "(none)"}`,
        `Roles: ${
          Array.isArray(payload.roles) && payload.roles.length
            ? payload.roles.join(", ")
            : "(none)"
        }`,
        `Verticals: ${
          Array.isArray(payload.verticals) && payload.verticals.length
            ? payload.verticals.join(", ")
            : "(none)"
        }`,
        `LinkedIn: ${payload.linkedin || "(none)"}`,
        `Twitter: ${payload.twitter || "(none)"}`,
        `GitHub: ${payload.github || "(none)"}`,
        `Profile pic: ${payload.profilePic ? "[provided]" : "(none)"}`,
        `Connections: ${
          Array.isArray(payload.connections) && payload.connections.length
            ? payload.connections.join(", ")
            : "(none)"
        }`,
        "",
        `Notes:`,
        payload.notes || "(none)",
        "",
        `---`,
        `Paste this snippet into src/data/members.ts:`,
        JSON.stringify(memberSnippet, null, 2),
        "",
        `Sent automatically from columbia.network`,
      ].join("\n");

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "columbia.network <onboarding@resend.dev>",
          to: [notifyEmail],
          subject,
          text: textBody,
        }),
      });
    } catch (err) {
      console.error("Failed to send join submission email", err);
    }
  }

  return NextResponse.json({ ok: true, memberSnippet, prUrl });
}

