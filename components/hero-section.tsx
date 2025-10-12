"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AvailableBadge } from "./available-badge";
import { ContactDialog } from "./contact-dialog";
import { GlassCard } from "./glass-card";
import { AuroraText } from "./ui/aurora-text";

const TextAnimate = dynamic(() => import("./ui/text-animate").then((m) => m.TextAnimate),{
  ssr: false,
});

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="h-screen flex items-center justify-center relative text-foreground">
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

      <div
        className={
          "container mx-auto text-center relative z-10 transition-all duration-1000 animate-fade-in-up "
        }
      >
        <div className="max-w-4xl mx-auto">
          {/* Available Badge */}
          <AvailableBadge />

          <div className="animate-scale-in">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-2 sm:mb-6">
              <Image
                src={siteConfig.profileImage}
                alt="Mo Barut - Professional Headshot"
                width={256}
                height={208}
                className="w-full h-full object-cover rounded-full border-4 border-primary/20 shadow-2xl hover:border-primary/40 transition-all duration-300 hover:scale-105"
                priority
                fetchPriority="high"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-transparent animate-pulse-glow" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent animate-scale-in">
            <AuroraText>{siteConfig.name}</AuroraText>
          </h1>
          <div className="h-10 sm:h-12">
            <TextAnimate
              animation="blurInUp"
              by="character"
              once
              className="text-lg sm:text-xl md:text-3xl text-slate-800 dark:text-slate-200 font-medium "
            >
              {siteConfig.title}
            </TextAnimate>
          </div>

          <TextAnimate
            animation="blurInUp"
            delay={0.1}
            by="word"
            once
            className="text-sm sm:text-lg md:text-xl break-keep text-muted-foreground mb-6  sm:mb-14 max-w-2xl mx-auto leading-snug animate-fade-in-up animate-stagger-3 px-4 sm:px-0"
          >
            {siteConfig.description2}
          </TextAnimate>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center mb-10 md:mb-20 px-4 sm:px-0">
            <ContactDialog />

            <Button
              variant="outline"
              size="lg"
              className="animate-bounce-in animate-stagger-5 hover-lift bg-transparent w-full sm:w-auto cursor-pointer max-w-40"
              onClick={() => scrollToSection("#services")}
            >
              View Services
              <ArrowDown className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>

          <div className="flex justify-center space-x-4 sm:space-x-6 mb-12 sm:mb-16">
            <a
              href={siteConfig.account.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GlassCard className="rounded-full p-2 sm:p-3">
                <Github className="h-6 w-6" />
              </GlassCard>
            </a>
            <a
              href={siteConfig.account.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <GlassCard className="rounded-full p-2 sm:p-3">
                <Linkedin className="h-6 w-6" />
              </GlassCard>
            </a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email">
              <GlassCard className="rounded-full p-2 sm:p-3">
                <Mail className="h-6 w-6" />
              </GlassCard>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-shimmer rounded-2xl">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
}
