"use client"

import { useState } from "react"
import { Monitor, Smartphone, Tablet } from "lucide-react"

interface DeviceMockupsProps {
  images: {
    desktop?: string
    tablet?: string
    mobile?: string
  }
  iframeUrl?: string
  title: string
}

export function DeviceMockups({ images, iframeUrl, title }: DeviceMockupsProps) {
  const [activeDevice, setActiveDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showIframe, setShowIframe] = useState(false)

  const hasDesktop = images.desktop || iframeUrl
  const hasTablet = images.tablet
  const hasMobile = images.mobile

  return (
    <div className="space-y-6">
      {/* Device Selector */}
      <div className="flex items-center justify-center gap-2">
        {hasDesktop && (
          <button
            onClick={() => setActiveDevice("desktop")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeDevice === "desktop"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </button>
        )}
        {hasTablet && (
          <button
            onClick={() => setActiveDevice("tablet")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeDevice === "tablet"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            <Tablet className="h-4 w-4" />
            Tablet
          </button>
        )}
        {hasMobile && (
          <button
            onClick={() => setActiveDevice("mobile")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeDevice === "mobile"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </button>
        )}
        {iframeUrl && activeDevice === "desktop" && (
          <button
            onClick={() => setShowIframe(!showIframe)}
            className={`ml-4 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              showIframe ? "bg-accent text-accent-foreground" : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {showIframe ? "Show Screenshot" : "Show Live Preview"}
          </button>
        )}
      </div>

      {/* Device Mockup */}
      <div className="flex justify-center">
        {activeDevice === "desktop" && (
          <div className="w-full max-w-6xl animate-fade-in-up">
            <DesktopMockup image={images.desktop} iframeUrl={showIframe ? iframeUrl : undefined} title={title} />
          </div>
        )}
        {activeDevice === "tablet" && images.tablet && (
          <div className="max-w-2xl animate-fade-in-up">
            <TabletMockup image={images.tablet} title={title} />
          </div>
        )}
        {activeDevice === "mobile" && images.mobile && (
          <div className="max-w-sm animate-fade-in-up">
            <MobileMockup image={images.mobile} title={title} />
          </div>
        )}
      </div>
    </div>
  )
}

function DesktopMockup({ image, iframeUrl, title }: { image?: string; iframeUrl?: string; title: string }) {
  return (
    <div className="group relative">
      {/* Browser Chrome */}
      <div className="overflow-hidden rounded-t-xl border border-border bg-card shadow-2xl">
        {/* Browser Header */}
        <div className="flex items-center gap-2 border-b border-border bg-muted px-4 py-3">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="ml-4 flex-1 rounded bg-background px-3 py-1 text-xs text-muted-foreground">
            {iframeUrl || "https://example.com"}
          </div>
        </div>

        {/* Content */}
        <div className="aspect-video bg-background">
          {iframeUrl ? (
            <iframe src={iframeUrl} title={title} className="h-full w-full" sandbox="allow-scripts allow-same-origin" />
          ) : image ? (
            <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover object-top" />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">No preview available</div>
          )}
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-8 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/20 blur-2xl transition-all group-hover:w-full" />
    </div>
  )
}

function TabletMockup({ image, title }: { image: string; title: string }) {
  return (
    <div className="group relative">
      {/* Tablet Frame */}
      <div className="overflow-hidden rounded-2xl border-8 border-slate-800 bg-slate-800 shadow-2xl dark:border-slate-700">
        <div className="aspect-[3/4] bg-background">
          <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover object-top" />
        </div>
      </div>

      {/* Home Button */}
      <div className="absolute bottom-2 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-slate-600" />

      {/* Shadow */}
      <div className="absolute -bottom-6 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-full bg-black/20 blur-xl transition-all group-hover:w-full" />
    </div>
  )
}

function MobileMockup({ image, title }: { image: string; title: string }) {
  return (
    <div className="group relative">
      {/* Phone Frame */}
      <div className="overflow-hidden rounded-[2.5rem] border-8 border-slate-800 bg-slate-800 shadow-2xl dark:border-slate-700">
        {/* Notch */}
        <div className="relative bg-background">
          <div className="absolute left-1/2 top-0 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-800 dark:bg-slate-700" />
        </div>

        {/* Screen */}
        <div className="aspect-[9/19.5] bg-background">
          <img src={image || "/placeholder.svg"} alt={title} className="h-full w-full object-cover object-top" />
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-4 left-1/2 h-4 w-1/2 -translate-x-1/2 rounded-full bg-black/20 blur-lg transition-all group-hover:w-3/4" />
    </div>
  )
}
