
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { RiNextjsFill } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
import { FaPython } from "react-icons/fa";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaGitAlt } from "react-icons/fa";
import { IoLogoVercel } from "react-icons/io5";
import { IoLogoFigma } from "react-icons/io5";
import { SiCanva } from "react-icons/si";

export const siteConfig = {
  name: "Muhammet Barut",
  title: "Freelance Full-Stack Developer",
  description:
    "Experienced freelance developer helping businesses build powerful web applications and digital solutions",
  url: "https://mobarut.dev",
  logo: "/logo.svg",
  email: "mo.code.solutions@gmail.com",
  phone: "+1 (802) 310-9538",
  location: "Available Worldwide",
  communication: {
    whatsapp: "+1-802-310-9538",
    telegram: "@mobarut",
    line: "mobarut"
  },
  social: {
    github: "https://github.com/Dforrunner",
    linkedin: "https://www.linkedin.com/in/mo-barut/",
    twitter: "https://x.com/dforrunner?s=21",
  },
  navigation: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    // { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
  skills: {
    frontend: [
      { name: "React", icon: FaReact },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: RiTailwindCssFill },
      { name: "HTML", icon: FaHtml5 }
    ],
    backend: [
      { name: "Node.js", icon: FaNodeJs },
      { name: "Next.js", icon: RiNextjsFill },
      { name: "Python", icon: FaPython },
      { name: "PostgreSQL", icon: BiLogoPostgresql }
    ],
    tools: [
      { name: "Git", icon: FaGitAlt },
      { name: "Vercel", icon: IoLogoVercel },
      { name: "Figma", icon: IoLogoFigma },
      { name: "Canva", icon: SiCanva },
    ],
  },
  projects: [
    {
      id: 1,
      title: "SaaS Analytics Platform",
      description: "Custom analytics dashboard for a fintech startup with real-time data visualization and reporting",
      image: "/modern-ecommerce-dashboard.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Chart.js"],
      github: "https://github.com/mobarut/analytics-platform",
      live: "https://analytics-demo.mobarut.dev",
      featured: true,
    },
    {
      id: 2,
      title: "E-Learning Platform",
      description:
        "Complete learning management system for an education company with video streaming and progress tracking",
      image: "/task-management-interface.png",
      technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      github: "https://github.com/mobarut/elearning-platform",
      live: "https://learning.mobarut.dev",
      featured: true,
    },
    {
      id: 3,
      title: "Restaurant Management System",
      description: "Full-stack solution for restaurant operations including POS, inventory, and customer management",
      image: "/weather-dashboard-interface.png",
      technologies: ["Vue.js", "Express", "MongoDB", "Stripe"],
      github: "https://github.com/mobarut/restaurant-system",
      live: "https://restaurant.mobarut.dev",
      featured: false,
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
}

export type SiteConfig = typeof siteConfig
