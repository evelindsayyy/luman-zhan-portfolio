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
import { proofStats } from "../data/stats.ts";

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

test("every number shown points to a fact", () => {
  const used = [
    ...proofStats.map((s) => s.factId),
    ...experience.flatMap((e) => e.factIds),
    ...projects.flatMap((p) => p.factIds),
  ];
  for (const id of used) assert.ok(facts[id], `unknown fact id: ${id}`);
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
  for (const p of projects) {
    for (const [kind, url] of Object.entries(p.links)) {
      assert.match(url, /^https:\/\//, `${p.id} ${kind} link`);
    }
    assert.match(p.links.code, /^https:\/\/github\.com\/evelindsayyy\//, `${p.id} code link`);
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
