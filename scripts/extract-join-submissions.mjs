#!/usr/bin/env node
/**
 * Extract what people submitted from join PR branches.
 * Run: node scripts/extract-join-submissions.mjs
 *
 * For PRs #37, #38, #39 the branch files stored members.ts as base64 text (bug).
 * Decode: Buffer.from(raw, "base64").toString("utf8") to get the TS content.
 *
 * Full submitted data for manual add:
 */

const submissions = [
  {
    pr: 39,
    name: "Michael Botti",
    id: "michael-botti",
    notes: "Developing agentic AI for finance; implementing agents for a multi-strategy credit fund",
    email: "mrb2306@columbia.edu",
    program: "Operations Research",
    roles: ["growth", "finance", "ai/ml", "vc"],
    verticals: ["fintech", "ai"],
    profilePic: "/photos/michael-botti.gif",
    linkedin: "https://www.linkedin.com/in/michaelbotti11/",
    connections: ["rahul-arora", "anibal-segovia"],
  },
  {
    pr: 38,
    name: "Arleen Alcaraz-Cano",
    id: "arleen-alcaraz-cano",
    notes: null,
    website: "https://www.arleenaricey.live/",
    program: "CS",
    email: "aaa2428@barnard.edu",
    roles: ["product", "ai/ml", "design"],
    profilePic: "/photos/arleen-alcaraz-cano.jpg",
    linkedin: "https://www.linkedin.com/in/arleen-alcaraz-cano/",
  },
  {
    pr: 37,
    name: "Amrutha Rao",
    id: "amrutha-rao",
    notes: "AI Music Platofrm rn, but generally interested in building in AI",
    website: "https://amrutharao.me/",
    program: "Applied Math and CS",
    email: "arr2249@columbia.edu",
    roles: ["engineering", "ai/ml", "research", "software", "product"],
    verticals: ["ai", "consumer", "marketplaces"],
    profilePic: "/photos/amrutha-rao.jpg",
    twitter: "https://x.com/amrutha_rao_",
    linkedin: "https://www.linkedin.com/in/amrutha-rao-ab9360239/",
    connections: [
      "aedin-pereira", "arm-komolhiran", "david-xiong", "eddy-xu",
      "ethan-rhee", "joseph-jojoe", "justin-hou", "mihir-garimella",
      "tanush-sawhney", "naythan-chan",
    ],
  },
];

console.log("Join PR submissions (decoded from branch files):\n");
submissions.forEach((s) => {
  console.log(`PR #${s.pr}: ${s.name} (${s.id})`);
  Object.entries(s).filter(([k]) => !["pr", "name", "id"].includes(k)).forEach(([k, v]) => {
    if (v != null) console.log(`  ${k}: ${Array.isArray(v) ? v.join(", ") : v}`);
  });
  console.log("");
});
