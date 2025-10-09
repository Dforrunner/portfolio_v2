import { AboutSection2 } from "@/components/about-section2";
import BlogSection from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ServicesSection />
      <AboutSection2 />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
