import LeftColumn from "./_components/LeftColumn"
import { Glow } from "@/components/pointer-effects"
import SectionTabs from "./_components/SectionTabs"

// Two columns: who I am on the left (sticky), four tabs on the right.
export default function HomePageContent() {
  return (
    <div className="pf">
      <Glow />
      <div className="page">
        <LeftColumn />
        <SectionTabs />
      </div>
    </div>
  )
}
