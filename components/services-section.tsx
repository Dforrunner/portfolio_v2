"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { services } from "@/lib/services";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { ContactDialog } from "./contact-dialog";
import { GlassCard } from "./glass-card";

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <div className="min-h-screen" id="services">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-5xl font-bold tracking-tight text-balance">
            Services That Drive{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Results
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400 text-pretty leading-relaxed">
            Full-stack solutions tailored to your business needs. From concept to deployment, I
            deliver high-quality applications that scale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
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
                <div
                  className={`mb-6 inline-flex rounded-xl bg-gradient-to-br ${service.color} p-3 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-2xl font-bold text-balance">{service.title}</h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400 leading-relaxed text-pretty">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300 animate group-hover:animate-slideIn"
                      style={{
                        animation:
                          hoveredIndex === index
                            ? `slideIn 0.3s ease-out ${featureIndex * 0.1}s both`
                            : "none",
                      }}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.color}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="flex items-center gap-2 text-sm font-semibold transition-all cursor-pointer">
                  <span
                    className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                  >
                    Learn More
                  </span>
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
                  <div
                    className={`rounded-xl bg-gradient-to-br ${services[selectedService].color} p-3 shadow-lg`}
                  >
                    {(() => {
                      const Icon = services[selectedService].icon;
                      return <Icon className="h-6 w-6 text-white" />;
                    })()}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-2xl font-bold mb-2">
                      {services[selectedService].title}
                    </DialogTitle>
                    <p className="dark:text-slate-400 leading-relaxed">
                      {services[selectedService].detailedDescription}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Benefits Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span
                      className={`bg-gradient-to-r ${services[selectedService].color} bg-clip-text text-transparent`}
                    >
                      Key Benefits
                    </span>
                  </h3>
                  <ul className="space-y-3">
                    {services[selectedService].benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check
                          className={`h-5 w-5 mt-0.5 flex-shrink-0 text-white bg-gradient-to-r ${services[selectedService].color} rounded-full p-0.5`}
                        />
                        <span className="dark:text-slate-300 leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Section */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span
                      className={`bg-gradient-to-r ${services[selectedService].color} bg-clip-text text-transparent`}
                    >
                      What You'll Get
                    </span>
                  </h3>
                  <ul className="space-y-3">
                    {services[selectedService].deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div
                          className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${services[selectedService].color} mt-2`}
                        />
                        <span className="dark:text-slate-300 leading-relaxed">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                {/* <div className="pt-4 border-t border-slate-800">
                  <button
                    className={`w-full rounded-lg bg-gradient-to-r ${services[selectedService].color} px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl`}
                  >
                    Get Started with {services[selectedService].title}
                  </button>
                </div> */}
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
