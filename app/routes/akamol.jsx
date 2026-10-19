import Akamol from '../../src/pages/Akamol';
import { AKAMOL_PRICE } from '../../src/data/akamol';

const URL = 'https://www.israeltechforce.com/akamol';
const TITLE = 'האקמול לרשתות החברתיות · עזרה ראשונה לחשבון חסום או פרוץ | אושר רווח';
const DESCRIPTION =
  'שלושה מדריכים קצרים בעברית: מה עושים, ומה בשום אופן לא עושים, ב-72 השעות הראשונות אחרי חסימה, השעיה או פריצה באינסטגרם, בפייסבוק ובוואטסאפ. 19.90 ש״ח.';
// TODO (Osher): replace with the cover of one of the PDFs once it is supplied.
const OG_IMAGE = 'https://www.israeltechforce.com/images/og-card.png';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: TITLE },
  { property: 'og:description', content: DESCRIPTION },
  { property: 'og:url', content: URL },
  { property: 'og:image', content: OG_IMAGE },
  { property: 'og:locale', content: 'he_IL' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: TITLE },
  { name: 'twitter:description', content: DESCRIPTION },
  { tagName: 'link', rel: 'canonical', href: URL },
];

// No aggregateRating: the page shows no review count to back one.
const PRODUCT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'האקמול לרשתות החברתיות',
  description:
    'חבילה של שלושה מדריכי PDF קצרים, לאינסטגרם, לפייסבוק ולוואטסאפ: סדר פעולות ב-72 השעות הראשונות אחרי חסימה, השעיה או פריצה.',
  url: URL,
  brand: { '@type': 'Brand', name: 'IsraelTechForce' },
  offers: {
    '@type': 'Offer',
    price: AKAMOL_PRICE.toFixed(2),
    priceCurrency: 'ILS',
    availability: 'https://schema.org/InStock',
    url: URL,
  },
};

export default function AkamolRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PRODUCT_SCHEMA) }}
      />
      <Akamol />
    </>
  );
}
