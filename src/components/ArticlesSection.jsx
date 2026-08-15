import React from 'react';
import { Link } from 'react-router';
import { getRecentArticles } from '../data/articles';
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

const ArticlesSection = () => {
  const articles = getRecentArticles(3);

  return (
    <section className="articles-section" id="articles">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">הגנה מתחילה בידע</h2>
          <p className="section-subtitle">
            מדריכים פרקטיים שמסבירים איך להגן על החשבונות לפני שהבעיה מתחילה.
          </p>
        </div>

        <div className="articles-grid">
          {articles.map((article, index) => (
            <Link
              key={article.id}
              to={`/articles/${article.slug}`}
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
                  {article.date.split('-').reverse().join('/')}
                </span>
                <span className="article-read-time">
                  <Icon name="clock" aria-hidden="true" />
                  {article.readTime}
                </span>
              </div>
              <span className="article-read-more">
                קרא עוד
                <Icon name="arrowLeft" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="articles-cta">
          <Link to="/articles" className="view-all-articles-btn">
            <Icon name="book" aria-hidden="true" />
            צפה בכל המאמרים
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
