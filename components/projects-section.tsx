"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ProjectsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateProjects, setAnimateProjects] = useState(false);
  const [animateOtherProjects, setAnimateOtherProjects] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateProjects(true), 300);
          setTimeout(() => setAnimateOtherProjects(true), 800);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const featuredProjects = siteConfig.projects.filter((project) => project.featured);
  const otherProjects = siteConfig.projects.filter((project) => !project.featured);

  return (
    <section ref={sectionRef} id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-scale-in">
              Featured{" "}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-stagger-2">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                className={`group hover:shadow-xl transition-all duration-300 overflow-hidden hover-lift hover-glow bg-gradient-primary dark:border-slate-800 ${
                  animateProjects ? `animate-fade-in-up animate-stagger-${index + 1}` : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative overflow-hidden -mt-6">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 animate-shimmer">
                    {project.github && (
                      <Button size="sm" variant="secondary" asChild className="animate-bounce-in">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                    {project.live && (
                      <Button size="sm" asChild className="animate-bounce-in animate-stagger-2">
                        <a href={project.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <h3 className="text-2xl font-bold animate-fade-in-left">{project.title}</h3>
                  <p className="text-muted-foreground animate-fade-in-left animate-stagger-2">
                    {project.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className={`animate-bounce-in animate-stagger-${techIndex + 1} hover-lift`}
                        style={{ animationDelay: `${techIndex * 0.05}s` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {otherProjects.length > 0 && (
            <div>
              <h3 className="text-3xl font-bold text-center mb-8 animate-scale-in">
                Other Projects
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <Card
                    key={project.id}
                    className={`hover:shadow-lg transition-all duration-300 hover-lift hover-glow ${
                      animateOtherProjects
                        ? `animate-fade-in-up animate-stagger-${index + 1}`
                        : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        width={400}
                        height={200}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader>
                      <h4 className="text-xl font-bold animate-fade-in-left">{project.title}</h4>
                      <p className="text-sm text-muted-foreground animate-fade-in-left animate-stagger-2">
                        {project.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className={`text-xs animate-bounce-in animate-stagger-${
                              techIndex + 1
                            } hover-lift`}
                            style={{ animationDelay: `${techIndex * 0.03}s` }}
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        {project.github && (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                            className="animate-bounce-in hover-glow bg-transparent"
                          >
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="animate-bounce-in animate-stagger-2 hover-glow bg-transparent"
                        >
                          <a href={project.live} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
