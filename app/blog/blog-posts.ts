export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  gradient: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "ai-integration-business-2025",
    title: "Why Your Business Needs AI Integration in 2025",
    excerpt: "Discover how AI automation can reduce operational costs by 40% and transform your customer experience. Learn the exact strategies top companies use.",
    category: "AI & Automation",
    readTime: "8 min read",
    date: "Jan 15, 2025",
    image: "/ai-artificial-intelligence-neural-network-technolo.jpg",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: 2,
    slug: "modern-web-development-guide-2025",
    title: "The Complete Guide to Modern Web Development in 2025",
    excerpt: "From Next.js 15 to React Server Components, learn the cutting-edge technologies that deliver lightning-fast websites and exceptional user experiences.",
    category: "Web Development",
    readTime: "12 min read",
    date: "Jan 10, 2025",
    image: "/modern-web-development-code-programming.jpg",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    slug: "stripe-payment-integration-best-practices",
    title: "Stripe Payment Integration: Best Practices for 2025",
    excerpt: "Implement secure, conversion-optimized payment flows that customers trust. Learn how to handle subscriptions, webhooks, and complex billing scenarios.",
    category: "Payment Processing",
    readTime: "10 min read",
    date: "Jan 5, 2025",
    image: "/payment-processing-credit-card-checkout.jpg",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    slug: "seo-optimization-strategies-that-work",
    title: "SEO Optimization Strategies That Actually Work",
    excerpt: "Stop guessing and start ranking. Learn the technical SEO strategies that drive organic traffic and convert visitors into customers.",
    category: "SEO",
    readTime: "9 min read",
    date: "Dec 28, 2024",
    image: "/seo-search-engine-optimization-analytics.jpg",
    gradient: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    slug: "database-performance-scaling",
    title: "Database Performance: Scaling from Zero to Millions",
    excerpt: "Learn how to design database architectures that handle millions of records efficiently. From schema design to query optimization.",
    category: "Database",
    readTime: "11 min read",
    date: "Dec 20, 2024",
    image: "/database-server-data-management.jpg",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    id: 6,
    slug: "web-hosting-maintenance-vercel",
    title: "Web Hosting & Maintenance: The Vercel Advantage",
    excerpt: "Why Vercel is the best hosting platform for modern web applications. Learn about edge computing, automatic scaling, and zero-downtime deployments.",
    category: "Hosting",
    readTime: "7 min read",
    date: "Dec 15, 2024",
    image: "/cloud-hosting-server-infrastructure.jpg",
    gradient: "from-slate-500 to-zinc-500",
  },
];
