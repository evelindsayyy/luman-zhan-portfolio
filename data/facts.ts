// Every number on the site, with where it comes from. Components and the AI
// assistant's knowledge base cite these by id and never restate a number on
// their own, so a figure is checked once and changed in one place.
//
// Rule: only numbers I can show the evidence for in an interview. Targets,
// planned designs and runs that have not happened do not go here.

export interface Fact {
  /** As displayed, e.g. "27 s → 2 s". */
  value: string
  /** What the number measures, in one line. */
  label: string
  /** Where to verify it. */
  source: string
}

export const facts = {
  "lumina-cold-start": {
    value: "27 s → 2 s",
    label: "cold start of the MCP tool runtime, after moving schema reflection to build time",
    source: "lumina_reach_analytics_agent-project README; measured on the deployed AgentCore stack, Nov 2026",
  },
  "lumina-tokens": {
    value: "~42k → ~12k",
    label: "input tokens per question after prompt caching, counted at their price",
    source: "lumina_reach_analytics_agent-project README; averaged over the 12 recorded example questions",
  },
  "lumina-warehouse": {
    value: "21 tables · ~558K rows",
    label: "Snowflake warehouse the agent queries",
    source: "lumina_reach_analytics_agent-project: Snowflake sync check, 557,614 rows",
  },
  "lumina-tests": {
    value: "513",
    label: "Python tests at 99% line coverage",
    source: "lumina_reach_analytics_agent-project CI",
  },
  "advisor-scale": {
    value: "25 models · 10 task suites",
    label: "candidate models I evaluated across Duke task suites",
    source: "AI Model Advisor evaluation result files, July 2026",
  },
  "advisor-kappa": {
    value: "κ 0.23 vs 0.27",
    label: "LLM judge vs human consensus (Cohen's), next to agreement between humans (Fleiss')",
    source: "security-and-qa-for-ai-models docs/validation-study.md",
  },
  "advisor-study": {
    value: "60 comparisons · 6 raters · 180 labels",
    label: "human validation study of the LLM judge",
    source: "security-and-qa-for-ai-models docs/validation-study.md",
  },
  "advisor-tests": {
    value: "1,274",
    label: "Python tests in AI Model Advisor",
    source: "security-and-qa-for-ai-models CI",
  },
  "recall-auc": {
    value: "0.615 → 0.899",
    label: "ROC-AUC, likelihood baseline vs four-shot ReCaLL, Pythia-2.8B, mean of 3 seeds",
    source: "recall-mini-reproduction README",
  },
  "lyricmood-songs": {
    value: "76,595",
    label: "songs in the vector search index",
    source: "lyrics_mood_predictor README",
  },
  "lyricmood-tests": {
    value: "106",
    label: "Python tests",
    source: "lyrics_mood_predictor CI",
  },
} satisfies Record<string, Fact>

export type FactId = keyof typeof facts
