import { NextResponse } from 'next/server';

interface JoinPayload {
  name: string;
  uni?: string;
  website?: string;
  program?: string;
  year?: string;
  roles?: string[];
  verticals?: string[];
  clubs?: string[];
  profilePic?: string;
  connections?: string[];
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

const OWNER = process.env.GITHUB_OWNER || 'anshhkrishna';
const REPO = process.env.GITHUB_REPO || 'columbia.network';
const TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'columbia-network-join-form',
  Authorization: TOKEN ? `Bearer ${TOKEN}` : '',
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'member';

async function github(path: string, init?: RequestInit) {
  const response = await fetch(`https://api.github.com${path}`, {
    cache: 'no-store',
    ...init,
    headers: {
      ...headers,
      ...(init?.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || 'GitHub API error';
    throw new Error(message);
  }
  return data;
}

export async function POST(request: Request) {
  if (!TOKEN) {
    return NextResponse.json(
      { error: 'Server is not configured with GITHUB_TOKEN.' },
      { status: 500 },
    );
  }

  const body = (await request.json().catch(() => null)) as JoinPayload | null;
  if (!body || !body.name || !body.uni || !body.program || !body.year) {
    return NextResponse.json(
      { error: 'Name, UNI, program, and year are required.' },
      { status: 400 },
    );
  }

  try {
    const repo = await github(`/repos/${OWNER}/${REPO}`);
    const defaultBranch: string = repo.default_branch || 'main';

    const ref = await github(`/repos/${OWNER}/${REPO}/git/ref/heads/${defaultBranch}`);
    const baseSha: string = ref.object?.sha;

    const branchName = `submission/${slugify(body.name)}-${Date.now()}`;

    await github(`/repos/${OWNER}/${REPO}/git/refs`, {
      method: 'POST',
      body: JSON.stringify({
        ref: `refs/heads/${branchName}`,
        sha: baseSha,
      }),
    });

    const submissionPath = `submissions/${branchName}.json`;
    const content = Buffer.from(
      JSON.stringify(
        {
          ...body,
          submittedAt: new Date().toISOString(),
          generatedBy: 'site-form',
        },
        null,
        2,
      ),
    ).toString('base64');

    await github(`/repos/${OWNER}/${REPO}/contents/${submissionPath}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: `chore: add submission for ${body.name}`,
        content,
        branch: branchName,
      }),
    });

    const websiteText = body.website || 'not provided';

    const pr = await github(`/repos/${OWNER}/${REPO}/pulls`, {
      method: 'POST',
      body: JSON.stringify({
        title: `Add ${body.name} to the webring`,
        head: branchName,
        base: defaultBranch,
        body: `Automated submission from the columbia.network form.\n\nName: ${body.name}\nUNI: ${body.uni}\nWebsite: ${websiteText}`,
      }),
    });

    return NextResponse.json({ pullRequestUrl: pr.html_url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create pull request.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
