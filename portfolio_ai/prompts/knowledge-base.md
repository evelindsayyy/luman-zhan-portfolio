# Knowledge base: Luman (Grace) Zhan

Generated from the site's data/ files by scripts/build-kb.mjs. Do not edit by hand.

## About Grace

- Name: Luman (Grace) Zhan. She goes by Grace.
- Headline: AI/ML engineer building and evaluating LLM systems.
- In her words: I build LLM systems, then measure whether they actually work. The gap between “it should work” and “what actually happened” only closes when you instrument the messy layer an abstraction hides.
- Looking for Summer 2027 AI/ML and software engineering internships.
- Based in Durham, NC.
- Email: zhanluman0612@gmail.com
- GitHub: https://github.com/evelindsayyy
- LinkedIn: https://www.linkedin.com/in/luman-z-22198a2a2/

## Education

- Duke University: B.S. in Computer Science, Machine Learning & AI concentration; minor in English. Aug 2025 – expected May 2028. GPA 3.88/4.00.
- University of Michigan, Ann Arbor: Undergraduate coursework: applied linear algebra, discrete mathematics, honors multivariable calculus, statistics. Aug 2024 – May 2025. GPA 4.00/4.00.

## Experience (newest first)

### Software & AI Engineer Intern, Duke University, Code+ (May 2026 – Jul 2026, Durham, NC)

Built the model-quality pillar of AI Model Advisor, a governance platform that evaluates the models on Duke's AI Gateway.

