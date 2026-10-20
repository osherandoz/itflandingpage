import Newsletter from '../../src/pages/Newsletter';

const URL = 'https://www.israeltechforce.com/newsletter';
const TITLE = 'The Safety Signal - ניוזלטר חודשי על אבטחת חשבונות מטא | IsraelTechForce';
const DESCRIPTION =
  'פעם בחודש: מה מטא שינתה, מקרה חסימה אמיתי ובדיקה אחת שמורידה סיכון. חמש דקות קריאה, בחינם.';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:locale', content: 'he_IL' },
  { property: 'og:image', content: 'https://www.israeltechforce.com/images/og/newsletter.png' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: URL },
];

export default function NewsletterRoute() {
  return <Newsletter />;
}
