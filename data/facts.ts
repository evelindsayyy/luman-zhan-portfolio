// Every number on the site, with where it comes from. Components and the AI
// assistant's knowledge base cite these by id and never restate a number on
// their own, so a figure is checked once and changed in one place.
//
// Rule: the numbers match my resume, and I can show the evidence for each one
// in an interview. Where the evidence is not in a public repo, the source says
// so.

export interface Fact {
  /** As displayed, e.g. "27 s → 2 s". */
  value: string
  /** What the number measures, in one line. */
  label: string
  /** Where to verify it. */
  source: string
}

export const facts = {
  // AI Model Advisor (Duke Code+)
  "advisor-scale": {
    value: "20+ × 15+",
    label: "models benchmarked on Duke's AI Gateway × task suites",
    source: "AI Model Advisor evaluation results, summer 2026",
  },
  "advisor-kappa": {
    value: "0.23 ≈ 0.27",
    label: "LLM judge vs human consensus (Cohen's κ), next to agreement between humans (Fleiss' κ)",
    source: "security-and-qa-for-ai-models docs/validation-study.md",
  },
  "advisor-study": {
    value: "180 labels",
    label: "human preference study: 6 raters, 60 pairwise comparisons",
    source: "security-and-qa-for-ai-models docs/validation-study.md",
  },
  "advisor-dpo": {
    value: "50% → 61%",
    label: "win rate over the base model after the QLoRA-DPO fine-tune",
    source: "Code+ DPO evaluation run (internal branch, not in the public repo)",
  },
  // Lumina Reach (EasyScaleCloud)
  "lumina-sql": {
    value: "90%+",
    label: "SQL accuracy on 50+ analyst-authored golden queries",
    source: "EasyScaleCloud evaluation harness (internship work, not in the public repo yet)",
  },
  "lumina-halluc": {
    value: "<2%",
    label: "hallucination rate on the golden queries",
    source: "EasyScaleCloud evaluation harness (internship work, not in the public repo yet)",
  },
  "lumina-citation": {
    value: "95%+",
    label: "citation accuracy on the golden queries",
    source: "EasyScaleCloud evaluation harness (internship work, not in the public repo yet)",
  },
  "lumina-warehouse": {
    value: "21 tables",
    label: "~560K rows in the Snowflake warehouse the agent queries",
    source: "lumina_reach_analytics_agent-project: Snowflake sync check, 557,614 rows",
  },
  // AI Technical Interviewer (Innovation AI)
  "interviewer-consistency": {
    value: "100%",
    label: "cross-path result consistency of the tool-use adapter",
    source: "Innovation AI adapter validation (private company code)",
  },
  "interviewer-latency": {
    value: "~1.2 s",
    label: "per run, validated with Java",
    source: "Innovation AI adapter validation (private company code)",
  },
  "interviewer-dashboard": {
    value: "5 tabs",
    label: "internal evaluator dashboard prototype",
    source: "Innovation AI dashboard prototype (private company code)",
  },
  // LyricMood
  "lyric-acc": {
    value: "0.432 → 0.521",
    label: "test accuracy, baseline → fine-tuned DistilBERT",
    source: "lyrics_mood_predictor README",
  },
  "lyric-shap": {
    value: "62 / 100",
    label: "correct predictions that flip when the top-5 SHAP words are removed",
    source: "lyrics_mood_predictor README",
  },
  "lyric-lift": {
    value: "1.35×",
    label: "mood-match lift from semantic search vs. random",
    source: "lyrics_mood_predictor README",
  },
  "lyricmood-songs": {
    value: "76,595",
    label: "songs in the vector search index",
    source: "lyrics_mood_predictor README",
  },
  "lyricmood-tests": {
    value: "106",
    label: "Python tests run in CI",
    source: "lyrics_mood_predictor CI",
  },
  // ReCaLL reproduction
  "recall-auc": {
    value: "0.615 → 0.899",
    label: "ROC-AUC, likelihood baseline → four-shot ReCaLL, Pythia-2.8B, mean of 3 seeds",
    source: "recall-mini-reproduction README",
  },
  "recall-gain": {
    value: "+0.283",
    label: "mean ROC-AUC gain across 3 seeds",
    source: "recall-mini-reproduction README",
  },
  "recall-70m": {
    value: "0.542 → 0.802",
    label: "same direction on the laptop-size Pythia-70M",
    source: "recall-mini-reproduction README",
  },
  "recall-tests": {
    value: "93%",
    label: "line coverage, 23 tests",
    source: "recall-mini-reproduction CI",
  },
} satisfies Record<string, Fact>

export type FactId = keyof typeof facts
