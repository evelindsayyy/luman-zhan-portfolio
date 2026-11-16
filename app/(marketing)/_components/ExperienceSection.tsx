"use client"

import { experience } from "@/data/experience"
import { profile } from "@/data/profile"

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "2026-05" -> "May 2026"; "present" stays as is. */
export function formatMonth(month: string): string {
  if (month === "present") return "Present"
  const [year, m] = month.split("-")
  return `${MONTHS[Number(m) - 1]} ${year}`
}

/** Work and research, newest first, then education. */
export default function ExperienceSection() {
  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-display-md text-black dark:text-white mb-12">EXPERIENCE</h2>

        <ol className="space-y-10">
          {experience.map((item) => (
            <li key={item.id} className="grid grid-cols-1 lg:grid-cols-[14rem_1fr] gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div className="font-display text-lg text-black dark:text-white">
                  {formatMonth(item.start)} – {formatMonth(item.end)}
                </div>
                <div>{item.location}</div>
              </div>
              <div className="border-l-4 border-black dark:border-white pl-6">
                <h3 className="font-display text-2xl">{item.role}</h3>
                <p className="font-semibold mb-2">{item.org}</p>
                <p className="text-gray-700 dark:text-gray-300 mb-3">{item.summary}</p>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-700 dark:text-gray-300">
                  {item.highlights.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-gray-500">{item.stack.join(" · ")}</p>
                {item.link && (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm font-semibold underline underline-offset-4 hover:text-accent"
                  >
                    {item.link.label} →
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>

        <h3 className="font-display text-3xl mt-16 mb-6">EDUCATION</h3>
        <ul className="space-y-4">
          {profile.education.map((school) => (
            <li key={school.school} className="border-l-4 border-black dark:border-white pl-6">
              <p className="font-semibold">{school.school}</p>
              <p className="text-gray-700 dark:text-gray-300">{school.degree}</p>
              <p className="text-sm text-gray-500">
                {school.dates} · {school.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
