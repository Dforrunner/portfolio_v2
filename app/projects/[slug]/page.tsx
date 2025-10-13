import { CtaCard } from "@/components/cta-components";
import { DeviceMockups } from "@/components/device-mockups";
import { GlassCard } from "@/components/glass-card";
import { ImageGallery } from "@/components/image-gallery";
import { ShareDialog } from "@/components/share-dialog";
import TextClamp from "@/components/text-clamp";
import { getProjectBySlug, Project, projects } from "@/lib/projects";
import { Code2, ExternalLink, HandshakeIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FaChrome, FaGithub, FaNpm } from "react-icons/fa";

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
  const project = await getProjectBySlug(params.slug);

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

function ProjectSchema({ project }: { project: Project }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Project",
    name: project.title,
    url: project.links?.live || project.iframeUrl || "",
    description: project.longDescription || project.description,
    image: [project.images?.desktop, project.images?.mobile, project.images?.thumbnail].filter(
      Boolean
    ),
    startDate: project.startDate,
    keywords: project.technologies?.join(", "),
    potentialAction: {
      "@type": "ViewAction",
      target: project.links?.live || project.iframeUrl || "",
      name: "View Project",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": project.links?.live || project.iframeUrl || "",
    },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify ensures correct formatting for the schema
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-10">
      {/* Hero Section */}
      <div className="border-b border-border/50 bg-card-services/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column - Project Info */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${project.gradient} px-4 py-1.5 text-sm font-semibold text-white shadow-lg`}
                >
                  {project.type.replace("-", " ").toUpperCase()}
                </span>
              </div>

              <TextClamp
                maxFont={32}
                minFont={20}
                as="h1"
                className="mb-4 font-bold tracking-tight text-balance"
              >
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {project.title}
                </span>
              </TextClamp>

              <p className="mb-6 md:text-xl text-muted-foreground text-pretty leading-relaxed">
                {project.tagline}
              </p>
              <p className="mb-8 leading-relaxed">{project.description}</p>

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${project.gradient} px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                    aria-label="View Live Site"
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
                    className="inline-flex items-center gap-2 rounded-lg border-card-services bg-card-services px-6 py-3 font-semibold transition-all duration-300 hover:shadow-lg"
                    aria-label="View Code"
                  >
                    <FaGithub className="h-4 w-4" />
                    View Code
                  </a>
                )}
                {project.links.npm && (
                  <a
                    href={project.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-card-services bg-card-services px-6 py-3 font-semibold transition-all duration-300 hover:shadow-lg"
                    aria-label="View on NPM"
                  >
                    <FaNpm className="h-4 w-4" />
                    View on NPM
                  </a>
                )}
                {project.links.chrome && (
                  <a
                    href={project.links.chrome}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border-card-services bg-card-services px-6 py-3 font-semibold transition-all duration-300 hover:shadow-lg"
                    aria-label="View on Chrome Store"
                  >
                    <FaChrome className="h-4 w-4" />
                    Chrome Store
                  </a>
                )}
                {/* Share Button */}

                <ShareDialog
                  title={project.title}
                  description={project.description}
                  triggerTitle="Share project"
                />
              </div>
            </div>

            {/* Right Column - Meta Info */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <div>
                <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  <Code2 className="h-4 w-4" />
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-muted px-4 py-2 text-sm font-medium "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Device Mockups Section */}
      {(project.images.desktop || project.images.mobile || project.iframeUrl) && (
        <div className="border-b border-border/50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <DeviceMockups
              images={project.images}
              iframeUrl={project.iframeUrl}
              title={project.title}
              showStatusBar
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
          <div className="anime-on-view animate-fade-in-up">
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
                  <span className=" leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          {project.challenges && project.challenges.length > 0 && (
            <div className="anime-on-view animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <h2 className="mb-6 text-3xl font-bold">
                <span
                  className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                >
                  Challenges
                </span>
              </h2>
              <ul className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div
                      className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r ${project.gradient}`}
                    />
                    <span className=" leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <div className="anime-on-view animate-fade-in-up lg:col-span-2" style={{ animationDelay: "0.2s" }}>
              <h2 className="mb-6 text-3xl font-bold">
                <span
                  className={`bg-gradient-to-r ${project.gradient} bg-clip-text text-transparent`}
                >
                  Results & Impact
                </span>
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                {project.results.map((result, index) => (
                  <GlassCard
                    key={index}
                    index={index}
                    className="rounded-xl p-6 backdrop-blur-sm transition-all duration-300 bg-background hover:shadow-lg"
                  >
                    <div
                      className={`mb-2 inline-block rounded-lg bg-gradient-to-r ${project.gradient} p-2`}
                    >
                      <div className="h-6 w-6" />
                    </div>
                    <p className=" leading-relaxed">{result}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <CtaCard
        icon={HandshakeIcon}
        title="Interested in Working Together?"
        message="Let's build something amazing. Get in touch to discuss your project."
      />

      <ProjectSchema project={project} />
    </div>
  );
}