- Evaluated 25 candidate models across 10 Duke task suites, routing each task to the scorer that fits it: execution-based checks for verifiable tasks such as text-to-SQL, and an LLM judge with per-dimension rubrics for open-ended ones.
- Validated the LLM judge against people: 6 raters labeled 60 comparisons (180 labels). The judge's agreement with the human consensus (Cohen's κ 0.23) sat in the same band as agreement between the humans themselves (Fleiss' κ 0.27).
- Served an open-weight model (Qwen2.5-7B) on Duke's Slurm GPU cluster with vLLM behind an OpenAI-compatible endpoint, so the same evaluation code ran against hosted and self-hosted models.
- Counted failures, not just scores: one candidate judge returned unparseable output on about three quarters of its calls, which a score-only view would have hidden.
- Stack: Python, LLM-as-judge, vLLM, Slurm, Flask, PostgreSQL, Docker
- Link: https://github.com/evelindsayyy/security-and-qa-for-ai-models

### AI Developer Intern, EasyScaleCloud (Jan 2026 – Mar 2026, Rockville, MD)

Built Lumina Reach, an analytics agent for a paid search agency network, deployed the way enterprises run agents.

- Deployed a Strands agent and its MCP tool server as two Amazon Bedrock AgentCore runtimes; only the agent's IAM role may call the tools (SigV4), and each runtime can read only its own secret in SSM.
- Wrote text-to-SQL over a 21-table, ~558K-row Snowflake warehouse behind an AST validator that rejects writes, unknown tables and columns, and sensitive fields before a query runs read-only.
- Put every request behind a signed-in user: Cognito login on the Next.js tier and AgentCore's JWT authorizer on the agent, so the web tier holds no AWS credential or API key.
- Cut the tool runtime's cold start from 27 s to 2 s and a question's input from ~42k to ~12k tokens with prompt caching; the public demo runs on a budget of about $5 a month.
- Stack: Amazon Bedrock AgentCore, MCP, Strands Agents, Claude, Snowflake, AWS IAM, Cognito, AWS CDK, Next.js
- Link: https://github.com/evelindsayyy/lumina_reach_analytics_agent-project

### Undergraduate Researcher, Sickle Cell Disease Data, Duke Global Health Institute (Oct 2025 – present, Durham, NC)

Unifying clinical and field data on sickle cell disease so that an outcome model can rely on it.

- Built a React/Vite dashboard that brings together Duke clinical records and field data collected by sickle cell labs in Uganda.
- Normalizing multi-source records with different formats, missing values and entry errors into one structure a forecasting model can use.
- Co-authoring a manuscript in preparation: I wrote the survey-data and traditional-medicine sections and the introduction.
- Stack: React, Vite, Python, Data cleaning

### Backend / Full-Stack Software Engineer Intern, Innovation AI (May 2025 – Jul 2025, San Jose, CA)

Backend and full-stack work on an AI technical interviewer at an early-stage startup.

- Shipped Ruby support end to end in the interviewer's in-browser code runner by conforming to the existing execution contract (write, run in an isolated container, return a normalized result) instead of forking a new path.
- Prototyped a cross-service adapter that runs non-Python code through a separate compiler service and normalizes every path into one result shape.
- Got two unfamiliar stacks running (Spring Boot, Java 21, PostgreSQL and Docker; Node with docker-compose and JWT) by working through a chain of build, JDK, port and API-key failures.
- Stack: Java 21, Spring Boot, Vue, Node.js, Docker, PostgreSQL

## Featured projects

### Lumina Reach Analytics Agent (EasyScaleCloud internship)

An analytics agent deployed the enterprise way: agent and MCP tool server on two AgentCore runtimes, IAM deciding who may call the tools, and SQL that cannot write to the warehouse.

- Stack: Bedrock AgentCore, MCP, Strands, Snowflake, Cognito, Next.js
- Code: https://github.com/evelindsayyy/lumina_reach_analytics_agent-project
- Live demo: https://luminareachanalyticsagent-project-2.vercel.app

### AI Model Advisor (Duke Code+ team project)

Model governance with evidence: artifact scanning, safety testing, task-level evaluation and public benchmarks, run in production at Duke.

Grace's part: I built the evaluation (efficacy) pillar and the human study that validated its LLM judge.

- Stack: Python, LLM-as-judge, vLLM, Slurm, Flask, PostgreSQL
- Code: https://github.com/evelindsayyy/security-and-qa-for-ai-models

### LyricMood (Personal project)

A full ML product: a fine-tuned DistilBERT served through ONNX, word-level SHAP explanations, and semantic search over a large song catalog.

- Stack: DistilBERT, ONNX, FastAPI, SHAP, Qdrant, Streamlit
- Code: https://github.com/evelindsayyy/lyrics_mood_predictor
- Live demo: https://lyricsmoodpredictor-zrtbnhzdwavalcsqriyexb.streamlit.app/

### ReCaLL Reproduction (Research reproduction)

A tested, multi-seed reproduction of an EMNLP 2024 membership-inference result on WikiMIA, sized to run on a laptop or a free Colab GPU.

- Stack: PyTorch, Hugging Face Transformers, Pythia, Colab
- Code: https://github.com/evelindsayyy/recall-mini-reproduction

## Verified numbers

Each number below has a source Grace can show. Quote them exactly; do not round, combine or extrapolate.

- 27 s → 2 s: cold start of the MCP tool runtime, after moving schema reflection to build time (source: lumina_reach_analytics_agent-project README; measured on the deployed AgentCore stack, Nov 2026)
- ~42k → ~12k: input tokens per question after prompt caching, counted at their price (source: lumina_reach_analytics_agent-project README; averaged over the 12 recorded example questions)
- 21 tables · ~558K rows: Snowflake warehouse the agent queries (source: lumina_reach_analytics_agent-project: Snowflake sync check, 557,614 rows)
- 513: Python tests at 99% line coverage (source: lumina_reach_analytics_agent-project CI)
- 25 models · 10 task suites: candidate models I evaluated across Duke task suites (source: AI Model Advisor evaluation result files, July 2026)
- κ 0.23 vs 0.27: LLM judge vs human consensus (Cohen's), next to agreement between humans (Fleiss') (source: security-and-qa-for-ai-models docs/validation-study.md)
- 60 comparisons · 6 raters · 180 labels: human validation study of the LLM judge (source: security-and-qa-for-ai-models docs/validation-study.md)
- 1,274: Python tests in AI Model Advisor (source: security-and-qa-for-ai-models CI)
- 0.615 → 0.899: ROC-AUC, likelihood baseline vs four-shot ReCaLL, Pythia-2.8B, mean of 3 seeds (source: recall-mini-reproduction README)
- 76,595: songs in the vector search index (source: lyrics_mood_predictor README)
- 106: Python tests (source: lyrics_mood_predictor CI)
