'use client';

import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { siteConfig } from '@/lib/site-config';
import { Menu, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ContactDialog } from './contact-dialog';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';

const ScrollProgress = dynamic(() => import('./ui/scroll-progress').then((x) => x.ScrollProgress), {
  ssr: false,
});

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Blog', href: '/#blog' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background shadow-sm backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-[1px]">
        <div className="flex h-14 items-center justify-between sm:h-16">
          {/* Logo */}
          <Link href={'/'} onClick={scrollToTop}>
            <div className="relative flex items-center justify-center p-2">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.logoAlt}
                width={45}
                height={45}
                className="cursor-pointer"
                priority
                fetchPriority="high"
              />
              <div className="animate-pulse-glow absolute size-10 rounded-full" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-6 md:flex lg:space-x-8">
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={item.name}
              >
                {item.name}
              </a>
            ))}
            <ContactDialog trigger={<Button size="sm">Let's Talk</Button>} />
            <AnimatedThemeToggler />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center space-x-1 md:hidden">
            <AnimatedThemeToggler className="z-20" />
            <Drawer direction="right" open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DrawerTrigger asChild onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="mx-2 h-5 w-5" />
              </DrawerTrigger>
              <DrawerContent>
                <DrawerTitle className="hidden">Site Navigation Menu</DrawerTitle>
                <div className="mx-auto w-full max-w-sm">
                  <DrawerHeader>
                    <Button
                      className="h-6 w-6"
                      variant="outline"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </DrawerHeader>
                  <div className="flex flex-col space-y-3 p-4">
                    {navLinks.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-muted-foreground hover:text-foreground flex min-h-[44px] items-center px-1 py-2 text-left transition-colors"
                        aria-label={item.name}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>

                  <DrawerFooter>
                    <ContactDialog trigger={<Button size="sm">Let's Talk</Button>} />
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      <ScrollProgress className="top-[57px] bg-gradient-to-br from-slate-300 via-slate-300 to-slate-400 sm:top-[65px] dark:from-slate-800 dark:via-slate-700 dark:to-slate-700" />
    </nav>
  );
}
