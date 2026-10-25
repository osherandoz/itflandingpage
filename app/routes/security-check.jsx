import SecurityCheck from '../../src/pages/SecurityCheck';
import { FAQS, PATH } from '../../src/data/securityCheck.instagram.js';
import { buildBreadcrumbSchema } from '../../src/data/schemas.js';
import { SITE_ORIGIN } from '../../src/i18n/index.js';

const URL = SITE_ORIGIN + PATH;
const TITLE = 'בדיקת אבטחה לאינסטגרם: כמה החשבון שלך מוגן? | IsraelTechForce';
const DESCRIPTION =
  'תשע בדיקות קצרות שמראות כמה חשבון האינסטגרם שלך מוגן מפני פריצה, עם ציון ושלושה תיקונים דחופים. חמש דקות, בחינם, בלי הרשמה.';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:locale', content: 'he_IL' },
  { property: 'og:image', content: `${SITE_ORIGIN}/images/og/security-check.png` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: URL },
];

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
  buildBreadcrumbSchema([
    { name: 'דף הבית', item: `${SITE_ORIGIN}/` },
    { name: 'בדיקת אבטחה לאינסטגרם' },
  ]),
];

export default function SecurityCheckRoute() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <SecurityCheck />
    </>
  );
}
