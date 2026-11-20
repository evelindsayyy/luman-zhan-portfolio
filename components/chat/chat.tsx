"use client"

import { useChat } from "@ai-sdk/react"
import FingerprintJS from "@fingerprintjs/fingerprintjs"
import { useEffect, useMemo, useRef, useState } from "react"

import { matchTopics } from "@/data/follow-ups"
import { profile } from "@/data/profile"
import { Glow } from "@/components/pointer-effects"
import { ChatHeader } from "./chat-header"
import { FollowUps } from "./follow-ups"
import { ErrorMessage, messageText, PreviewMessage, ThinkingMessage } from "./message"
import { MultimodalInput } from "./multimodal-input"
import { Overview } from "./overview"

const RATE_LIMITED = /too many requests|rate limit|429/i
const NEAR_BOTTOM_PX = 240
/** Room for the sticky composer, so the end of the log is not hidden under it. */
const COMPOSER_CLEARANCE_PX = 140

// The rate limiter on the API keys requests by browser fingerprint, sent as a
// header on every /api/chat call.
function useFingerprintHeader() {
  const fingerprint = useRef("")
  useEffect(() => {
    FingerprintJS.load()
      .then((fp) => fp.get())
      .then((result) => {
        fingerprint.current = result.visitorId
      })
      .catch((err) => console.error("could not generate a browser fingerprint", err))

    const originalFetch = window.fetch
    window.fetch = (input, init) => {
      if (typeof input === "string" && input.includes("/api/chat")) {
        init = { ...init, headers: { ...init?.headers, "X-Client-Fingerprint": fingerprint.current } }
      }
      return originalFetch(input, init)
    }
    return () => {
      window.fetch = originalFetch
    }
  }, [])
}

function errorText(error: Error): string {
  if (RATE_LIMITED.test(error.message)) return "You’ve reached the question limit for now. Please try again in about an hour."
  return `Sorry, the assistant can’t answer right now. You can reach Grace directly at ${profile.email}.`
}

export function Chat() {
  useFingerprintHeader()
  const [input, setInput] = useState("")
  const endRef = useRef<HTMLDivElement>(null)
  const pinned = useRef(true)
  const { messages, setMessages, sendMessage, status, stop, error, clearError } = useChat()

  const isLoading = status === "streaming" || status === "submitted"
  const last = messages[messages.length - 1]
  const lastQuestion = [...messages].reverse().find((m) => m.role === "user")

  // Topics already asked, so follow-ups never repeat a question.
  const asked = useMemo(
    () => new Set(messages.filter((m) => m.role === "user").flatMap((m) => matchTopics(messageText(m)).slice(0, 1))),
    [messages],
  )

  const ask = (text: string) => {
    if (isLoading || !text.trim()) return
    clearError()
    pinned.current = true
    sendMessage({ text })
  }

  const newChat = () => {
    stop()
    clearError()
    setMessages([])
    setInput("")
    window.scrollTo({ top: 0 })
  }

  // Follow the answer as it streams, unless the visitor scrolled up to read.
  useEffect(() => {
    // Scrolling up unpins; scrolling back down to the bottom re-pins. Content growing
    // under a pinned view never unpins it, since only the visitor scrolls up.
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      if (y < lastY - 4) pinned.current = false
      else if (y > lastY && window.innerHeight + y >= document.body.scrollHeight - NEAR_BOTTOM_PX) pinned.current = true
      lastY = y
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    if (messages.length > 0 && pinned.current) endRef.current?.scrollIntoView({ block: "end" })
  }, [messages, status])

  return (
    <div className="pf">
      <Glow />
      <div className="chat">
        <ChatHeader onNewChat={newChat} />
        <div className="log">
          {messages.length === 0 && <Overview onAsk={ask} />}
          {messages.map((m, i) => (
            <PreviewMessage key={m.id} message={m} done={!(isLoading && i === messages.length - 1)} />
          ))}
          {status === "submitted" && last?.role === "user" && <ThinkingMessage />}
          {error && <ErrorMessage text={errorText(error)} />}
          {status === "ready" && !error && last?.role === "assistant" && lastQuestion && (
            <FollowUps question={messageText(lastQuestion)} asked={asked} onAsk={ask} />
          )}
          <p className="sr-only" role="status">
            {status === "ready" && last?.role === "assistant" ? messageText(last) : ""}
          </p>
          <div ref={endRef} style={{ scrollMarginBottom: COMPOSER_CLEARANCE_PX }} />
        </div>
        <div className="composer">
          <MultimodalInput
            input={input}
            setInput={setInput}
            isLoading={isLoading}
            stop={stop}
            onSend={() => {
              ask(input)
              setInput("")
            }}
          />
          <p>Answers come from Grace’s resume and this site, generated with Amazon Bedrock. Check the numbers on the linked pages.</p>
        </div>
      </div>
    </div>
  )
}
