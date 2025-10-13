'use client';

import { Award, Code2, Heart, Rocket, Target, TrendingUp, Users, Zap } from 'lucide-react';
import { GlassCard } from './glass-card';
import TextClamp from './text-clamp';

const skills = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'React, Next.js, TypeScript, Node.js, PostgreSQL',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Modern Technologies',
    description: 'AI Integration, Serverless, Edge Computing',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Rocket,
    title: 'Performance Optimization',
    description: 'Core Web Vitals, SEO, Lighthouse Scores',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Target,
    title: 'Business Focus',
    description: 'ROI-driven solutions that drive growth',
    color: 'from-orange-500 to-red-500',
  },
];

const stats = [
  { number: '80+', label: 'Projects Delivered', icon: Award },
  { number: '100%', label: 'Client Satisfaction', icon: Heart },
  { number: '6+', label: 'Years Experience', icon: TrendingUp },
  { number: '24/7', label: 'Support Available', icon: Users },
];

export function AboutSection() {
  return (
    <section className="relative scroll-mt-13 md:scroll-mt-16" id="about">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="bg-accent/5 animate-rotate-glow absolute -top-25 -left-20 size-45 rounded-full lg:-top-56 lg:-left-40 lg:size-96"
          style={{ animationDelay: '2s' }}
        />
      </div>

      <div className="container mx-auto px-3 pt-5 md:px-4">
        {/* Stats Section */}
        <div className="mb-20 grid grid-cols-2 gap-2 md:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={index} index={index}>
                {/* Gradient Background */}
                <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20" />

                <div className="relative">
                  <Icon className="mb-4 h-8 w-8 text-blue-400 transition-transform duration-500 group-hover:scale-110" />
                  <div className="mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-4xl font-bold text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</div>
                </div>
              </GlassCard>
            );
          })}
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <div className="mb-12 text-center">
            <TextClamp
              maxFont={38}
              minFont={30}
              as="h2"
              className="mb-4 font-bold tracking-tight text-balance"
            >
              What I Bring to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                The Table
              </span>
            </TextClamp>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-pretty text-slate-400">
              A comprehensive skill set focused on delivering exceptional results
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:gap-6 lg:grid-cols-4">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <GlassCard key={index} index={index}>
                  {/* Icon */}
                  <div
                    className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${skill.color} p-2 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6 md:p-3`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <TextClamp
                    maxFont={18}
                    minFont={14}
                    as="h3"
                    className="mb-2 font-bold text-balance"
                  >
                    {skill.title}
                  </TextClamp>
                  <p className="text-sm leading-relaxed text-pretty text-slate-500 dark:text-slate-400">
                    {skill.description}
                  </p>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Story Section */}
        <div className="mb-20">
          <div className="relative overflow-hidden rounded-3xl border border-slate-300 p-3 backdrop-blur-sm lg:p-12 dark:border-slate-800 dark:bg-slate-900/50">
            {/* Gradient Background */}
            <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-10 blur-3xl" />
            <div className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 opacity-10 blur-3xl" />

            <div className="relative">
              <TextClamp
                minFont={18}
                maxFont={30}
                as="h2"
                className="mb-4 font-bold tracking-tight text-balance"
              >
                My{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Approach
                </span>
              </TextClamp>

              <div className="space-y-4 leading-relaxed text-slate-700 md:text-lg dark:text-slate-300">
                <p>
                  I believe great software is more than just code—it's about solving real problems
                  and creating experiences that users love. Every project I take on is an
                  opportunity to push boundaries and deliver something exceptional.
                </p>

                <p>
                  My process is collaborative and transparent. I work closely with clients to
                  understand their vision, provide regular updates, and ensure the final product
                  exceeds expectations. Whether you're a startup looking to launch your MVP or an
                  established business scaling your platform, I bring the technical expertise and
                  business acumen to make it happen.
                </p>

                <p>
                  When I'm not coding, I'm staying up-to-date with the latest technologies,
                  contributing to open-source projects, and helping other developers grow. I'm
                  passionate about what I do, and it shows in the quality of my work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
