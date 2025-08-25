"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, MessageCircle } from "lucide-react"
import { siteConfig } from "@/lib/site-config"
import { sendContactMessage } from "@/app/actions/contact"

export function ContactSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    const formData = new FormData(formRef.current!)
    const result = await sendContactMessage(formData)

    setIsSubmitting(false)

    if (result.success) {
      setFormStatus({ type: "success", message: result.message || "Message sent successfully!" })
      formRef.current?.reset()
    } else {
      setFormStatus({ type: "error", message: result.error || "Failed to send message. Please try again." })
    }
  }

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
  ]

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
    }
  ]

  return (
    <section ref={sectionRef} id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-slide-up" : "opacity-0"}`}>
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
                  I'm always interested in hearing about new opportunities and exciting projects. Whether you're a
                  company looking to hire, or you're a fellow developer wanting to collaborate, I'd love to hear from
                  you.
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
                        <a
                          href={info.href}
                          className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                        >
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
                      <span className="text-xs text-muted-foreground text-center mt-1 truncate w-full">
                        {app.value}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent>
                {formStatus.type && (
                  <div
                    className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
                      formStatus.type === "success"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {formStatus.type === "success" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input id="name" name="name" placeholder="Your name" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input id="email" name="email" type="email" placeholder="your@email.com" required />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input id="subject" name="subject" placeholder="Project inquiry" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
