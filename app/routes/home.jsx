import Home from '../../src/pages/Home';

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "איך מתחילים תהליך שחזור חשבון?",
      "acceptedAnswer": { "@type": "Answer", "text": "התהליך פשוט ומהיר! שולחים הודעה בוואטסאפ או במייל, נעזור לכם לאבחן את הבעיה בצורה מדויקת ולמצוא את הפתרון הטוב ביותר. ברגע שתאשרו את התחלת הטיפול - אנחנו נרוץ על זה בצורה המקצועית והמהירה ביותר." }
    },
    {
      "@type": "Question",
      "name": "האם השירות דיסקרטי ומאובטח?",
      "acceptedAnswer": { "@type": "Answer", "text": "בהחלט! כל הפרטים שנקבל ממכם ישארו חסויים ומאובטחים ולא יועברו לאף גורם חיצוני. כל המידע נועד לטיפול בבעיה בלבד וימחק לאחר סיום הטיפול בהתאם לרצונכם." }
    },
    {
      "@type": "Question",
      "name": "כמה זמן לוקח תהליך שחזור החשבון?",
      "acceptedAnswer": { "@type": "Answer", "text": "זמן הטיפול משתנה בהתאם לסוג הבעיה ומורכבותה. בעיות פשוטות נפתרות תוך 24-48 שעות. בעיות מורכבות יכולות לקחת מספר ימים עד שבוע. אנחנו תמיד מעדכנים אתכם על התקדמות התהליך." }
    },
    {
      "@type": "Question",
      "name": "מה המחירים לשירותי שחזור חשבונות?",
      "acceptedAnswer": { "@type": "Answer", "text": "המחירים שלנו הוגנים ותחרותיים. מתחילים מ-500 ש\"ח לבעיות פשוטות ועד 2,500-3,000 ש\"ח לבעיות מורכבות. חשוב לציין — תשלום רק אחרי הצלחה מוכחת!" }
    },
    {
      "@type": "Question",
      "name": "למה אתם לוקחים כסף רק אחרי הצלחה?",
      "acceptedAnswer": { "@type": "Answer", "text": "זו הפילוסופיה שלנו! אנחנו כל כך בטוחים ביכולות שלנו שאנחנו מוכנים לקחת את הסיכון. אם לא הצלחנו לשחזר את החשבון — לא תשלמו כלום." }
    },
    {
      "@type": "Question",
      "name": "האם יש אחריות על השירות?",
      "acceptedAnswer": { "@type": "Answer", "text": "כן! אנחנו נותנים אחריות של 24 שעות מרגע שחרור החשבון. זה הזמן הקריטי שבו יכולות לקרות בעיות מצד מטא (Meta)." }
    },
    {
      "@type": "Question",
      "name": "האם אתם זמינים 24/7?",
      "acceptedAnswer": { "@type": "Answer", "text": "אנחנו זמינים 24/6 (ראשון עד שישי) עם תמיכה מיידית. בשבת אנחנו זמינים למקרים דחופים בלבד." }
    }
  ]
};

export const meta = () => [
  {
    title:
      'IsraelTechForce - שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ | ITF Recovery',
  },
  {
    name: 'description',
    content:
      'מומחים לשחזור חשבונות רשתות חברתיות שנחסמו או נפרצו. שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ עם הצלחה של 95%+. תשלום רק אחרי הצלחה מוכחת.',
  },
  { property: 'og:type', content: 'website' },
  {
    property: 'og:title',
    content: 'IsraelTechForce - שחזור חשבונות רשתות חברתיות',
  },
  {
    property: 'og:description',
    content:
      'מומחים לשחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ שנחסמו או נפרצו. הצלחה של 95%+ | תשלום רק אחרי הצלחה.',
  },
  { property: 'og:url', content: 'https://israeltechforce.com/' },
  { property: 'og:site_name', content: 'IsraelTechForce' },
  { property: 'og:locale', content: 'he_IL' },
  {
    property: 'og:image',
    content: 'https://israeltechforce.com/images/israeltechforce-logo-white.png',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  {
    name: 'twitter:title',
    content: 'IsraelTechForce - שחזור חשבונות רשתות חברתיות',
  },
  {
    name: 'twitter:description',
    content:
      'מומחים לשחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ שנחסמו או נפרצו. הצלחה של 95%+.',
  },
  {
    name: 'twitter:image',
    content: 'https://israeltechforce.com/images/israeltechforce-logo-white.png',
  },
  { tagName: 'link', rel: 'canonical', href: 'https://israeltechforce.com/' },
];

export default function HomeRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <Home />
    </>
  );
}
