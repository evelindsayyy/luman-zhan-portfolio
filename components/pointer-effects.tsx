"use client"

import { useCallback, useEffect, useRef } from "react"

// The signature detail: a soft glow follows the cursor, and the letters of the
// name get heavier and wider as it comes near. Both read one pointer position
// per animation frame, and both stay still under reduced-motion settings.

const REACH_PX = 260

/** Reads every letter's position first, then writes every style, so one frame costs one layout. */
function paintLetters(letters: HTMLElement[], x: number, y: number, still: boolean) {
  const closeness = letters.map((el) => {
    const r = el.getBoundingClientRect()
    const d = Math.hypot(r.left + r.width / 2 - x, r.top + r.height / 2 - y)
    return still ? 0 : Math.max(0, 1 - d / REACH_PX)
  })
  letters.forEach((el, i) => {
    const k = closeness[i]
    el.style.fontVariationSettings = `"wght" ${Math.round(640 + 360 * k)}, "wdth" ${Math.round(100 + 30 * k)}, "opsz" 144`
    el.style.color = k > 0.5 ? "var(--accent)" : ""
  })
}

/** Calls `onFrame(x, y)` at most once per animation frame while the pointer moves. */
function usePointerFrames(onFrame: (x: number, y: number) => void) {
  useEffect(() => {
    let x = -1e4
    let y = -1e4
    let queued = false
    const paint = () => {
      queued = false
      onFrame(x, y)
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (!queued) {
        queued = true
        requestAnimationFrame(paint)
      }
    }
    paint()
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [onFrame])
}

const moveGlow = (x: number, y: number) => {
  document.documentElement.style.setProperty("--mx", `${x}px`)
  document.documentElement.style.setProperty("--my", `${y}px`)
}

export function Glow() {
  usePointerFrames(moveGlow)
  return <div className="glow" aria-hidden="true" />
}

export function ReactiveName({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null)

  const paint = useCallback((x: number, y: number) => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (ref.current) paintLetters([...ref.current.querySelectorAll<HTMLElement>("span")], x, y, still)
  }, [])
  usePointerFrames(paint)

  return (
    <h1 className="name" ref={ref} aria-label={text}>
      {[...text].map((ch, i) => (
        <span key={i} aria-hidden="true">
          {ch === " " ? " " : ch}
        </span>
      ))}
    </h1>
  )
}
