/**
 * English variants of the site-wide schemas — injected on /en/* routes.
 * Same @id anchors as the Hebrew versions so search engines merge the entities.
 */

import { SITE_URL, LOGO_URL, OG_IMAGE_URL, BUSINESS_NAME } from './schemas.js';

export const LOCAL_BUSINESS_SCHEMA_EN = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${SITE_URL}/#business`,
  name: BUSINESS_NAME,
  description:
    'Experts in recovering hacked, disabled, or locked social media accounts — Facebook, Instagram, and WhatsApp. Pay only after success.',
  url: `${SITE_URL}/en`,
  logo: LOGO_URL,
  image: OG_IMAGE_URL,
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

export const PERSON_SCHEMA_EN = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#author`,
  name: 'Osher Revach',
  alternateName: 'אושר רווח',
  jobTitle: 'Social Media Account Recovery Expert',
  description:
    'Israeli digital account recovery expert and founder of IsraelTechForce. Since 2020 has recovered over 2,500 Facebook, Instagram, and WhatsApp accounts for businesses and content creators.',
  url: `${SITE_URL}/en`,
  image: `${SITE_URL}/images/osher-photo-1.jpg`,
  knowsAbout: [
    'Facebook account recovery',
    'Instagram account recovery',
    'WhatsApp account recovery',
    'Meta Business Manager',
    'Ad account recovery',
    'Digital asset security',
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
