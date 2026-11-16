// The proof row under the hero: a few numbers a visitor can check. Each cites
// a fact and links to the evidence; icons are named here and mapped to
// components in StatsSection, so this file stays plain data.

import type { FactId } from "./facts.ts"

export interface ProofStat {
  factId: FactId
  /** Short caption under the number. */
  caption: string
  icon: "gauge" | "scale" | "layers" | "flask"
  href: string
}

export const proofStats: ProofStat[] = [
  {
    factId: "advisor-scale",
    caption: "models evaluated on Duke task suites",
    icon: "layers",
    href: "https://github.com/evelindsayyy/security-and-qa-for-ai-models",
  },
  {
    factId: "advisor-kappa",
    caption: "LLM judge vs humans, next to human–human agreement",
    icon: "scale",
    href: "https://github.com/evelindsayyy/security-and-qa-for-ai-models/blob/main/docs/validation-study.md",
  },
  {
    factId: "lumina-cold-start",
    caption: "agent tool runtime cold start on AgentCore",
    icon: "gauge",
    href: "https://github.com/evelindsayyy/lumina_reach_analytics_agent-project",
  },
  {
    factId: "recall-auc",
    caption: "ROC-AUC lift reproducing ReCaLL",
    icon: "flask",
    href: "https://github.com/evelindsayyy/recall-mini-reproduction",
  },
]
