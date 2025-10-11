"use client";

import { Project } from "@/lib/projects";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "./project-card";

export function ProjectsSection2({ projects }: { projects: Project[] }) {
  return (
    <div className="min-h-screen" id="projects">
      <div className="mx-auto container px-3 py-20">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-balance">
            Featured{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-services-muted text-pretty leading-relaxed">
            A showcase of my best work. From SaaS platforms to open-source libraries, each project
            demonstrates technical excellence and attention to detail.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,600px))]">
          {projects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
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
  );
}
