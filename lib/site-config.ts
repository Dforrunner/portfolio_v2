export const siteConfig = {
  name: "Muhammet Barut",
  title: "Freelance Full-Stack Developer",
  description:
    "Experienced freelance developer helping businesses build powerful web applications and digital solutions",
  url: "https://mobarut.dev",
  logo: "/logo.svg",
  email: "mo@mobarut.dev",
  phone: "+1 (555) 123-4567",
  location: "Available Worldwide",
  social: {
    github: "https://github.com/mobarut",
    linkedin: "https://linkedin.com/in/muhammet-barut",
    twitter: "https://twitter.com/mobarut",
  },
  navigation: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ],
  skills: {
    frontend: [
      { name: "React", icon: "⚛️" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Next.js", icon: "▲" },
      { name: "Tailwind CSS", icon: "🎨" },
      { name: "Vue.js", icon: "💚" },
    ],
    backend: [
      { name: "Node.js", icon: "🟢" },
      { name: "Python", icon: "🐍" },
      { name: "PostgreSQL", icon: "🐘" },
      { name: "MongoDB", icon: "🍃" },
      { name: "GraphQL", icon: "🔗" },
    ],
    tools: [
      { name: "Git", icon: "📝" },
      { name: "Docker", icon: "🐳" },
      { name: "AWS", icon: "☁️" },
      { name: "Vercel", icon: "▲" },
      { name: "Figma", icon: "🎨" },
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
      "Delivered 75+ successful projects for clients worldwide",
      "Helped 15+ startups launch their MVP products",
      "Maintained 98% client satisfaction rate",
      "Available for long-term partnerships and ongoing support",
    ],
  },
}

export type SiteConfig = typeof siteConfig
