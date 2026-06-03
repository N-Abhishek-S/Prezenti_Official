import { Helmet } from 'react-helmet-async';
import { SEO_CONSTANTS } from './constants';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  imageUrl?: string;
  type?: string;
}

export function SEO({
  title,
  description,
  canonicalUrl,
  imageUrl,
  type = 'website',
}: SEOProps) {
  const metaTitle = title || SEO_CONSTANTS.DEFAULT_TITLE;
  const metaDescription = description || SEO_CONSTANTS.DEFAULT_DESCRIPTION;
  const metaImage = imageUrl || SEO_CONSTANTS.DEFAULT_IMAGE;
  const url = canonicalUrl ? `${SEO_CONSTANTS.BASE_URL}${canonicalUrl}` : SEO_CONSTANTS.BASE_URL;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SEO_CONSTANTS.SITE_NAME} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:site" content={SEO_CONSTANTS.TWITTER_HANDLE} />
    </Helmet>
  );
}
