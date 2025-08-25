"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full animate-float hover-glow" />
        <div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full animate-rotate-glow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-primary/5 rounded-full animate-bounce-in animate-stagger-3" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-accent/10 rounded-full animate-scale-in animate-stagger-4" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full animate-pulse-glow" />
      </div>

      <div
        className={`container mx-auto px-4 sm:px-6 text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "animate-fade-in-up" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="animate-scale-in">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-6">
              <img
                src="/developer-headshot.png"
                alt="Mo Barut - Professional Headshot"
                className="w-full h-full object-cover rounded-full border-4 border-primary/20 shadow-2xl hover:border-primary/40 transition-all duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent animate-pulse-glow" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-3 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-scale-in">
            {siteConfig.name}
          </h1>
          <div className="h-10 sm:h-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-medium animate-slide-in-right animate-stagger-2">
              {siteConfig.title}
            </h2>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 sm:mb-14 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animate-stagger-3 px-4 sm:px-0">
            {siteConfig.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-16 sm:mb-20 px-4 sm:px-0">
            <Button
              size="lg"
              className="animate-bounce-in animate-stagger-4 hover-lift hover-glow w-full sm:w-auto cursor-pointer"
              onClick={() => scrollToSection("#contact")}
            >
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Book a free project consultation
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              className="animate-bounce-in animate-stagger-5 hover-lift bg-transparent w-full sm:w-auto cursor-pointer"
            >
              View Case Studies
              <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button> */}
          </div>

          <div className="flex justify-center space-x-4 sm:space-x-6 mb-12 sm:mb-16">
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 animate-bounce-in animate-stagger-4 hover-glow cursor-pointer"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 animate-bounce-in animate-stagger-5 hover-glow cursor-pointer"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 animate-bounce-in animate-stagger-6 hover-glow cursor-pointer"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-shimmer">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
}
