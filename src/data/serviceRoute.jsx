/**
 * One builder for all 6 service-page routes.
 *
 * These were near-identical 76-line files, which meant every meta or schema
 * change had to be made once per page and stay in sync by hand. A route file is
 * now three lines: pick a slug.
 *
 * Note the Hebrew URLs stay raw (not percent-encoded) in canonical/og:url — that
 * is what is already live and indexed, and re-encoding them would change the
 * canonical of every Hebrew page.
 */
import ServicePage from '../components/ServicePage';
import { SERVICE_PAGES } from './servicePages';
import { buildBreadcrumbSchema } from './schemas';
import { SERVICE_PATHS, SITE_ORIGIN } from '../i18n/index.js';

const PROVIDER = {
  '@type': 'LocalBusiness',
  '@id': `${SITE_ORIGIN}/#business`,
  name: 'IsraelTechForce - ITF Recovery',
};

const HOME_CRUMB = { name: 'דף הבית', item: `${SITE_ORIGIN}/` };

export function serviceRoute(slug) {
  const pageData = SERVICE_PAGES.find((p) => p.slug === slug);
  if (!pageData) throw new Error(`serviceRoute: no page data for slug "${slug}"`);

  const url = SITE_ORIGIN + SERVICE_PATHS[slug];

  const meta = () => [
    { title: pageData.metaTitle },
    { name: 'description', content: pageData.metaDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: pageData.metaTitle },
    { property: 'og:description', content: pageData.metaDescription },
    { property: 'og:url', content: url },
    { property: 'og:locale', content: 'he_IL' },
    { property: 'og:image', content: `${SITE_ORIGIN}/images/og/${slug}.png` },
    { name: 'twitter:card', content: 'summary_large_image' },
    { tagName: 'link', rel: 'canonical', href: url },
  ];

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pageData.title,
      description: pageData.metaDescription,
      serviceType: pageData.serviceType,
      provider: PROVIDER,
      areaServed: { '@type': 'Country', name: 'Israel' },
      url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: pageData.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    buildBreadcrumbSchema([HOME_CRUMB, { name: pageData.title }]),
  ];
  // HowTo dropped: it described what we do rather than steps the reader
  // performs, and Google retired HowTo rich results in 2023.

  function ServiceRouteComponent() {
    return (
      <>
        {schemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
        <ServicePage pageData={pageData} />
      </>
    );
  }

  return { meta, Route: ServiceRouteComponent, schemas, pageData, url };
}
