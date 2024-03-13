import AboutMeSection from '@/components/AboutMeSection';
import ContactSection from '@/components/ContactSection';
import LandingSection from '@/components/HomeSection';
import ScrollToTopFab from '@/components/ScrollToTopFab';
import SkillsSection from '@/components/SkillsSection';

export default function Home() {
  return (
    <main>
      <LandingSection />
      <AboutMeSection />
      <SkillsSection />
      {/* <ServicesSection /> */}
      {/* <PortfolioSection /> */}
      <ContactSection />
      <ScrollToTopFab />
    </main>
  );
}
