import VslBmsV2 from '../../src/pages/VslBmsV2';

const URL = 'https://www.israeltechforce.com/VSL-BMS-V2';
const TITLE = 'חשבון פרסום נחסם = ₪150,000 לאיבוד בין לילה. השיטה שמונעת את זה. | אושר רווח';
const DESCRIPTION =
  'ב-2026, מטא הסירה מעל 10 מיליון חשבונות עסקיים. רובם בגלל טעות הגדרה אחת. ההדרכה הזו (4 דקות) תראה לך איך להימנע ממנה. קורס BMS ב-₪197.';
const OG_IMAGE = 'https://www.israeltechforce.com/images/vsl-bms/og_image.webp';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  // Prevent indexing of A/B test variant. Avoids duplicate-content penalty.
  { name: 'robots', content: 'noindex, nofollow' },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'חשבון פרסום נחסם = ₪150,000 לאיבוד בין לילה. יש שיטה אחת שמונעת את זה.' },
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

export default function VslBmsV2Route() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_SCHEMA) }}
      />
      <VslBmsV2 />
    </>
  );
}
