import { siteConfig } from "@/lib/site-config";

export function SEOSchema() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${siteConfig.name} - Freelance Development Services`,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Remote",
      addressCountry: "Worldwide",
    },
    founder: {
      "@type": "Person",
      name: siteConfig.name,
      alternateName: "Mo Barut",
      jobTitle: "Freelance Full-Stack Developer",
    },
    serviceType: "Full Stack Developer Services",
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Full Stack Developer Services",
      itemListElement: siteConfig.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(organizationSchema),
      }}
    />
  );
}
