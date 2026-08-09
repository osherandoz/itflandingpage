import Home from '../../src/pages/Home';
import { FAQ_SCHEMA } from '../../src/data/faqSchema.js';

export const meta = () => [
  {
    title:
      'שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ | IsraelTechForce',
  },
  {
    name: 'description',
    content:
      'מומחים לשחזור חשבונות רשתות חברתיות שנחסמו או נפרצו. שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ עם הצלחה של 95%+. תשלום רק אחרי הצלחה מוכחת.',
  },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:title',
    content: 'IsraelTechForce - שחזור חשבונות רשתות חברתיות',
  },
  {
    property: 'og:description',
    content:
      'מומחים לשחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ שנחסמו או נפרצו. הצלחה של 95%+ | תשלום רק אחרי הצלחה.',
  },
  { property: 'og:url', content: 'https://www.israeltechforce.com/' },
  { property: 'og:site_name', content: 'IsraelTechForce' },
  { property: 'og:locale', content: 'he_IL' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/images/og-card.png',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:title',
    content: 'IsraelTechForce - שחזור חשבונות רשתות חברתיות',
  },
  {
    name: 'twitter:description',
    content:
      'מומחים לשחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ שנחסמו או נפרצו. הצלחה של 95%+.',
  },
  {
    name: 'twitter:image',
    content: 'https://www.israeltechforce.com/images/og-card.png',
  },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/' },
];

export default function HomeRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Home />
    </>
  );
}
