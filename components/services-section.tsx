"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowRight, Brain, Check, Code2, CreditCard, Database, Search, Server } from "lucide-react";
import { useState } from "react";
import { ContactDialog } from "./contact-dialog";
import { GlassCard } from "./glass-card";

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description: "Custom web applications built with modern frameworks and best practices.",
    features: ["React & Next.js", "Responsive Design", "Performance Optimized", "SaaS MVP"],
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
    deliverables: ["Fully responsive web application", "Source code and documentation", "Deployment to production", "Post-launch support"],
  },
  {
    icon: Brain,
    title: "AI Integration & Automation",
    description: "Leverage cutting-edge AI to automate workflows and enhance user experiences.",
    features: ["Any Integration", "Workflow Automation", "Smart Features", "AI SaaS"],
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
    deliverables: ["AI-powered features integrated into your app", "Custom prompts and fine-tuning", "API integration and optimization", "Training and documentation"],
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
    deliverables: ["Complete payment system integration", "Checkout flow and payment forms", "Subscription management dashboard", "Payment webhook handlers"],
  },
  {
    icon: Search,
    title: "SEO & GEO Optimization",
    description: "Boost your visibility with technical SEO, GEO and performance optimization.",
    features: ["Technical SEO", "GEO - SEO For AI", "Core Web Vitals", "Schema Markup"],
    color: "from-orange-500 to-red-500",
    bgGlow: "group-hover:shadow-orange-500/50",
    detailedDescription:
      "Get found by your target audience with comprehensive SEO & GEO optimization. I implement technical SEO best practices, optimize Core Web Vitals, and ensure your site ranks higher in search results. I also optimize for GEO (Generative Engine Optimization) which focuses on getting content recognized and used within AI-generated answers and summaries by tools like ChatGPT. This increases the changes for your brand/business to get mentioned in AI chat results",
    benefits: [
      "Higher search engine rankings and organic traffic",
      "Ensure your brand's content is chosen and featured in AI-generated answers and summaries",
      "Optimized Core Web Vitals for better user experience",
      "Structured data and schema markup implementation",
      "Meta tags, Open Graph, and Twitter Cards optimization",
      "XML sitemaps and robots.txt configuration",
      "Performance optimization for faster load times",
    ],
    deliverables: [
      "Complete SEO audit and recommendations",
      "Complete GEO audit and recommendations",
      "Technical SEO & GEO implementation",
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
    deliverables: ["Database schema design and implementation", "API endpoints for data access", "Data migration scripts", "Database documentation"],
  },
  {
    icon: Server,
    title: "Web Hosting & Maintenance",
    description: "Reliable hosting and domain management with ongoing support and updates.",
    features: ["Cloud Deployment", "24/7 Monitoring", "Security Audits", "Regular Updates"],
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
    deliverables: ["Production deployment on Vercel", "CI/CD pipeline setup", "Monitoring and alerting", "Monthly maintenance reports"],
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div className="min-h-screen " id="services">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-balance">
            Services That Drive <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Results</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 text-pretty leading-relaxed">
            Full-stack solutions tailored to your business needs. From concept to deployment, I deliver high-quality applications that scale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <GlassCard
                key={index}
                innerGlowColor={service.color}
                bgGlowColor={service.bgGlow}
                shine={hoveredIndex === index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setSelectedService(index)}
              >
                {/* Icon */}
                <div className={`mb-6 inline-flex rounded-xl bg-gradient-to-br ${service.color} p-3 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-bold text-balance">{service.title}</h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed text-pretty">{service.description}</p>

                {/* Features */}
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300 animate group-hover:animate-slideIn"
                      style={{
                        animation: hoveredIndex === index ? `slideIn 0.3s ease-out ${featureIndex * 0.1}s both` : "none",
                      }}
                    >
                      <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="flex items-center gap-2 text-sm font-semibold transition-all cursor-pointer">
                  <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Learn More</span>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`}
                    style={{
                      background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  />
                </button>
              </GlassCard>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-slate-400">Ready to bring your project to life?</p>
          <ContactDialog buttonText="Get Started Today" />
        </div>
      </div>

      <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-primary">
          {selectedService !== null && (
            <>
              <DialogHeader>
                <div className="flex items-start gap-4">
                  <div className={`rounded-xl bg-gradient-to-br ${services[selectedService].color} p-3 shadow-lg`}>
                    {(() => {
                      const Icon = services[selectedService].icon;
                      return <Icon className="h-6 w-6 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold mb-2">{services[selectedService].title}</DialogTitle>
                    <p className="dark:text-slate-400 leading-relaxed">{services[selectedService].detailedDescription}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Benefits Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className={`bg-gradient-to-r ${services[selectedService].color} bg-clip-text text-transparent`}>Key Benefits</span>
                  </h3>
                  <ul className="space-y-3">
                    {services[selectedService].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 text-white bg-gradient-to-r ${services[selectedService].color} rounded-full p-0.5`} />
                        <span className="dark:text-slate-300 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className={`bg-gradient-to-r ${services[selectedService].color} bg-clip-text text-transparent`}>What You'll Get</span>
                  </h3>
                  <ul className="space-y-3">
                    {services[selectedService].deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${services[selectedService].color} mt-2`} />
                        <span className="dark:text-slate-300 leading-relaxed">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-slate-800">
                  <button
                    className={`w-full rounded-lg bg-gradient-to-r ${services[selectedService].color} px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    Get Started with {services[selectedService].title}
                  </button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Keyframes for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
