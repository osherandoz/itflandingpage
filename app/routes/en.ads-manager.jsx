import ServicePage from '../../src/components/ServicePage';
import { SERVICE_PAGES_EN } from '../../src/data/servicePages.en';
import { buildHowToSchema, buildBreadcrumbSchema } from '../../src/data/schemas';
import { hreflangLinks } from '../../src/i18n/index.js';

const pageData = SERVICE_PAGES_EN.find(p => p.slug === 'ads-manager');

export const meta = () => [
  { title: pageData.metaTitle },
  { name: 'description', content: pageData.metaDescription },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: pageData.metaTitle },
  { property: 'og:description', content: pageData.metaDescription },
  { property: 'og:url', content: 'https://www.israeltechforce.com/en/ads-manager-recovery' },
  { property: 'og:locale', content: 'en_US' },
  { property: 'og:image', content: 'https://www.israeltechforce.com/images/og-card.png' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/en/ads-manager-recovery' },
  ...hreflangLinks('/שחזור-מנהל-מודעות', '/en/ads-manager-recovery'),
];

const SERVICE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: pageData.title,
  description: pageData.metaDescription,
  serviceType: pageData.serviceType,
  provider: {
    '@type': 'LocalBusiness',
    '@id': 'https://www.israeltechforce.com/#business',
    name: 'IsraelTechForce - ITF Recovery',
  },
  areaServed: { '@type': 'Country', name: 'Israel' },
  url: 'https://www.israeltechforce.com/en/ads-manager-recovery',
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pageData.faqs.map(faq => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const HOWTO_SCHEMA = { ...buildHowToSchema(pageData), inLanguage: 'en' };

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: 'Home', item: 'https://www.israeltechforce.com/en' },
  { name: pageData.title },
]);

export default function EnAdsManagerRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOWTO_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }}
      />
      <ServicePage pageData={pageData} />
    </>
  );
}
