"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ContactForm } from "./contact-form";

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: siteConfig.phone,
      href: `tel:${siteConfig.phone}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: siteConfig.location,
      href: "#",
    },
  ];

  const communicationApps = [
    {
      name: "WhatsApp",
      icon: "💬",
      value: siteConfig.communication.whatsapp,
      href: `https://wa.me/${siteConfig.communication.whatsapp.replace(/[^0-9]/g, "")}`,
      color: "hover:text-green-600",
    },
    {
      name: "Telegram",
      icon: "✈️",
      value: siteConfig.communication.telegram,
      href: `https://t.me/${siteConfig.communication.telegram.replace("@", "")}`,
      color: "hover:text-blue-500",
    },
    {
      name: "Line",
      icon: "📱",
      value: siteConfig.communication.line,
      href: `https://line.me/ti/p/~${siteConfig.communication.line}`,
      color: "hover:text-green-500",
    },
  ];

  return (
    <section ref={sectionRef} id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Ready to start your next project? Let's discuss how we can work together.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I'm always interested in hearing about new opportunities and exciting projects. Whether you're a company looking to hire, or you're a fellow developer wanting to collaborate, I'd
                  love to hear from you.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{info.label}</p>
                      {info.href !== "#" ? (
                        <a href={info.href} className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Communication Apps */}
              <div className="mt-12">
                <h4 className="text-lg font-semibold mb-6 flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-primary" />
                  Chat with Me
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {communicationApps.map((app, index) => (
                    <a
                      key={index}
                      href={app.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center p-4 rounded-lg bg-card border hover:border-primary/50 transition-all duration-300 hover:shadow-md cursor-pointer ${app.color}`}
                    >
                      <span className="text-2xl mb-2">{app.icon}</span>
                      <span className="text-sm font-medium text-center">{app.name}</span>
                      <span className="text-xs text-muted-foreground text-center mt-1 truncate w-full">{app.value}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
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
