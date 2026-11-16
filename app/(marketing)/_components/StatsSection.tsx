"use client"

import Link from "next/link"
import { FlaskConical, Gauge, Layers, Scale } from "lucide-react"

import { facts } from "@/data/facts"
import { proofStats, type ProofStat } from "@/data/stats"

const ICONS: Record<ProofStat["icon"], typeof Gauge> = {
  gauge: Gauge,
  scale: Scale,
  layers: Layers,
  flask: FlaskConical,
}

/** A few numbers a visitor can check, each linking to its evidence. */
export default function StatsSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-display-md text-black dark:text-white mb-12">PROOF</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {proofStats.map((stat) => {
            const fact = facts[stat.factId]
            const Icon = ICONS[stat.icon]
            return (
              <Link
                key={stat.factId}
                href={stat.href}
                target="_blank"
                rel="noopener noreferrer"
                title={`${fact.label}. Source: ${fact.source}`}
                className="group border-4 border-black dark:border-white p-6 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
              >
                <Icon className="w-6 h-6 mb-4 text-accent" aria-hidden="true" />
                <div className="font-body font-bold tabular-nums text-3xl sm:text-4xl leading-tight mb-2">{fact.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-current transition-colors">
                  {stat.caption}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
