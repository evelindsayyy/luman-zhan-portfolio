// Work and research experience, newest first. Dates are "YYYY-MM" or
// "present"; numbers live in facts.ts and are cited by id.

import type { FactId } from "./facts.ts"

export interface Experience {
  id: string
  org: string
  role: string
  location: string
  start: string
  end: string
  /** One line: what the work was, for someone skimming. */
  summary: string
  /** What I did, each line defensible in an interview. */
  highlights: string[]
  stack: string[]
  factIds: FactId[]
  link?: { label: string; href: string }
}

export const experience: Experience[] = [
  {
    id: "duke-codeplus",
    org: "Duke University, Code+",
    role: "Software & AI Engineer Intern",
    location: "Durham, NC",
    start: "2026-05",
    end: "2026-07",
    summary:
      "Built the model-quality pillar of AI Model Advisor, a governance platform that evaluates the models on Duke's AI Gateway.",
    highlights: [
      "Evaluated 25 candidate models across 10 Duke task suites, routing each task to the scorer that fits it: execution-based checks for verifiable tasks such as text-to-SQL, and an LLM judge with per-dimension rubrics for open-ended ones.",
      "Validated the LLM judge against people: 6 raters labeled 60 comparisons (180 labels). The judge's agreement with the human consensus (Cohen's κ 0.23) sat in the same band as agreement between the humans themselves (Fleiss' κ 0.27).",
      "Served an open-weight model (Qwen2.5-7B) on Duke's Slurm GPU cluster with vLLM behind an OpenAI-compatible endpoint, so the same evaluation code ran against hosted and self-hosted models.",
      "Counted failures, not just scores: one candidate judge returned unparseable output on about three quarters of its calls, which a score-only view would have hidden.",
    ],
    stack: ["Python", "LLM-as-judge", "vLLM", "Slurm", "Flask", "PostgreSQL", "Docker"],
    factIds: ["advisor-scale", "advisor-kappa", "advisor-study", "advisor-tests"],
    link: { label: "AI Model Advisor on GitHub", href: "https://github.com/evelindsayyy/security-and-qa-for-ai-models" },
  },
  {
    id: "easyscalecloud",
    org: "EasyScaleCloud",
    role: "AI Developer Intern",
    location: "Rockville, MD",
    start: "2026-01",
    end: "2026-03",
    summary:
      "Built Lumina Reach, an analytics agent for a paid search agency network, deployed the way enterprises run agents.",
    highlights: [
      "Deployed a Strands agent and its MCP tool server as two Amazon Bedrock AgentCore runtimes; only the agent's IAM role may call the tools (SigV4), and each runtime can read only its own secret in SSM.",
      "Wrote text-to-SQL over a 21-table, ~558K-row Snowflake warehouse behind an AST validator that rejects writes, unknown tables and columns, and sensitive fields before a query runs read-only.",
      "Put every request behind a signed-in user: Cognito login on the Next.js tier and AgentCore's JWT authorizer on the agent, so the web tier holds no AWS credential or API key.",
      "Cut the tool runtime's cold start from 27 s to 2 s and a question's input from ~42k to ~12k tokens with prompt caching; the public demo runs on a budget of about $5 a month.",
    ],
    stack: ["Amazon Bedrock AgentCore", "MCP", "Strands Agents", "Claude", "Snowflake", "AWS IAM", "Cognito", "AWS CDK", "Next.js"],
    factIds: ["lumina-cold-start", "lumina-tokens", "lumina-warehouse", "lumina-tests"],
    link: { label: "Lumina Reach on GitHub", href: "https://github.com/evelindsayyy/lumina_reach_analytics_agent-project" },
  },
  {
    id: "dghi",
    org: "Duke Global Health Institute",
    role: "Undergraduate Researcher, Sickle Cell Disease Data",
    location: "Durham, NC",
    start: "2025-10",
    end: "present",
    summary:
      "Unifying clinical and field data on sickle cell disease so that an outcome model can rely on it.",
    highlights: [
      "Built a React/Vite dashboard that brings together Duke clinical records and field data collected by sickle cell labs in Uganda.",
      "Normalizing multi-source records with different formats, missing values and entry errors into one structure a forecasting model can use.",
      "Co-authoring a manuscript in preparation: I wrote the survey-data and traditional-medicine sections and the introduction.",
    ],
    stack: ["React", "Vite", "Python", "Data cleaning"],
    factIds: [],
  },
  {
    id: "innovation-ai",
    org: "Innovation AI",
    role: "Backend / Full-Stack Software Engineer Intern",
    location: "San Jose, CA",
    start: "2025-05",
    end: "2025-07",
    summary:
      "Backend and full-stack work on an AI technical interviewer at an early-stage startup.",
    highlights: [
      "Shipped Ruby support end to end in the interviewer's in-browser code runner by conforming to the existing execution contract (write, run in an isolated container, return a normalized result) instead of forking a new path.",
      "Prototyped a cross-service adapter that runs non-Python code through a separate compiler service and normalizes every path into one result shape.",
      "Got two unfamiliar stacks running (Spring Boot, Java 21, PostgreSQL and Docker; Node with docker-compose and JWT) by working through a chain of build, JDK, port and API-key failures.",
    ],
    stack: ["Java 21", "Spring Boot", "Vue", "Node.js", "Docker", "PostgreSQL"],
    factIds: [],
  },
]
