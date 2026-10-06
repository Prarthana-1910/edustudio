import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Reusable SEO component for managing title, description, Open Graph tags,
 * Twitter cards, and canonical links.
 */
export const SEO = ({
  title,
  description = 'EduStudio bridges campus academic rigor and corporate civil engineering practice through hard-hat site visits, structural symposia, and research publications.',
  canonical,
  ogType = 'website',
  ogImage = '/favicon.svg',
  article = false,
  publishedTime,
  authors,
}) => {
  const siteTitle = 'EduStudio | Civil Engineering Club';
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : canonical || 'https://edustudio.vercel.app';

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="EduStudio" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* Article specific timestamps */}
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {article && authors && (
        <meta property="article:author" content={Array.isArray(authors) ? authors.join(', ') : authors} />
      )}
    </Helmet>
  );
};

export default SEO;
