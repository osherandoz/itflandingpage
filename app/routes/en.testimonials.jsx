import TestimonialsPage from '../../src/pages/TestimonialsPage';
import { hreflangLinks } from '../../src/i18n/index.js';

const ITEM_REVIEWED = {
  '@type': 'LocalBusiness',
  '@id': 'https://www.israeltechforce.com/#business',
  name: 'IsraelTechForce - ITF Recovery',
};

const REVIEWS_SCHEMA_EN = [
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Matanel Layani' },
    reviewBody:
      "Since the start of the war, Osher has been there for me through every crisis. He managed to get my account back from bans you wouldn't believe. Just give him the chance and he'll sort it out.",
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: ITEM_REVIEWED,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Hani Asor' },
    reviewBody:
      "My Instagram and Facebook were hacked, and I watched my life's work collapse. I spoke with a few other people who only stressed me out — then Osher came along, calmed everything down, and fixed it.",
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: ITEM_REVIEWED,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Gal Nimni' },
    reviewBody:
      'After getting burned by another company, I turned to Osher, and with real dedication he brought my business back to life. Just like that!',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: ITEM_REVIEWED,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Ofira Yahya' },
    reviewBody:
      'Hackers from Turkey broke in and disabled my account — the situation was almost irreversible. Within about two weeks, Osher got my account back with an unusual calm and composure.',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: ITEM_REVIEWED,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Yesh Atid' },
    reviewBody:
      'One bright day everything went dark on us for a completely absurd reason. Osher quickly diagnosed the problem and, with thorough work, had us back up and running within two days.',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: ITEM_REVIEWED,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: { '@type': 'Person', name: 'Lierac Israel' },
    reviewBody:
      'Excellent support in resolving advertising issues. Osher is professional, available, and helps with every problem. Very satisfied with the service!',
    reviewRating: { '@type': 'Rating', ratingValue: 5, bestRating: 5 },
    itemReviewed: ITEM_REVIEWED,
  },
  // AggregateRating
  {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: 4.9,
    reviewCount: 6,
    bestRating: 5,
    worstRating: 1,
    itemReviewed: ITEM_REVIEWED,
  },
];

export const meta = () => [
  { title: 'Customer Reviews - IsraelTechForce | Rated 4.9/5' },
  {
    name: 'description',
    content:
      'Read real reviews from customers who trusted IsraelTechForce with their account recovery. Rated 4.9/5 by 2,500+ customers.',
  },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'Customer Reviews - IsraelTechForce' },
  { property: 'og:description', content: 'Real reviews from 2,500+ satisfied customers. Rated 4.9/5.' },
  { property: 'og:url', content: 'https://www.israeltechforce.com/en/testimonials' },
  { property: 'og:locale', content: 'en_US' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/images/og-card.png',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/en/testimonials' },
  ...hreflangLinks('/testimonials', '/en/testimonials'),
];

export default function EnTestimonialsRoute() {
  return (
    <>
      {REVIEWS_SCHEMA_EN.map((schema, i) => (
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
