// Small text helpers shared by the homepage and the chat.

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "2026-05", "2026-07" → "May – Jul 2026"; across years, both years show. */
export function monthRange(start: string, end: string): string {
  const [sy, sm] = start.split("-")
  if (end === "present") return `${MONTHS[Number(sm) - 1]} ${sy} – present`
  const [ey, em] = end.split("-")
  const from = MONTHS[Number(sm) - 1]
  const to = MONTHS[Number(em) - 1]
  return sy === ey ? `${from} – ${to} ${ey}` : `${from} ${sy} – ${to} ${ey}`
}

/** Splits "a **bold** word" into plain and bold runs, for data/ text. */
export function boldRuns(text: string): { text: string; bold: boolean }[] {
  return text
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) => ({ text: part, bold: i % 2 === 1 }))
    .filter((run) => run.text)
}
