import BmsSm from '../../src/pages/BmsSm';

const URL = 'https://www.israeltechforce.com/bms-sm';
const TITLE = 'קורס BMS למנהלות סושיאל — הגיעי מוכנה לכל לקוח | אושר רווח';
const DESCRIPTION =
  'קורס מקוון למנהלות סושיאל ופרילנסריות: איך לזהות תשתית פרסום בעייתית לפני האונבורדינג, לנהל הרשאות נכון ולדעת מה לעשות כשמשהו משתבש. 197₪ בלבד.';
const OG_IMAGE = 'https://www.israeltechforce.com/og-bms-sm.jpg';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'קורס BMS — הגיעי מוכנה לכל לקוח חדש' },
  { property: 'og:description', content: "הצ׳קליסט שכל מנהלת סושיאל צריכה לפני שהיא חותמת על לקוח. 197₪ בלבד." },
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
  name: 'קורס BMS — Business Manager Security למנהלות סושיאל',
  description:
    'קורס מקוון למנהלות סושיאל ופרילנסריות המלמד כיצד לזהות תשתית פרסום בעייתית, לנהל הרשאות נכון ולהגן על עצמן ועל לקוחותיהן.',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '4',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: 'online',
    courseWorkload: 'PT3H',
  },
};

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'אני כבר עובדת שנים עם ביזנס מנג׳ר, זה רלוונטי אליי?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'בדיוק בשבילך. BMS מלמד איך המערכת באמת עובדת, למה דברים נחסמים, ואיך לבנות תשתית שתחזיק לאורך זמן.',
      },
    },
    {
      '@type': 'Question',
      name: 'מה קורה אם הלקוח שלי הוא שגרם לחסימה?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'חלק מהקורס מוקדש לדיוק לזה: איך לזהות מי אחראי, איך לתקן, ואיך לתקשר ללקוח בצורה מקצועית.',
      },
    },
    {
      '@type': 'Question',
      name: 'כמה זמן לוקח?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'שעתיים-שלוש בסה"כ. ניתן לעשות בקצב שלך, ולחזור לחלק ספציפי כשיש תקלה אצל לקוח.',
      },
    },
    {
      '@type': 'Question',
      name: 'האם הקורס מבטיח שלא יהיו בעיות?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'לא. המטרה היא שתגיעי מוכנה יותר, תזהי בעיות מוקדם יותר, ותדעי מה לעשות כשמשהו קורה.',
      },
    },
    {
      '@type': 'Question',
      name: 'זה מתאים גם לפרילנסרית מתחילה?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'כן, אבל גם לוותיקה. הקורס בנוי כך שכל שלב מוסיף שכבה.',
      },
    },
  ],
};

export default function BmsSmRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(COURSE_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <BmsSm />
    </>
  );
}
