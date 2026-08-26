import ArticleTemplate from '../../src/components/ArticleTemplate';
import { getArticleBySlugEn } from '../../src/data/articles.en';
import { buildBreadcrumbSchema } from '../../src/data/schemas.js';
import { hreflangLinks, SITE_ORIGIN } from '../../src/i18n/index.js';
import { useParams } from 'react-router';

const LOGO_URL = `${SITE_ORIGIN}/images/israeltechforce-logo-white.png`;
const OG_IMAGE_URL = `${SITE_ORIGIN}/images/og-card.png`;

// English BlogPosting schema — mirrors buildBlogPostingSchema but with the
// /en/articles URL, English language, and the founder's Latin name.
const buildBlogPostingSchemaEn = (article) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: article.displayTitle || article.title,
  description: article.metaDescription || article.excerpt,
  datePublished: article.date,
  dateModified: article.dateModified || article.date,
  url: `${SITE_ORIGIN}/en/articles/${article.slug}`,
  image: OG_IMAGE_URL,
  inLanguage: 'en',
  author: {
    '@type': 'Person',
    name: 'Osher Revach',
    url: `${SITE_ORIGIN}/#author`,
  },
  publisher: {
    '@type': 'Organization',
    name: 'IsraelTechForce',
    '@id': `${SITE_ORIGIN}/#business`,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${SITE_ORIGIN}/en/articles/${article.slug}`,
  },
  about: {
    '@type': 'LocalBusiness',
    '@id': `${SITE_ORIGIN}/#business`,
    name: 'IsraelTechForce - ITF Recovery',
  },
});

// Unknown/placeholder slugs must be a real 404, not a soft-404 (SEO)
export function loader({ params }) {
  const article = getArticleBySlugEn(params.slug);
  if (!article || article.placeholder) {
    throw new Response('Not Found', { status: 404 });
  }
  return null;
}

export const meta = ({ params }) => {
  const article = getArticleBySlugEn(params.slug);

  if (!article) {
    return [
      { title: 'Article Not Found | IsraelTechForce' },
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }

  if (article.placeholder) {
    return [
      { title: `${article.title} | IsraelTechForce` },
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }

  const canonicalUrl = `https://www.israeltechforce.com/en/articles/${params.slug}`;
  const ogImage =
    'https://www.israeltechforce.com/images/og-card.png';

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
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:image', content: ogImage },
    { property: 'article:author', content: article.author },
    { property: 'article:published_time', content: article.date },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: article.title },
    { name: 'twitter:description', content: article.excerpt },
    { name: 'twitter:image', content: ogImage },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },
    ...hreflangLinks('/articles/' + params.slug, '/en/articles/' + params.slug),
  ];
};

export default function EnArticleRoute() {
  const { slug } = useParams();
  const article = getArticleBySlugEn(slug);

  const isReal = article && !article.placeholder;
  const blogPostingSchema = isReal ? buildBlogPostingSchemaEn(article) : null;
  const breadcrumbSchema = isReal
    ? buildBreadcrumbSchema([
        { name: 'Home', item: 'https://www.israeltechforce.com/en' },
        { name: 'Articles', item: 'https://www.israeltechforce.com/en/articles' },
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
      <ArticleTemplate article={article} />
    </>
  );
}
