import FaqPage from '../../src/pages/FaqPage';
import { CENTRAL_FAQ_SCHEMA } from '../../src/data/centralFaqSchema';

export const meta = () => [
  { title: 'שאלות נפוצות - שחזור חשבונות | IsraelTechForce' },
  {
    name: 'description',
    content:
      'כל התשובות לשאלות הנפוצות על שחזור חשבונות פייסבוק, אינסטגרם, וואטסאפ ומנהל מודעות. IsraelTechForce - מומחים בשחזור.',
  },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'שאלות נפוצות - שחזור חשבונות | IsraelTechForce' },
  { property: 'og:description', content: 'כל התשובות לשאלות הנפוצות על שחזור חשבונות.' },
  { property: 'og:url', content: 'https://www.israeltechforce.com/faq' },
  { property: 'og:locale', content: 'he_IL' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/images/israeltechforce-logo-white.png',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/faq' },
];

export default function FaqRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CENTRAL_FAQ_SCHEMA) }}
      />
      <FaqPage />
    </>
  );
}
