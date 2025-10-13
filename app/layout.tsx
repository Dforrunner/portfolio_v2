import { Footer } from "@/components/footer";
import { InViewObserver } from "@/components/in-view-observer";
import { Navigation } from "@/components/navigation";
import { SEOSchema } from "@/components/seo-schema";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site-config";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";
import { seoKeywords } from "@/lib/keywords";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
  keywords: seoKeywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.description,
    creator: siteConfig.account.twitter.username,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={siteConfig.url} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main className="min-h-screen bg-gradient-primary relative">{children}</main>
          <Footer />
          <Suspense>
            <InViewObserver />
          </Suspense>
        </ThemeProvider>

        <SEOSchema />
  
        {process.env.NODE_ENV === "production" && <GoogleAnalytics gaId="G-Z3KN4MJNZ2" />}
      </body>
    </html>
  );
}
