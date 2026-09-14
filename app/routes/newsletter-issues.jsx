import NewsletterArchive from '../../src/pages/NewsletterArchive';
import { SITE_URL } from '../../src/data/schemas.js';
import { hreflangLinks } from '../../src/i18n/index.js';

const URL = `${SITE_URL}/גיליונות-הניוזלטר`;
const TITLE = 'ארכיון The Safety Signal | IsraelTechForce';
const DESCRIPTION = 'גיליון לדוגמה של הניוזלטר החודשי: עדכון מטא, מקרה אמיתי מהחודש, ובדיקה אחת שמורידה סיכון.';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { tagName: 'link', rel: 'canonical', href: encodeURI(URL) },
  ...hreflangLinks('/גיליונות-הניוזלטר', '/en/newsletter-issues'),
];

export default function NewsletterIssuesRoute() {
  return <NewsletterArchive />;
}
