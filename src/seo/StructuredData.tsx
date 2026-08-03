import { SEO_CONSTANTS } from './constants';

type SchemaType =
  | 'Organization'
  | 'LocalBusiness'
  | 'ProfessionalService'
  | 'Service'
  | 'WebSite'
  | 'FAQPage'
  | 'BreadcrumbList'
  | 'WebPage'
  | 'ContactPage'
  | 'AboutPage'
  | 'SoftwareApplication'
  | 'ItemList'
  | 'SiteNavigationElement'
  | 'Blog'
  | 'BlogPosting'
  | 'Article';

interface StructuredDataProps {
  type?: SchemaType;
  data?: Record<string, unknown>;
}

const organizationId = `${SEO_CONSTANTS.BASE_URL}/#organization`;
const websiteId = `${SEO_CONSTANTS.BASE_URL}/#website`;

export function StructuredData({ type = 'Organization', data = {} }: StructuredDataProps) {
  const dataUrl = typeof data.url === 'string' ? data.url : undefined;
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  let specificSchema: Record<string, unknown> = {};

  switch (type) {
    case 'Organization':
      specificSchema = {
        '@id': organizationId,
        name: SEO_CONSTANTS.SITE_NAME,
        url: SEO_CONSTANTS.BASE_URL,
        logo: {
          '@type': 'ImageObject',
          url: `${SEO_CONSTANTS.BASE_URL}/brand/prezenti-mark.png`,
        },
        image: SEO_CONSTANTS.DEFAULT_IMAGE,
        description: SEO_CONSTANTS.DEFAULT_DESCRIPTION,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: SEO_CONSTANTS.CONTACT_EMAIL,
          areaServed: SEO_CONSTANTS.COUNTRY,
          availableLanguage: ['English', 'Hindi', 'Marathi'],
        },
        areaServed: SEO_CONSTANTS.AREA_SERVED.map((name) => ({
          '@type': 'City',
          name,
        })),
      };
      break;
    case 'LocalBusiness':
      specificSchema = {
        '@id': `${SEO_CONSTANTS.BASE_URL}/#localbusiness`,
        name: SEO_CONSTANTS.SITE_NAME,
        image: SEO_CONSTANTS.DEFAULT_IMAGE,
        url: SEO_CONSTANTS.BASE_URL,
        email: SEO_CONSTANTS.CONTACT_EMAIL,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: data.city || SEO_CONSTANTS.CITY,
          addressRegion: SEO_CONSTANTS.STATE,
          addressCountry: SEO_CONSTANTS.COUNTRY,
        },
        areaServed: SEO_CONSTANTS.AREA_SERVED.map((name) => ({
          '@type': 'Place',
          name,
        })),
      };
      break;
    case 'ProfessionalService':
      specificSchema = {
        '@id': dataUrl ? `${dataUrl}#professionalservice` : `${SEO_CONSTANTS.BASE_URL}/#professionalservice`,
        name: data.name || SEO_CONSTANTS.SITE_NAME,
        image: SEO_CONSTANTS.DEFAULT_IMAGE,
        url: dataUrl || SEO_CONSTANTS.BASE_URL,
        email: SEO_CONSTANTS.CONTACT_EMAIL,
        priceRange: '$$',
        description: data.description || SEO_CONSTANTS.DEFAULT_DESCRIPTION,
        address: {
          '@type': 'PostalAddress',
          addressLocality: data.city || SEO_CONSTANTS.CITY,
          addressRegion: SEO_CONSTANTS.STATE,
          addressCountry: SEO_CONSTANTS.COUNTRY,
        },
        areaServed: SEO_CONSTANTS.AREA_SERVED.map((name) => ({
          '@type': 'Place',
          name,
        })),
      };
      break;
    case 'Service':
      specificSchema = {
        name: data.name || 'Facility Management Services',
        '@id': dataUrl ? `${dataUrl}#service` : `${SEO_CONSTANTS.BASE_URL}/#service`,
        provider: {
          '@type': 'Organization',
          '@id': organizationId,
          name: SEO_CONSTANTS.SITE_NAME,
          url: SEO_CONSTANTS.BASE_URL,
        },
        description: data.description || SEO_CONSTANTS.DEFAULT_DESCRIPTION,
        areaServed: SEO_CONSTANTS.AREA_SERVED.map((name) => ({
          '@type': 'Place',
          name,
        })),
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Corporate offices, commercial buildings, IT parks, and workplace operations teams',
        },
        ...(data.serviceType ? { serviceType: data.serviceType } : {}),
      };
      break;
    case 'WebSite':
      specificSchema = {
        '@id': websiteId,
        name: SEO_CONSTANTS.SITE_NAME,
        url: SEO_CONSTANTS.BASE_URL,
        description: data.description || SEO_CONSTANTS.DEFAULT_DESCRIPTION,
        publisher: {
          '@type': 'Organization',
          '@id': organizationId,
        },
        inLanguage: 'en-IN',
      };
      break;
    case 'WebPage':
      specificSchema = {
        '@id': dataUrl ? `${dataUrl}#webpage` : `${SEO_CONSTANTS.BASE_URL}/#webpage`,
        name: data.name || SEO_CONSTANTS.SITE_NAME,
        description: data.description || SEO_CONSTANTS.DEFAULT_DESCRIPTION,
        url: dataUrl || SEO_CONSTANTS.BASE_URL,
        isPartOf: {
          '@type': 'WebSite',
          '@id': websiteId,
        },
        about: {
          '@type': 'Organization',
          '@id': organizationId,
        },
        inLanguage: 'en-IN',
      };
      break;
    case 'ContactPage':
      specificSchema = {
        '@id': dataUrl ? `${dataUrl}#contactpage` : `${SEO_CONSTANTS.BASE_URL}/#contactpage`,
        name: data.name || 'Contact Us | Prezenti',
        description: data.description || 'Get in touch with Prezenti for facility management and staffing solutions.',
        url: dataUrl || SEO_CONSTANTS.BASE_URL,
        mainEntity: {
          '@type': 'Organization',
          '@id': organizationId,
        },
        inLanguage: 'en-IN',
      };
      break;
    case 'AboutPage':
      specificSchema = {
        '@id': dataUrl ? `${dataUrl}#aboutpage` : `${SEO_CONSTANTS.BASE_URL}/#aboutpage`,
        name: data.name || 'About Us | Prezenti',
        description: data.description || 'Learn about Prezenti, a leading facility management and corporate staffing company.',
        url: dataUrl || SEO_CONSTANTS.BASE_URL,
        mainEntity: {
          '@type': 'Organization',
          '@id': organizationId,
        },
        inLanguage: 'en-IN',
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
        itemListElement: Array.isArray(data.breadcrumbs) ? [
          { name: 'Home', url: '/' },
          ...(data.breadcrumbs as { name: string; url: string }[]),
        ].map((crumb: { name: string; url: string }, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: crumb.url.startsWith('http') ? crumb.url : `${SEO_CONSTANTS.BASE_URL}${crumb.url}`,
        })) : [],
      };
      break;
    case 'SoftwareApplication':
      specificSchema = {
        name: 'Prezenti',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web, Android, iOS',
        description: data.description || SEO_CONSTANTS.DEFAULT_DESCRIPTION,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'INR',
          category: 'Contact for pricing',
        },
        publisher: {
          '@type': 'Organization',
          '@id': organizationId,
        },
      };
      break;
    case 'ItemList':
      specificSchema = {
        name: data.name || 'Prezenti services',
        itemListElement: Array.isArray(data.items) ? data.items.map((item: { name: string; url: string; description?: string }, index: number) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: item.url.startsWith('http') ? item.url : `${SEO_CONSTANTS.BASE_URL}${item.url}`,
          name: item.name,
          description: item.description,
        })) : [],
      };
      break;
    case 'SiteNavigationElement':
      specificSchema = {
        name: data.name || 'Site navigation',
        hasPart: Array.isArray(data.items) ? data.items.map((item: { name: string; url: string }) => ({
          '@type': 'WebPage',
          name: item.name,
          url: item.url.startsWith('http') ? item.url : `${SEO_CONSTANTS.BASE_URL}${item.url}`,
        })) : [],
      };
      break;
    case 'Blog':
      specificSchema = {
        '@id': dataUrl ? `${dataUrl}#blog` : `${SEO_CONSTANTS.BASE_URL}/blog#blog`,
        name: data.name || 'Prezenti Blog',
        description: data.description || 'Facility Management Insights',
        url: dataUrl || `${SEO_CONSTANTS.BASE_URL}/blog`,
        publisher: {
          '@type': 'Organization',
          '@id': organizationId,
        },
      };
      break;
    case 'BlogPosting':
      specificSchema = {
        '@id': dataUrl ? `${dataUrl}#blogposting` : `${SEO_CONSTANTS.BASE_URL}/#blogposting`,
        headline: data.name || data.headline,
        description: data.description,
        url: dataUrl,
        publisher: {
          '@type': 'Organization',
          '@id': organizationId,
        },
        author: {
          '@type': 'Organization',
          '@id': organizationId,
          name: SEO_CONSTANTS.SITE_NAME,
        },
      };
      break;
  }

  const publicData = Object.fromEntries(
    Object.entries(data).filter(([key]) => !['faqs', 'breadcrumbs', 'items', 'city'].includes(key)),
  );
  const schema = { ...baseSchema, ...specificSchema, ...publicData };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
