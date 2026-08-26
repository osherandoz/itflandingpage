import VslBms from '../../src/pages/VslBms';

const URL = 'https://www.israeltechforce.com/VSL-BMS';
const TITLE = 'הטעות שעולה לעסקים אלפי שקלים בשנה | אושר רווח';
const DESCRIPTION =
  '3 מקרים אמיתיים. 3 עסקים שיכלו להימנע מהנפילה. הדרכה חינמית עם אושר רווח, מומחה לשחזור נכסים דיגיטליים. קורס BMS ב-₪197.';
const OG_IMAGE = 'https://www.israeltechforce.com/images/vsl-bms/og_image.png';

export const links = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  {
    rel: 'stylesheet',
    // Heebo is self-hosted via @fontsource (root + page imports) — only Assistant + Frank Ruhl Libre from Google
    href: 'https://fonts.googleapis.com/css2?family=Assistant:wght@400;500;700;800&family=Frank+Ruhl+Libre:wght@500;700&display=swap',
  },
];

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'הטעות שעולה לעסקים ישראלים אלפי שקלים בשנה. איך מונעים אותה' },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:image', content: OG_IMAGE },
  { property: 'og:locale', content: 'he_IL' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: TITLE },
  { name: 'twitter:description', content: DESCRIPTION },
  { tagName: 'link', rel: 'canonical', href: URL },
];

const COURSE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'קורס BMS, Business Manager Setup',
  description:
    'קורס מקוון להגנה על נכסים דיגיטליים: בנייה נכונה של Business Manager, ניהול הרשאות, גיבוי ותכנית חירום.',
  url: URL,
  inLanguage: 'he',
  provider: {
    '@type': 'Person',
    name: 'אושר רווח',
    url: 'https://www.israeltechforce.com',
  },
  offers: {
    '@type': 'Offer',
    price: '197',
    priceCurrency: 'ILS',
    availability: 'https://schema.org/InStock',
    url: URL,
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT3H',
  },
};

export default function VslBmsRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_SCHEMA) }}
      />
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "y6a94mrf1u");
`,
        }}
      />
      <VslBms />
    </>
  );
}
