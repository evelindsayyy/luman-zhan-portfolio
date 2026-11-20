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

const bold = (text) => text.replace(/\*\*/g, "");

function profileSection() {
  return [
    "## About Grace",
    "",
    `- Name: ${profile.name}. She goes by ${profile.preferredName}.`,
    `- ${profile.role}.`,
    `- Summary: ${profile.summary}`,
    `- ${profile.target}`,
    `- Status: ${profile.status}.`,
    `- Based in ${profile.location}.`,
    `- Email: ${profile.email}`,
    `- GitHub: ${profile.links.github}`,
    `- LinkedIn: ${profile.links.linkedin}`,
    `- Resume (one-page PDF): the Resume tab of the site, ${profile.resume.pdf}`,
    "",
    ...profile.about.map((p) => `In her words: ${bold(p)}`),
    "",
    `How she works: ${profile.howIWork}`,
  ];
}

function educationSection() {
  return [
    "## Education",
    ...profile.education.flatMap((s) => [
      "",
      `### ${s.school}: ${s.degree} (${s.when})`,
      "",
      `- ${s.focus}. ${s.gpa}.`,
      `- Coursework: ${s.courses.join(", ")}.`,
    ]),
  ];
}

function skillsSection() {
  return ["## Technical skills", "", ...profile.skills.map((g) => `- ${g.label}: ${g.items.join(", ")}.`)];
}

function itemLines(item, doneLabel) {
  return [
    "",
    item.summary,
    "",
    "Numbers:",
    ...item.stats.map((s) => `- ${facts[s.factId].value}: ${s.caption}`),
    "",
    `${doneLabel}:`,
    ...item.points.map((p) => `- ${p.title}: ${p.text}`),
    "",
    "Why it matters:",
    ...item.why.map((w) => `- ${w.title} ${w.text}`),
    "",
    `- Stack: ${item.stack.join(", ")}`,
    ...item.links.map((l) => `- ${l.label.replace(/ →$/, "")}: ${l.href}`),
  ];
}

function experienceSection() {
  return [
    "## Experience (newest first)",
    ...experience.flatMap((e) => [
      "",
      `### ${e.title}: ${e.role}, ${e.org} (${month(e.start)} – ${month(e.end)}, ${e.location})`,
      ...itemLines(e, "What she did"),
    ]),
  ];
}

function projectsSection() {
  return [
    "## Personal projects",
    ...projects.flatMap((p) => [
      "",
      `### ${p.title} (${p.kind})`,
      "",
      p.meta + ".",
      ...itemLines(p, "How she built it"),
    ]),
  ];
}

function factsSection() {
  return [
    "## Numbers and where they come from",
    "",
    "Quote these exactly; do not round, combine or extrapolate. Some evidence is internal (not in a public repo); say so if asked where to check.",
    "",
    ...Object.values(facts).map((f) => `- ${f.value}: ${f.label} (source: ${f.source})`),
  ];
}

// Repeated last, right before the visitor's question: small models follow the
// format best when it is the final thing they read, and the layout above is
// for reference, not for copying.
function answerFormatSection() {
  return [
    "## How to answer (repeats RULE 5)",
    "",
    "Summarize; do not copy the layout of this knowledge base. Write one sentence that answers the question, then two to four bullets, each a single line that starts with a bold label and a colon, like `- **Label:** text`. Nothing after the last bullet.",
  ];
}

export function buildKnowledgeBase() {
  const sections = [
    ["# Knowledge base: Luman (Grace) Zhan", "", "Generated from the site's data/ files by scripts/build-kb.mjs. Do not edit by hand."],
    profileSection(),
    educationSection(),
    skillsSection(),
    experienceSection(),
    projectsSection(),
    factsSection(),
    answerFormatSection(),
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
