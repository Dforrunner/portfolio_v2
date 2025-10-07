"use client";

import { useState } from "react";
import { Code2, Brain, CreditCard, Search, Database, Server, ArrowRight, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const services = [
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
    deliverables: ["Fully responsive web application", "Source code and documentation", "Deployment to production", "Post-launch support"],
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
    deliverables: ["Complete SEO audit and recommendations", "Technical SEO implementation", "Performance optimization", "Analytics and tracking setup"],
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
    deliverables: ["Production deployment on Vercel", "CI/CD pipeline setup", "Monitoring and alerting", "Monthly maintenance reports"],
  },
];

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white" id="services">
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
              <div key={index} className="group relative" onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
                {/* Card */}
                <div
                  className={`relative h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-sm transition-all duration-500 ${service.bgGlow} hover:scale-105 hover:border-slate-700 hover:shadow-2xl`}
                >
                  {/* Gradient Orb Background */}
                  <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${service.color} opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20`} />

                  {/* Icon */}
                  <div className={`mb-6 inline-flex rounded-xl bg-gradient-to-br ${service.color} p-3 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-2xl font-bold text-balance">{service.title}</h3>
                  <p className="mb-6 text-slate-400 leading-relaxed text-pretty">{service.description}</p>

                  {/* Features */}
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-2 text-sm text-slate-300"
                        style={{
                          animation: hoveredIndex === index ? `slideIn 0.3s ease-out ${featureIndex * 0.1}s both` : "none",
                        }}
                      >
                        <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.color}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button onClick={() => setSelectedService(index)} className="flex items-center gap-2 text-sm font-semibold transition-all">
                    <span className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}>Learn More</span>
                    <ArrowRight
                      className={`h-4 w-4 transition-transform duration-300 ${hoveredIndex === index ? "translate-x-1" : ""}`}
                      style={{
                        background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                      }}
                    />
                  </button>

                  {/* Shine Effect */}
                  <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%)",
                      transform: hoveredIndex === index ? "translateX(100%)" : "translateX(-100%)",
                      transition: "transform 0.8s ease-in-out",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="mb-6 text-lg text-slate-400">Ready to bring your project to life?</p>
          <button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-blue-500/50">
            <span className="relative z-10">Get Started Today</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>
      </div>

      <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800 text-white">
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
                    <p className="text-slate-400 leading-relaxed">{services[selectedService].detailedDescription}</p>
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
                        <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 bg-gradient-to-r ${services[selectedService].color} rounded-full p-0.5`} />
                        <span className="text-slate-300 leading-relaxed">{benefit}</span>
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
                        <span className="text-slate-300 leading-relaxed">{deliverable}</span>
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
