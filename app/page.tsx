import { AboutSection } from "@/components/about-section";
import BlogSection from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection } from "@/components/projects-section";
import ServicesSection from "@/components/services-section";
import SkillsSection from "@/components/skill-section";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection />
      <BlogSection featuredOnly={true} />
      <ContactSection />
    </>
  );
}
