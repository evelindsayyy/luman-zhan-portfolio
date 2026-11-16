import { Metadata } from "next"
import { generateSEOMetadata } from "@/lib/seo/generateMetadata"
import HomePageContent from "./HomePageContent"

export async function generateMetadata(): Promise<Metadata> {
  return generateSEOMetadata({
    title: "Luman (Grace) Zhan, AI/ML Engineer",
    description: "Luman (Grace) Zhan, Duke CS student and AI/ML engineer who builds LLM systems and measures whether they work: agents on Amazon Bedrock AgentCore with MCP, and LLM evaluation validated against people. Looking for Summer 2027 AI/ML and software engineering internships.",
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
    ogDescription: "Luman (Grace) Zhan, Duke CS student and AI/ML engineer who builds LLM systems and measures whether they work: agents on Amazon Bedrock AgentCore with MCP, and LLM evaluation validated against people. Looking for Summer 2027 AI/ML and software engineering internships.",
    imageAlt: "Portrait of Luman (Grace) Zhan",
    twitterTitle: "Luman (Grace) Zhan, AI/ML Engineer",
    twitterDescription: "Luman (Grace) Zhan, Duke CS student and AI/ML engineer who builds LLM systems and measures whether they work: agents on Amazon Bedrock AgentCore with MCP, and LLM evaluation validated against people. Looking for Summer 2027 AI/ML and software engineering internships.",
  })
}

export default function HomePage() {
  return <HomePageContent />
}
