"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Users, Award, Zap } from "lucide-react"
import { siteConfig } from "@/lib/site-config"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animateStats, setAnimateStats] = useState(false)
  const [animateHighlights, setAnimateHighlights] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          setTimeout(() => setAnimateStats(true), 400)
          setTimeout(() => setAnimateHighlights(true), 600)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Code, label: "Experience", value: siteConfig.about.experience },
    { icon: Award, label: "Projects", value: siteConfig.about.projectsCompleted },
    { icon: Users, label: "Clients", value: siteConfig.about.clientsSatisfied },
    { icon: Zap, label: "Technologies", value: "15+" },
  ]

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className={`transition-all duration-1000 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-scale-in">About Mo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-stagger-2">
              Your trusted partner for building scalable web solutions that drive business growth
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg leading-relaxed mb-8 text-muted-foreground animate-fade-in-left animate-stagger-3">
                {siteConfig.about.bio}
              </p>

              <div className="space-y-4 mb-8">
                <h3 className="text-2xl font-semibold mb-4 animate-fade-in-left animate-stagger-4">Why Choose Mo?</h3>
                {siteConfig.about.highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 ${
                      animateHighlights ? `animate-fade-in-left animate-stagger-${index + 1}` : "opacity-0"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0 animate-pulse-glow" />
                    <p className="text-muted-foreground">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className={`text-center hover:shadow-lg transition-all duration-300 hover-lift hover-glow ${
                    animateStats ? `animate-bounce-in animate-stagger-${index + 1}` : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-4 animate-bounce-in hover:animate-rotate-glow transition-all duration-300" />
                    <div className="text-3xl font-bold text-primary mb-2 animate-scale-in">{stat.value}</div>
                    <div className="text-sm text-muted-foreground animate-fade-in-up">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
