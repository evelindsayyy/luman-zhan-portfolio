// The site's content rules. Everything a visitor reads about me comes from
// data/, so these checks are what keep it honest and safe to publish:
// every number has a source, no phone number, one public email, no
// template placeholders left anywhere.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { facts } from "../data/facts.ts";
import { profile } from "../data/profile.ts";
import { experience } from "../data/experience.ts";
import { projects } from "../data/projects.ts";
import suggestedActions from "../data/suggested-actions.json" with { type: "json" };
import { FOLLOW_UPS, DEFAULT_FOLLOW_UPS, pickFollowUps, relatedLinks } from "../data/follow-ups.ts";
import { parseHash, SECTIONS } from "../lib/sections.ts";

const PUBLIC_EMAIL = "zhanluman0612@gmail.com";
const MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

function filesUnder(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}

const SITE_FILES = ["app", "components", "lib", "data", "portfolio_ai/prompts"]
  .flatMap(filesUnder)
  .concat(["next.config.js"])
  .filter((f) => /\.(tsx?|jsx?|json|md|css)$/.test(f));

test("every fact has a value, a label and a source", () => {
  for (const [id, fact] of Object.entries(facts)) {
    for (const field of ["value", "label", "source"]) {
      assert.ok(fact[field]?.trim(), `fact ${id} has no ${field}`);
    }
  }
});

const ITEMS = [...experience, ...projects];

test("every number shown points to a fact", () => {
  for (const item of ITEMS) {
    for (const stat of item.stats) {
      assert.ok(facts[stat.factId], `${item.id}: unknown fact id ${stat.factId}`);
      assert.ok(stat.caption.trim(), `${item.id}: ${stat.factId} has no caption`);
    }
  }
});

test("every role and project has a title, a color and points", () => {
  const ids = new Set();
  for (const item of ITEMS) {
    assert.ok(item.title.trim() && item.tabSub.trim() && item.summary.trim(), item.id);
    assert.match(item.color, /^#[0-9A-F]{6}$/i, `${item.id} color`);
    assert.ok(item.points.length >= 3, `${item.id} needs at least 3 points`);
    assert.ok(item.why.length >= 2, `${item.id} needs a "why it matters"`);
    assert.match(item.id, /^[a-z0-9-]+$/, `${item.id} must be hash-safe`);
    assert.ok(!ids.has(item.id), `duplicate id ${item.id}`);
    ids.add(item.id);
  }
});

test("DGHI is gone from the site", () => {
  for (const file of SITE_FILES) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /DGHI|Global Health|sickle/i, file);
  }
});

test("every chat shortcut has a title, a label and an action", () => {
  assert.equal(suggestedActions.length, 4);
  for (const a of suggestedActions) {
    for (const field of ["title", "label", "action"]) assert.ok(a[field]?.trim(), `${a.title} ${field}`);
  }
});

test("hashes open a tab and an item, and unknown ones fall back", () => {
  assert.deepEqual(parseHash("#projects/recall"), { tab: "projects", item: "recall" });
  assert.deepEqual(parseHash("#resume"), { tab: "resume", item: null });
  assert.deepEqual(parseHash("#bogus"), { tab: "experience", item: null });
  assert.deepEqual(parseHash(""), { tab: "experience", item: null });
  assert.deepEqual([...SECTIONS], ["experience", "projects", "about", "resume"]);
});

test("follow-ups point to known topics", () => {
  const ids = new Set(FOLLOW_UPS.map((f) => f.id));
  for (const f of FOLLOW_UPS) {
    assert.ok(f.q.trim().endsWith("?") || f.q.trim().endsWith("."), f.id);
    for (const n of f.next) assert.ok(ids.has(n), `${f.id} -> ${n}`);
  }
  for (const id of DEFAULT_FOLLOW_UPS) assert.ok(ids.has(id), id);
});

test("follow-ups come from the topic, skip what was asked, and run out", () => {
  const ids = (list) => list.map((f) => f.id);
  assert.deepEqual(ids(pickFollowUps("Tell me about Lumina Reach.", new Set())), ["security", "advisor", "recall"]);
  assert.deepEqual(ids(pickFollowUps("Tell me about Lumina Reach.", new Set(["security"]))), ["advisor", "recall", "experience"]);
  assert.deepEqual(ids(pickFollowUps("hello there", new Set())), DEFAULT_FOLLOW_UPS.slice(0, 3));
  assert.deepEqual(pickFollowUps("hello", new Set(FOLLOW_UPS.map((f) => f.id))), []);
});

test("related links follow what the answer talks about", () => {
  assert.deepEqual(relatedLinks("Lumina Reach runs on AgentCore."), [
    { label: "Lumina Reach", href: "/#experience/lumina-reach" },
  ]);
  assert.deepEqual(relatedLinks("Nothing relevant here"), []);
});

test("experience dates are months, in order", () => {
  for (const e of experience) {
    assert.match(e.start, MONTH, `${e.id} start`);
    if (e.end !== "present") {
      assert.match(e.end, MONTH, `${e.id} end`);
      assert.ok(e.start <= e.end, `${e.id} ends before it starts`);
    }
  }
});

test("links are https and go where they say", () => {
  assert.match(profile.links.github, /^https:\/\/github\.com\/evelindsayyy$/);
  assert.match(profile.links.linkedin, /^https:\/\/www\.linkedin\.com\/in\//);
  for (const item of ITEMS) {
    for (const link of item.links) assert.match(link.href, /^https:\/\//, `${item.id} ${link.label}`);
  }
  for (const p of projects) {
    assert.ok(p.links.some((l) => l.href.startsWith("https://github.com/evelindsayyy/")), `${p.id} code link`);
  }
});

test("no phone number anywhere on the site", () => {
  const phone = /\(?\b\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}\b/;
  for (const file of SITE_FILES) {
    assert.doesNotMatch(readFileSync(file, "utf8"), phone, file);
  }
});

test("the only email address published is the public one", () => {
  const email = /[\w.+-]+@[\w-]+\.[\w.]+/g;
  assert.equal(profile.email, PUBLIC_EMAIL);
  for (const file of SITE_FILES) {
    for (const found of readFileSync(file, "utf8").match(email) ?? []) {
      assert.equal(found, PUBLIC_EMAIL, `${file} publishes ${found}`);
    }
  }
});

test("no template placeholders are left", () => {
  const placeholder = /john\s*doe|johndoe|example\.com|virtual john|\bJD\b/i;
  for (const file of SITE_FILES) {
    assert.doesNotMatch(readFileSync(file, "utf8"), placeholder, file);
  }
});

test("the knowledge base is rebuilt from data/", async () => {
  const { buildKnowledgeBase, KB_PATH } = await import("../scripts/build-kb.mjs");
  assert.equal(
    readFileSync(KB_PATH, "utf8"),
    buildKnowledgeBase(),
    "knowledge-base.md is stale: run `node scripts/build-kb.mjs`",
  );
});

test("the knowledge base is long enough for prompt caching", async () => {
  // Bedrock caches a prefix only from 1,024 tokens on Nova models. At
  // roughly 4 characters per token, 6,000 characters leaves a margin.
  const { buildKnowledgeBase } = await import("../scripts/build-kb.mjs");
  assert.ok(buildKnowledgeBase().length >= 6000);
});
