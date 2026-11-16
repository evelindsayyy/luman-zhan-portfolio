"use client"

import { ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"

import { facts } from "@/data/facts"
import { projects } from "@/data/projects"

/** The featured projects: what each proves, my part, and where to check. */
export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 border-t-4 border-black dark:border-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-display-md text-black dark:text-white mb-12">PROJECTS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <article key={project.id} className="border-4 border-black dark:border-white p-6 flex flex-col">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{project.context}</p>
              <h3 className="font-display text-3xl mb-3">{project.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">{project.proves}</p>
              {project.myPart && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span className="font-semibold text-black dark:text-white">My part: </span>
                  {project.myPart}
                </p>
              )}

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
                {project.factIds.map((id) => (
                  <div key={id} className="border-l-4 border-accent pl-3">
                    <dt className="font-body font-bold tabular-nums text-xl">{facts[id].value}</dt>
                    <dd className="text-xs text-gray-600 dark:text-gray-400">{facts[id].label}</dd>
                  </div>
                ))}
              </dl>

              <ul className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <li key={tech} className="text-xs border-2 border-black dark:border-white px-2 py-0.5">
                    {tech}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3">
                <a
                  href={project.links.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bold-button flex items-center gap-2 text-sm"
                >
                  <FaGithub size={16} /> CODE
                </a>
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bold-button-accent flex items-center gap-2 text-sm"
                  >
                    <ExternalLink size={16} /> LIVE DEMO
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
