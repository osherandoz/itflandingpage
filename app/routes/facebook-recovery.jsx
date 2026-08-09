import ServicePage from '../../src/components/ServicePage';
import { SERVICE_PAGES } from '../../src/data/servicePages';
import { buildHowToSchema, buildBreadcrumbSchema } from '../../src/data/schemas';

const pageData = SERVICE_PAGES.find(p => p.slug === 'facebook-recovery');

export const meta = () => [
  { title: pageData.metaTitle },
  { name: 'description', content: pageData.metaDescription },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: pageData.metaTitle },
  { property: 'og:description', content: pageData.metaDescription },
  { property: 'og:url', content: 'https://www.israeltechforce.com/שחזור-חשבון-פייסבוק' },
  { property: 'og:locale', content: 'he_IL' },
  { property: 'og:image', content: 'https://www.israeltechforce.com/images/og-card.png' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/שחזור-חשבון-פייסבוק' },
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
  url: 'https://www.israeltechforce.com/שחזור-חשבון-פייסבוק',
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

const HOWTO_SCHEMA = buildHowToSchema(pageData);

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: 'דף הבית', item: 'https://www.israeltechforce.com/' },
  { name: pageData.title },
]);

export default function FacebookRecoveryRoute() {
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
