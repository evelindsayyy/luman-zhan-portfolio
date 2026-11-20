import Image from "next/image"
import Link from "next/link"

import { profile } from "@/data/profile"
import { ROUTES } from "@/lib/constants"
import { GitHubIcon, LinkedInIcon, MailIcon, ResumeIcon } from "@/components/site-icons"
import { ReactiveName } from "@/components/pointer-effects"

// Who I am, what I want, and how to reach me. Sticky on desktop, so it stays
// in view while the visitor reads the tabs on the right.
export default function LeftColumn() {
  return (
    <aside className="left">
      <Image className="photo" src={profile.photo.square} alt={profile.photo.alt} width={88} height={88} priority />
      <ReactiveName text={profile.displayName} />
      <p className="role">{profile.role}</p>
      <p className="thesis">{profile.summary}</p>
      <span className="status">
        <i />
        {profile.status}
      </span>
      <div className="cta">
        <Link className="btn primary" href={ROUTES.CHAT}>
          Ask my AI assistant
        </Link>
        <a className="btn" href="#resume">
          <ResumeIcon />
          Resume
        </a>
      </div>
      <div className="icons">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.preferredName}`}>
          <MailIcon />
        </a>
        <span>{profile.email}</span>
      </div>
    </aside>
  )
}
