// The homepage tabs and their URL hashes. "#projects" opens a tab,
// "#experience/lumina-reach" also selects an item in it. Anything unknown
// falls back to the first tab, so a stale link never shows an empty page.

export const SECTIONS = ["experience", "projects", "about", "resume"] as const
export type Section = (typeof SECTIONS)[number]

export const SECTION_LABELS: Record<Section, string> = {
  experience: "Experience",
  projects: "Projects",
  about: "About",
  resume: "Resume",
}

export function parseHash(hash: string): { tab: Section; item: string | null } {
  const [tab, item] = hash.replace(/^#/, "").split("/")
  if (!(SECTIONS as readonly string[]).includes(tab)) return { tab: "experience", item: null }
  return { tab: tab as Section, item: item || null }
}

export function toHash(tab: Section, item?: string | null): string {
  return item ? `#${tab}/${item}` : `#${tab}`
}
