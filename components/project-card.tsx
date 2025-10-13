'use client';

import { Project, ProjectType } from '@/lib/projects';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FaGithub, FaNpm } from 'react-icons/fa';

const projectTypeLabels: Record<ProjectType, string> = {
  website: 'Website',
  'web-app': 'Web App',
  npm: 'NPM Package',
  'chrome-extension': 'Chrome Extension',
  'ai-integration': 'AI Integration',
  saas: 'SaaS',
  'open-source': 'Open Source',
};

export function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="group relative block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card */}
      <div className="bg-gradient-primary relative h-full overflow-hidden rounded-2xl border border-slate-300 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-slate-400 hover:shadow-2xl dark:border-slate-800 dark:hover:border-slate-700">
        {/* Gradient Orb Background */}
        <div
          className={`absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br ${project.gradient} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`}
        />

        {/* Thumbnail */}
        <Link href={`/projects/${project.slug}`} prefetch>
          <div className="bg-muted relative aspect-video overflow-hidden">
            <Image
              src={project.images.thumbnail || '/placeholder.svg'}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              width={500}
              height={500}
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Project Type Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${project.gradient} px-3 py-1 text-xs font-semibold text-white shadow-lg`}
              >
                {project.icon} {projectTypeLabels[project.type]}
              </span>
            </div>
          </div>
        </Link>
        {/* Content */}
        <div className="p-6">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="mb-2 text-2xl font-bold text-balance">{project.title}</h3>
            <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed text-pretty">
              {project.tagline}
            </p>

            {/* Tech Stack */}
            <div className="mb-4 flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="bg-muted rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    animation: hovered ? `slideIn 0.3s ease-out ${techIndex * 0.1}s both` : 'none',
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="bg-muted rounded-full px-3 py-1 text-xs font-medium">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </Link>

          {/* Links */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.links.github && (
                <Link
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on GitHub"
                >
                  <FaGithub />
                </Link>
              )}
              {project.links.live && (
                <Link
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Live"
                >
                  <ExternalLink />
                </Link>
              )}
              {project.links.npm && (
                <Link
                  href={project.links.npm}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View on NPM"
                >
                  <FaNpm />
                </Link>
              )}
            </div>

            <Link href={`/projects/${project.slug}`}>
              <span className="flex items-center gap-2 text-sm font-semibold">
                <span
                  className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                >
                  View Project
                </span>
                <ArrowRight
                  className={`h-4 w-4 transition-transform duration-300 ${
                    hovered ? 'translate-x-1' : ''
                  }`}
                />
              </span>
            </Link>
          </div>
        </div>

        {/* Shine Effect */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
            transform: hovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.8s ease-in-out',
          }}
        />
      </div>
    </div>
  );
}
