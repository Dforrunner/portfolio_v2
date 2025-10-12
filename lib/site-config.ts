import { Brain, CalculatorIcon, Code2, CreditCard, Database, Github, Search, Server } from "lucide-react";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaGitAlt, FaGoogle, FaHtml5, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { IoLogoFigma, IoLogoVercel } from "react-icons/io5";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiCanva, SiTypescript } from "react-icons/si";
import { LinkedinIcon, XIcon } from "react-share";

export const siteConfig = {
  name: "Mo Barut",
  siteName: "Mo Barut - Full-Stack Developer & Tech Consultant",
  title: "Full-Stack Developer & Tech Consultant",
  shortDescription:
    "I help businesses leverage modern web technologies to build scalable, high-performance applications.",
  description:
    "I help businesses leverage modern web technologies to build scalable, high-performance applications. With 6+ years of experience in full-stack development, I specialize in modern web app development, seo, AI integration, payment systems, and cloud architecture.",
  description2:
    "I turn ideas into powerful web applications that drive real business results. With a passion for clean code and user-centric design, I help businesses scale with modern, performant solutions.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mobarut.dev",
  logo: "/logo-100.webp",
  logoAlt: "Mo Barut's logo",
  ogImage: "og-image.webp",
  profileImage: "/developer-headshot-256.webp",
  email: "mobarutdev@gmail.com",
  phone: "+1 (802) 310-9538",
  phoneDigitsOnly: "+18023109538",
  location: "Available Worldwide",
  communication: {
    whatsapp: "+1-802-310-9538",
    telegram: "@mobarut",
    line: "mobarut",
  },
  account: {
    github: {
      username: "@dforrunner",
      url: "https://github.com/Dforrunner",
      icon: Github,
    },
    linkedin: {
      username: "mo-barut",
      url: "https://www.linkedin.com/in/mo-barut/",
      icon: LinkedinIcon,
    },
    twitter: {
      username: "@dforrunner",
      url: "https://x.com/dforrunner?s=21",
      icon: XIcon,
    },
    googleDev: {
      username: 'mobarut',
      url: 'http://g.dev/mobarut',
      icon: FaGoogle
    },
    cal: {
      username: 'mo-barut',
      url: 'https://cal.com/mo-barut',
      icon: CalculatorIcon
    }
  },
  navigation: [
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Skills", href: "/#skills" },
    { name: "Projects", href: "/#projects" },
    { name: "Blog", href: "/#blog" },
    { name: "Contact", href: "/#contact" },
  ],
  skills: {
    frontend: [
      { name: "React", icon: FaReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: RiTailwindCssFill },
      { name: "HTML", icon: FaHtml5 },
    ],
    backend: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Next.js", icon: RiNextjsFill },
      { name: "Python", icon: FaPython },
      { name: "PostgreSQL", icon: BiLogoPostgresql },
    ],
    tools: [
      { name: "Git", icon: FaGitAlt },
      { name: "Vercel", icon: IoLogoVercel },
      { name: "Figma", icon: IoLogoFigma },
      { name: "Canva", icon: SiCanva },
    ],
  },
  services: [
    {
      icon: Code2,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks and best practices.",
      features: ["React & Next.js", "Responsive Design", "Performance Optimized"],
      color: "from-blue-500 to-cyan-500",
      bgGlow: "group-hover:shadow-blue-500/50",
      detailedDescription:
        "Transform your vision into a powerful web application that drives business growth. I specialize in building lightning-fast, scalable applications using cutting-edge technologies like React, Next.js, and TypeScript.",
      benefits: [
        "Lightning-fast performance with 90+ PageSpeed scores",
        "Mobile-first responsive design that works on all devices",
        "SEO-optimized architecture for maximum visibility",
        "Scalable codebase that grows with your business",
        "Modern UI/UX that converts visitors into customers",
        "Clean, maintainable code following industry best practices",
      ],
      deliverables: [
        "Fully responsive web application",
        "Source code and documentation",
        "Deployment to production",
        "Post-launch support",
      ],
    },
    {
      icon: Brain,
      title: "AI Integration & Automation",
      description: "Leverage cutting-edge AI to automate workflows and enhance user experiences.",
      features: ["ChatGPT Integration", "Workflow Automation", "Smart Features"],
      color: "from-purple-500 to-pink-500",
      bgGlow: "group-hover:shadow-purple-500/50",
      detailedDescription:
        "Stay ahead of the competition by integrating AI into your applications. From intelligent chatbots to automated workflows, I help businesses leverage AI to save time, reduce costs, and deliver exceptional user experiences.",
      benefits: [
        "Reduce operational costs by automating repetitive tasks",
        "24/7 AI-powered customer support with chatbots",
        "Intelligent content generation and personalization",
        "Data analysis and insights powered by machine learning",
        "Seamless integration with OpenAI, Anthropic, and more",
        "Custom AI solutions tailored to your specific needs",
      ],
      deliverables: [
        "AI-powered features integrated into your app",
        "Custom prompts and fine-tuning",
        "API integration and optimization",
        "Training and documentation",
      ],
    },
    {
      icon: CreditCard,
      title: "Payment Processing",
      description: "Secure payment solutions with Stripe integration for seamless transactions.",
      features: ["Stripe Integration", "Subscription Billing", "Secure Checkout"],
      color: "from-emerald-500 to-teal-500",
      bgGlow: "group-hover:shadow-emerald-500/50",
      detailedDescription:
        "Start accepting payments in minutes with secure, PCI-compliant payment processing. I implement robust payment systems using Stripe that handle one-time purchases, subscriptions, and complex billing scenarios.",
      benefits: [
        "Accept credit cards, Apple Pay, Google Pay, and more",
        "Automated subscription billing and invoicing",
        "Secure, PCI-compliant payment processing",
        "Real-time payment tracking and analytics",
        "Support for multiple currencies and payment methods",
        "Webhook integration for automated workflows",
      ],
      deliverables: [
        "Complete payment system integration",
        "Checkout flow and payment forms",
        "Subscription management dashboard",
        "Payment webhook handlers",
      ],
    },
    {
      icon: Search,
      title: "SEO Optimization",
      description: "Boost your visibility with technical SEO and performance optimization.",
      features: ["Technical SEO", "Core Web Vitals", "Schema Markup"],
      color: "from-orange-500 to-red-500",
      bgGlow: "group-hover:shadow-orange-500/50",
      detailedDescription:
        "Get found by your target audience with comprehensive SEO optimization. I implement technical SEO best practices, optimize Core Web Vitals, and ensure your site ranks higher in search results.",
      benefits: [
        "Higher search engine rankings and organic traffic",
        "Optimized Core Web Vitals for better user experience",
        "Structured data and schema markup implementation",
        "Meta tags, Open Graph, and Twitter Cards optimization",
        "XML sitemaps and robots.txt configuration",
        "Performance optimization for faster load times",
      ],
      deliverables: [
        "Complete SEO audit and recommendations",
        "Technical SEO implementation",
        "Performance optimization",
        "Analytics and tracking setup",
      ],
    },
    {
      icon: Database,
      title: "Database Management",
      description: "Scalable database solutions with PostgreSQL, Supabase, and more.",
      features: ["PostgreSQL", "Real-time Data", "Data Migration"],
      color: "from-indigo-500 to-blue-500",
      bgGlow: "group-hover:shadow-indigo-500/50",
      detailedDescription:
        "Build a solid foundation for your application with robust database architecture. I design and implement scalable database solutions using PostgreSQL, Supabase, and modern ORMs that handle millions of records efficiently.",
      benefits: [
        "Scalable database architecture that grows with you",
        "Real-time data synchronization across devices",
        "Secure data storage with row-level security",
        "Automated backups and disaster recovery",
        "Optimized queries for lightning-fast performance",
        "Seamless data migration from existing systems",
      ],
      deliverables: [
        "Database schema design and implementation",
        "API endpoints for data access",
        "Data migration scripts",
        "Database documentation",
      ],
    },
    {
      icon: Server,
      title: "Web Hosting & Maintenance",
      description: "Reliable hosting on Vercel with ongoing support and updates.",
      features: ["Vercel Deployment", "24/7 Monitoring", "Regular Updates"],
      color: "from-slate-500 to-zinc-500",
      bgGlow: "group-hover:shadow-slate-500/50",
      detailedDescription:
        "Focus on your business while I handle the technical details. I provide reliable hosting on Vercel's global edge network with continuous monitoring, regular updates, and proactive maintenance to keep your site running smoothly.",
      benefits: [
        "99.9% uptime with global CDN distribution",
        "Automatic SSL certificates and security updates",
        "24/7 monitoring and instant issue resolution",
        "Regular performance optimization and updates",
        "Automated backups and version control",
        "Priority support for critical issues",
      ],
      deliverables: [
        "Production deployment on Vercel",
        "CI/CD pipeline setup",
        "Monitoring and alerting",
        "Monthly maintenance reports",
      ],
    },
  ],
  projects: [
    {
      id: 1,
      title: "BargoProCare - Business Website",
      description:
        "Custom business website that is SEO optimized, with online booking, quote generation, automated emails, scheduling, progress tracking and more",
      image: "/bargoprocare-landing.webp",
      technologies: ["Next.js", "PostgreSQL", "Tailwind", "Mailgun", "NextAuth"],
      live: "https://bargo.moproserv.com",
      github: "",
      featured: true,
    },
  ],
  about: {
    bio: "I'm Mo, a freelance full-stack developer with 6+ years of experience helping businesses transform their ideas into powerful web applications. I specialize in building scalable solutions that drive growth and deliver exceptional user experiences for my clients.",
    experience: "6+ years",
    projectsCompleted: "75+",
    clientsSatisfied: "45+",
    highlights: [
      "🤖 AI-powered automation solutions that reduce manual work by 70%",
      "⚡ Lightning-fast development with modern frameworks and best practices",
      "🚀 End-to-end solutions from MVP to enterprise-scale applications",
      "💰 ROI-focused development that increases revenue and reduces costs",
      "🔧 Custom integrations with APIs, payment systems, and third-party tools",
      "📱 Mobile-first responsive designs that work perfectly on all devices",
      "🛡️ Enterprise-grade security and performance optimization",
    ],
    images: {
      headshot: "/mo-headshot.jpg",
      casual: "/mo-casual.jpg",
      workspace: "/mo-workspace.jpg",
    },
  },
};

export type SiteConfig = typeof siteConfig;
