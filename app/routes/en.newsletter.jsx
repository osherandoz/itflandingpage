import Newsletter, { FAQS_EN } from '../../src/pages/Newsletter';
import { hreflangLinks } from '../../src/i18n/index.js';

const URL = 'https://www.israeltechforce.com/en/newsletter';
const TITLE = 'The Safety Signal - Monthly Newsletter on Meta Account Safety | IsraelTechForce';
const DESCRIPTION =
  "Once a month: what Meta changed in policy and features, a real case from recent weeks, and one check that lowers your risk. Five minutes of reading, free.";

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:locale', content: 'en_US' },
  { property: 'og:image', content: 'https://www.israeltechforce.com/images/og-card.png' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: URL },
  ...hreflangLinks('/newsletter', '/en/newsletter'),
];

const FAQ_SCHEMA_EN = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS_EN.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function EnNewsletterRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA_EN) }}
      />
      <Newsletter />
    </>
  );
}
