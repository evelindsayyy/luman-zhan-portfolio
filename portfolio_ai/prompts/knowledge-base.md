# Knowledge base: Luman (Grace) Zhan

Generated from the site's data/ files by scripts/build-kb.mjs. Do not edit by hand.

## About Grace

- Name: Luman (Grace) Zhan. She goes by Grace.
- AI/ML Engineer · Duke CS, ML/AI track.
- Summary: I build and evaluate LLM agents, owning AI features end to end: from building the LLM application to proving it works and improving the underlying model.
- Looking for Summer 2027 AI/ML engineering internships, with backend engineering as a strong second lane.
- Status: Open to Summer 2027 internships.
- Based in Durham, NC.
- Email: zhanluman0612@gmail.com
- GitHub: https://github.com/evelindsayyy
- LinkedIn: https://www.linkedin.com/in/luman-z-22198a2a2/
- Resume (one-page PDF): the Resume tab of the site, /resume.pdf

In her words: I’m Luman (Grace) Zhan, a Computer Science student at Duke on the Machine Learning & AI track, with a minor in English. I build and evaluate LLM agents, and I like owning a feature end to end: building the application, proving it works, and improving the model underneath.
In her words: I came to AI from backend and full-stack work, so I care about contracts, data provenance and environments as much as models. I’m aiming at AI/ML infrastructure and evaluation, with backend engineering as a strong second lane.

How she works: The gap between “it should work” and “what actually happened” only closes when you measure the layer the abstraction hides.

## Education

### Duke University: B.S. Computer Science (Aug 2025 – May 2028 (expected) · Durham, NC)

- Machine Learning & AI concentration · minor in English. GPA 3.88 / 4.00.
- Coursework: Data Structures and Algorithms, Probability, Computer Systems, Modeling, Machine Learning, Game Design.

### University of Michigan: Computer Engineering (Aug 2024 – May 2025 · Ann Arbor, MI)

- Transferred to Duke after one year. GPA 4.00 / 4.00.
- Coursework: Applied Linear Algebra, Discrete Mathematics, Honors Multivariable and Vector Calculus, Statistics and Data Analysis.

## Technical skills

- Languages: Python, SQL, Java, JavaScript, Go, C++.
- Eval & analysis: scikit-learn, statsmodels (Cohen’s / Fleiss’ κ), Bradley-Terry (choix), pandas, Qualtrics.
- Data, serving & infra: Snowflake, PostgreSQL, SQLite, Slurm, Docker, AWS (Bedrock, IAM, SSM, Lambda, S3), GCP.
- Agents & tooling: Strands Agents, Bedrock AgentCore, MCP, LangChain, RAG, LLM-as-judge, NL-to-SQL, Pydantic.

## Experience (newest first)

### AI Model Advisor: Software & AI Engineer Intern, Duke University, Code+ (May 2026 – Jul 2026, Durham, NC)

A three-part LLM evaluation framework for Duke’s AI Gateway. I built its model-quality pillar, proved the LLM judge against people, then used that data to fine-tune a model. It was handed off to the Security, OIT and AI Gateway teams.

Numbers:
- 20+ × 15+: models × task suites benchmarked
- 0.23 ≈ 0.27: judge–human κ vs. the human–human ceiling
- 50% → 61%: win rate over the base model after DPO

What she did:
- Built the model-quality pillar: LLM-as-judge scoring with HELM, G-Eval and MT-Bench rubrics, paired with execution-based scoring, across 20+ models on Duke’s AI Gateway.
- Matched each task to the right scorer: Verifiable tasks (text-to-SQL, structured extraction) are scored by execution against a golden set; open-ended tasks go to the LLM judge.
- Validated the judge against humans: A 180-label human preference study (6 raters, 60 pairwise comparisons). The judge agreed with people (Cohen’s κ 0.23) about as well as people agreed with each other (Fleiss’ κ 0.27); known judge biases were quantified.
- Closed the eval-to-alignment loop: Fed the validated preferences into a QLoRA-DPO fine-tune (TRL/PEFT) of a small open-weight model on a Slurm/vLLM cluster: win rate over the base model rose from 50% to 61%.

Why it matters:
- Evidence instead of vendor claims: Duke can choose which model to trust for which task based on its own measurements.
- A judge people can rely on: showing the LLM judge agrees with humans as well as humans agree with each other means evaluation can scale without paying raters for every run.
- Measure, then improve: the same preference data that scored the models also made one better, which is how evaluation feeds alignment in industry.
- It outlived the internship: the framework was handed off to Duke’s Security, OIT and AI Gateway teams.

- Stack: Python, LLM-as-judge, Execution-based scoring, vLLM, Slurm, TRL + PEFT, PyTorch
- View on GitHub: https://github.com/evelindsayyy/security-and-qa-for-ai-models

### Lumina Reach: AI Developer Intern, EasyScaleCloud (Jan 2026 – Mar 2026, Rockville, MD)

A paid-search BI agent on AWS Bedrock AgentCore, so campaign managers across 80 advertisers can ask analytics questions in plain English instead of waiting on an analyst.

