import BmsSm from '../../src/pages/BmsSm';

const URL = 'https://www.israeltechforce.com/bms-sm';
const TITLE = 'צ׳קליסט סינון לקוחות חינמי למנהלי סושיאל | אושר רווח';
const DESCRIPTION =
  'צ׳קליסט חינמי למנהלי סושיאל ולפרילנסרים: חמש שאלות ששואלים לפני שחותמים על לקוח חדש, כדי לזהות תשתית פרסום בעייתית לפני האונבורדינג.';
const OG_IMAGE = 'https://www.israeltechforce.com/images/vsl-bms/og_image.png';

export const meta = () => [
  { title: TITLE },
  { name: 'description', content: DESCRIPTION },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'צ׳קליסט סינון לקוחות (חינם) — הגיעו מוכנים לכל לקוח חדש' },
  { property: 'og:description', content: 'הצ׳קליסט שכל מי שמנהל סושיאל צריך לפני שחותמים על לקוח. חינם, ישר למייל.' },
  { property: 'og:url', content: URL },
  { property: 'og:image', content: OG_IMAGE },
  { property: 'og:locale', content: 'he_IL' },
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: TITLE },
  { name: 'twitter:description', content: DESCRIPTION },
  { tagName: 'link', rel: 'canonical', href: URL },
];

// One course entity, shared @id with /VSL-BMS so the two pages are not read as
// two different products. No aggregateRating: this page shows no reviews, and
// self-serving ratings without visible reviews risk a structured-data penalty
// (same reason it was dropped from LOCAL_BUSINESS_SCHEMA). The offer points at
// the page that actually sells the course, not at this lead-magnet page.
const COURSE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  '@id': 'https://www.israeltechforce.com/VSL-BMS#course',
  name: 'קורס BMS — Business Manager Security למנהלי סושיאל',
  description:
    'קורס מקוון למנהלי סושיאל ולפרילנסרים המלמד כיצד לזהות תשתית פרסום בעייתית, לנהל הרשאות נכון ולהגן על עצמם ועל לקוחותיהם.',
  url: 'https://www.israeltechforce.com/VSL-BMS',
  inLanguage: 'he',
  provider: {
    '@type': 'Person',
    name: 'אושר רווח',
    url: 'https://www.israeltechforce.com',
  },
  offers: {
    '@type': 'Offer',
    price: '297',
    priceCurrency: 'ILS',
    availability: 'https://schema.org/InStock',
    url: 'https://www.israeltechforce.com/VSL-BMS',
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
      name: 'יש לי כבר שנים של ניסיון עם ביזנס מנג׳ר, זה רלוונטי אליי?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'דווקא כן. ניסיון לא מחסן מבעיות בסיסיות: הרשאות שנשארו פתוחות מעובד ישן, פיקסל שמשויך לסוכנות הקודמת, חשבון שהבעלות עליו לא ברורה. הצ׳קליסט מארגן את כל הבדיקות שחשבתם שאתם כבר יודעים לעשות.',
      },
    },
    {
      '@type': 'Question',
      name: 'מה קורה אם הלקוח שלי הוא שגרם לבעיה? זה עוזר גם בדיעבד?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'הצ׳קליסט בנוי בעיקר למניעה, לפני שמסכימים ללקוח חדש. אם כבר יש בעיה, הוא עוזר להבין מה קרה ולאסוף תיעוד שמוכיח שהמצב היה כך לפני שהגעתם.',
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
        text: 'לא. אין מסמך שמבטיח את זה. אבל מי שנכנס ללקוח עם תיעוד מסודר יודע לאן להצביע כשמשהו משתבש, ולא נשאל "מה עשית לנו?" בלי תשובה.',
      },
    },
    {
      '@type': 'Question',
      name: 'זה מתאים גם למי שרק מתחיל בתחום?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'כן. אם אתם בתחילת הדרך, הצ׳קליסט ילמד אתכם מה בכלל צריך לבדוק לפני שחותמים על לקוח. אם אתם ותיקים, הוא ייתן לכם פורמט עקבי שתוכלו לסמוך עליו.',
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
