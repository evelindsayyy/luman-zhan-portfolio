import suggestedActions from "@/data/suggested-actions.json"

// The empty state: who answers, from what, and four shortcuts that follow the
// homepage tabs.
export function Overview({ onAsk }: { onAsk: (question: string) => void }) {
  return (
    <div className="intro">
      <div className="av" aria-hidden="true">
        AI
      </div>
      <h2>Ask about Grace’s work</h2>
      <p>I’m Grace’s portfolio assistant. I answer from her resume and this site, and I point you to where each answer lives.</p>
      <div className="chips">
        {suggestedActions.map((a, i) => (
          <button key={a.title} type="button" style={{ animationDelay: `${0.15 + i * 0.08}s` }} onClick={() => onAsk(a.action)}>
            <b>{a.title}</b>
            <span>{a.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
