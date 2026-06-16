import { SEO_CONSTANTS } from './constants';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SEO_CONSTANTS.SITE_NAME,
  url: SEO_CONSTANTS.BASE_URL,
  logo: `${SEO_CONSTANTS.BASE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: SEO_CONSTANTS.PHONE,
    email: SEO_CONSTANTS.CONTACT_EMAIL,
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'mr'],
  },
  sameAs: [
    SEO_CONSTANTS.SOCIAL_LINKS.YOUTUBE,
    SEO_CONSTANTS.SOCIAL_LINKS.INSTAGRAM,
    SEO_CONSTANTS.SOCIAL_LINKS.FACEBOOK,
    SEO_CONSTANTS.SOCIAL_LINKS.X
  ],
});

export const generateLocalBusinessSchema = (areaServed: string = 'Pune') => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SEO_CONSTANTS.SITE_NAME,
  image: `${SEO_CONSTANTS.BASE_URL}/og-image.jpg`,
  '@id': `${SEO_CONSTANTS.BASE_URL}/#localbusiness`,
  url: SEO_CONSTANTS.BASE_URL,
  telephone: SEO_CONSTANTS.PHONE,
  email: SEO_CONSTANTS.CONTACT_EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Corporate HQ, Phase 1',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411057',
    addressCountry: 'IN'
  },
  areaServed: {
    '@type': 'City',
    name: areaServed
  },
  priceRange: '₹₹',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ],
    opens: '09:00',
    closes: '18:00'
  }
});

export const generateFaqSchema = (faqs: { question: string, answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
    }
  }))
});

export const generateServiceSchema = (serviceName: string, description: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: serviceName,
  provider: {
    '@type': 'LocalBusiness',
    name: SEO_CONSTANTS.SITE_NAME
  },
  areaServed: {
    '@type': 'State',
    name: 'Maharashtra'
  },
  description: description
});
