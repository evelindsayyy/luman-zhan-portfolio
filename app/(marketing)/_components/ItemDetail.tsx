import type { ReactNode } from "react"

import { facts } from "@/data/facts"
import type { Item } from "@/data/types"

// One role or project, read top to bottom: what it is → numbers → how it was
// done → why it matters → stack → links. Every number comes from facts.ts.
export default function ItemDetail({
  item,
  subLine,
  meta,
  doneLabel,
}: {
  item: Item
  subLine: ReactNode
  meta: string
  doneLabel: string
}) {
  const statClass = item.stats.length === 4 ? "stats four" : item.stats.length === 3 ? "stats three" : "stats"
  return (
    <>
      <h2>{item.title}</h2>
      <p className="at">{subLine}</p>
      <p className="when">{meta}</p>
      <p className="what">{item.summary}</p>
      {item.stats.length > 0 && (
        <div className={statClass}>
          {item.stats.map((s) => (
            <div key={s.factId}>
              <b>{facts[s.factId].value}</b>
              <span>{s.caption}</span>
            </div>
          ))}
        </div>
      )}
      <h3 className="sub">{doneLabel}</h3>
      <ul className="did">
        {item.points.map((p) => (
          <li key={p.title}>
            <b>{p.title}</b>
            <span>{p.text}</span>
          </li>
        ))}
      </ul>
      {item.why.length > 0 && (
        <div className="why">
          <h3 className="sub">Why it matters</h3>
          <ul>
            {item.why.map((w) => (
              <li key={w.title}>
                <span>
                  <b>{w.title}</b> {w.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="tags">
        {item.stack.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
      {item.links.length > 0 && (
        <div className="links">
          {item.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  )
}
