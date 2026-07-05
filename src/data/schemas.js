/**
 * Shared schema data — imported by route files and tests.
 * All schema objects are plain JS (no JSX/React dependency).
 */

const SITE_URL = 'https://www.israeltechforce.com';
const LOGO_URL = `${SITE_URL}/images/israeltechforce-logo-white.png`;
const BUSINESS_NAME = 'IsraelTechForce - ITF Recovery';

// ─── LocalBusiness ────────────────────────────────────────────────────────────
export const LOCAL_BUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  description:
    'מומחים לשחזור חשבונות רשתות חברתיות שנחסמו או נפרצו — פייסבוק, אינסטגרם, וואטסאפ. תשלום רק אחרי הצלחה.',
  url: SITE_URL,
  logo: LOGO_URL,
  image: LOGO_URL,
  telephone: '+972509823235',
  email: 'osher@israeltechforce.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Netanya',
    addressCountry: 'IL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '32.3215',
    longitude: '34.8532',
  },
  areaServed: { '@type': 'Country', name: 'Israel' },
  priceRange: '₪₪',
  openingHours: 'Su-Fr 08:00-22:00',
  // aggregateRating removed: self-serving reviews on LocalBusiness are ineligible
  // for rich results per Google policy and risk a structured-data manual action.
  sameAs: [
    'https://share.google/yNPb3RHHkfrk8sxNa',
    'https://www.facebook.com/israeltechforce23',
    'https://www.facebook.com/OsheRevach23',
    'https://www.instagram.com/osher_revach_1/',
    'https://www.tiktok.com/@israeltechforce',
    'https://www.facebook.com/groups/661405387897704/',
    'https://www.facebook.com/groups/334387796292468/',
  ],
};

// ─── Individual Service schemas (one per service card) ────────────────────────
const provider = {
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
};
const areaServed = { '@type': 'Country', name: 'Israel' };

export const SERVICE_SCHEMAS = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'שחזור חשבון וואטסאפ חסום או פרוץ',
    description:
      'שירותי שחזור מקצועיים עבור חשבונות WhatsApp שנחסמו או נפרצו. שחזור גישה מהיר ואמין עם אחוזי הצלחה גבוהים ותשלום רק אחרי הצלחה.',
    provider,
    areaServed,
    serviceType: 'שחזור חשבון וואטסאפ',
    url: `${SITE_URL}/#services`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'שחזור חשבון אינסטגרם חסום או פרוץ',
    description:
      'פתרון בעיות מקצועי עבור חשבונות Instagram שנחסמו או נפרצו. שחזור גישה מלאה לחשבון עם כל הפיצ\'רים ואבטחה מחדש.',
    provider,
    areaServed,
    serviceType: 'שחזור חשבון אינסטגרם',
    url: `${SITE_URL}/#services`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'שחזור חשבון פייסבוק חסום או פרוץ',
    description:
      'שירותי שחזור מתקדמים עבור חשבונות Facebook שנחסמו או נפרצו. החזרת גישה מלאה לחשבון ולכל הפיצ\'רים כולל הסרת הגבלות.',
    provider,
    areaServed,
    serviceType: 'שחזור חשבון פייסבוק',
    url: `${SITE_URL}/#services`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'פתרון בעיות התחברות לרשתות חברתיות',
    description:
      'פתרון בעיות התחברות מקצועי לכל רשתות החברתיות. שחזור גישה מהיר לחשבונות שלך עם הגדרת אימות דו-שלבי ואבטחה מתקדמת.',
    provider,
    areaServed,
    serviceType: 'פתרון בעיות התחברות',
    url: `${SITE_URL}/#services`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'תמיכה ב-Facebook Business Manager',
    description:
      'שירותי תמיכה מלאים עבור Facebook Business Manager. ניהול הרשאות, פתרון בעיות טכניות והקמת תשתית פרסום מקצועית.',
    provider,
    areaServed,
    serviceType: 'Facebook Business Manager',
    url: `${SITE_URL}/#services`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'פתרון בעיות פרסום וקמפיינים',
    description:
      'תמיכה ופתרון בעיות מקצועי עבור קמפיינים פרסומיים. אישור מודעות, פתרון בעיות חוב וחשבון, והקמת תשתית פרסום.',
    provider,
    areaServed,
    serviceType: 'פרסום וקמפיינים',
    url: `${SITE_URL}/#services`,
  },
];

// ─── BlogPosting builder (article pages) ─────────────────────────────────────
export const buildBlogPostingSchema = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.displayTitle || article.title,
  description: article.metaDescription || article.excerpt,
  datePublished: article.date,
  dateModified: article.dateModified || article.date,
  url: `${SITE_URL}/articles/${article.slug}`,
  image: LOGO_URL,
  inLanguage: 'he',
  author: {
    '@type': 'Person',
    name: 'אושר רווח',
    url: `${SITE_URL}/#author`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'IsraelTechForce',
    '@id': `${SITE_URL}/#business`,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_URL}/articles/${article.slug}`,
  },
  about: {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
  },
});

// ─── Person (owner / author) ─────────────────────────────────────────────────
export const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#author`,
  name: 'אושר רווח',
  alternateName: 'Osher Revach',
  jobTitle: 'מומחה שחזור חשבונות רשתות חברתיות',
  description:
    'מומחה ישראלי לשחזור חשבונות דיגיטליים, מייסד IsraelTechForce. מאז 2020 שחזר מעל 2,500 חשבונות פייסבוק, אינסטגרם ווואטסאפ לעסקים וליוצרי תוכן.',
  url: SITE_URL,
  image: `${SITE_URL}/images/osher-photo-1.jpg`,
  knowsAbout: [
    'שחזור חשבונות פייסבוק',
    'שחזור חשבונות אינסטגרם',
    'שחזור חשבונות וואטסאפ',
    'Meta Business Manager',
    'Facebook account recovery',
    'Instagram account recovery',
    'אבטחת נכסים דיגיטליים',
  ],
  worksFor: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
  },
  sameAs: [
    'https://www.instagram.com/osher_revach_1/',
    'https://www.facebook.com/OsheRevach23',
  ],
};

// ─── HowTo builder (service pages — "3 שלבים" section) ───────────────────────
// pageData: { title, path, steps: [{ title, desc }] }
export const buildHowToSchema = (pageData) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: pageData.howToName || pageData.title,
  description: pageData.metaDescription || pageData.description,
  inLanguage: 'he',
  step: pageData.steps.map((s, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: s.title,
    text: s.desc,
  })),
});

// ─── BreadcrumbList builder ───────────────────────────────────────────────────
// items: [{ name, item? }]  — last item has no `item` (current page)
export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((crumb, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: crumb.name,
    ...(crumb.item ? { item: crumb.item } : {}),
  })),
});
