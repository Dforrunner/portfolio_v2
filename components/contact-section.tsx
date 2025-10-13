"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { Mail, MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { ContactForm } from "./contact-form";

const Globe = dynamic(() => import("./ui/globe").then((x) => x.Globe), {
  ssr: false,
});

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: siteConfig.location,
      href: "#",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-10 overflow-hidden scroll-mt-13 md:scroll-mt-16"
    >
      <div className="container mx-auto px-4  ">
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to start your next project? Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in hearing about new opportunities and exciting projects.
                  Whether you're a company looking to hire, or you're a fellow developer wanting to
                  collaborate, I'd love to hear from you.
                </p>
              </div>

              <div className="space-y-6 relative overflow-hidden h-full">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      {info.href !== "#" ? (
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
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

                <Globe className="left-0 top-20 -z-10 opacity-35" />
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
