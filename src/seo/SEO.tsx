import { Helmet } from 'react-helmet-async';
import { SEO_CONSTANTS } from './constants';
import { buildSchema } from './StructuredData';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  preloadImageUrl?: string;
  imageAlt?: string;
  type?: string;
  keywords?: string[];
  noindex?: boolean;
}

function toAbsoluteUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  return `${SEO_CONSTANTS.BASE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function SEO({
  title,
  description,
  canonicalUrl,
  imageUrl,
  preloadImageUrl,
  imageAlt,
  type = 'website',
  keywords = [],
  noindex = false,
}: SEOProps) {
  const metaTitle = title || SEO_CONSTANTS.DEFAULT_TITLE;
  const metaDescription = description || SEO_CONSTANTS.DEFAULT_DESCRIPTION;
  const metaImage = imageUrl ? toAbsoluteUrl(imageUrl) : SEO_CONSTANTS.DEFAULT_IMAGE;
  const metaImageAlt = imageAlt || SEO_CONSTANTS.DEFAULT_IMAGE_ALT;
  
  // Use window.location.pathname if available and canonicalUrl is not provided
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  const resolvedUrl = canonicalUrl || currentPath;
  const url = toAbsoluteUrl(resolvedUrl) || SEO_CONSTANTS.BASE_URL;
  
  const robotsContent = noindex
    ? 'noindex, nofollow'
    : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="application-name" content={SEO_CONSTANTS.SITE_NAME} />
      <meta name="theme-color" content={SEO_CONSTANTS.THEME_COLOR} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      
      {/* Dynamic Hero Preloads */}
      {preloadImageUrl && (
        <link rel="preload" as="image" href={preloadImageUrl.startsWith('http') ? preloadImageUrl : `${SEO_CONSTANTS.BASE_URL}${preloadImageUrl}`} fetchPriority="high" />
      )}

      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={SEO_CONSTANTS.LOCALE} />
      <meta property="og:site_name" content={SEO_CONSTANTS.SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={metaImageAlt} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={metaImageAlt} />

      {/* Global Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify(buildSchema('Organization'))}
      </script>
    </Helmet>
  );
}
