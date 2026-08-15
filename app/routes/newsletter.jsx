import Newsletter, { FAQS } from '../../src/pages/Newsletter';

const URL = 'https://www.israeltechforce.com/newsletter';
const TITLE = 'The Safety Signal - ניוזלטר חודשי על אבטחת חשבונות מטא | IsraelTechForce';
const DESCRIPTION =
  'פעם בחודש: מה מטא שינתה במדיניות ובאכיפה, מקרה חסימה אמיתי מהשבועות האחרונים, ובדיקה אחת שמורידה סיכון. חמש דקות קריאה, בחינם.';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:locale', content: 'he_IL' },
  { property: 'og:image', content: 'https://www.israeltechforce.com/images/og-card.png' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: URL },
];

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function NewsletterRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Newsletter />
    </>
  );
}
