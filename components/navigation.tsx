"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { siteConfig } from "@/lib/site-config";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ContactDialog } from "./contact-dialog";
import { AnimatedThemeToggler } from "./ui/animated-theme-toggler";

const ScrollProgress = dynamic(() => import("./ui/scroll-progress").then((x) => x.ScrollProgress), {
  ssr: false,
});

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/#blog" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        isScrolled ? "bg-background backdrop-blur-lg shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-[1px] ">
        <div className="flex items-center justify-between h-14 sm:h-16 ">
          {/* Logo */}
          <Link href={"/"} onClick={scrollToTop}>
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
              <div className="absolute size-10 rounded-full animate-pulse-glow" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
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
          <div className="md:hidden flex items-center space-x-1">
            <AnimatedThemeToggler className="z-20" />
            <Drawer direction="right" open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DrawerTrigger asChild onClick={() => setIsMobileMenuOpen(true)}>
                <Menu className="h-5 w-5 mx-2" />
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
                        className="text-left text-muted-foreground hover:text-foreground transition-colors py-2 px-1 min-h-[44px] flex items-center"
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
      <ScrollProgress className="top-[57px] sm:top-[65px] bg-gradient-to-br from-slate-300 via-slate-300 to-slate-400 dark:from-slate-800 dark:via-slate-700 dark:to-slate-700" />
    </nav>
  );
}
