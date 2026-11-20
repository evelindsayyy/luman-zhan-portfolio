"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import type { UIMessage } from "ai"

import { relatedLinks } from "@/data/follow-ups"
import { Markdown } from "./markdown"

const THINKING = ["Reading her resume…", "Checking the numbers…", "Writing the answer…"]
const THINKING_STEP_MS = 900

export function messageText(message: UIMessage): string {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("")
}

function UserAvatar() {
  return (
    <div className="av user" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </svg>
    </div>
  )
}

const AiAvatar = () => (
  <div className="av" aria-hidden="true">
    AI
  </div>
)

function CopyButton({ text }: { text: string }) {
  const [label, setLabel] = useState("Copy")
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setLabel("Copied")
    } catch (err) {
      console.error("copy failed", err)
      setLabel("Copy failed")
    }
    setTimeout(() => setLabel("Copy"), 1400)
  }
  return (
    <div className="tools">
      <button type="button" onClick={copy}>
        {label}
      </button>
    </div>
  )
}

/** One message. A finished answer also gets Copy and links to where it lives on the site. */
export function PreviewMessage({ message, done }: { message: UIMessage; done: boolean }) {
  const text = messageText(message)
  if (message.role === "user") {
    return (
      <div className="row me">
        <div className="bubble">{text}</div>
        <UserAvatar />
      </div>
    )
  }
  const related = done ? relatedLinks(text) : []
  return (
    <div className="row ai">
      <AiAvatar />
      <div className="bubble">
        <Markdown>{text}</Markdown>
        {related.length > 0 && (
          <details className="srcs">
            <summary>Related on this site · {related.length}</summary>
            <div>
              {related.map((l) => (
                <Link key={l.href} href={l.href}>
                  Open {l.label} →
                </Link>
              ))}
            </div>
          </details>
        )}
        {done && text && <CopyButton text={text} />}
      </div>
    </div>
  )
}

/** Shown until the first words stream in. */
export function ThinkingMessage() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStep((s) => Math.min(s + 1, THINKING.length - 1)), THINKING_STEP_MS)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="row ai">
      <AiAvatar />
      <div className="bubble">
        <div className="thinking">
          <span className="pulse" />
          <span>{THINKING[step]}</span>
        </div>
      </div>
    </div>
  )
}

/** Shown when the request itself fails (the server's own fallback arrives as a normal answer). */
export function ErrorMessage({ text }: { text: string }) {
  return (
    <div className="row ai" role="alert">
      <AiAvatar />
      <div className="bubble">
        <div className="ans">
          <p>{text}</p>
        </div>
      </div>
    </div>
  )
}
