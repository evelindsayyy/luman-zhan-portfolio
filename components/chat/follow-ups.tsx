import { pickFollowUps } from "@/data/follow-ups"

// "Ask next": up to three questions the visitor has not asked yet, chosen
// from data/follow-ups.ts by the topic of the last question.
export function FollowUps({
  question,
  asked,
  onAsk,
}: {
  question: string
  asked: ReadonlySet<string>
  onAsk: (question: string) => void
}) {
  const picks = pickFollowUps(question, asked)
  if (picks.length === 0) return null
  return (
    <nav className="next" aria-label="Follow-up questions">
      <p>Ask next</p>
      <ul>
        {picks.map((f, i) => (
          <li key={f.id} style={{ animationDelay: `${i * 0.07}s` }}>
            <button type="button" onClick={() => onAsk(f.q)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <span>{f.q}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
