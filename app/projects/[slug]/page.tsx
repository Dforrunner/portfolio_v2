import { ContactDialog } from "@/components/contact-dialog";
import { DeviceMockups } from "@/components/device-mockups";
import { ImageGallery } from "@/components/image-gallery";
import { getProjectBySlug, projects } from "@/lib/projects";
import { ArrowLeft, Calendar, Chrome, Code2, ExternalLink, Github, Package } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

  return {
    title: `${project.title} | Projects`,
    description: project.metaDescription,
    openGraph: {
      title: project.title,
      description: project.metaDescription,
      type: "website",
      url: `${siteUrl}/projects/${project.slug}`,
      images: [
        {
          url: project.images.thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.metaDescription,
      images: [project.images.thumbnail],
    },
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-services text-services-primary">
      {/* Hero Section */}
      <div className="border-b border-border/50 bg-card-services/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="mb-8 inline-flex items-center gap-2 text-sm text-services-muted transition-colors hover:text-services-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Project Info */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="text-4xl">{project.icon}</span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${project.gradient} px-4 py-1.5 text-sm font-semibold text-white shadow-lg`}
                >
                  {project.type.replace("-", " ").toUpperCase()}
                </span>
              </div>

              <h1 className="mb-4 text-5xl font-bold tracking-tight text-balance">
                {project.title}
              </h1>
              <p className="mb-6 text-xl text-services-muted text-pretty leading-relaxed">
                {project.tagline}
              </p>
              <p className="mb-8 text-services-secondary leading-relaxed">{project.description}</p>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${project.gradient} px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live Site
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-card-services bg-card-services px-6 py-3 font-semibold transition-all duration-300 hover:border-card-services-hover hover:shadow-lg"
                  >
                    <Github className="h-4 w-4" />
                    View Code
                  </a>
                )}
                {project.links.npm && (
                  <a
                    href={project.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-card-services bg-card-services px-6 py-3 font-semibold transition-all duration-300 hover:border-card-services-hover hover:shadow-lg"
                  >
                    <Package className="h-4 w-4" />
                    View on NPM
                  </a>
                )}
                {project.links.chrome && (
                  <a
                    href={project.links.chrome}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-card-services bg-card-services px-6 py-3 font-semibold transition-all duration-300 hover:border-card-services-hover hover:shadow-lg"
                  >
                    <Chrome className="h-4 w-4" />
                    Chrome Store
                  </a>
                )}
              </div>
            </div>

            {/* Right Column - Meta Info */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-services-muted">
                  <Code2 className="h-4 w-4" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-services-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-services-muted">
                  <Calendar className="h-4 w-4" />
                  Timeline
                </h3>
                <p className="text-services-secondary">
                  {project.startDate} {project.endDate && `- ${project.endDate}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Mockups Section */}
      {(project.images.desktop ||
        project.images.tablet ||
        project.images.mobile ||
        project.iframeUrl) && (
        <div className="border-b border-border/50 bg-background/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <DeviceMockups
              images={project.images}
              iframeUrl={project.iframeUrl}
              title={project.title}
            />
          </div>
        </div>
      )}

      {/* Image Gallery Section */}
      {project.gallery && project.gallery.length > 0 && (
        <div className="border-b border-border/50 bg-card-services/30 py-16 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ImageGallery images={project.gallery} title="Project Screenshots" />
          </div>
        </div>
      )}

      {/* Details Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Features */}
          <div className="animate-fade-in-up">
            <h2 className="mb-6 text-3xl font-bold">
              <span
                className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
              >
                Key Features
              </span>
            </h2>
            <ul className="space-y-4">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div
                    className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r ${project.gradient}`}
                  />
                  <span className="text-services-secondary leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="mb-6 text-3xl font-bold">
                <span
                  className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                >
                  Challenges & Solutions
                </span>
              </h2>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r ${project.gradient}`}
                    />
                    <span className="text-services-secondary leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <div className="animate-fade-in-up lg:col-span-2" style={{ animationDelay: "0.2s" }}>
              <h2 className="mb-6 text-3xl font-bold">
                <span
                  className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                >
                  Results & Impact
                </span>
              </h2>
              <ul className="grid gap-4 md:grid-cols-3">
                {project.results.map((result, index) => (
                  <li
                    key={index}
                    className="rounded-xl border-card-services bg-card-services p-6 backdrop-blur-sm transition-all duration-300 hover:border-card-services-hover hover:shadow-lg"
                  >
                    <div
                      className={`mb-2 inline-block rounded-lg bg-gradient-to-r ${project.gradient} p-2`}
                    >
                      <div className="h-6 w-6" />
                    </div>
                    <p className="text-services-secondary leading-relaxed">{result}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="border-t border-border/50 bg-card-services/50 py-16 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold">Interested in Working Together?</h2>
          <p className="mb-8 text-lg text-services-muted">
            Let's build something amazing. Get in touch to discuss your project.
          </p>
          <ContactDialog />
        </div>
      </div>
    </div>
  );
}
