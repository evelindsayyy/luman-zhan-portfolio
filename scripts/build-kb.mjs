// Builds the AI assistant's knowledge base from data/, the same files the
// site renders, so the chat can never say something the page does not.
//
//   node scripts/build-kb.mjs          write portfolio_ai/prompts/knowledge-base.md
//   node scripts/build-kb.mjs --check  exit 1 if the file is out of date (CI)

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import { facts } from "../data/facts.ts";
import { profile } from "../data/profile.ts";
import { experience } from "../data/experience.ts";
import { projects } from "../data/projects.ts";

export const KB_PATH = fileURLToPath(
  new URL("../portfolio_ai/prompts/knowledge-base.md", import.meta.url),
);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function month(value) {
  if (value === "present") return "present";
  const [year, m] = value.split("-");
  return `${MONTHS[Number(m) - 1]} ${year}`;
}

function factLines(ids) {
  return ids.map((id) => `- ${facts[id].value}: ${facts[id].label} (source: ${facts[id].source})`);
}

function profileSection() {
  return [
    "## About Grace",
    "",
    `- Name: ${profile.name}. She goes by ${profile.preferredName}.`,
    `- Headline: ${profile.headline}.`,
    `- In her words: ${profile.thesis}`,
    `- ${profile.target}`,
    `- Based in ${profile.location}.`,
    `- Email: ${profile.email}`,
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
  ];
}

function educationSection() {
  return [
    "## Education",
    "",
    ...profile.education.map((s) => `- ${s.school}: ${s.degree}. ${s.dates}. ${s.detail}.`),
  ];
}

function experienceSection() {
  return [
    "## Experience (newest first)",
    ...experience.flatMap((e) => [
      "",
      `### ${e.role}, ${e.org} (${month(e.start)} – ${month(e.end)}, ${e.location})`,
      "",
      e.summary,
      "",
      ...e.highlights.map((h) => `- ${h}`),
      `- Stack: ${e.stack.join(", ")}`,
      ...(e.link ? [`- Link: ${e.link.href}`] : []),
    ]),
  ];
}

function projectsSection() {
  return [
    "## Featured projects",
    ...projects.flatMap((p) => [
      "",
      `### ${p.name} (${p.context})`,
      "",
      p.proves,
      ...(p.myPart ? ["", `Grace's part: ${p.myPart}`] : []),
      "",
      `- Stack: ${p.stack.join(", ")}`,
      `- Code: ${p.links.code}`,
      ...(p.links.demo ? [`- Live demo: ${p.links.demo}`] : []),
    ]),
  ];
}

function factsSection() {
  return [
    "## Verified numbers",
    "",
    "Each number below has a source Grace can show. Quote them exactly; do not round, combine or extrapolate.",
    "",
    ...factLines(Object.keys(facts)),
  ];
}

export function buildKnowledgeBase() {
  const sections = [
    ["# Knowledge base: Luman (Grace) Zhan", "", "Generated from the site's data/ files by scripts/build-kb.mjs. Do not edit by hand."],
    profileSection(),
    educationSection(),
    experienceSection(),
    projectsSection(),
    factsSection(),
  ];
  return sections.map((lines) => lines.join("\n")).join("\n\n") + "\n";
}

function main() {
  const next = buildKnowledgeBase();
  if (process.argv.includes("--check")) {
    const current = readFileSync(KB_PATH, "utf8");
    if (current !== next) {
      console.error("knowledge-base.md is out of date: run `node scripts/build-kb.mjs`");
      process.exit(1);
    }
    return;
  }
  writeFileSync(KB_PATH, next);
  process.stdout.write(`wrote ${KB_PATH} (${next.length} chars)\n`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
