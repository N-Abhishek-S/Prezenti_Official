import { SEO_CONSTANTS } from './constants';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SEO_CONSTANTS.SITE_NAME,
  url: SEO_CONSTANTS.BASE_URL,
  logo: `${SEO_CONSTANTS.BASE_URL}/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-1234567890', // To be updated
    contactType: 'customer service',
    areaServed: 'IN',
    availableLanguage: ['en', 'hi', 'mr'],
  },
  sameAs: [
    'https://www.linkedin.com/company/prezenti',
    'https://www.facebook.com/prezenti',
  ],
});

export const generateLocalBusinessSchema = (areaServed: string = 'Pune') => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: SEO_CONSTANTS.SITE_NAME,
  image: `${SEO_CONSTANTS.BASE_URL}/og-image.jpg`,
  '@id': `${SEO_CONSTANTS.BASE_URL}/#localbusiness`,
  url: SEO_CONSTANTS.BASE_URL,
  telephone: '+91-1234567890', // To be updated
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
