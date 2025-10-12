import { AboutSection } from "@/components/about-section";
import BlogSection from "@/components/blog-section";
import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { ProjectsSection2 } from "@/components/projects-section2";
import ServicesSection from "@/components/services-section";
import SkillsSection from "@/components/skill-section";
import { getFeaturedProjects } from "@/lib/projects";

export default async function Home() {
  const projects = await getFeaturedProjects();
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SkillsSection />
      <ProjectsSection2 projects={projects} />
      <BlogSection featuredOnly={true} />
      <ContactSection />
    </main>
  );
}
