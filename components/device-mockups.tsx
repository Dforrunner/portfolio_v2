'use client';

import { useConnectionSpeed } from '@/hooks/use-connection-speed';
import { useIsDesktop } from '@/hooks/use-is-desktop';
import { Battery, Monitor, Signal, Smartphone, Wifi } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
interface DeviceMockupsProps {
  images: {
    desktop?: string;
    mobile?: string;
  };
  iframeUrl?: string;
  title: string;
  showStatusBar?: boolean;
  showSafariBar?: boolean;
}

function LazyIframe({
  src,
  title,
  className,
  iframeStyle,
}: {
  src: string;
  title: string;
  className?: string;
  iframeStyle?: React.CSSProperties;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
        }
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={iframeRef} className={className}>
      {isLoaded ? (
        <iframe
          src={src}
          title={title}
          className="h-full w-full"
          sandbox="allow-scripts allow-same-origin"
          loading="lazy"
          style={iframeStyle}
        />
      ) : (
        <div className="text-muted-foreground flex h-full items-center justify-center">
          <div className="animate-pulse">Loading preview...</div>
        </div>
      )}
    </div>
  );
}

export function DeviceMockups({
  images,
  iframeUrl,
  title,
  showStatusBar = false,
  showSafariBar = false,
}: DeviceMockupsProps) {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const isGoodConnection = useConnectionSpeed();
  const [showIframe, setShowIframe] = useState(!!iframeUrl && isGoodConnection);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (iframeUrl && isGoodConnection && isDesktop) {
      setShowIframe(true);
    }
  }, [iframeUrl, isGoodConnection, isDesktop]);

  const hasDesktop = images.desktop || iframeUrl;
  const hasMobile = images.mobile || iframeUrl;

  return (
    <div className="space-y-6">
      {/* Device Selector */}
      <div className="flex items-center justify-center gap-2">
        {hasDesktop && (
          <button
            onClick={() => setActiveDevice('desktop')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeDevice === 'desktop'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            <Monitor className="h-4 w-4" />
            Desktop
          </button>
        )}
        {hasMobile && (
          <button
            onClick={() => setActiveDevice('mobile')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              activeDevice === 'mobile'
                ? 'bg-primary text-primary-foreground shadow-lg'
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </button>
        )}
        {iframeUrl && isDesktop && (
          <button
            onClick={() => setShowIframe(!showIframe)}
            className={`rounded-lg px-1 py-2 text-xs font-medium transition-all sm:px-4 ${
              showIframe
                ? 'bg-accent text-accent-foreground'
                : 'bg-card text-muted-foreground hover:bg-muted'
            }`}
          >
            {showIframe ? 'Show Screenshot' : 'Show Live Preview'}
          </button>
        )}
      </div>

      {/* Device Mockup */}
      <div className="flex justify-center">
        {activeDevice === 'desktop' && (
          <div className="animate-fade-in-up w-full max-w-6xl">
            <DesktopMockup
              image={images.desktop}
              iframeUrl={showIframe && iframeUrl && isDesktop ? iframeUrl : undefined}
              title={title}
            />
          </div>
        )}
        {activeDevice === 'mobile' && (
          <div className="animate-fade-in-up max-w-sm">
            <MobileMockup
              image={images.mobile}
              iframeUrl={showIframe && iframeUrl && isDesktop ? iframeUrl : undefined}
              title={title}
              showStatusBar={showStatusBar}
              showSafariBar={showSafariBar}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function DesktopMockup({
  image,
  iframeUrl,
  title,
}: {
  image?: string;
  iframeUrl?: string;
  title: string;
}) {
  return (
    <div className="group relative">
      {/* Browser Chrome */}
      <div className="border-border bg-card overflow-hidden rounded-t-xl border shadow-2xl">
        {/* Browser Header */}
        <div className="border-border bg-muted flex items-center gap-2 border-b px-4 py-3">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="bg-background text-muted-foreground ml-4 flex-1 rounded px-3 py-1 text-xs">
            {iframeUrl || 'https://example.com'}
          </div>
        </div>

        {/* Content */}
        <div className="bg-background aspect-video">
          {iframeUrl ? (
            <LazyIframe src={iframeUrl} title={title} className="h-full w-full" />
          ) : image ? (
            <Image
              src={image || '/placeholder.svg'}
              alt={title}
              className="h-full w-full object-cover object-top"
              loading="lazy"
              width={1200}
              height={630}
            />
          ) : (
            <div className="text-muted-foreground flex h-full items-center justify-center">
              No preview available
            </div>
          )}
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-8 left-1/2 h-8 w-3/4 -translate-x-1/2 rounded-full bg-black/20 blur-2xl transition-all group-hover:w-full" />
    </div>
  );
}

function MobileMockup({
  image,
  iframeUrl,
  title,
  showStatusBar = false,
  showSafariBar = false,
}: {
  image?: string;
  iframeUrl?: string;
  title: string;
  showStatusBar?: boolean;
  showSafariBar?: boolean;
}) {
  return (
    <div className="group relative">
      {/* Phone Frame */}
      <div className="overflow-hidden rounded-[2.5rem] border-8 border-slate-800 bg-slate-800 shadow-2xl dark:border-slate-700">
        {/* Notch */}
        <div className="bg-background relative">
          <div className="absolute top-0 left-1/2 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-slate-800 dark:bg-slate-700" />
        </div>

        {/* Screen */}
        <div className="bg-background aspect-[9/19.5]">
          {/* iOS Status Bar */}
          {showStatusBar && (
            <div className="text-foreground relative z-10 flex items-center justify-between px-6 pt-3 pb-2 text-xs font-medium">
              {/* Left side - Time */}
              <div className="flex items-center gap-1">
                <span>9:41</span>
              </div>

              {/* Right side - Signal, WiFi, Battery */}
              <div className="flex items-center gap-1">
                <Signal className="h-3 w-3" />
                <Wifi className="h-3 w-3" />
                <Battery className="h-3 w-3" />
              </div>
            </div>
          )}

          {/* Safari Search Bar */}
          {showSafariBar && (
            <div className="relative z-10 mx-3 mt-2 mb-3">
              <div className="bg-muted/50 flex items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-sm">
                {/* AA Text Size Button */}
                <button className="text-muted-foreground text-xs font-bold">aA</button>

                {/* URL/Search Field */}
                <div className="text-muted-foreground flex-1 text-center text-xs">
                  {title || 'Search or enter website name'}
                </div>

                {/* Refresh Button */}
                <button className="text-muted-foreground">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Content */}
          {iframeUrl ? (
            <LazyIframe
              src={iframeUrl}
              title={title}
              className="h-full w-full"
              iframeStyle={{
                width: '370px',
                height: '886px', // iPhone 12/13/14 dimensions
                transform: 'scale(1)',
                transformOrigin: 'top center',
              }}
            />
          ) : (
            <Image
              src={image || '/placeholder.svg'}
              alt={title}
              className="h-full w-full object-cover object-top"
              width={370}
              height={886}
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* Shadow */}
      <div className="absolute -bottom-4 left-1/2 h-4 w-1/2 -translate-x-1/2 rounded-full bg-black/20 blur-lg transition-all group-hover:w-3/4" />
    </div>
  );
}
