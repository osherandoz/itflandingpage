import ArticleTemplate from '../../src/components/ArticleTemplate';
import { getArticleBySlug } from '../../src/data/articles';

export const meta = ({ params }) => {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    return [
      { title: 'מאמר לא נמצא | IsraelTechForce' },
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }

  if (article.placeholder) {
    return [
      { title: `${article.title} | IsraelTechForce` },
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }

  const canonicalUrl = `https://israeltechforce.com/articles/${params.slug}`;
  const ogImage =
    'https://israeltechforce.com/images/israeltechforce-logo-white.png';

  return [
    { title: article.metaTitle || `${article.title} | IsraelTechForce` },
    {
      name: 'description',
      content: article.metaDescription || article.excerpt,
    },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: article.title },
    { property: 'og:description', content: article.excerpt },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:site_name', content: 'IsraelTechForce' },
    { property: 'og:locale', content: 'he_IL' },
    { property: 'og:image', content: ogImage },
    { property: 'article:author', content: article.author },
    { property: 'article:published_time', content: article.date },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: article.title },
    { name: 'twitter:description', content: article.excerpt },
    { name: 'twitter:image', content: ogImage },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
  ];
};

export default ArticleTemplate;
