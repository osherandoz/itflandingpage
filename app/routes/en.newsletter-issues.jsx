import NewsletterArchive from '../../src/pages/NewsletterArchive';
import { SITE_URL } from '../../src/data/schemas.js';
import { hreflangLinks } from '../../src/i18n/index.js';

const URL = `${SITE_URL}/en/newsletter-issues`;
const TITLE = 'The Safety Signal Archive | IsraelTechForce';
const DESCRIPTION = 'A sample issue of the monthly newsletter: a Meta update, a real case from the month, and one check that lowers risk.';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { tagName: 'link', rel: 'canonical', href: URL },
  ...hreflangLinks('/גיליונות-הניוזלטר', '/en/newsletter-issues'),
];

export default function NewsletterIssuesEnRoute() {
  return <NewsletterArchive />;
}
