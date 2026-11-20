import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter_Tight, IBM_Plex_Mono, Roboto_Flex } from "next/font/google"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import { profile } from "@/data/profile"
import "./globals.css"
import "./portfolio.css"

const interTight = Inter_Tight({ subsets: ["latin"], variable: "--font-inter-tight", weight: ["400", "500", "600", "700", "800"] })
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-plex-mono", weight: ["400", "500", "600"] })
// The name in the left column changes weight and width near the cursor, so
// Roboto Flex loads as a variable font with those axes.
const robotoFlex = Roboto_Flex({ subsets: ["latin"], variable: "--font-roboto-flex", axes: ["wdth", "opsz"] })

const DESCRIPTION = `${profile.name}, Duke CS student and AI/ML engineer. ${profile.summary} ${profile.target}`

// Default metadata; pages may override it.
export const metadata: Metadata = {
  // Social preview images resolve against the real site, not localhost.
  metadataBase: new URL("https://lumanzhan.com"),
  ...generateSEOMetadata({
    title: "Luman (Grace) Zhan, AI/ML Engineer",
    description: DESCRIPTION,
    keywords: ["AI/ML engineer", "LLM evaluation", "AI agents", "Amazon Bedrock AgentCore"],
  }),
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${interTight.variable} ${plexMono.variable} ${robotoFlex.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
