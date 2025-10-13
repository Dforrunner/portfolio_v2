'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { services } from '@/lib/services';
import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { ContactDialog } from './contact-dialog';
import { GlassCard } from './glass-card';
import TextClamp from './text-clamp';

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  return (
    <section className="scroll-mt-13 md:scroll-mt-16" id="services">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <TextClamp
            maxFont={48}
            minFont={24}
            as="h2"
            className="mb-4 font-bold tracking-tight text-balance"
          >
            Services That Drive{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Results
            </span>
          </TextClamp>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-pretty text-slate-400">
            Full-stack solutions tailored to your business needs. From concept to deployment, I
            deliver high-quality applications that scale.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <GlassCard
                key={index}
                innerGlowColor={service.color}
                bgGlowColor={service.bgGlow}
                onClick={() => setSelectedService(index)}
                index={index}
              >
                {/* Icon */}
                <div
                  className={`mb-6 inline-flex rounded-xl bg-gradient-to-br ${service.color} p-3 shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <TextClamp
                  maxFont={24}
                  minFont={18}
                  as="h2"
                  className="mb-4 font-bold text-balance"
                >
                  {service.title}
                </TextClamp>

                <p className="mb-6 leading-relaxed text-pretty text-slate-600 dark:text-slate-400">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="mb-6 space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className={`group-hover:animate-slide-in flex items-center gap-2 text-sm text-slate-500 dark:text-slate-300 animate-stagger-${index}`}
                    >
                      <div
                        className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${service.color}`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="flex cursor-pointer items-center gap-2 text-sm font-semibold transition-all">
                  <span
                    className={`bg-gradient-to-r ${service.color} bg-clip-text text-transparent`}
                  >
                    Learn More
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1`}
                    style={{
                      background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
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
        <DialogContent className="bg-gradient-primary max-h-[90vh] max-w-3xl overflow-y-auto">
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
                    <DialogTitle className="mb-2 text-2xl font-bold">
                      {services[selectedService].title}
                    </DialogTitle>
                    <p className="leading-relaxed dark:text-slate-400">
                      {services[selectedService].detailedDescription}
                    </p>
                  </div>
                </div>
              </DialogHeader>

              <div className="mt-6 space-y-6">
                {/* Benefits Section */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
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
                          className={`mt-0.5 h-5 w-5 flex-shrink-0 bg-gradient-to-r text-white ${services[selectedService].color} rounded-full p-0.5`}
                        />
                        <span className="leading-relaxed dark:text-slate-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables Section */}
                <div>
                  <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold">
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
                        <span className="leading-relaxed dark:text-slate-300">{deliverable}</span>
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
    </section>
  );
}
