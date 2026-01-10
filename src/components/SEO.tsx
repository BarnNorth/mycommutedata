import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  noIndex?: boolean;
  structuredData?: object;
}

const DEFAULT_TITLE = 'CommutesDontSuck - Track Real Commute Times';
const DEFAULT_DESCRIPTION = 'Stop guessing with vague time ranges. Track and record your actual commute times automatically. Better than Google Maps estimates for planning your life.';
const DEFAULT_OG_IMAGE = 'https://lovable.dev/opengraph-image-p98pqg.png';
const SITE_URL = 'https://commutesdontsuck.com';

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = 'commute tracker, commute time, traffic data, route planner, work commute, travel time, traffic patterns, commute optimization',
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | CommutesDontSuck` : DEFAULT_TITLE;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="CommutesDontSuck" />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="CommutesDontSuck" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@barn_north" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

// Pre-built structured data generators
export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CommutesDontSuck',
  description: 'Track and analyze real commute times to make better decisions about where to live and work.',
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  sameAs: ['https://x.com/barn_north'],
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'CommutesDontSuck',
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  potentialAction: {
    '@type': 'SearchAction',
    target: `${SITE_URL}/dashboard`,
    'query-input': 'required name=search_term_string',
  },
});

export const generateSoftwareApplicationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CommutesDontSuck',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  description: DEFAULT_DESCRIPTION,
  offers: {
    '@type': 'Offer',
    price: '9.99',
    priceCurrency: 'USD',
    priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
  },
});

export const generateFAQSchema = (faqs: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const generateBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${SITE_URL}${item.url}`,
  })),
});
