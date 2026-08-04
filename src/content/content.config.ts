import { SEO_CONSTANTS } from '../seo/constants';

export const contentConfig = {
  organizationName: 'Prezenti Facility Management',
  brandName: 'Prezenti',
  baseUrl: SEO_CONSTANTS.BASE_URL,
  defaultAuthor: 'Prezenti Editorial Team',
  contactDetails: {
    phone: '+91-9545464195',
    email: 'info@prezenti.in',
    address: 'Pune, Maharashtra', // Can be expanded with full address
  },
  socialProfiles: {
    linkedin: 'https://www.linkedin.com/company/prezenti', // Update with actual
    twitter: 'https://twitter.com/prezenti', // Update with actual
    facebook: 'https://facebook.com/prezenti', // Update with actual
  },
  supportedLocations: [
    'pune',
    'mumbai',
    'navi-mumbai',
    'thane',
    'nashik',
    'aurangabad',
    'nagpur',
  ],
  supportedIndustries: [
    'it-companies',
    'hospitals',
    'manufacturing',
    'warehouses',
    'retail',
    'hotels',
    'schools',
    'banks',
  ],
  imageDefaults: {
    ogImage: '/images/og-default.jpg',
    twitterCard: 'summary_large_image',
  },
  defaultSchemaSettings: {
    logoUrl: 'https://prezenti.in/images/logo.png', // Update with actual
  },
  defaultMetadata: {
    description: 'Prezenti is a leading enterprise facility management company offering professional housekeeping, security, and staffing services across Maharashtra.',
  }
};
