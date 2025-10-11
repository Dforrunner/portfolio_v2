import BlogSection from "@/components/blog-section";
import { CtaCard } from "@/components/cta-components";

export default async function BlogPage() {
  return (
    <div className="min-h-screen">
      <BlogSection />
      <CtaCard/>
    </div>
  );
}
