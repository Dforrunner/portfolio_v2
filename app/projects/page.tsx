import { CtaCard } from "@/components/cta-components";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/site-config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | " + siteConfig.name,
  description:
    "Explore my portfolio of web applications, SaaS platforms, npm packages, Chrome extensions, and AI integrations. Built with Next.js, React, and modern technologies.",
  openGraph: {
    title: "Projects | "+ siteConfig.name,
    description:
      "Explore my portfolio of web applications, SaaS platforms, npm packages, Chrome extensions, and AI integrations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | "+ siteConfig.name,
    description:
      "Explore my portfolio of web applications, SaaS platforms, npm packages, Chrome extensions, and AI integrations.",
  },
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <div className="min-h-screen bg-gradient-services text-services-primary">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 text-6xl font-bold tracking-tight text-balance">
              All{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-services-muted text-pretty leading-relaxed">
              A collection of some of my work across different domains. Each project showcases
              unique challenges and innovative solutions.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,600px))]">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </div>

      <CtaCard />
    </div>
  );
}
