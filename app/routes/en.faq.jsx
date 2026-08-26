import FaqPage from '../../src/pages/FaqPage';
import { CENTRAL_FAQ_SCHEMA_EN } from '../../src/data/centralFaqSchema.en.js';
import { CATEGORIES_EN } from '../../src/data/faqCategories.en.js';
import { hreflangLinks } from '../../src/i18n/index.js';

export const meta = () => [
  { title: 'FAQ - Account Recovery | IsraelTechForce' },
  {
    name: 'description',
    content:
      'All the answers to the most common questions about Facebook, Instagram, WhatsApp and Ads Manager account recovery. IsraelTechForce - recovery experts.',
  },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'FAQ - Account Recovery | IsraelTechForce' },
  { property: 'og:description', content: 'All the answers to the most common questions about account recovery.' },
  { property: 'og:url', content: 'https://www.israeltechforce.com/en/faq' },
  { property: 'og:locale', content: 'en_US' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/images/og-card.png',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/en/faq' },
  ...hreflangLinks('/faq', '/en/faq'),
];

export default function EnFaqRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CENTRAL_FAQ_SCHEMA_EN) }}
      />
      <FaqPage categories={CATEGORIES_EN} />
    </>
  );
}
