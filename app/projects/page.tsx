import type { Metadata } from "next"
import Link from "next/link"
import { projects, type ProjectType } from "@/lib/projects"
import { ArrowRight, ExternalLink, Github, Package } from "lucide-react"

export const metadata: Metadata = {
  title: "Projects | Full-Stack Developer Portfolio",
  description:
    "Explore my portfolio of web applications, SaaS platforms, npm packages, Chrome extensions, and AI integrations. Built with Next.js, React, and modern technologies.",
  openGraph: {
    title: "Projects | Full-Stack Developer Portfolio",
    description:
      "Explore my portfolio of web applications, SaaS platforms, npm packages, Chrome extensions, and AI integrations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Full-Stack Developer Portfolio",
    description:
      "Explore my portfolio of web applications, SaaS platforms, npm packages, Chrome extensions, and AI integrations.",
  },
}

const projectTypeLabels: Record<ProjectType, string> = {
  "web-app": "Website",
  npm: "NPM Package",
  "chrome-extension": "Chrome Extension",
  "ai-integration": "AI Integration",
  saas: "SaaS",
  "open-source": "Open Source",
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-services text-services-primary">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-6xl font-bold tracking-tight text-balance">
            All{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-services-muted text-pretty leading-relaxed">
            A comprehensive collection of my work across different domains. Each project showcases unique challenges and
            innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              className="group relative block animate-fade-in-up"
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
                      {project.icon} {project.type}
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
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
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
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
