import ArticlesPage from '../../src/pages/ArticlesPage';
import { articles } from '../../src/data/articles.js';
import { hreflangLinks } from '../../src/i18n/index.js';

export const meta = () => [
  { title: 'מאמרים ומדריכים | IsraelTechForce' },
  {
    name: 'description',
    content:
      'מרכז הידע של IsraelTechForce: מדריכים מקצועיים לשחזור חשבונות פייסבוק, אינסטגרם, וואטסאפ ומנהל מודעות.',
  },
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: 'מאמרים ומדריכים | IsraelTechForce' },
  {
    property: 'og:description',
    content: 'מדריכים מקצועיים לשחזור חשבונות רשתות חברתיות.',
  },
  { property: 'og:url', content: 'https://www.israeltechforce.com/articles' },
  { property: 'og:locale', content: 'he_IL' },
  {
    property: 'og:image',
    content: 'https://www.israeltechforce.com/images/og-card.png',
  },
  { name: 'twitter:card', content: 'summary_large_image' },
  { tagName: 'link', rel: 'canonical', href: 'https://www.israeltechforce.com/articles' },
  ...hreflangLinks('/articles', '/en/articles'),
];

export default function ArticlesRoute() {
  return <ArticlesPage articles={articles} />;
}
