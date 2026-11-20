// The chat's "Ask next" questions and "Related on this site" links. They are
// curated rather than generated, so every follow-up is a question the
// knowledge base can answer, and suggesting them costs no tokens.
//
// Topics are listed in match priority: the first topic whose keywords match a
// visitor's question decides which follow-ups come next.

export interface FollowUp {
  id: string
  /** The question, exactly as the visitor would ask it. */
  q: string
  /** Matched against the visitor's question and the assistant's answer. */
  keywords: RegExp
  /** Topics worth asking about after this one, best first. */
  next: string[]
  /** Where on the site the topic lives. */
  related?: { label: string; href: string }
}

export const FOLLOW_UPS: FollowUp[] = [
  {
    id: "judge",
    q: "How did Grace validate the LLM judge?",
    keywords: /judge|kappa|κ|rater|preference study|human study/i,
    next: ["advisor", "shap", "next"],
    related: { label: "AI Model Advisor", href: "/#experience/ai-model-advisor" },
  },
  {
    id: "security",
    q: "How did Grace secure the agent’s tools?",
    keywords: /secur|\biam\b|sigv4|permission|api key|least.privilege/i,
    next: ["lumina", "interviewer", "skills"],
    related: { label: "Lumina Reach", href: "/#experience/lumina-reach" },
  },
  {
    id: "shap",
    q: "How does Grace know LyricMood’s explanations are faithful?",
    keywords: /shap|explanation|faithful/i,
    next: ["lyric", "judge", "recall"],
    related: { label: "LyricMood", href: "/#projects/lyricmood" },
  },
  {
    id: "lumina",
    q: "Tell me about Lumina Reach.",
    keywords: /lumina|easyscale|snowflake|agentcore|bi agent|nl-to-sql|golden quer/i,
    next: ["security", "advisor", "recall"],
    related: { label: "Lumina Reach", href: "/#experience/lumina-reach" },
  },
  {
    id: "advisor",
    q: "Tell me about AI Model Advisor.",
    keywords: /advisor|code\+|ai gateway|evaluation framework|\bdpo\b|fine-?tun/i,
    next: ["judge", "lumina", "skills"],
    related: { label: "AI Model Advisor", href: "/#experience/ai-model-advisor" },
  },
  {
    id: "interviewer",
    q: "What did Grace do at Innovation AI?",
    keywords: /innovation ai|interviewer|gemini/i,
    next: ["advisor", "lumina", "projects"],
    related: { label: "AI Technical Interviewer", href: "/#experience/ai-interviewer" },
  },
  {
    id: "lyric",
    q: "How does LyricMood work?",
    keywords: /lyric|mood|song|music/i,
    next: ["shap", "recall", "skills"],
    related: { label: "LyricMood", href: "/#projects/lyricmood" },
  },
  {
    id: "recall",
    q: "What is the ReCaLL reproduction?",
    keywords: /recall|membership|training data|pythia|wikimia/i,
    next: ["lyric", "judge", "education"],
    related: { label: "ReCaLL Reproduction", href: "/#projects/recall" },
  },
  {
    id: "projects",
    q: "Tell me about Grace’s personal projects.",
    keywords: /project/i,
    next: ["lyric", "recall", "experience"],
    related: { label: "Projects", href: "/#projects" },
  },
  {
    id: "experience",
    q: "What did Grace build in her internships?",
    keywords: /intern|experience|worked|job history/i,
    next: ["advisor", "lumina", "interviewer"],
    related: { label: "Experience", href: "/#experience" },
  },
  {
    id: "education",
    q: "Where does Grace study?",
    keywords: /educat|school|gpa|course|duke|michigan|umich|major|degree/i,
    next: ["skills", "experience", "next"],
    related: { label: "Education", href: "/#about" },
  },
  {
    id: "skills",
    q: "What are Grace’s technical skills?",
    keywords: /skill|stack|languages?\b|tools|python|aws/i,
    next: ["lumina", "advisor", "next"],
    related: { label: "Skills", href: "/#about" },
  },
  {
    id: "next",
    q: "What roles is Grace looking for?",
    keywords: /hire|hiring|role|looking for|availab|contact|email|reach her|summer 2027/i,
    next: ["experience", "projects", "skills"],
    related: { label: "Resume", href: "/#resume" },
  },
  {
    id: "about",
    q: "Who is Grace?",
    keywords: /who is|about her|background/i,
    next: ["education", "skills", "next"],
    related: { label: "About", href: "/#about" },
  },
]

export const DEFAULT_FOLLOW_UPS = ["experience", "projects", "about", "next", "skills", "education"]

const byId = new Map(FOLLOW_UPS.map((f) => [f.id, f]))

/** Ids of every topic the text mentions, in match priority. */
export function matchTopics(text: string): string[] {
  return FOLLOW_UPS.filter((f) => f.keywords.test(text)).map((f) => f.id)
}

/**
 * Up to `n` follow-ups for a question: the matched topic's own next steps
 * first, then the defaults, skipping the topic itself and anything asked.
 */
export function pickFollowUps(question: string, asked: ReadonlySet<string>, n = 3): FollowUp[] {
  const current = matchTopics(question)[0]
  const candidates = [...(current ? byId.get(current)!.next : []), ...DEFAULT_FOLLOW_UPS]
  const picked: FollowUp[] = []
  for (const id of candidates) {
    if (id === current || asked.has(id) || picked.some((f) => f.id === id)) continue
    picked.push(byId.get(id)!)
    if (picked.length === n) break
  }
  return picked
}

/** Links to the parts of the site an answer talks about, at most `max`. */
export function relatedLinks(text: string, max = 2): { label: string; href: string }[] {
  const links: { label: string; href: string }[] = []
  for (const id of matchTopics(text)) {
    const related = byId.get(id)!.related
    if (related && !links.some((l) => l.href === related.href)) links.push(related)
    if (links.length === max) break
  }
  return links
}
