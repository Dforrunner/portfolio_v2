"use client";

import { ContactDialog } from "@/components/contact-dialog";
import { Award, Code2, Heart, Rocket, Target, TrendingUp, Users, Zap } from "lucide-react";
import { useState } from "react";

const skills = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "React, Next.js, TypeScript, Node.js, PostgreSQL",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    title: "Modern Technologies",
    description: "AI Integration, Serverless, Edge Computing",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description: "Core Web Vitals, SEO, Lighthouse Scores",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Target,
    title: "Business Focus",
    description: "ROI-driven solutions that drive growth",
    color: "from-orange-500 to-red-500",
  },
];

const stats = [
  { number: "50+", label: "Projects Delivered", icon: Award },
  { number: "100%", label: "Client Satisfaction", icon: Heart },
  { number: "5+", label: "Years Experience", icon: TrendingUp },
  { number: "24/7", label: "Support Available", icon: Users },
];

export default function AboutSection() {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/50 px-4 py-2 text-sm backdrop-blur-sm">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-slate-400">Available for new projects</span>
          </div>

          <h1 className="mb-6 text-6xl font-bold tracking-tight text-balance">
            Hi, I'm <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Your Full-Stack Developer</span>
          </h1>

          <p className="mx-auto max-w-3xl text-xl text-slate-400 text-pretty leading-relaxed mb-8">
            I turn ideas into powerful web applications that drive real business results. With a passion for clean code and user-centric design, I help businesses scale with modern, performant
            solutions.
          </p>

          <div className="flex items-center justify-center gap-4">
            <ContactDialog />
            <a
              href="#skills"
              className="rounded-lg border border-slate-700 bg-slate-900/50 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/50"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/20"
              >
                {/* Gradient Background */}
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

                <div className="relative">
                  <Icon className="mb-4 h-8 w-8 text-blue-400 transition-transform duration-500 group-hover:scale-110" />
                  <div className="mb-2 text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">{stat.number}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight text-balance">
              What I Bring to <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">The Table</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-slate-400 text-pretty leading-relaxed">A comprehensive skill set focused on delivering exceptional results</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <div key={index} className="group relative" onMouseEnter={() => setHoveredSkill(index)} onMouseLeave={() => setHoveredSkill(null)}>
                  <div className="relative h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-slate-700 hover:shadow-2xl">
                    {/* Gradient Orb */}
                    <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${skill.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />

                    {/* Icon */}
                    <div className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${skill.color} p-3 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="mb-2 text-lg font-bold text-balance">{skill.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed text-pretty">{skill.description}</p>

                    {/* Shine Effect */}
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                        transform: hoveredSkill === index ? "translateX(100%)" : "translateX(-100%)",
                        transition: "transform 0.8s ease-in-out",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-12 backdrop-blur-sm">
            {/* Gradient Background */}
            <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 opacity-10 blur-3xl" />

            <div className="relative">
              <h2 className="mb-6 text-3xl font-bold text-balance">
                My <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Approach</span>
              </h2>

              <div className="space-y-4 text-lg text-slate-300 leading-relaxed">
                <p>
                  I believe great software is more than just code—it's about solving real problems and creating experiences that users love. Every project I take on is an opportunity to push
                  boundaries and deliver something exceptional.
                </p>

                <p>
                  My process is collaborative and transparent. I work closely with clients to understand their vision, provide regular updates, and ensure the final product exceeds expectations.
                  Whether you're a startup looking to launch your MVP or an established business scaling your platform, I bring the technical expertise and business acumen to make it happen.
                </p>

                <p>
                  When I'm not coding, I'm staying up-to-date with the latest technologies, contributing to open-source projects, and helping other developers grow. I'm passionate about what I do, and
                  it shows in the quality of my work.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "AI/ML", "Stripe", "Vercel"].map((tech, index) => (
                  <span
                    key={index}
                    className="rounded-full border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-slate-300 backdrop-blur-sm transition-all duration-300 hover:border-slate-600 hover:bg-slate-700/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 backdrop-blur-sm">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -left-32 top-0 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 blur-3xl" />
              <div className="absolute -right-32 bottom-0 h-64 w-64 animate-pulse rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-3xl" style={{ animationDelay: "1s" }} />
            </div>

            <div className="relative">
              <h2 className="mb-4 text-4xl font-bold text-balance">
                Ready to Build Something <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">Amazing?</span>
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-400 text-pretty leading-relaxed">
                Let's discuss your project and see how I can help bring your vision to life. Book a free consultation—no commitment required.
              </p>
              <ContactDialog />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
