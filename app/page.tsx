import { AboutSection } from "@/components/about-section";
import BlogSection from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import { ProjectsSection2 } from "@/components/projects-section2";
import ServicesSection from "@/components/services-section";
import SkillsSection from "@/components/skill-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <ProjectsSection2 />
      <BlogSection />
      <ContactSection />
    </main>
  );
}
