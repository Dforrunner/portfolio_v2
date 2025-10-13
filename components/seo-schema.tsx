import { siteConfig } from '@/lib/site-config';

export function SEOSchema() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${siteConfig.name} - ${siteConfig.title}`,
    description: siteConfig.description,
    url: siteConfig.url,
    email: siteConfig.email,
    image: siteConfig.profileImage,
    sameAs: Object.values(siteConfig.account).map((account) => account.url),
    jobTitle: siteConfig.title,
    worksFor: {
      '@type': 'Organization',
      name: 'Self-Employed',
    },
    knowsAbout: Array(
      new Set([
        'Web Development',
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'PostgreSQL',
        'Payment Processing',
        'AI Integration',
        'Automation',
        'Full-Stack Development',
        'SaaS Development',
        'Python',
        ...Object.values(siteConfig.skills)
          .flat()
          .map((s) => s.name),
      ])
    ),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Remote',
      addressCountry: 'Worldwide',
    },
    founder: {
      '@type': 'Person',
      name: siteConfig.name,
      alternateName: 'Muhammet Barut',
      jobTitle: siteConfig.title,
    },
    serviceType: 'Full Stack Developer Services',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Full Stack Developer Services',
      itemListElement: siteConfig.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
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
