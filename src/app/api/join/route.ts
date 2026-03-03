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
  // GitHub accepts either `Bearer` or `token`; use a scheme that matches common token prefixes.
  Authorization: TOKEN
    ? TOKEN.startsWith('github_pat_')
      ? `Bearer ${TOKEN}`
      : `token ${TOKEN}`
    : '',
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'member';

const tsString = (value: string) => JSON.stringify(value);

const buildMemberEntry = (payload: JoinPayload, memberId: string) => {
  const website = payload.website?.trim() || '';
  const program = payload.program?.trim() || '';
  const year = payload.year?.trim() || '';
  const roles = (payload.roles || []).filter(Boolean);
  const verticals = (payload.verticals || []).filter(Boolean);
  const connections = (payload.connections || []).filter(Boolean);
  const instagram = payload.instagram?.trim() || '';
  const twitter = payload.twitter?.trim() || '';
  const linkedin = payload.linkedin?.trim() || '';

  // We can't reliably accept image uploads in this JSON endpoint, so default to the conventional path.
  const profilePic = `/photos/${memberId}.jpg`;

  const lines: string[] = [];
  lines.push('  {');
  lines.push(`    id: ${tsString(memberId)},`);
  lines.push(`    name: ${tsString(payload.name.trim())},`);
  lines.push(`    website: ${tsString(website)},`);
  lines.push(`    program: ${tsString(program)},`);
  lines.push(`    year: ${tsString(year)},`);
  lines.push(`    roles: ${JSON.stringify(roles)},`);
  lines.push(`    verticals: ${JSON.stringify(verticals)},`);
  lines.push(`    profilePic: ${tsString(profilePic)},`);
  lines.push(`    instagram: ${tsString(instagram)},`);
  lines.push(`    twitter: ${tsString(twitter)},`);
  lines.push(`    linkedin: ${tsString(linkedin)},`);
  lines.push(`    connections: ${JSON.stringify(connections)},`);
  lines.push('  },');
  return { entry: lines.join('\n') + '\n\n', profilePic };
};

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
    const status = response.status;
    const docs = data?.documentation_url ? ` (${data.documentation_url})` : '';
    throw new Error(`${message} [${status}] at ${path}${docs}`);
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

    const websiteText = body.website || 'not provided';

    // Edit members file directly (instead of creating a separate submission file).
    const membersPath = 'src/data/members.ts';
    const membersFile = await github(`/repos/${OWNER}/${REPO}/contents/${membersPath}?ref=${defaultBranch}`);
    const decoded = Buffer.from(membersFile.content || '', 'base64').toString('utf8');

    const baseId = slugify(body.name);
    const uniSuffix = body.uni?.toLowerCase().trim();
    const existingIds = new Set(
      Array.from(decoded.matchAll(/id:\s*["']([^"']+)["']/g)).map((m) => m[1]),
    );
    const memberId =
      !existingIds.has(baseId) ? baseId : uniSuffix ? `${baseId}-${slugify(uniSuffix)}` : `${baseId}-${Date.now()}`;

    const marker = '// ADD YOUR ENTRY BELOW THIS LINE';
    const markerIndex = decoded.indexOf(marker);
    if (markerIndex === -1) {
      throw new Error(`Unable to find insertion marker in ${membersPath}.`);
    }
    const insertAt = decoded.indexOf('\n', markerIndex);
    const { entry, profilePic } = buildMemberEntry(body, memberId);
    const updated =
      decoded.slice(0, insertAt + 1) + '\n' + entry + decoded.slice(insertAt + 1);

    const updatedContent = Buffer.from(updated).toString('base64');
    await github(`/repos/${OWNER}/${REPO}/contents/${membersPath}`, {
      method: 'PUT',
      body: JSON.stringify({
        message: `chore: add ${body.name} to members`,
        content: updatedContent,
        sha: membersFile.sha,
        branch: branchName,
      }),
    });

    const pr = await github(`/repos/${OWNER}/${REPO}/pulls`, {
      method: 'POST',
      body: JSON.stringify({
        title: `Add ${body.name} to the webring`,
        head: branchName,
        base: defaultBranch,
        body: `Automated submission from the columbia.network form.\n\nName: ${body.name}\nUNI: ${body.uni}\nWebsite: ${websiteText}\n\nPhoto: please add your photo at public${profilePic}`,
      }),
    });

    return NextResponse.json({ pullRequestUrl: pr.html_url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to create pull request.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
