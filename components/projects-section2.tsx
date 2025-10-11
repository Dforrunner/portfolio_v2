"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ExternalLink, Github, Package } from "lucide-react"
import { getFeaturedProjects, type ProjectType } from "@/lib/projects"

const projectTypeLabels: Record<ProjectType, string> = {
  'web-app': "Website",
  npm: "NPM Package",
  "chrome-extension": "Chrome Extension",
  "ai-integration": "AI Integration",
  saas: "SaaS",
  "open-source": "Open Source",
}

export function ProjectsSection2() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const featuredProjects = getFeaturedProjects()

  return (
    <div className="min-h-screen" id="projects">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-balance">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-services-muted text-pretty leading-relaxed">
            A showcase of my best work. From SaaS platforms to open-source libraries, each project demonstrates
            technical excellence and attention to detail.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Card */}
              <div className="relative h-full overflow-hidden rounded-2xl border-card-services bg-card-services backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-card-services-hover hover:shadow-2xl">
                {/* Gradient Orb Background */}
                <div
                  className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${project.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
                />

                {/* Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={project.images.thumbnail || "/placeholder.svg"}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Project Type Badge */}
                  <div className="absolute right-3 top-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${project.gradient} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
                    >
                      {project.icon} {projectTypeLabels[project.type]}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="mb-2 text-2xl font-bold text-balance">{project.title}</h3>
                  <p className="mb-4 text-services-muted leading-relaxed text-pretty line-clamp-2">{project.tagline}</p>

                  {/* Tech Stack */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-services-secondary"
                        style={{
                          animation: hoveredIndex === index ? `slideIn 0.3s ease-out ${techIndex * 0.1}s both` : "none",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-services-secondary">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2 text-sm font-semibold">
                      <span className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}>
                        View Project
                      </span>
                      <ArrowRight
                        className={`h-4 w-4 transition-transform duration-300 ${
                          hoveredIndex === index ? "translate-x-1" : ""
                        }`}
                      />
                    </span>

                    {project.links.github && (
                      <Github className="h-4 w-4 text-services-muted transition-colors hover:text-services-primary" />
                    )}
                    {project.links.live && (
                      <ExternalLink className="h-4 w-4 text-services-muted transition-colors hover:text-services-primary" />
                    )}
                    {project.links.npm && (
                      <Package className="h-4 w-4 text-services-muted transition-colors hover:text-services-primary" />
                    )}
                  </div>
                </div>

                {/* Shine Effect */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                    transform: hoveredIndex === index ? "translateX(100%)" : "translateX(-100%)",
                    transition: "transform 0.8s ease-in-out",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
          >
            View All Projects
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Keyframes for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
