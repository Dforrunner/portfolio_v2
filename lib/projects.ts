export type ProjectType =
  | "web-app"
  | "npm"
  | "chrome-extension"
  | "ai-integration"
  | "saas"
  | "open-source";

export interface Project {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription?: string;
  type: ProjectType;
  featured: boolean;
  gradient: string;
  icon: string;

  // Tech stack
  technologies: string[];

  // Media
  images: {
    desktop?: string;
    tablet?: string;
    mobile?: string;
    thumbnail: string;
  };

  // Optional iframe
  iframeUrl?: string;

  // Links
  links: {
    live?: string;
    github?: string;
    npm?: string;
    chrome?: string;
  };

  gallery?: Array<{
    url: string;
    caption?: string;
    alt: string;
  }>;

  // Details
  features: string[];
  challenges?: string[];
  results?: string[];

  // SEO
  metaDescription: string;

  // Dates
  startDate: string;
  endDate?: string;
  year: string;
}

const mockProjects: Project[] = [
  {
    id: 1,
    slug: "ai-powered-saas-platform",
    title: "AI-Powered SaaS Platform",
    tagline: "Intelligent automation for modern businesses",
    description:
      "A comprehensive SaaS platform that leverages AI to automate business workflows, analyze data, and provide actionable insights. Built with Next.js, TypeScript, and integrated with OpenAI's GPT-4 for intelligent features.",
    type: "saas",
    featured: true,
    gradient: "from-purple-500 to-pink-500",
    icon: "🤖",
    technologies: ["Next.js", "TypeScript", "OpenAI", "Stripe", "Supabase", "Tailwind CSS"],
    images: {
      desktop: "/ai-saas-dashboard-desktop-view.jpg",
      tablet: "/ai-saas-dashboard-tablet-view.jpg",
      mobile: "/ai-saas-dashboard-mobile-view.jpg",
      thumbnail: "/ai-saas-platform-thumbnail.jpg",
    },
    links: {
      live: "https://example.com",
      github: "https://github.com/username/project",
    },
    features: [
      "AI-powered workflow automation",
      "Real-time data analytics dashboard",
      "Stripe subscription billing",
      "Team collaboration features",
      "Advanced security with row-level security",
      "RESTful API for integrations",
    ],
    challenges: [
      "Implementing real-time AI processing with low latency",
      "Designing a scalable database architecture for multi-tenant SaaS",
      "Optimizing API costs while maintaining performance",
    ],
    results: [
      "Reduced operational costs by 40% for early adopters",
      "Achieved 99.9% uptime in production",
      "Processed over 1M AI requests with <2s response time",
    ],
    metaDescription:
      "AI-powered SaaS platform built with Next.js and OpenAI. Automate workflows, analyze data, and scale your business.",
    startDate: "2024-01",
    year: "2024",
  },
  {
    id: 2,
    slug: "react-animation-library",
    title: "React Animation Library",
    tagline: "Beautiful animations made simple",
    description:
      "A lightweight, performant React animation library with TypeScript support. Provides declarative APIs for complex animations with zero dependencies.",
    type: "npm",
    featured: true,
    gradient: "from-blue-500 to-cyan-500",
    icon: "📦",
    technologies: ["React", "TypeScript", "Framer Motion", "Rollup", "Jest"],
    images: {
      thumbnail: "/react-animation-library-code-examples.jpg",
    },
    links: {
      npm: "https://npmjs.com/package/example",
      github: "https://github.com/username/react-animation-lib",
    },
    features: [
      "Zero dependencies, <5KB gzipped",
      "Full TypeScript support",
      "Declarative animation API",
      "Spring physics animations",
      "Gesture support",
      "SSR compatible",
    ],
    results: ["10K+ weekly downloads on npm", "Used by 500+ projects", "4.8/5 star rating"],
    metaDescription:
      "Lightweight React animation library with TypeScript support. Beautiful animations with zero dependencies.",
    startDate: "2023-06",
    year: "2023",
  },
  {
    id: 3,
    slug: "productivity-chrome-extension",
    title: "Productivity Chrome Extension",
    tagline: "Boost your focus and productivity",
    description:
      "A Chrome extension that helps developers stay focused by blocking distracting websites, tracking time, and providing productivity insights.",
    type: "chrome-extension",
    featured: true,
    gradient: "from-emerald-500 to-teal-500",
    icon: "🔌",
    technologies: ["JavaScript", "Chrome APIs", "IndexedDB", "Chart.js"],
    images: {
      desktop: "/chrome-extension-popup-interface.jpg",
      thumbnail: "/productivity-chrome-extension.jpg",
    },
    links: {
      chrome: "https://chrome.google.com/webstore/detail/example",
      github: "https://github.com/username/productivity-extension",
    },
    features: [
      "Website blocking with custom schedules",
      "Time tracking and analytics",
      "Pomodoro timer integration",
      "Daily productivity reports",
      "Sync across devices",
    ],
    results: [
      "50K+ active users",
      "4.7/5 star rating on Chrome Web Store",
      "Featured in Chrome Web Store",
    ],
    metaDescription:
      "Chrome extension for developers to boost productivity. Block distractions, track time, and stay focused.",
    startDate: "2023-09",
    year: "2023",
  },
  {
    id: 4,
    slug: "e-commerce-platform",
    title: "Modern E-Commerce Platform",
    tagline: "Next-generation online shopping experience",
    description:
      "A full-featured e-commerce platform with advanced search, real-time inventory, and seamless checkout. Built for scale with modern web technologies.",
    type: "web-app",
    featured: true,
    gradient: "from-orange-500 to-red-500",
    icon: "🛍️",
    technologies: ["Next.js", "Stripe", "Algolia", "Vercel", "PostgreSQL"],
    images: {
      desktop: "/e-commerce-website-desktop.jpg",
      tablet: "/e-commerce-website-tablet.jpg",
      mobile: "/e-commerce-website-mobile.jpg",
      thumbnail: "/e-commerce-platform.png",
    },
    iframeUrl: "https://example.com",
    links: {
      live: "https://example.com",
      github: "https://github.com/username/ecommerce",
    },
    features: [
      "Advanced product search with Algolia",
      "Real-time inventory management",
      "Stripe payment integration",
      "Admin dashboard",
      "Order tracking and notifications",
      "Mobile-optimized checkout",
    ],
    results: [
      "Increased conversion rate by 35%",
      "Reduced cart abandonment by 25%",
      "Achieved 95+ PageSpeed score",
    ],
    metaDescription:
      "Modern e-commerce platform built with Next.js and Stripe. Fast, scalable, and conversion-optimized.",
    startDate: "2024-03",
    year: "2024",
  },
  {
    id: 5,
    slug: "ai-content-generator",
    title: "AI Content Generator",
    tagline: "Generate high-quality content in seconds",
    description:
      "An AI-powered tool that generates blog posts, social media content, and marketing copy using GPT-4. Integrated with popular CMS platforms.",
    type: "ai-integration",
    featured: true,
    gradient: "from-indigo-500 to-purple-500",
    icon: "✨",
    technologies: ["Next.js", "OpenAI GPT-4", "Vercel AI SDK", "Supabase"],
    images: {
      desktop: "/ai-content-generator-interface.png",
      tablet: "/ai-content-generator-tablet.jpg",
      mobile: "/ai-content-generator-mobile.jpg",
      thumbnail: "/ai-content-generator.png",
    },
    links: {
      live: "https://example.com",
    },
    features: [
      "GPT-4 powered content generation",
      "Multiple content types (blog, social, ads)",
      "Tone and style customization",
      "SEO optimization suggestions",
      "Export to popular CMS platforms",
      "Content history and versioning",
    ],
    results: [
      "Generated 100K+ pieces of content",
      "Saved users 1000+ hours of writing time",
      "4.9/5 user satisfaction rating",
    ],
    metaDescription:
      "AI-powered content generator using GPT-4. Create blog posts, social media content, and marketing copy instantly.",
    startDate: "2024-02",
    year: "2024",
  },
  {
    id: 6,
    slug: "open-source-ui-library",
    title: "Open Source UI Library",
    tagline: "Beautiful components for modern web apps",
    description:
      "A comprehensive UI component library built with React and Tailwind CSS. Fully accessible, customizable, and production-ready.",
    type: "open-source",
    featured: false,
    gradient: "from-pink-500 to-rose-500",
    icon: "🎨",
    technologies: ["React", "Tailwind CSS", "Radix UI", "Storybook"],
    images: {
      thumbnail: "/ui-component-library-showcase.jpg",
    },
    links: {
      github: "https://github.com/username/ui-library",
      npm: "https://npmjs.com/package/example-ui",
    },
    features: [
      "50+ accessible components",
      "Dark mode support",
      "Full TypeScript support",
      "Storybook documentation",
      "Customizable with Tailwind",
      "Tree-shakeable",
    ],
    results: ["2K+ GitHub stars", "Used by 200+ projects", "Active community of contributors"],
    metaDescription:
      "Open source UI component library built with React and Tailwind CSS. Accessible, customizable, and production-ready.",
    startDate: "2023-01",
    year: "2023",
  },
];

