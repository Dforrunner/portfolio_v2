"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import { AvailableBadge } from "./available-badge";
import { ContactDialog } from "./contact-dialog";
import { GlassCard } from "./glass-card";
import TextClamp from "./text-clamp";
import { AuroraText } from "./ui/aurora-text";

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="h-screen relative min-h-screen landscape:min-h-[100vw] lg:landscape:min-h-screen max-h-[900px]">
      {/* background glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute size-45 -top-15 -right-15 md:-top-40 md:-right-40  md:size-80 bg-primary/10 rounded-full animate-float hover-glow" />
        <div
          className="absolute size-45 -bottom-20 -left-20 lg:-bottom-40 lg:-left-40 lg:size-96 bg-accent/5 rounded-full animate-rotate-glow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/4 right-1/4 size-22 lg:size-32 bg-primary/5 rounded-full animate-bounce-in animate-stagger-3" />
        <div className="absolute bottom-1/4 left-1/4 size-16 md:size-24 bg-accent/10 rounded-full animate-scale-in animate-stagger-4" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-40 md:size-64 bg-primary/5 rounded-full animate-pulse-glow" />
      </div>

      <div className="max-w-4xl mx-auto z-10 flex flex-col items-center justify-evenly gap-3 h-full pt-16 pb-1">
        {/* Available Badge */}
        <AvailableBadge />

        <div className="animate-scale-in mb-4">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto">
            <Image
              src={siteConfig.profileImage}
              alt="Mo Barut - Professional Headshot"
              width={156}
              height={108}
              className="w-full h-full object-cover rounded-full border-4 border-primary/20 shadow-2xl hover:border-primary/40 transition-all duration-300 hover:scale-105 z-10"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent animate-pulse-glow" />
          </div>
        </div>

        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent  animate-scale-in mb-3">
            <AuroraText>{siteConfig.name}</AuroraText>
          </h1>

          <TextClamp
            minFont={18}
            maxFont={34}
            as="h2"
            className="text-slate-800 dark:text-slate-200 font-medium"
          >
            {siteConfig.title}
          </TextClamp>

          <TextClamp
            minFont={14}
            maxFont={20}
            as="p"
            className="text-muted-foreground max-w-2xl mx-auto leading-snug px-4 sm:px-0 mb-6 md:mb-8 text-center"
          >
            {siteConfig.description}
          </TextClamp>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center px-4 sm:px-0 mb-3 md:mb-8">
          <ContactDialog />

          <Button
            variant="outline"
            size="lg"
            className="hover-lift bg-transparent w-full sm:w-auto cursor-pointer max-w-40"
            onClick={() => scrollToSection("#services")}
          >
            View Services
            <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        <div className="w-full space-y-3">
          <div className="flex justify-center space-x-4 sm:space-x-6">
            <a
              href={siteConfig.account.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GlassCard className="rounded-full md:p-3 in-view" index={0}>
                <Github className="h-6 w-6" />
              </GlassCard>
            </a>
            <a
              href={siteConfig.account.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <GlassCard className="rounded-full md:p-3 in-view" index={1}>
                <Linkedin className="h-6 w-6" />
              </GlassCard>
            </a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email">
              <GlassCard className="rounded-full md:p-3 in-view" index={2}>
                <Mail className="h-6 w-6" />
              </GlassCard>
            </a>
          </div>
          <div className="flex items-center justify-center mx-auto size-7 animate-bounce animate-shimmer rounded-2xl">
            <ArrowDown className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
}
