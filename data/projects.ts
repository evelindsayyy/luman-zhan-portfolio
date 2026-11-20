// Personal projects, in the order shown. Same detail layout as experience,
// with "How I built it" instead of "What I did". Numbers are cited from
// facts.ts and come from each project's README.

import type { Item } from "./types.ts"

export interface Project extends Item {
  /** Bold line under the title, e.g. "Research reproduction". */
  kind: string
  /** Small line under that, e.g. where the project came from. */
  meta: string
}

export const projects: Project[] = [
  {
    id: "lyricmood",
    title: "LyricMood",
    tabSub: "ML product · solo",
    color: "#B45309",
    kind: "Solo project · end-to-end ML product",
    meta: "Course project, rebuilt over four weeks into a production-style service",
    summary:
      "Paste song lyrics and get the mood (Hype, Romantic, Calm, Sad or Angry), the words that drove the prediction, and five songs that feel the same. Two models, semantic search and a hosted demo behind one API.",
    stats: [
      { factId: "lyric-acc", caption: "test accuracy, baseline → fine-tuned DistilBERT" },
      { factId: "lyric-shap", caption: "predictions flip when the top-5 SHAP words are removed" },
      { factId: "lyric-lift", caption: "mood-match lift from semantic search vs. random" },
      { factId: "lyricmood-songs", caption: "songs in the vector index" },
    ],
    points: [
      {
        title: "Two models, one API",
        text: "A TF-IDF + logistic-regression baseline (fast, exactly explainable) and DistilBERT fine-tuned on a free Colab T4, exported to int8 ONNX. A model registry lets each request pick one.",
      },
      {
        title: "Labels from audio, input from lyrics",
        text: "Moods come from Spotify valence and energy, cut into regions of Russell’s circumplex model of affect, so the model learns which lyrics go with which moods without hand labels.",
      },
      {
        title: "Explanations that are tested",
        text: "Word-level SHAP shows what pushed each call. Deleting the top 5 words flipped the class in 62 of 100 correct predictions, so the explanations are faithful, not decorative.",
      },
      {
        title: "Search by vibe",
        text: "MiniLM sentence embeddings (a parity-checked ONNX export) in Qdrant: search “rainy late night drive”, or find five songs with a matching mood.",
      },
      {
        title: "Built like a service",
        text: "FastAPI with one error format, rate limiting, Prometheus metrics and no raw lyrics in logs; Docker Compose; CI running 106 tests on every push; a free hosted demo.",
      },
    ],
    why: [
      {
        title: "The full ML lifecycle in one project:",
        text: "labeling, a baseline, a fine-tune, an evaluation harness with a quality gate, serving and monitoring.",
      },
      {
        title: "Trust you can measure:",
        text: "the explanations are checked against the model’s behavior, which is what makes a prediction safe to show to users.",
      },
      {
        title: "Real product trade-offs:",
        text: "the accurate model and the explainable one are both served on purpose, and torch-free CPU inference keeps hosting small and cheap.",
      },
    ],
    stack: ["DistilBERT", "ONNX Runtime", "SHAP", "scikit-learn", "FastAPI", "Qdrant", "Docker", "GitHub Actions"],
    links: [
      { label: "View on GitHub →", href: "https://github.com/evelindsayyy/lyrics_mood_predictor" },
      { label: "Live demo →", href: "https://lyricsmoodpredictor-zrtbnhzdwavalcsqriyexb.streamlit.app/" },
    ],
  },
  {
    id: "recall",
    title: "ReCaLL Reproduction",
    tabSub: "Research · EMNLP 2024",
    color: "#0E7490",
    kind: "Research reproduction",
    meta: "Reproduces ReCaLL (EMNLP 2024) on the public WikiMIA benchmark",
    summary:
      "Can you tell whether a passage was in a language model’s training data? I reproduced the central result of the ReCaLL paper at a scale that runs on a laptop or a free Colab GPU, with tests and multiple seeds.",
    stats: [
      { factId: "recall-auc", caption: "ROC-AUC, likelihood baseline → 4-shot ReCaLL (Pythia-2.8B)" },
      { factId: "recall-gain", caption: "mean AUC gain across 3 seeds" },
      { factId: "recall-70m", caption: "same direction on the laptop-size Pythia-70M" },
      { factId: "recall-tests", caption: "line coverage, 23 tests" },
    ],
    points: [
      {
        title: "The paper’s score, made auditable",
        text: "ReCaLL(x) = LL(x | P) / LL(x): how much a known non-member prefix changes a passage’s likelihood. Prefix tokens are masked out of the conditional loss.",
      },
      {
        title: "A fair experiment",
        text: "Each seed samples 50 members and 50 non-members deterministically; the prefix examples are held out of evaluation. Results are averaged over seeds 7, 42 and 123.",
      },
      {
        title: "Runs on what you have",
        text: "CPU, Apple Silicon or Colab. On a GPU, the notebook reads the free memory and picks the Pythia size; each seed is saved, so a recycled runtime resumes where it stopped.",
      },
      {
        title: "Tested end to end",
        text: "Tests cover the score, masking, sampling, AUC direction, aggregation and the command line; CI runs them on every push.",
      },
    ],
    why: [
      {
        title: "Training-data provenance is a live industry question:",
        text: "membership inference is how you measure whether a model saw copyrighted or private text.",
      },
      {
        title: "A number is only useful if it holds:",
        text: "the gain held across three seeds and two model sizes, not just one lucky run.",
      },
      {
        title: "Honest scope:",
        text: "the report says what it does not replicate (the 6.9B model) and lists the next experiments.",
      },
    ],
    stack: ["PyTorch", "Hugging Face Transformers", "Pythia", "scikit-learn", "Colab", "pytest"],
    links: [{ label: "View on GitHub →", href: "https://github.com/evelindsayyy/recall-mini-reproduction" }],
  },
]
