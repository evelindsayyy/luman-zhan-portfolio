# Luman (Grace) Zhan — Portfolio

My personal site: who I am, the systems I have built, and an AI assistant
that answers questions about my work.

> **Work in progress.** The skeleton runs end to end; my own content, the AI
> assistant's knowledge base and the visual design are being added
> milestone by milestone.

## Stack

- **Frontend:** Next.js (App Router, TypeScript), Tailwind CSS, Vercel AI SDK
- **Backend:** FastAPI as a Vercel Python Function
- **AI assistant:** Amazon Bedrock with prompt caching
- **Tooling:** mise, uv, pnpm; tests in Python (pytest) and Node (`node --test`), run in CI

## Run locally

```bash
mise run inst   # install Python and Node dependencies
mise run dev    # Next.js on :3000 and FastAPI on :8000
mise run test   # all tests
```

The AI assistant uses your local AWS profile for Bedrock; see `.env.example`
for what a deployment needs.
