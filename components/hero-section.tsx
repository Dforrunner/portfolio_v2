'use client';

import { Button } from '@/components/ui/button';
import { siteConfig } from '@/lib/site-config';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import Image from 'next/image';
import { AvailableBadge } from './available-badge';
import { ContactDialog } from './contact-dialog';
import { GlassCard } from './glass-card';
import TextClamp from './text-clamp';
import { AuroraText } from './ui/aurora-text';

export function HeroSection() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative h-screen max-h-[900px] min-h-screen landscape:min-h-[100vw] lg:landscape:min-h-screen">
      {/* background glowing orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-primary/10 animate-float hover-glow absolute -top-15 -right-15 size-45 rounded-full md:-top-40 md:-right-40 md:size-80" />
        <div
          className="bg-accent/5 animate-rotate-glow absolute -bottom-20 -left-20 size-45 rounded-full lg:-bottom-40 lg:-left-40 lg:size-96"
          style={{ animationDelay: '2s' }}
        />
        <div className="bg-primary/5 animate-bounce-in animate-stagger-3 absolute top-1/4 right-1/4 size-22 rounded-full lg:size-32" />
        <div className="bg-accent/10 animate-scale-in animate-stagger-4 absolute bottom-1/4 left-1/4 size-16 rounded-full md:size-24" />
        <div className="bg-primary/5 animate-pulse-glow absolute top-1/2 left-1/2 size-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full md:size-64" />
      </div>

      <div className="z-10 mx-auto flex h-full max-w-4xl flex-col items-center justify-evenly gap-3 pt-16 pb-1">
        {/* Available Badge */}
        <AvailableBadge />

        <div className="animate-scale-in mb-4">
          <div className="relative mx-auto h-24 w-24 sm:h-28 sm:w-28">
            <Image
              src={siteConfig.profileImage}
              alt="Mo Barut - Professional Headshot"
              width={156}
              height={108}
              className="border-primary/20 hover:border-primary/40 z-10 h-full w-full rounded-full border-4 object-cover shadow-2xl transition-all duration-300 hover:scale-105"
              priority
              fetchPriority="high"
            />
            <div className="from-primary/20 animate-pulse-glow absolute inset-0 rounded-full bg-gradient-to-tr to-transparent" />
          </div>
        </div>

        <div className="space-y-3 text-center">
          <h1 className="from-foreground via-primary to-accent animate-scale-in mb-3 bg-gradient-to-r bg-clip-text text-4xl font-bold text-transparent sm:text-5xl md:text-6xl">
            <AuroraText>{siteConfig.name}</AuroraText>
          </h1>

          <TextClamp
            minFont={18}
            maxFont={34}
            as="h2"
            className="font-medium text-slate-800 dark:text-slate-200"
          >
            {siteConfig.title}
          </TextClamp>

          <TextClamp
            minFont={14}
            maxFont={20}
            as="p"
            className="text-muted-foreground mx-auto mb-6 max-w-2xl px-4 text-center leading-snug sm:px-0 md:mb-8"
          >
            {siteConfig.description}
          </TextClamp>
        </div>

        <div className="mb-3 flex flex-col items-center justify-center gap-2 px-4 sm:flex-row sm:gap-4 sm:px-0 md:mb-8">
          <ContactDialog />

          <Button
            variant="outline"
            size="lg"
            className="hover-lift w-full max-w-40 cursor-pointer bg-transparent sm:w-auto"
            onClick={() => scrollToSection('#services')}
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
              <GlassCard className="in-view rounded-full md:p-3" index={0}>
                <Github className="h-6 w-6" />
              </GlassCard>
            </a>
            <a
              href={siteConfig.account.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <GlassCard className="in-view rounded-full md:p-3" index={1}>
                <Linkedin className="h-6 w-6" />
              </GlassCard>
            </a>
            <a href={`mailto:${siteConfig.email}`} aria-label="Email">
              <GlassCard className="in-view rounded-full md:p-3" index={2}>
                <Mail className="h-6 w-6" />
              </GlassCard>
            </a>
          </div>
          <div className="animate-shimmer mx-auto flex size-7 animate-bounce items-center justify-center rounded-2xl">
            <ArrowDown className="text-muted-foreground h-6 w-6" />
          </div>
        </div>
      </div>
    </header>
  );
}
