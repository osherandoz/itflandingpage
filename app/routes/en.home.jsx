import Home from '../../src/pages/Home';
import { FAQ_SCHEMA_EN } from '../../src/data/faqSchema.en.js';
import { hreflangLinks } from '../../src/i18n/index.js';

export const meta = () => [
  {
    title: 'Facebook, Instagram & WhatsApp Account Recovery | IsraelTechForce',
  },
  {
    name: 'description',
    content:
      'Experts in recovering hacked, disabled, or locked social media accounts. Facebook, Instagram & WhatsApp account recovery with a 95%+ success rate. Pay only after proven success.',
  },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:title',
    content: 'IsraelTechForce — Social Media Account Recovery',
  },
  {
    property: 'og:description',
    content:
      'Experts in recovering hacked or disabled Facebook, Instagram & WhatsApp accounts. 95%+ success rate | Pay only after success.',
  },
  { property: 'og:url', content: 'https://www.israeltechforce.com/en' },
  { property: 'og:site_name', content: 'IsraelTechForce' },
  { property: 'og:locale', content: 'en_US' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/images/og-card.png',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:title',
    content: 'IsraelTechForce — Social Media Account Recovery',
  },
  {
    name: 'twitter:description',
    content:
      'Experts in recovering hacked or disabled Facebook, Instagram & WhatsApp accounts. 95%+ success rate.',
  },
  {
    name: 'twitter:image',
    content: 'https://www.israeltechforce.com/images/og-card.png',
  },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/en' },
  ...hreflangLinks('/', '/en'),
];

export default function EnHomeRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA_EN) }}
      />
      <Home />
    </>
  );
}
