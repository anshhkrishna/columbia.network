#!/usr/bin/env node
/**
 * Extract member entries and profile pics from join PR branches.
 * Usage: node scripts/extract-pr-members.mjs
 */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PRS = [
  { num: 26, branch: "join/samvrit-rao-1772668328073", id: "samvrit-rao" },
  { num: 28, branch: "join/shinnyom-park-1772676236950", id: "shinnyom-park" },
  { num: 29, branch: "join/christopher-lee-1772676790998", id: "christopher-lee" },
  { num: 30, branch: "join/mukilan-rajasekar-1772677526183", id: "mukilan-rajasekar" },
  { num: 31, branch: "join/tensae-laki-1772681360492", id: "tensae-laki" },
  { num: 32, branch: "join/todd-enkhbat-1772681982662", id: "todd-enkhbat" },
];

const repoRoot = path.resolve(__dirname, "..");
const photosDir = path.join(repoRoot, "public", "photos");

function getFileFromBranch(branch) {
  return execSync(
    `git show origin/${branch}:src/data/members.ts`,
    { cwd: repoRoot, encoding: "utf-8", maxBuffer: 50 * 1024 * 1024 }
  );
}

function extractMemberBlock(content, memberId) {
  const re = new RegExp(
    `\\{\\s*id:\\s*"${memberId}"[^}]+\\}`,
    "s"
  );
  const match = content.match(re);
  if (!match) return null;
  let block = match[0];
  // Extract profilePic value - can be "data:...base64,XXX" or "/photos/xxx"
  const picMatch = block.match(/profilePic:\s*"((?:data:[^"]+)|(?:\/[^"]+))"/);
  let profilePicValue = null;
  if (picMatch) {
    profilePicValue = picMatch[1];
  }
  // Remove profilePic from block for parsing - we'll handle it separately
  const blockWithoutPic = block.replace(/profilePic:\s*"[^"]*",?\s*/g, "");
  return { block: blockWithoutPic, profilePic: profilePicValue };
}

function parseMemberFields(block) {
  const member = {};
  const idMatch = block.match(/id:\s*"([^"]+)"/);
  if (idMatch) member.id = idMatch[1];
  const nameMatch = block.match(/name:\s*"([^"]*)"/);
  if (nameMatch) member.name = nameMatch[1];
  const programMatch = block.match(/program:\s*"([^"]*)"/);
  if (programMatch) member.program = programMatch[1];
  const emailMatch = block.match(/email:\s*"([^"]*)"/);
  if (emailMatch) member.email = emailMatch[1];
  const websiteMatch = block.match(/website:\s*"([^"]*)"/);
  if (websiteMatch && websiteMatch[1]) member.website = websiteMatch[1];
  const rolesMatch = block.match(/roles:\s*\[([^\]]*)\]/);
  if (rolesMatch && rolesMatch[1]) {
    member.roles = rolesMatch[1].match(/"([^"]+)"/g)?.map((s) => s.slice(1, -1)) || [];
  }
  const verticalsMatch = block.match(/verticals:\s*\[([^\]]*)\]/);
  if (verticalsMatch && verticalsMatch[1]) {
    member.verticals = verticalsMatch[1].match(/"([^"]+)"/g)?.map((s) => s.slice(1, -1)) || [];
  }
  const linkedinMatch = block.match(/linkedin:\s*"([^"]*)"/);
  if (linkedinMatch && linkedinMatch[1]) member.linkedin = linkedinMatch[1];
  const twitterMatch = block.match(/twitter:\s*"([^"]*)"/);
  if (twitterMatch && twitterMatch[1]) member.twitter = twitterMatch[1];
  const instagramMatch = block.match(/instagram:\s*"([^"]*)"/);
  if (instagramMatch && instagramMatch[1]) member.instagram = instagramMatch[1];
  const githubMatch = block.match(/github:\s*"([^"]*)"/);
  if (githubMatch && githubMatch[1]) member.github = githubMatch[1];
  const connectionsMatch = block.match(/connections:\s*\[([^\]]*)\]/);
  if (connectionsMatch && connectionsMatch[1]) {
    member.connections = connectionsMatch[1].match(/"([^"]+)"/g)?.map((s) => s.slice(1, -1)) || [];
  }
  return member;
}

function decodeAndSaveProfilePic(dataUrl, memberId) {
  if (!dataUrl) return null;
  if (dataUrl.startsWith("/photos/")) return dataUrl;
  if (!dataUrl.startsWith("data:")) return null;
  const base64Match = dataUrl.match(/^data:image\/\w+;base64,(.+)$/);
  if (!base64Match) return null;
  const buf = Buffer.from(base64Match[1], "base64");
  const ext = dataUrl.match(/data:image\/(\w+)/)?.[1] || "png";
  const filename = `${memberId}.${ext === "jpeg" ? "jpg" : ext}`;
  const outPath = path.join(photosDir, filename);
  fs.mkdirSync(photosDir, { recursive: true });
  fs.writeFileSync(outPath, buf);
  return `/photos/${filename}`;
}

const results = [];
for (const pr of PRS) {
  try {
    const content = getFileFromBranch(pr.branch);
    const extracted = extractMemberBlock(content, pr.id);
    if (!extracted) {
      console.error(`PR #${pr.num}: Could not find member ${pr.id}`);
      continue;
    }
    const member = parseMemberFields(extracted.block);
    member.profilePic = extracted.profilePic;
    const savedPath = decodeAndSaveProfilePic(extracted.profilePic, pr.id);
    if (savedPath) member.profilePic = savedPath;
    results.push({ pr: pr.num, member });
    console.log(`PR #${pr.num}: extracted ${member.name}`);
  } catch (err) {
    console.error(`PR #${pr.num}: ${err.message}`);
  }
}

fs.writeFileSync(
  path.join(repoRoot, "scripts", "pr-members.json"),
  JSON.stringify(results, null, 2)
);
console.log("\nWrote scripts/pr-members.json");
