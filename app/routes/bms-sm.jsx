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
        text: 'דווקא כן. ניסיון לא מחסן מבעיות בסיסיות: הרשאות שנשארו פתוחות מעובד ישן, פיקסל שמשויך לסוכנות הקודמת, חשבון שהבעלות עליו לא ברורה. הצ׳קליסט מארגן את כל הבדיקות שחשבת שאת כבר יודעת לעשות.',
      },
    },
    {
      '@type': 'Question',
      name: 'מה קורה אם הלקוח שלי הוא שגרם לבעיה? זה עוזר גם בדיעבד?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'הצ׳קליסט בנוי בעיקר למניעה, לפני שמסכימים ללקוח חדש. אם כבר יש בעיה, הוא עוזר להבין מה קרה ולאסוף תיעוד שמוכיח שהמצב היה כך לפני שהגעת.',
      },
    },
    {
      '@type': 'Question',
      name: 'כמה זמן לוקח למלא אותו עם לקוח חדש?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'חמש דקות אם הלקוח מסופק ויודע לענות. עשר דקות אם הוא לא בטוח מה קורה בחשבון שלו.',
      },
    },
    {
      '@type': 'Question',
      name: 'הצ׳קליסט מבטיח שלא יהיו בעיות?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'לא. אין מסמך שמבטיח את זה. אבל מנהלת שנכנסת ללקוח עם תיעוד מסודר יודעת לאן להצביע כשמשהו משתבש, ולא נשאלת "מה עשית לנו?" בלי תשובה.',
      },
    },
    {
      '@type': 'Question',
      name: 'זה מתאים גם למי שרק מתחילה בתחום?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'כן. אם את בתחילת הדרך, הצ׳קליסט ילמד אותך מה בכלל צריך לבדוק לפני שחותמים על לקוח. אם את ותיקה, הוא ייתן לך פורמט עקבי שתוכלי לסמוך עליו.',
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
