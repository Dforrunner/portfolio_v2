import BlogSection from "@/components/blog-section";
import { CtaCard } from "@/components/cta-components";
import { siteConfig } from "@/lib/site-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | " + siteConfig.name,
  description:
    "Read the latest articles on web development, AI integrations, SaaS platforms, and modern technologies. Stay updated with practical guides, tutorials, and insights.",
  openGraph: {
    title: "Blog | " + siteConfig.name,
    description:
      "Explore articles on web development, AI integrations, SaaS platforms, and modern technologies. Get tutorials, guides, and expert insights.",
    type: "website",
    url: siteConfig.url + "/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | " + siteConfig.name,
    description:
      "Discover tutorials, guides, and insights on web development, AI integrations, SaaS, and modern technologies.",
  },
};

export default async function BlogPage() {
  return (
    <div className="min-h-screen">
      <BlogSection />
      <CtaCard/>
    </div>
  );
}
