// Shapes shared by experience and projects. Both render with the same detail
// layout: what it is → numbers → what I did → why it matters → stack → links.

import type { FactId } from "./facts.ts"

/** A number tile: the value comes from facts.ts, the caption sits under it. */
export interface Stat {
  factId: FactId
  caption: string
}

/** A bold title and one line of explanation. */
export interface Point {
  title: string
  text: string
}

export interface Link {
  label: string
  href: string
}

export interface Item {
  /** Stable id, used in the URL hash: #experience/<id>. */
  id: string
  /** What was built, e.g. "Lumina Reach". */
  title: string
  /** Second line in the vertical tab, e.g. the company. */
  tabSub: string
  /** Accent for the item's numbers, selected tab and "Why it matters" box. */
  color: string
  /** What it is, in two or three sentences. */
  summary: string
  stats: Stat[]
  points: Point[]
  why: Point[]
  stack: string[]
  links: Link[]
}
