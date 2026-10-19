import BmsSm from '../../src/pages/BmsSm';

const URL = 'https://www.israeltechforce.com/bms-sm-v2';
const TITLE = 'צ׳קליסט סינון לקוחות חינמי למנהלות סושיאל | אושר רווח';
const DESCRIPTION =
  'צ׳קליסט חינמי למנהלות סושיאל: חמש שאלות ששואלות לפני שחותמות על לקוחה חדשה, כדי לזהות תשתית פרסום בעייתית לפני האונבורדינג.';
const OG_IMAGE = 'https://www.israeltechforce.com/images/vsl-bms/og_image.png';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  // Campaign variant: out of the index, canonical points at the original page.
  { name: 'robots', content: 'noindex, nofollow' },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'החשבון של הלקוחה נחסם. אתן לא אלה שצריכות להסביר.' },
  { property: 'og:description', content: 'צ׳קליסט הסינון למנהלות סושיאל. חינם, ישר למייל.' },
  { property: 'og:url', content: URL },
  { property: 'og:image', content: OG_IMAGE },
  { property: 'og:locale', content: 'he_IL' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: TITLE },
  { name: 'twitter:description', content: DESCRIPTION },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/bms-sm' },
];

export default function BmsSmV2Route() {
  return <BmsSm variant="v2" />;
}
