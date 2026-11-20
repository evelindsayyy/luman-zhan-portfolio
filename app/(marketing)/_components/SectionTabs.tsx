"use client"

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react"

import { experience } from "@/data/experience"
import { projects } from "@/data/projects"
import { monthRange } from "@/lib/format"
import { parseHash, SECTION_LABELS, SECTIONS, toHash, type Section } from "@/lib/sections"
import AboutPanel from "./AboutPanel"
import ItemDetail from "./ItemDetail"
import ItemTabs from "./ItemTabs"
import ResumePanel from "./ResumePanel"

type View = { tab: Section; item: string | null }

/** Matches the one-column breakpoint in portfolio.css. */
const ONE_COLUMN_PX = 900

// The four tabs on the right. The URL hash is the address of each tab (and of
// a role or project inside it), so links from the chat and from outside land
// on the right place, and the back button is not filled with tab clicks.
export default function SectionTabs() {
  const [view, setView] = useState<View>({ tab: "experience", item: null })
  // The hash is only readable in the browser; until it is read, the panel stays
  // invisible so a deep link does not flash the Experience tab first.
  const [ready, setReady] = useState(false)
  const tabsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // On phones the tabs sit below the left column; bring them into view.
    const revealOnPhone = () => {
      if (window.matchMedia(`(max-width: ${ONE_COLUMN_PX}px)`).matches) tabsRef.current?.scrollIntoView()
    }
    setView(parseHash(window.location.hash))
    setReady(true)
    // Wait for the panel to lay out; scrolling earlier is undone by the first paint.
    const frame = window.location.hash ? requestAnimationFrame(() => requestAnimationFrame(revealOnPhone)) : 0
    const onHashChange = () => {
      setView(parseHash(window.location.hash))
      revealOnPhone()
    }
    window.addEventListener("hashchange", onHashChange)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  const go = useCallback((next: View) => {
    setView(next)
    try {
      window.history.replaceState(null, "", toHash(next.tab, next.item))
    } catch (err) {
      // Some embedded frames refuse history changes; the tab still shows.
      console.warn("could not update the URL hash", err)
    }
  }, [])

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const n = SECTIONS.length
    const target = { ArrowRight: (i + 1) % n, ArrowLeft: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key]
    if (target === undefined) return
    e.preventDefault()
    const next = SECTIONS[target]
    go({ tab: next, item: null })
    tabsRef.current?.querySelectorAll<HTMLButtonElement>("button")[SECTIONS.indexOf(next)]?.focus()
  }

  return (
    <main className="right">
      <div className="tabs" role="tablist" aria-label="Sections" ref={tabsRef}>
        {SECTIONS.map((s, i) => (
          <button
            key={s}
            type="button"
            role="tab"
            id={`t-${s}`}
            aria-controls={view.tab === s ? `panel-${s}` : undefined}
            aria-selected={view.tab === s}
            tabIndex={view.tab === s ? 0 : -1}
            onClick={() => go({ tab: s, item: null })}
            onKeyDown={(e) => onTabKey(e, i)}
          >
            {SECTION_LABELS[s]}
          </button>
        ))}
      </div>

      <section
        className="panel"
        id={`panel-${view.tab}`}
        key={view.tab}
        role="tabpanel"
        aria-labelledby={`t-${view.tab}`}
        style={ready ? undefined : { visibility: "hidden" }}
      >
        {view.tab === "experience" && (
          <ItemTabs
            label="Roles"
            items={experience}
            selectedId={view.item}
            onSelect={(id) => go({ tab: "experience", item: id })}
            render={(e) => (
              <ItemDetail
                item={e}
                subLine={
                  <>
                    {e.role} @ <b>{e.org}</b>
                  </>
                }
                meta={`${monthRange(e.start, e.end)} · ${e.location}`}
                doneLabel="What I did"
              />
            )}
          />
        )}
        {view.tab === "projects" && (
          <ItemTabs
            label="Projects"
            items={projects}
            selectedId={view.item}
            onSelect={(id) => go({ tab: "projects", item: id })}
            render={(p) => <ItemDetail item={p} subLine={<b>{p.kind}</b>} meta={p.meta} doneLabel="How I built it" />}
          />
        )}
        {view.tab === "about" && <AboutPanel />}
        {view.tab === "resume" && <ResumePanel />}
      </section>
    </main>
  )
}
