'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { siteConfig } from '@/lib/site-config';
import { Mail, MapPin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useRef } from 'react';
import { ContactForm } from './contact-form';

const Globe = dynamic(() => import('./ui/globe').then((x) => x.Globe), {
  ssr: false,
});

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      value: siteConfig.location,
      href: '#',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="scroll-mt-13 overflow-hidden py-10 md:scroll-mt-16"
    >
      <div className="container mx-auto px-4">
        <div>
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold md:text-5xl">Get In Touch</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
              Ready to start your next project? Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-6 text-2xl font-bold">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in hearing about new opportunities and exciting projects.
                  Whether you're a company looking to hire, or you're a fellow developer wanting to
                  collaborate, I'd love to hear from you.
                </p>
              </div>

              <div className="relative h-full space-y-6 overflow-hidden">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg">
                      <info.icon className="text-primary h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      {info.href !== '#' ? (
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary cursor-pointer transition-colors"
                          aria-label={info.label}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}

                <Globe className="top-20 left-0 -z-10 opacity-35" />
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gradient-primary">
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