Numbers:
- 90%+: SQL accuracy on 50+ golden queries
- <2%: hallucination rate
- 95%+: citation accuracy
- 21 tables: ~560K rows in Snowflake

What she did:
- Decoupled agent and tools: The agent runs on AgentCore Runtime, separate from the chat UI and from an MCP runtime that holds the NL-to-SQL, knowledge-base and charting tools.
- IAM instead of API keys: SigV4-signed calls limited to one MCP runtime ARN; least-privilege roles read Snowflake secrets from SSM SecureString; permission failures show up in AgentCore logs.
- Reusable, safe NL-to-SQL: A stateless MCP runtime any authorized agent can call, with a YAML semantic layer (6 attribution formulas, 3 conversion definitions) and a SELECT-only AST validator.
- Measured, then fixed: A five-dimension evaluation harness over 50+ analyst-authored golden queries traced hallucinations back to gaps in the data dictionary and semantic layer.

Why it matters:
- Self-serve analytics: campaign managers across 80 advertisers get answers in plain English instead of queuing requests for an analyst.
- The security model enterprises need before agents touch data: no shared API keys, one agent allowed to call one tool server, and read-only SQL.
- Accuracy you can audit: answers come with citations, and errors were traced to their source in the data documentation rather than blamed on the model.

- Stack: Strands Agents, Bedrock AgentCore, MCP, IAM (SigV4), Snowflake, Python
- View on GitHub: https://github.com/evelindsayyy/lumina_reach_analytics_agent-project
- Live demo: https://luminareachanalyticsagent-project-2.vercel.app

### AI Technical Interviewer: Backend / Full-Stack Software Engineer Intern, Innovation AI (May 2025 – Jul 2025, San Jose, CA)

An LLM-driven (Gemini) technical interviewer that runs candidates’ code and produces a scored, inspectable report. I built its tool-use and evaluation tooling across a Spring Boot/Vue codebase and a Node codebase.

Numbers:
- 100%: cross-path result consistency
- ~1.2 s: per run, validated with Java
- 5 tabs: internal evaluator dashboard

What she did:
- Tool-use adapter: An MCP-inspired adapter runs non-Python languages through a separate compiler service and returns one result shape for status and output.
- Interview evaluation harness: Scores each interview on the team’s weighted categories from the full candidate–LLM log: prompts, responses, metadata and tokens.
- Privacy boundary: Candidates are UUIDs, and only internal evaluators can read the logs.
- Evaluator dashboard prototype: Five tabs (Overview, Code Analysis, Chat Logs, Integrity, Telemetry) over mock data from five sessions, so the spec could be reviewed before launch.

Why it matters:
- More candidates, one code path: new languages plug into the same execution contract, so the product can grow without forking its runner.
- Hiring decisions you can inspect: every score traces back to the full interview log, which matters when an AI helps decide who gets hired.
- Privacy from day one: candidates stay anonymous to everyone outside the evaluation team.

- Stack: Java 21, Spring Boot, Vue, Node, Docker, PostgreSQL, Gemini API

## Personal projects

### LyricMood (Solo project · end-to-end ML product)

Course project, rebuilt over four weeks into a production-style service.

Paste song lyrics and get the mood (Hype, Romantic, Calm, Sad or Angry), the words that drove the prediction, and five songs that feel the same. Two models, semantic search and a hosted demo behind one API.

Numbers:
- 0.432 → 0.521: test accuracy, baseline → fine-tuned DistilBERT
- 62 / 100: predictions flip when the top-5 SHAP words are removed
- 1.35×: mood-match lift from semantic search vs. random
- 76,595: songs in the vector index

How she built it:
- Two models, one API: A TF-IDF + logistic-regression baseline (fast, exactly explainable) and DistilBERT fine-tuned on a free Colab T4, exported to int8 ONNX. A model registry lets each request pick one.
- Labels from audio, input from lyrics: Moods come from Spotify valence and energy, cut into regions of Russell’s circumplex model of affect, so the model learns which lyrics go with which moods without hand labels.
- Explanations that are tested: Word-level SHAP shows what pushed each call. Deleting the top 5 words flipped the class in 62 of 100 correct predictions, so the explanations are faithful, not decorative.
- Search by vibe: MiniLM sentence embeddings (a parity-checked ONNX export) in Qdrant: search “rainy late night drive”, or find five songs with a matching mood.
- Built like a service: FastAPI with one error format, rate limiting, Prometheus metrics and no raw lyrics in logs; Docker Compose; CI running 106 tests on every push; a free hosted demo.

Why it matters:
- The full ML lifecycle in one project: labeling, a baseline, a fine-tune, an evaluation harness with a quality gate, serving and monitoring.
- Trust you can measure: the explanations are checked against the model’s behavior, which is what makes a prediction safe to show to users.
- Real product trade-offs: the accurate model and the explainable one are both served on purpose, and torch-free CPU inference keeps hosting small and cheap.

