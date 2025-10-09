import { Metadata } from "next";
import { notFound } from "next/navigation";
// import { blogPosts } from "../blog-posts";
import { siteConfig } from "@/lib/site-config";
import { getPostBySlug } from "../post.util";
import {
  AIIntegrationContent,
  DatabasePerformanceContent,
  SEOOptimizationContent,
  StripePaymentContent,
  WebDevelopmentContent,
  WebHostingContent,
} from "./content";
import BlogPostClient from "./page.client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mobarut.dev";
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = `${siteUrl}${post.image}`;

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: "Your Name" }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: "Full Stack Developer Portfolio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: "@yourusername",
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}

function getPostContent(slug: string) {
  switch (slug) {
    case "ai-integration-business-2025":
      return <AIIntegrationContent />;
    case "modern-web-development-guide-2025":
      return <WebDevelopmentContent />;
    case "stripe-payment-integration-best-practices":
      return <StripePaymentContent />;
    case "seo-optimization-strategies-that-work":
      return <SEOOptimizationContent />;
    case "database-performance-scaling":
      return <DatabasePerformanceContent />;
    case "web-hosting-maintenance-vercel":
      return <WebHostingContent />;
    default:
      return null;
  }
}
