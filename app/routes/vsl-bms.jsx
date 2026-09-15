import VslBms from '../../src/pages/VslBms';

const URL = 'https://www.israeltechforce.com/VSL-BMS';
const SITE = 'https://www.israeltechforce.com';
const TITLE = 'קורס BMS: הקמה ואבטחה של Business Manager | אושר רווח';
const DESCRIPTION =
  'קורס מוקלט בעברית (כ-3 שעות, ₪197) להקמה ואבטחה של Business Manager, חשבון מודעות והרשאות ב-Meta. הדרכה חינמית של 10 דקות בראש הדף. אושר רווח, IsraelTechForce.';
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
  { property: 'og:title', content: 'קורס BMS: מגדירים Business Manager נכון, לפני שהעסק נחסם' },
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
  // Same @id as the one emitted on /bms-sm — one course, two pages
  '@id': `${URL}#course`,
  name: 'קורס BMS (Business Manager Setup)',
  description:
    'קורס מוקלט בעברית, כ-3 שעות, 15 שיעורים והרצאת אורח: הקמה ואבטחה של Business Manager, חשבון מודעות, אנשים והרשאות, ותוכנית פעולה לחסימה או פריצה. הקורס מלמד ומעניק כלים; שחזור אישי של חשבון הוא שירות נפרד.',
  url: URL,
  inLanguage: 'he',
  // Same entities the site emits globally (app/root.jsx): #business, #author
  provider: { '@id': `${SITE}/#business` },
  teaches: [
    'הקמת Business Manager ואיסוף נכסים',
    'ניהול אנשים, שותפים והרשאות',
    'אבטחת פרופיל אישי וחשבון מודעות',
    'תוכנית תגובה לחסימה או פריצה',
  ],
  audience: {
    '@type': 'Audience',
    audienceType: 'בעלי עסקים, מנהלי סושיאל וקמפיינרים',
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
    instructor: { '@id': `${SITE}/#author` },
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
