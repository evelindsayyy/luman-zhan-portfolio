"use client"

import ReactMarkdown, { type Components } from "react-markdown"
import remarkGfm from "remark-gfm"

// Answers arrive as a lead sentence plus bullets with bold labels (see
// portfolio_ai/prompts/instruction.md). These renderers give them the .ans
// look; anything else the model sends still renders as plain markdown.
const components: Components = {
  p: ({ children }) => <p>{children}</p>,
  ul: ({ children }) => <ul>{children}</ul>,
  ol: ({ children }) => <ol>{children}</ol>,
  li: ({ children }) => (
    <li>
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }) => <b>{children}</b>,
  a: ({ href, children }) => (
    <a href={href} target={href?.startsWith("/") ? undefined : "_blank"} rel="noopener noreferrer">
      {children}
    </a>
  ),
  code: ({ children }) => <code>{children}</code>,
  h1: ({ children }) => <p><b>{children}</b></p>,
  h2: ({ children }) => <p><b>{children}</b></p>,
  h3: ({ children }) => <p><b>{children}</b></p>,
}

export function Markdown({ children }: { children: string }) {
  return (
    <div className="ans">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  )
}
