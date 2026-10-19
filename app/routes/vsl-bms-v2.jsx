import VslBms from '../../src/pages/VslBms';

const URL = 'https://www.israeltechforce.com/VSL-BMS-V2';
const TITLE = 'קורס BMS: הקמה ואבטחה של Business Manager | אושר רווח';
const DESCRIPTION =
  'קורס מוקלט בעברית (כ-3 שעות, ₪297) להקמה ואבטחה של Business Manager, חשבון מודעות והרשאות ב-Meta. הדרכה חינמית של 10 דקות בראש הדף. אושר רווח, IsraelTechForce.';
const OG_IMAGE = 'https://www.israeltechforce.com/images/vsl-bms/og_image.png';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  // A/B variant: kept out of the index, canonical points at the original page.
  { name: 'robots', content: 'noindex, nofollow' },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'העסק שלכם לא אמור ליפול בגלל פרופיל אחד' },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:image', content: OG_IMAGE },
  { property: 'og:locale', content: 'he_IL' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: TITLE },
  { name: 'twitter:description', content: DESCRIPTION },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/VSL-BMS' },
];

export default function VslBmsV2Route() {
  return <VslBms variant="v2" />;
}
