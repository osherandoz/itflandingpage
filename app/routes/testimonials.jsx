import TestimonialsPage from '../../src/pages/TestimonialsPage';

const REVIEWS_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'מתנאל לייני' },
    reviewBody:
      'מתחילת המלחמה אושר מלווה אותי בכל צרה, הצליח להחזיר לי את החשבון מחסימות שלא ברא השטן, רק תנו לו את ההזדמנות והוא יסדר.',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.israeltechforce.com/#business',
      name: 'IsraelTechForce - ITF Recovery',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'חני אסור' },
    reviewBody:
      'פרצו לי לאינסטגרם ולפייסבוק, ראיתי את מפעל חיי קורס. דיברתי עם עוד כמה אנשים שהלחיצו אותי, אושר בא - הרגיע וסידר.',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.israeltechforce.com/#business',
      name: 'IsraelTechForce - ITF Recovery',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'גל נמני' },
    reviewBody:
      'לאחר שנעקצתי על ידי חברה אחרת, פניתי לאושר ובמסירות הוא החזיר לי את העסק לחיים. ממש ככה!',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.israeltechforce.com/#business',
      name: 'IsraelTechForce - ITF Recovery',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'אופירה יחיא' },
    reviewBody:
      'פרצו לי אנשים מטורקיה, השביתו את החשבון והמצב היה כמעט בלתי הפיך - לאחר כשבועיים אושר החזיר לי את החשבון בנחת וברוגע לא אופייניים.',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.israeltechforce.com/#business',
      name: 'IsraelTechForce - ITF Recovery',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'יש עתיד' },
    reviewBody:
      'ביום בהיר אחד ירד עלינו המסך מסיבה הזויה לחלוטין, אושר איבחן מהר את הבעיה ובפעילות יסודית החזיר אותנו לפעילות אחרי יומיים',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.israeltechforce.com/#business',
      name: 'IsraelTechForce - ITF Recovery',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'ליראק ישראל' },
    reviewBody:
      'תמיכה מעולה בפתרון בעיות פרסום. אושר מקצועי, זמין ועוזר בכל בעיה. מאוד מרוצה מהשירות!',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.israeltechforce.com/#business',
      name: 'IsraelTechForce - ITF Recovery',
    },
  },
  // AggregateRating
  {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 6,
    bestRating: 5,
    worstRating: 1,
    itemReviewed: {
      '@type': 'LocalBusiness',
      '@id': 'https://www.israeltechforce.com/#business',
      name: 'IsraelTechForce - ITF Recovery',
    },
  },
];

export const meta = () => [
  { title: 'ביקורות לקוחות — IsraelTechForce | דירוג 4.9/5' },
  {
    name: 'description',
    content:
      'קרא ביקורות אמיתיות מלקוחות שסמכו על IsraelTechForce לשחזור חשבונות. דירוג 4.9/5 מ-2,500+ לקוחות.',
  },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'ביקורות לקוחות — IsraelTechForce' },
  { property: 'og:description', content: 'ביקורות אמיתיות מ-2,500+ לקוחות מרוצים. דירוג 4.9/5.' },
  { property: 'og:url', content: 'https://www.israeltechforce.com/testimonials' },
  { property: 'og:locale', content: 'he_IL' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/images/israeltechforce-logo-white.png',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/testimonials' },
];

export default function TestimonialsRoute() {
  return (
    <>
      {REVIEWS_SCHEMA.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <TestimonialsPage />
    </>
  );
}
