"use client"

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"

const PLACEHOLDERS = [
  "Ask about Grace’s work…",
  "Try: How did Grace validate the LLM judge?",
  "Try: How does LyricMood work?",
  "Try: What are Grace’s technical skills?",
]
const PLACEHOLDER_MS = 3500
const MAX_ROWS_PX = 160

// The composer: a growing text field with a send button that turns into a
// stop button while an answer streams. Enter sends, Shift+Enter adds a line.
export function MultimodalInput({
  input,
  setInput,
  onSend,
  isLoading,
  stop,
}: {
  input: string
  setInput: (value: string) => void
  onSend: () => void
  isLoading: boolean
  stop: () => void
}) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [ph, setPh] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      if (!ref.current?.value && document.activeElement !== ref.current) setPh((p) => (p + 1) % PLACEHOLDERS.length)
    }, PLACEHOLDER_MS)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, MAX_ROWS_PX)}px`
  }, [input])

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    if (isLoading || !input.trim()) return
    onSend()
  }

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) submit(e)
  }

  return (
    <form onSubmit={submit}>
      <textarea
        ref={ref}
        rows={1}
        value={input}
        placeholder={PLACEHOLDERS[ph]}
        aria-label="Your question"
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        autoFocus
      />
      {isLoading ? (
        <button type="button" aria-label="Stop the answer" onClick={stop}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="6" width="12" height="12" rx="2" />
          </svg>
        </button>
      ) : (
        <button type="submit" aria-label="Send" disabled={!input.trim()}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      )}
    </form>
  )
}
