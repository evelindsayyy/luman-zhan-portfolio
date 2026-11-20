import Image from "next/image"
import Link from "next/link"

import { profile } from "@/data/profile"
import { GitHubIcon, LinkedInIcon } from "@/components/site-icons"

// Sticky header: back to the portfolio, links out, and a fresh start.
export function ChatHeader({ onNewChat }: { onNewChat: () => void }) {
  return (
    <header className="chead">
      <Link className="home" href="/">
        <Image src={profile.photo.square} alt="" width={40} height={40} />
        <span>
          <b>{profile.displayName}</b>
          <span>← Back to portfolio</span>
        </span>
      </Link>
      <div className="icons">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <button className="btn" type="button" onClick={onNewChat}>
          New chat
        </button>
        <Link className="btn" href="/#resume">
          Resume
        </Link>
      </div>
    </header>
  )
}
