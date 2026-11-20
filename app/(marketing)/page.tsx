import { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import HomePageContent from "./HomePageContent"
import { profile } from "@/data/profile"

const DESCRIPTION = `${profile.name}, Duke CS student and AI/ML engineer. ${profile.summary} ${profile.target}`

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Luman (Grace) Zhan, AI/ML Engineer",
    description: DESCRIPTION,
    keywords: [
      "AI/ML engineer",
      "LLM evaluation",
      "LLM-as-judge",
      "Amazon Bedrock AgentCore",
      "MCP",
      "AI agents",
      "Duke Computer Science",
      "Summer 2027 internship",
    ],
    url: "https://lumanzhan.com",
    ogTitle: "Luman (Grace) Zhan, AI/ML Engineer",
    ogDescription: DESCRIPTION,
    imageAlt: "Portrait of Luman (Grace) Zhan",
    twitterTitle: "Luman (Grace) Zhan, AI/ML Engineer",
    twitterDescription: DESCRIPTION,
  })
}

export default function HomePage() {
  return <HomePageContent />
}
