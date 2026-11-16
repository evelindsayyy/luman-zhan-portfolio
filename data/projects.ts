// The four featured projects, in the order shown. Each says what it proves,
// what part was mine, and where to check; numbers are cited from facts.ts.

import type { FactId } from "./facts.ts"

export interface Project {
  id: string
  name: string
  /** Where it came from: an internship, a team, or my own. */
  context: string
  /** What the project proves, in one sentence. */
  proves: string
  /** What I did, when it was a team effort. */
  myPart?: string
  stack: string[]
  links: { code: string; demo?: string }
  factIds: FactId[]
}

export const projects: Project[] = [
  {
    id: "lumina-reach",
    name: "Lumina Reach Analytics Agent",
    context: "EasyScaleCloud internship",
    proves:
      "An analytics agent deployed the enterprise way: agent and MCP tool server on two AgentCore runtimes, IAM deciding who may call the tools, and SQL that cannot write to the warehouse.",
    stack: ["Bedrock AgentCore", "MCP", "Strands", "Snowflake", "Cognito", "Next.js"],
    links: {
      code: "https://github.com/evelindsayyy/lumina_reach_analytics_agent-project",
      demo: "https://luminareachanalyticsagent-project-2.vercel.app",
    },
    factIds: ["lumina-cold-start", "lumina-tokens"],
  },
  {
    id: "model-advisor",
    name: "AI Model Advisor",
    context: "Duke Code+ team project",
    proves:
      "Model governance with evidence: artifact scanning, safety testing, task-level evaluation and public benchmarks, run in production at Duke.",
    myPart: "I built the evaluation (efficacy) pillar and the human study that validated its LLM judge.",
    stack: ["Python", "LLM-as-judge", "vLLM", "Slurm", "Flask", "PostgreSQL"],
    links: { code: "https://github.com/evelindsayyy/security-and-qa-for-ai-models" },
    factIds: ["advisor-kappa", "advisor-scale"],
  },
  {
    id: "lyricmood",
    name: "LyricMood",
    context: "Personal project",
    proves:
      "A full ML product: a fine-tuned DistilBERT served through ONNX, word-level SHAP explanations, and semantic search over a large song catalog.",
    stack: ["DistilBERT", "ONNX", "FastAPI", "SHAP", "Qdrant", "Streamlit"],
    links: {
      code: "https://github.com/evelindsayyy/lyrics_mood_predictor",
      demo: "https://lyricsmoodpredictor-zrtbnhzdwavalcsqriyexb.streamlit.app/",
    },
    factIds: ["lyricmood-songs", "lyricmood-tests"],
  },
  {
    id: "recall",
    name: "ReCaLL Reproduction",
    context: "Research reproduction",
    proves:
      "A tested, multi-seed reproduction of an EMNLP 2024 membership-inference result on WikiMIA, sized to run on a laptop or a free Colab GPU.",
    stack: ["PyTorch", "Hugging Face Transformers", "Pythia", "Colab"],
    links: { code: "https://github.com/evelindsayyy/recall-mini-reproduction" },
    factIds: ["recall-auc"],
  },
]
