import ServicePage from '../../src/components/ServicePage';
import { SERVICE_PAGES } from '../../src/data/servicePages';

const pageData = SERVICE_PAGES.find(p => p.slug === 'ads-manager');

export const meta = () => [
  { title: pageData.metaTitle },
  { name: 'description', content: pageData.metaDescription },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: pageData.metaTitle },
  { property: 'og:description', content: pageData.metaDescription },
  { property: 'og:url', content: 'https://www.israeltechforce.com/שחזור-מנהל-מודעות' },
  { property: 'og:locale', content: 'he_IL' },
  { property: 'og:image', content: 'https://www.israeltechforce.com/images/israeltechforce-logo-white.png' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/שחזור-מנהל-מודעות' },
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
  url: 'https://www.israeltechforce.com/שחזור-מנהל-מודעות',
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

export default function AdsManagerRoute() {
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
      <ServicePage pageData={pageData} />
    </>
  );
}
