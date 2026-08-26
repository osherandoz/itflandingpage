import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { useLang } from '../i18n';
import Icon from './Icon';
import './ArticlesSection.css';

// article.icon is a Font Awesome class used on the article detail page
// (a separate route that still loads Font Awesome). Map the handful of
// values that appear in the 3 homepage preview cards to our SVG set so the
// homepage itself never triggers a webfont download.
const ICON_MAP = {
  'fab fa-whatsapp': 'whatsapp',
  'fab fa-facebook': 'facebook',
  'fab fa-instagram': 'instagram',
};

const STR = {
  he: {
    title: 'הגנה מתחילה בידע',
    subtitle: 'מדריכים פרקטיים שמסבירים איך להגן על החשבונות לפני שהבעיה מתחילה.',
    readMore: 'קרא עוד',
    viewAll: 'צפה בכל המאמרים',
  },
  en: {
    title: 'Protection Starts with Knowledge',
    subtitle: 'Practical guides that explain how to protect your accounts before the problem starts.',
    readMore: 'Read More',
    viewAll: 'View All Articles',
  },
};

const formatDate = (date, isEn) => {
  if (!isEn) return date.split('-').reverse().join('/');
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const ArticlesSection = () => {
  const { lang, isEn, prefix } = useLang();
  const t = STR[lang];
  // Loaded per-language so this below-fold, lazy-loaded section never ships
  // both languages' full article data — only the visitor's own language.
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const load = isEn
      ? import('../data/articles.en').then((m) => m.getRecentArticlesEn(3))
      : import('../data/articles').then((m) => m.getRecentArticles(3));
    load.then((list) => {
      if (!cancelled) setArticles(list);
    });
    return () => {
      cancelled = true;
    };
  }, [isEn]);

  if (articles.length === 0) return null;

  return (
    <section className="articles-section" id="articles">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t.title}</h2>
          <p className="section-subtitle">
            {t.subtitle}
          </p>
        </div>

        <div className="articles-grid">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              to={`${prefix}/articles/${article.slug}`}
              className={`article-card ${index === 0 ? 'featured' : ''}`}
            >
              <div className="article-icon">
                <Icon name={ICON_MAP[article.icon] || 'newspaper'} aria-hidden="true" />
              </div>
              <div className="article-category">{article.category}</div>
              <h3 className="article-title">{article.displayTitle || article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              <div className="article-meta">
                <span className="article-date">
                  <Icon name="calendar" aria-hidden="true" />
                  {formatDate(article.date, isEn)}
                </span>
                <span className="article-read-time">
                  <Icon name="clock" aria-hidden="true" />
                  {article.readTime}
                </span>
              </div>
              <span className="article-read-more">
                {t.readMore}
                <Icon name="arrowLeft" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="articles-cta">
          <Link to={`${prefix}/articles`} className="view-all-articles-btn">
            <Icon name="book" aria-hidden="true" />
            {t.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
