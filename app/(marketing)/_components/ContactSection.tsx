"use client"

import { Mail } from "lucide-react"
import { FaGithub, FaLinkedin } from "react-icons/fa"

import { profile } from "@/data/profile"

export default function ContactSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="font-display text-display-md text-black dark:text-white mb-8">
          LET'S CONNECT
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-xl">
          {profile.target} Email is the fastest way to reach me.
        </p>

        {/* Action Buttons - Bold Style */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="bold-button-accent flex items-center justify-center gap-3"
          >
            <Mail size={20} />
            {profile.email}
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bold-button flex items-center justify-center gap-3"
          >
            <FaLinkedin size={20} />
            LINKEDIN
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bold-button flex items-center justify-center gap-3"
          >
            <FaGithub size={20} />
            GITHUB
          </a>
        </div>
      </div>
    </section>
  )
}
