import ArticleTemplate from '../../src/components/ArticleTemplate';
import { getArticleBySlug } from '../../src/data/articles';
import { buildBlogPostingSchema, buildBreadcrumbSchema } from '../../src/data/schemas.js';
import { useParams } from 'react-router';

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

  const canonicalUrl = `https://www.israeltechforce.com/articles/${params.slug}`;
  const ogImage =
    'https://www.israeltechforce.com/images/israeltechforce-logo-white.png';

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

export default function ArticleRoute() {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);

  const isReal = article && !article.placeholder;
  const blogPostingSchema = isReal ? buildBlogPostingSchema(article) : null;
  const breadcrumbSchema = isReal
    ? buildBreadcrumbSchema([
        { name: 'בית', item: 'https://www.israeltechforce.com/' },
        { name: 'מאמרים', item: 'https://www.israeltechforce.com/articles' },
        { name: article.displayTitle || article.title },
      ])
    : null;

  return (
    <>
      {blogPostingSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
        />
      )}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      <ArticleTemplate />
    </>
  );
}
