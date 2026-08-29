/**
 * One builder for all 12 service-page routes (6 slugs × 2 languages).
 *
 * These were 12 near-identical 76-line files, which meant every meta or schema
 * change had to be made twelve times and stay in sync by hand. A route file is
 * now three lines: pick a slug and a language.
 *
 * Note the Hebrew URLs stay raw (not percent-encoded) in canonical/og:url — that
 * is what is already live and indexed, and re-encoding them would change the
 * canonical of every Hebrew page.
 */
import ServicePage from '../components/ServicePage';
import { SERVICE_PAGES } from './servicePages';
import { SERVICE_PAGES_EN } from './servicePages.en';
import { buildBreadcrumbSchema } from './schemas';
import { hreflangLinks, SERVICE_PATHS, SITE_ORIGIN } from '../i18n/index.js';

const OG_IMAGE = `${SITE_ORIGIN}/images/og-card.png`;
const PROVIDER = {
  '@type': 'LocalBusiness',
  '@id': `${SITE_ORIGIN}/#business`,
  name: 'IsraelTechForce - ITF Recovery',
};

const LOCALE = { he: 'he_IL', en: 'en_US' };
const HOME_CRUMB = {
  he: { name: 'דף הבית', item: `${SITE_ORIGIN}/` },
  en: { name: 'Home', item: `${SITE_ORIGIN}/en` },
};

export function serviceRoute(slug, lang) {
  const pageData = (lang === 'en' ? SERVICE_PAGES_EN : SERVICE_PAGES).find((p) => p.slug === slug);
  if (!pageData) throw new Error(`serviceRoute: no ${lang} page data for slug "${slug}"`);

  const paths = SERVICE_PATHS[slug];
  const url = SITE_ORIGIN + paths[lang];

  const meta = () => [
    { title: pageData.metaTitle },
    { name: 'description', content: pageData.metaDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: pageData.metaTitle },
    { property: 'og:description', content: pageData.metaDescription },
    { property: 'og:url', content: url },
    { property: 'og:locale', content: LOCALE[lang] },
    { property: 'og:image', content: OG_IMAGE },
    { name: 'twitter:card', content: 'summary_large_image' },
    { tagName: 'link', rel: 'canonical', href: url },
    ...hreflangLinks(paths.he, paths.en),
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
    buildBreadcrumbSchema([HOME_CRUMB[lang], { name: pageData.title }]),
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
