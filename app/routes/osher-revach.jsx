import Author from '../../src/pages/Author';
import { PERSON_SCHEMA, SITE_URL } from '../../src/data/schemas.js';
import { hreflangLinks } from '../../src/i18n/index.js';

const URL = `${SITE_URL}/אושר-רווח`;
const TITLE = 'אושר רווח — מומחה שחזור חשבונות, IsraelTechForce | אושר רווח';
const DESCRIPTION =
  'אושר רווח, מייסד IsraelTechForce. מאז 2020 שחזר מעל 2,500 חשבונות פייסבוק, אינסטגרם ווואטסאפ. איך זה התחיל, איך עובד האבחון, ואיפה סיקרו אותו.';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'profile' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:image', content: `${SITE_URL}/images/osher-photo-1.jpg` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: encodeURI(URL) },
  ...hreflangLinks('/אושר-רווח', '/en/osher-revach'),
];

export default function AuthorRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
      />
      <Author />
    </>
  );
}
