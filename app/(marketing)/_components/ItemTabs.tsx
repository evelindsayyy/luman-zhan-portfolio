"use client"

import { useRef, type CSSProperties, type KeyboardEvent, type ReactNode } from "react"

import type { Item } from "@/data/types"


// A narrow vertical tab per item (a horizontal strip on phones) and one shared
// detail panel. Used by both Experience and Projects. An unknown id selects
// the first item, so a stale link still shows something.
export default function ItemTabs<T extends Item>({
  label,
  items,
  selectedId,
  onSelect,
  render,
}: {
  label: string
  items: readonly T[]
  selectedId: string | null
  onSelect: (id: string) => void
  render: (item: T) => ReactNode
}) {
  const listRef = useRef<HTMLDivElement>(null)
  const index = Math.max(0, items.findIndex((it) => it.id === selectedId))
  const selected = items[index]

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = items.length
    const keys: Record<string, number> = {
      ArrowDown: (i + 1) % n,
      ArrowRight: (i + 1) % n,
      ArrowUp: (i - 1 + n) % n,
      ArrowLeft: (i - 1 + n) % n,
      Home: 0,
      End: n - 1,
    }
    const next = keys[e.key]
    if (next === undefined) return
    e.preventDefault()
    onSelect(items[next].id)
    listRef.current?.querySelectorAll<HTMLButtonElement>("button")[next]?.focus()
  }

  return (
    <div className="exp">
      <div className="roles" role="tablist" aria-label={label} ref={listRef}>
        {items.map((it, i) => (
          <button
            key={it.id}
            type="button"
            role="tab"
            id={`tab-${it.id}`}
            aria-selected={i === index}
            aria-controls={i === index ? `detail-${label.toLowerCase()}` : undefined}
            tabIndex={i === index ? 0 : -1}
            style={{ "--c": it.color } as CSSProperties}
            onClick={() => onSelect(it.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <b>{it.title}</b>
            <span>{it.tabSub}</span>
          </button>
        ))}
      </div>
      <div
        className="detail panel"
        key={selected.id}
        role="tabpanel"
        id={`detail-${label.toLowerCase()}`}
        aria-labelledby={`tab-${selected.id}`}
        style={{ "--c": selected.color } as CSSProperties}
      >
        {render(selected)}
      </div>
    </div>
  )
}
