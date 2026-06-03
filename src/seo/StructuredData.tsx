import { SEO_CONSTANTS } from './constants';

interface StructuredDataProps {
  type?: 'Organization' | 'LocalBusiness' | 'Service' | 'WebSite' | 'FAQPage' | 'BreadcrumbList' | 'WebPage';
  data?: Record<string, unknown>;
}

export function StructuredData({ type = 'Organization', data = {} }: StructuredDataProps) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  let specificSchema = {};

  switch (type) {
    case 'Organization':
      specificSchema = {
        name: SEO_CONSTANTS.SITE_NAME,
        url: SEO_CONSTANTS.BASE_URL,
        logo: `${SEO_CONSTANTS.BASE_URL}/brand/prezenti-mark.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: SEO_CONSTANTS.PHONE_PLACEHOLDER,
          contactType: 'customer service',
          email: SEO_CONSTANTS.EMAIL_PLACEHOLDER,
        },
        sameAs: [
          // 'https://www.facebook.com/prezenti',
          // 'https://www.linkedin.com/company/prezenti',
          // 'https://twitter.com/prezenti'
        ],
      };
      break;
    case 'LocalBusiness':
      specificSchema = {
        name: SEO_CONSTANTS.SITE_NAME,
        image: SEO_CONSTANTS.DEFAULT_IMAGE,
        '@id': SEO_CONSTANTS.BASE_URL,
        url: SEO_CONSTANTS.BASE_URL,
        telephone: SEO_CONSTANTS.PHONE_PLACEHOLDER,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SEO_CONSTANTS.ADDRESS_PLACEHOLDER,
          addressLocality: SEO_CONSTANTS.CITY_PLACEHOLDER,
          addressRegion: SEO_CONSTANTS.STATE_PLACEHOLDER,
          postalCode: SEO_CONSTANTS.POSTAL_CODE_PLACEHOLDER,
          addressCountry: SEO_CONSTANTS.COUNTRY_PLACEHOLDER,
        },
      };
      break;
    case 'Service':
      specificSchema = {
        name: data.name || 'Facility Management Services',
        provider: {
          '@type': 'Organization',
          name: SEO_CONSTANTS.SITE_NAME,
          url: SEO_CONSTANTS.BASE_URL,
        },
        description: data.description || SEO_CONSTANTS.DEFAULT_DESCRIPTION,
        ...(data.serviceType ? { serviceType: data.serviceType } : {}),
        ...(data.areaServed ? { areaServed: data.areaServed } : {}),
      };
      break;
    case 'WebSite':
      specificSchema = {
        name: SEO_CONSTANTS.SITE_NAME,
        url: SEO_CONSTANTS.BASE_URL,
      };
      break;
    case 'WebPage':
      specificSchema = {
        name: SEO_CONSTANTS.SITE_NAME,
        url: SEO_CONSTANTS.BASE_URL,
      };
      break;
    case 'FAQPage':
      specificSchema = {
        mainEntity: Array.isArray(data.faqs) ? data.faqs.map((faq: { question: string; answer: string }) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })) : [],
      };
      break;
    case 'BreadcrumbList':
      specificSchema = {
        itemListElement: Array.isArray(data.breadcrumbs) ? data.breadcrumbs.map((crumb: { name: string; url: string }, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${SEO_CONSTANTS.BASE_URL}${crumb.url}`,
        })) : [],
      };
      break;
  }

  // Handle case where some data props need to be merged for generic types not strictly defined
  const schema = { ...baseSchema, ...specificSchema };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
