import ArticlesPage from '../../src/pages/ArticlesPage';
import { ARTICLES_EN } from '../../src/data/articles.en.js';
import { hreflangLinks } from '../../src/i18n/index.js';

export const meta = () => [
  { title: 'Articles & Guides | IsraelTechForce' },
  {
    name: 'description',
    content:
      'The IsraelTechForce knowledge hub: professional guides to recovering Facebook, Instagram, WhatsApp, and Ads Manager accounts.',
  },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'Articles & Guides | IsraelTechForce' },
  {
    property: 'og:description',
    content: 'Professional guides to recovering social media accounts.',
  },
  { property: 'og:url', content: 'https://www.israeltechforce.com/en/articles' },
  { property: 'og:locale', content: 'en_US' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/images/og-card.png',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/en/articles' },
  ...hreflangLinks('/articles', '/en/articles'),
];

export default function EnArticlesRoute() {
  return <ArticlesPage articles={ARTICLES_EN} />;
}
