import BMSSocialManagers from '../../src/pages/bms-sm';

const BMS_SM_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'BMS — קורס למנהלות סושיאל',
  description:
    'קורס מקוון למנהלות סושיאל: איך לזהות תשתית פרסום בעייתית לפני האונבורדינג. 15 שיעורים.',
  provider: {
    '@type': 'Organization',
    name: 'Israel Tech Force',
    url: 'https://www.israeltechforce.com',
  },
  url: 'https://www.israeltechforce.com/bms-sm',
  inLanguage: 'he',
  offers: {
    '@type': 'Offer',
    price: '197',
    priceCurrency: 'ILS',
    availability: 'https://schema.org/InStock',
    url: 'https://www.israeltechforce.com/checkout/bms',
  },
};

const FAQ_BMS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'למי הקורס BMS מיועד?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'מנהלות סושיאל ופרילנסריות שעובדות עם לקוחות שמפרסמים בפייסבוק ואינסטגרם.',
      },
    },
    {
      '@type': 'Question',
      name: 'כמה זמן לוקח קורס BMS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'הקורס כולל 15 שיעורים קצרים. רוב הסטודנטיות מסיימות תוך 3-4 שעות.',
      },
    },
    {
      '@type': 'Question',
      name: 'האם יש ערבות להחזר כסף?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'כן, ערבות השבת כסף מלאה תוך 7 ימים מהרכישה, ללא שאלות.',
      },
    },
  ],
};

export const meta = () => [
  { title: 'קורס BMS למנהלות סושיאל — הגיעי מוכנה לכל לקוח | אושר רווח' },
  {
    name: 'description',
    content:
      'קורס מקוון למנהלות סושיאל: איך לזהות תשתית פרסום בעייתית לפני האונבורדינג. 15 שיעורים. 197₪ בלבד.',
  },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'קורס BMS למנהלות סושיאל — הגיעי מוכנה לכל לקוח' },
  {
    property: 'og:description',
    content: 'קורס מקוון למנהלות סושיאל: איך לזהות תשתית פרסום בעייתית לפני האונבורדינג.',
  },
  { property: 'og:url', content: 'https://www.israeltechforce.com/bms-sm' },
  { property: 'og:locale', content: 'he_IL' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/og-bms-sm.jpg',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'קורס BMS למנהלות סושיאל' },
  {
    name: 'twitter:description',
    content: 'איך לזהות תשתית פרסום בעייתית לפני האונבורדינג. 15 שיעורים. 197₪.',
  },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/bms-sm' },
];

export default function BMSSmRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BMS_SM_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_BMS_SCHEMA) }}
      />
      <BMSSocialManagers />
    </>
  );
}
