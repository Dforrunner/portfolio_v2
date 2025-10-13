"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import {
  CreditCardIcon,
  DatabaseIcon,
  GitBranchIcon,
  PaletteIcon,
  SearchIcon,
  ServerIcon,
  SparklesIcon,
} from "lucide-react";
import { BiLogoPostgresql } from "react-icons/bi";
import { FaCloud, FaGitAlt, FaHtml5, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { IoLogoFigma, IoLogoVercel } from "react-icons/io5";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiCanva, SiTypescript } from "react-icons/si";
import TextClamp from "./text-clamp";

const skills = [
  // Frontend
  {
    name: "React",
    icon: FaReact,
    color: "from-[#61DAFB] to-cyan-400",
    description: "Building dynamic, component-based UIs with hooks and context",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "from-[#3178C6] to-blue-400",
    description: "Type-safe development for scalable applications",
  },
  {
    name: "Tailwind CSS",
    icon: RiTailwindCssFill,
    color: "from-[#06B6D4] to-cyan-300",
    description: "Utility-first CSS for rapid UI development",
  },
  {
    name: "HTML5",
    icon: FaHtml5,
    color: "from-[#E34F26] to-orange-400",
    description: "Semantic markup and accessibility standards",
  },
  // Backend
  {
    name: "Node.js",
    icon: FaNodeJs,
    color: "from-[#339933] to-green-400",
    description: "Server-side JavaScript runtime for APIs",
  },
  {
    name: "Next.js",
    icon: RiNextjsFill,
    color: "from-foreground to-muted-foreground",
    description: "Full-stack React framework with SSR and API routes",
  },
  {
    name: "Python",
    icon: FaPython,
    color: "from-[#3776AB] to-blue-300",
    description: "Data processing, automation, and AI integration",
  },
  {
    name: "PostgreSQL",
    icon: BiLogoPostgresql,
    color: "from-[#4169E1] to-blue-500",
    description: "Relational database design and optimization",
  },
  // Tools
  {
    name: "Git",
    icon: FaGitAlt,
    color: "from-[#F05032] to-orange-500",
    description: "Version control and collaborative development",
  },
  {
    name: "Azure",
    icon: FaCloud,
    color: "from-[#0078D4] to-blue-400",
    description: "Cloud infrastructure and deployment solutions",
  },
  {
    name: "DevOps",
    icon: GitBranchIcon,
    color: "from-accent-cyan to-cyan-400",
    description: "CI/CD pipelines and automation workflows",
  },
  {
    name: "Vercel",
    icon: IoLogoVercel,
    color: "from-foreground to-muted-foreground",
    description: "Modern deployment platform for web applications",
  },
  {
    name: "Figma",
    icon: IoLogoFigma,
    color: "from-[#F24E1E] to-red-400",
    description: "UI/UX design and prototyping",
  },
  {
    name: "Canva",
    icon: SiCanva,
    color: "from-[#00C4CC] to-cyan-400",
    description: "Graphic design and visual content creation",
  },
  // Specialties
  {
    name: "AI Integration",
    icon: SparklesIcon,
    color: "from-accent-purple to-purple-400",
    description: "OpenAI, Anthropic & custom AI solutions",
  },
  {
    name: "SEO & GEO",
    icon: SearchIcon,
    color: "from-accent-emerald to-emerald-400",
    description: "Search optimization & geolocation services",
  },
  {
    name: "Payment Processing",
    icon: CreditCardIcon,
    color: "from-accent-blue to-blue-400",
    description: "Stripe, PayPal integration and checkout flows",
  },
  {
    name: "Database Management",
    icon: DatabaseIcon,
    color: "from-accent-cyan to-cyan-400",
    description: "SQL, NoSQL optimization and data modeling",
  },
  {
    name: "Web Hosting",
    icon: ServerIcon,
    color: "from-accent-orange to-orange-400",
    description: "Cloud infrastructure and server management",
  },
  {
    name: "Graphic Design",
    icon: PaletteIcon,
    color: "from-accent-pink to-pink-400",
    description: "UI/UX design, branding, and visual identity",
  },
];

// Split skills into 4 columns for the marquee
const firstColumn = skills.slice(0, 5);
const secondColumn = skills.slice(5, 10);
const thirdColumn = skills.slice(10, 15);
const fourthColumn = skills.slice(15, 20);

const SkillCard = ({
  name,
  icon: Icon,
  color,
  description,
}: {
  name: string;
  icon: any;
  color: string;
  description: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-36 md:w-56 lg:w-64 cursor-pointer overflow-hidden rounded-xl border p-2 lg:p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        "transition-all duration-300 hover:shadow-lg hover:shadow-accent-blue/20"
      )}
    >
      <div className="flex flex-col md:gap-3">
        {/* Icon and Name */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 blur-xl transition-opacity duration-500`}
            />
            <div className={`relative z-10 p-1 md:p-2 rounded-lg bg-gradient-to-br ${color}`}>
              <Icon className="h-6 w-6 text-white drop-shadow-lg" />
            </div>
          </div>
          <figcaption className="text-xs md:text-sm font-semibold">{name}</figcaption>
        </div>
        {/* Description */}
        <blockquote className="text-xs text-muted-foreground leading-relaxed">
          {description}
        </blockquote>
      </div>
    </figure>
  );
};

export default function SkillsSection() {
  return (
    <>
      <div className="from-background dark:from-[#080F22] inset-x-0 bottom-0 h-20 bg-gradient-to-t"></div>
      <section
        className="relative overflow-hidden bg-background dark:bg-[#080F22] scroll-mt-14 md:scroll-mt-18"
        id="skills"
      >
        <div className="z-10 mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <TextClamp
              maxFont={48}
              minFont={24}
              as="h2"
              className="font-bold mb-4"
            >
              Skills &{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Expertise
              </span>
            </TextClamp>

            <p className="md:text-lg max-w-lg text-muted-foreground mx-auto">
              A comprehensive toolkit of modern technologies and specialized skills I use to bring
              ideas to life
            </p>
          </div>

          {/* 3D Marquee */}
          <div className="relative flex h-[600px] w-full flex-row items-center justify-center overflow-hidden [perspective:1000px]">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            <div
              className="flex flex-row"
              style={{
                transform:
                  "translateX(-50px) translateY(0px) translateZ(-50px) rotateX(15deg) rotateY(-15deg) rotateZ(10deg)",
              }}
            >
              {/* Column 1 */}
              <Marquee pauseOnHover vertical className="[--duration:25s]">
                {firstColumn.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </Marquee>

              {/* Column 2 */}
              <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
                {secondColumn.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </Marquee>

              {/* Column 3 */}
              <Marquee pauseOnHover vertical className="[--duration:25s]">
                {thirdColumn.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </Marquee>

              {/* Column 4 */}
              <Marquee reverse pauseOnHover vertical className="[--duration:25s]">
                {fourthColumn.map((skill) => (
                  <SkillCard key={skill.name} {...skill} />
                ))}
              </Marquee>
            </div>

            {/* Gradient overlays */}
            <div className="from-background dark:from-[#080F22] pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b"></div>
            <div className="from-background dark:from-[#080F22] pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t"></div>
            <div className="from-background dark:from-[#080F22] pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r hidden md:inline"></div>
            <div className="from-background dark:from-[#080F22] pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l hidden md:inline"></div>
          </div>
        </div>
      </section>
      <div className="from-background dark:from-[#080F22] inset-x-0 bottom-0 h-20 bg-gradient-to-b"></div>
    </>
  );
}