export const projects: Project[] = [
  {
    id: 6,
    slug: "bargoprocare-website",
    title: "BargoProCare Website",
    tagline: "Streamlined scheduling, quotes, and client management",
    description:
      "A comprehensive Next.js website for BargoProCare with PostgreSQL, Prisma, and TailwindCSS. Includes multiple contact options, online quote builder, scheduler, admin dashboard, and automated client communications.",
    longDescription:
      "BargoProCare's website is designed to automate most administrative tasks for the business, including quotes, scheduling, and client communication. The site allows clients to contact the company via multiple channels (call, email, SMS, online contact form) and generate instant quotes online. Once a quote is accepted, clients can schedule appointments using a calendar that only shows available time slots to avoid overlaps. The admin dashboard provides full control over quotes, appointments, and user roles. Admins can update schedules, set availability, block dates, and manage employees. Automated emails are sent to clients for confirmations, updates, and reminders, including custom options to reschedule or cancel bookings online. The system ensures seamless communication and scheduling, letting the business focus on providing services rather than administrative tasks.",
    type: "web-app",
    featured: true,
    gradient: "from-green-500 to-teal-500",
    icon: "🛠️",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "TailwindCSS", "Node.js", "Email Automation"],
    images: {
      desktop: "/bargoprosrv-desktop.png",
      tablet: "/bargoprosrv-tablet.jpg",
      mobile: "/bargoprosrv-mobile.jpg",
      thumbnail: "/bargoprosrv.png",
    },
    links: {
      live: "https://bargo.moproserv.com/",
    },
    features: [
      "Multiple client contact options: call, email, SMS, online contact form",
      "Online quote builder with instant quote generation",
      "Integrated scheduler to book available time slots only",
      "Admin dashboard with password and Google authentication",
      "View, reschedule, delete, or update quotes and appointments",
      "Automated email notifications for confirmations, updates, and reminders",
      "Custom emails for clients to manage bookings online (cancel/reschedule)",
      "Interactive admin calendar with full control over availability and bookings",
      "Role-based user management for employees and admins",
      "Handles most admin work to let the business focus on the service itself",
    ],
    challenges: [
      "Ensuring real-time appointment scheduling without overlaps",
      "Designing an intuitive admin dashboard with role-based permissions",
      "Implementing automated email workflows for confirmations, updates, and reminders",
      "Integrating multiple contact methods seamlessly",
      "Building a scalable architecture with Next.js, PostgreSQL, and Prisma",
    ],
    results: [
      "Streamlined scheduling and quote process",
      "Reduced manual admin workload significantly",
      "Improved client communication with automated emails",
      "Ensured no booking overlaps with availability control",
    ],
    metaDescription:
      "BargoProServ website with Next.js, PostgreSQL, Prisma, and TailwindCSS. Features online quotes, scheduler, admin dashboard, and automated client communication.",
    startDate: "2025-10",
    year: "2025",
  },
  ...mockProjects,
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}

export function getProjectsByType(type: ProjectType): Project[] {
  return projects.filter((project) => project.type === type);
}
