import { getFeaturedProjects } from '@/lib/projects';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from './project-card';
import TextClamp from './text-clamp';

export async function ProjectsSection() {
  const projects = await getFeaturedProjects();

  return (
    <section className="scroll-mt-13 md:scroll-mt-16" id="projects">
      <div className="container mx-auto px-3">
        {/* Header */}
        <div className="mb-16 text-center">
          <TextClamp maxFont={48} minFont={24} as="h2" className="mb-4 font-bold">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </TextClamp>

          <p className="text-muted-foreground mx-auto max-w-2xl leading-relaxed text-pretty md:text-lg">
            A showcase of my best work. From SaaS platforms to open-source libraries, each project
            demonstrates technical excellence and attention to detail.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,400px))] gap-6">
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
    </section>
  );
}
