"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { Monitor, Server, Wrench } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animateSkills, setAnimateSkills] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimateSkills(true), 300);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Frontend",
      icon: Monitor,
      skills: siteConfig.skills.frontend,
      color: "text-blue-500",
    },
    {
      title: "Backend",
      icon: Server,
      skills: siteConfig.skills.backend,
      color: "text-green-500",
    },
    {
      title: "Tools & Others",
      icon: Wrench,
      skills: siteConfig.skills.tools,
      color: "text-purple-500",
    },
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-scale-in">
              Skills & <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Expertise</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-stagger-2">Technologies and tools I use to bring ideas to life</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <Card
                key={categoryIndex}
                className={`hover:shadow-lg transition-all duration-300 hover-lift hover-glow ${isVisible ? `animate-fade-in-up animate-stagger-${categoryIndex + 3}` : "opacity-0"}`}
              >
                <CardHeader className="text-center pb-4">
                  <category.icon className={`h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 ${category.color} animate-bounce-in animate-stagger-${categoryIndex + 1}`} />
                  <CardTitle className="text-xl sm:text-2xl animate-fade-in-up animate-stagger-2">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 gap-2 sm:gap-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-300 hover-lift ${
                          animateSkills ? `animate-fade-in-left animate-stagger-${skillIndex + 1}` : "opacity-0"
                        }`}
                        style={{ animationDelay: `${categoryIndex * 0.2 + skillIndex * 0.1}s` }}
                      >
                        <span className="text-xl sm:text-2xl animate-bounce-in flex-shrink-0" style={{ animationDelay: `${categoryIndex * 0.3 + skillIndex * 0.1}s` }}>
                          {skill.icon({})}
                        </span>
                        <span className="font-medium text-base sm:text-lg">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