- Stack: DistilBERT, ONNX Runtime, SHAP, scikit-learn, FastAPI, Qdrant, Docker, GitHub Actions
- View on GitHub: https://github.com/evelindsayyy/lyrics_mood_predictor
- Live demo: https://lyricsmoodpredictor-zrtbnhzdwavalcsqriyexb.streamlit.app/

### ReCaLL Reproduction (Research reproduction)

Reproduces ReCaLL (EMNLP 2024) on the public WikiMIA benchmark.

Can you tell whether a passage was in a language model’s training data? I reproduced the central result of the ReCaLL paper at a scale that runs on a laptop or a free Colab GPU, with tests and multiple seeds.

Numbers:
- 0.615 → 0.899: ROC-AUC, likelihood baseline → 4-shot ReCaLL (Pythia-2.8B)
- +0.283: mean AUC gain across 3 seeds
- 0.542 → 0.802: same direction on the laptop-size Pythia-70M
- 93%: line coverage, 23 tests

How she built it:
- The paper’s score, made auditable: ReCaLL(x) = LL(x | P) / LL(x): how much a known non-member prefix changes a passage’s likelihood. Prefix tokens are masked out of the conditional loss.
- A fair experiment: Each seed samples 50 members and 50 non-members deterministically; the prefix examples are held out of evaluation. Results are averaged over seeds 7, 42 and 123.
- Runs on what you have: CPU, Apple Silicon or Colab. On a GPU, the notebook reads the free memory and picks the Pythia size; each seed is saved, so a recycled runtime resumes where it stopped.
- Tested end to end: Tests cover the score, masking, sampling, AUC direction, aggregation and the command line; CI runs them on every push.

Why it matters:
- Training-data provenance is a live industry question: membership inference is how you measure whether a model saw copyrighted or private text.
- A number is only useful if it holds: the gain held across three seeds and two model sizes, not just one lucky run.
- Honest scope: the report says what it does not replicate (the 6.9B model) and lists the next experiments.

- Stack: PyTorch, Hugging Face Transformers, Pythia, scikit-learn, Colab, pytest
- View on GitHub: https://github.com/evelindsayyy/recall-mini-reproduction

## Numbers and where they come from

Quote these exactly; do not round, combine or extrapolate. Some evidence is internal (not in a public repo); say so if asked where to check.

- 20+ × 15+: models benchmarked on Duke's AI Gateway × task suites (source: AI Model Advisor evaluation results, summer 2026)
- 0.23 ≈ 0.27: LLM judge vs human consensus (Cohen's κ), next to agreement between humans (Fleiss' κ) (source: security-and-qa-for-ai-models docs/validation-study.md)
- 180 labels: human preference study: 6 raters, 60 pairwise comparisons (source: security-and-qa-for-ai-models docs/validation-study.md)
- 50% → 61%: win rate over the base model after the QLoRA-DPO fine-tune (source: Code+ DPO evaluation run (internal branch, not in the public repo))
- 90%+: SQL accuracy on 50+ analyst-authored golden queries (source: EasyScaleCloud evaluation harness (internship work, not in the public repo yet))
- <2%: hallucination rate on the golden queries (source: EasyScaleCloud evaluation harness (internship work, not in the public repo yet))
- 95%+: citation accuracy on the golden queries (source: EasyScaleCloud evaluation harness (internship work, not in the public repo yet))
- 21 tables: ~560K rows in the Snowflake warehouse the agent queries (source: lumina_reach_analytics_agent-project: Snowflake sync check, 557,614 rows)
- 100%: cross-path result consistency of the tool-use adapter (source: Innovation AI adapter validation (private company code))
- ~1.2 s: per run, validated with Java (source: Innovation AI adapter validation (private company code))
- 5 tabs: internal evaluator dashboard prototype (source: Innovation AI dashboard prototype (private company code))
- 0.432 → 0.521: test accuracy, baseline → fine-tuned DistilBERT (source: lyrics_mood_predictor README)
- 62 / 100: correct predictions that flip when the top-5 SHAP words are removed (source: lyrics_mood_predictor README)
- 1.35×: mood-match lift from semantic search vs. random (source: lyrics_mood_predictor README)
- 76,595: songs in the vector search index (source: lyrics_mood_predictor README)
- 106: Python tests run in CI (source: lyrics_mood_predictor CI)
- 0.615 → 0.899: ROC-AUC, likelihood baseline → four-shot ReCaLL, Pythia-2.8B, mean of 3 seeds (source: recall-mini-reproduction README)
- +0.283: mean ROC-AUC gain across 3 seeds (source: recall-mini-reproduction README)
- 0.542 → 0.802: same direction on the laptop-size Pythia-70M (source: recall-mini-reproduction README)
- 93%: line coverage, 23 tests (source: recall-mini-reproduction CI)

## How to answer (repeats RULE 5)

Summarize; do not copy the layout of this knowledge base. Write one sentence that answers the question, then two to four bullets, each a single line that starts with a bold label and a colon, like `- **Label:** text`. Nothing after the last bullet.
