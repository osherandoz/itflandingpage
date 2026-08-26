/**
 * NewsArticle JSON-LD builder — imported by press route and tests.
 */
const SITE_URL = 'https://www.israeltechforce.com';
const LOGO_URL = `${SITE_URL}/images/og-card.png`;

export const buildNewsArticleSchema = (item, lang = 'he') => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  headline: item.headline,
  datePublished: item.dateISO,
  url: item.url,
  image: LOGO_URL,
  inLanguage: lang,
  publisher: {
    '@type': 'Organization',
    name: item.publisher,
  },
  about: {
    '@type': 'LocalBusiness',
    name: 'IsraelTechForce - ITF Recovery',
    url: SITE_URL,
  },
});
