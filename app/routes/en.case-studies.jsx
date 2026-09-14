import CaseStudies from '../../src/pages/CaseStudies';
import { SITE_URL } from '../../src/data/schemas.js';
import { hreflangLinks } from '../../src/i18n/index.js';

const URL = `${SITE_URL}/en/success-stories`;
const TITLE = 'Success Stories, Names Removed | IsraelTechForce';
const DESCRIPTION =
  'Three real Facebook and Instagram account recovery cases: what happened, what we did, and how long it took. Identifying details removed.';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:image', content: `${SITE_URL}/images/og-card.png` },
  { tagName: 'link', rel: 'canonical', href: URL },
  ...hreflangLinks('/מקרי-הצלחה', '/en/success-stories'),
];

export default function CaseStudiesEnRoute() {
  return <CaseStudies />;
}
