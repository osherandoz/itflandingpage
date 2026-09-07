import CaseStudies from '../../src/pages/CaseStudies';
import { SITE_URL } from '../../src/data/schemas.js';
import { hreflangLinks } from '../../src/i18n/index.js';

const URL = `${SITE_URL}/מקרי-הצלחה`;
const TITLE = 'סיפורי הצלחה, בלי שמות | IsraelTechForce';
const DESCRIPTION =
  'שלושה מקרים אמיתיים של שחזור חשבונות פייסבוק ואינסטגרם: מה קרה, מה עשינו, וכמה זמן זה לקח. פרטים מזהים הוסרו.';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:image', content: `${SITE_URL}/images/og-card.png` },
  { tagName: 'link', rel: 'canonical', href: encodeURI(URL) },
  ...hreflangLinks('/מקרי-הצלחה', '/en/success-stories'),
];

export default function CaseStudiesRoute() {
  return <CaseStudies />;
}
