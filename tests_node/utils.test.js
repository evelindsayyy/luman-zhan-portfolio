// cn() is how every component composes Tailwind classes: conditional classes
// drop out, and a later utility overrides an earlier one of the same kind.

import { test } from "node:test";
import assert from "node:assert/strict";

import { cn } from "../lib/utils.ts";

test("falsy classes drop out", () => {
  assert.equal(cn("a", false && "b", undefined, null, "c"), "a c");
});

test("a later Tailwind utility overrides an earlier one", () => {
  assert.equal(cn("p-2 text-sm", "p-4"), "text-sm p-4");
});

test("object syntax keeps only the true keys", () => {
  assert.equal(cn({ hidden: false, flex: true }, "gap-2"), "flex gap-2");
});
