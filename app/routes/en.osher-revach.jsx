import Author from '../../src/pages/Author';
import { PERSON_SCHEMA_EN } from '../../src/data/schemas.en.js';
import { SITE_URL } from '../../src/data/schemas.js';
import { hreflangLinks } from '../../src/i18n/index.js';

const URL = `${SITE_URL}/en/osher-revach`;
const TITLE = 'Osher Revach — Account Recovery Expert, IsraelTechForce';
const DESCRIPTION =
  "Osher Revach, founder of IsraelTechForce. Since 2020 he's recovered over 2,500 Facebook, Instagram and WhatsApp accounts. How it started, how the diagnosis works, and where he's been covered.";

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'profile' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:image', content: `${SITE_URL}/images/osher-photo-1.jpg` },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: URL },
  ...hreflangLinks('/אושר-רווח', '/en/osher-revach'),
];

export default function AuthorEnRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA_EN) }}
      />
      <Author />
    </>
  );
}
