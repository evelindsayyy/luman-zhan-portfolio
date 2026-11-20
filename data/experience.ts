// Work experience, newest first, in the words of the Nov 2026 resume. Each
// role is named by what was built. Dates are "YYYY-MM" or "present"; numbers
// live in facts.ts and are cited by id.

import type { Item } from "./types.ts"

export interface Experience extends Item {
  org: string
  role: string
  location: string
  start: string
  end: string
}

export const experience: Experience[] = [
  {
    id: "ai-model-advisor",
    title: "AI Model Advisor",
    tabSub: "Duke University, Code+",
    color: "#3B4BD8",
    org: "Duke University, Code+",
    role: "Software & AI Engineer Intern",
    location: "Durham, NC",
    start: "2026-05",
    end: "2026-07",
    summary:
      "A three-part LLM evaluation framework for Duke’s AI Gateway. I built its model-quality pillar, proved the LLM judge against people, then used that data to fine-tune a model. It was handed off to the Security, OIT and AI Gateway teams.",
    stats: [
      { factId: "advisor-scale", caption: "models × task suites benchmarked" },
      { factId: "advisor-kappa", caption: "judge–human κ vs. the human–human ceiling" },
      { factId: "advisor-dpo", caption: "win rate over the base model after DPO" },
    ],
    points: [
      {
        title: "Built the model-quality pillar",
        text: "LLM-as-judge scoring with HELM, G-Eval and MT-Bench rubrics, paired with execution-based scoring, across 20+ models on Duke’s AI Gateway.",
      },
      {
        title: "Matched each task to the right scorer",
        text: "Verifiable tasks (text-to-SQL, structured extraction) are scored by execution against a golden set; open-ended tasks go to the LLM judge.",
      },
      {
        title: "Validated the judge against humans",
        text: "A 180-label human preference study (6 raters, 60 pairwise comparisons). The judge agreed with people (Cohen’s κ 0.23) about as well as people agreed with each other (Fleiss’ κ 0.27); known judge biases were quantified.",
      },
      {
        title: "Closed the eval-to-alignment loop",
        text: "Fed the validated preferences into a QLoRA-DPO fine-tune (TRL/PEFT) of a small open-weight model on a Slurm/vLLM cluster: win rate over the base model rose from 50% to 61%.",
      },
    ],
    why: [
      {
        title: "Evidence instead of vendor claims:",
        text: "Duke can choose which model to trust for which task based on its own measurements.",
      },
      {
        title: "A judge people can rely on:",
        text: "showing the LLM judge agrees with humans as well as humans agree with each other means evaluation can scale without paying raters for every run.",
      },
      {
        title: "Measure, then improve:",
        text: "the same preference data that scored the models also made one better, which is how evaluation feeds alignment in industry.",
      },
      {
        title: "It outlived the internship:",
        text: "the framework was handed off to Duke’s Security, OIT and AI Gateway teams.",
      },
    ],
    stack: ["Python", "LLM-as-judge", "Execution-based scoring", "vLLM", "Slurm", "TRL + PEFT", "PyTorch"],
    links: [{ label: "View on GitHub →", href: "https://github.com/evelindsayyy/security-and-qa-for-ai-models" }],
  },
  {
    id: "lumina-reach",
    title: "Lumina Reach",
    tabSub: "EasyScaleCloud",
    color: "#C2410C",
    org: "EasyScaleCloud",
    role: "AI Developer Intern",
    location: "Rockville, MD",
    start: "2026-01",
    end: "2026-03",
    summary:
      "A paid-search BI agent on AWS Bedrock AgentCore, so campaign managers across 80 advertisers can ask analytics questions in plain English instead of waiting on an analyst.",
    stats: [
      { factId: "lumina-sql", caption: "SQL accuracy on 50+ golden queries" },
      { factId: "lumina-halluc", caption: "hallucination rate" },
      { factId: "lumina-citation", caption: "citation accuracy" },
      { factId: "lumina-warehouse", caption: "~560K rows in Snowflake" },
    ],
    points: [
      {
        title: "Decoupled agent and tools",
        text: "The agent runs on AgentCore Runtime, separate from the chat UI and from an MCP runtime that holds the NL-to-SQL, knowledge-base and charting tools.",
      },
      {
        title: "IAM instead of API keys",
        text: "SigV4-signed calls limited to one MCP runtime ARN; least-privilege roles read Snowflake secrets from SSM SecureString; permission failures show up in AgentCore logs.",
      },
      {
        title: "Reusable, safe NL-to-SQL",
        text: "A stateless MCP runtime any authorized agent can call, with a YAML semantic layer (6 attribution formulas, 3 conversion definitions) and a SELECT-only AST validator.",
      },
      {
        title: "Measured, then fixed",
        text: "A five-dimension evaluation harness over 50+ analyst-authored golden queries traced hallucinations back to gaps in the data dictionary and semantic layer.",
      },
    ],
    why: [
      {
        title: "Self-serve analytics:",
        text: "campaign managers across 80 advertisers get answers in plain English instead of queuing requests for an analyst.",
      },
      {
        title: "The security model enterprises need before agents touch data:",
        text: "no shared API keys, one agent allowed to call one tool server, and read-only SQL.",
      },
      {
        title: "Accuracy you can audit:",
        text: "answers come with citations, and errors were traced to their source in the data documentation rather than blamed on the model.",
      },
    ],
    stack: ["Strands Agents", "Bedrock AgentCore", "MCP", "IAM (SigV4)", "Snowflake", "Python"],
    links: [
      { label: "View on GitHub →", href: "https://github.com/evelindsayyy/lumina_reach_analytics_agent-project" },
      { label: "Live demo →", href: "https://luminareachanalyticsagent-project-2.vercel.app" },
    ],
  },
  {
    id: "ai-interviewer",
    title: "AI Technical Interviewer",
    tabSub: "Innovation AI",
    color: "#7C3AED",
    org: "Innovation AI",
    role: "Backend / Full-Stack Software Engineer Intern",
    location: "San Jose, CA",
    start: "2025-05",
    end: "2025-07",
    summary:
      "An LLM-driven (Gemini) technical interviewer that runs candidates’ code and produces a scored, inspectable report. I built its tool-use and evaluation tooling across a Spring Boot/Vue codebase and a Node codebase.",
    stats: [
      { factId: "interviewer-consistency", caption: "cross-path result consistency" },
      { factId: "interviewer-latency", caption: "per run, validated with Java" },
      { factId: "interviewer-dashboard", caption: "internal evaluator dashboard" },
    ],
    points: [
      {
        title: "Tool-use adapter",
        text: "An MCP-inspired adapter runs non-Python languages through a separate compiler service and returns one result shape for status and output.",
      },
      {
        title: "Interview evaluation harness",
        text: "Scores each interview on the team’s weighted categories from the full candidate–LLM log: prompts, responses, metadata and tokens.",
      },
      {
        title: "Privacy boundary",
        text: "Candidates are UUIDs, and only internal evaluators can read the logs.",
      },
      {
        title: "Evaluator dashboard prototype",
        text: "Five tabs (Overview, Code Analysis, Chat Logs, Integrity, Telemetry) over mock data from five sessions, so the spec could be reviewed before launch.",
      },
    ],
    why: [
      {
        title: "More candidates, one code path:",
        text: "new languages plug into the same execution contract, so the product can grow without forking its runner.",
      },
      {
        title: "Hiring decisions you can inspect:",
        text: "every score traces back to the full interview log, which matters when an AI helps decide who gets hired.",
      },
      {
        title: "Privacy from day one:",
        text: "candidates stay anonymous to everyone outside the evaluation team.",
      },
    ],
    stack: ["Java 21", "Spring Boot", "Vue", "Node", "Docker", "PostgreSQL", "Gemini API"],
    links: [],
  },
]
