"use client";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ContactDialog } from "./contact-dialog";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";
import { ScrollProgress } from "./ui/scroll-progress";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-[1px]">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href={"/#top"}>
            <div className="relative flex items-center justify-center">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.logoAlt}
                width={50}
                height={50}
                className="cursor-pointer "
              />
              <div className="absolute size-11 rounded-full animate-pulse-glow" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <ContactDialog trigger={<Button size="sm">Let's Talk</Button>} />
            <AnimatedThemeToggler />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center space-x-1">
            <AnimatedThemeToggler />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 min-w-[40px] min-h-[40px]"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-3">
              {siteConfig.navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-left text-muted-foreground hover:text-foreground transition-colors py-2 px-1 min-h-[44px] flex items-center"
                >
                  {item.name}
                </Link>
              ))}
              <ContactDialog trigger={<Button size="sm">Let's Talk</Button>} />
            </div>
          </div>
        )}
      </div>
      <ScrollProgress className="top-[65px] bg-gradient-to-br from-slate-300 via-slate-300 to-slate-400 dark:from-slate-800 dark:via-slate-700 dark:to-slate-700" />
    </nav>
  );
}
