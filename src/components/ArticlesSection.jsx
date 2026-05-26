import React from 'react';
import { Link } from 'react-router';
import { getRecentArticles } from '../data/articles';
import SvgIcon from './SvgIcon';
import './ArticlesSection.css';

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
                <SvgIcon name="whatsapp" />
              </div>
              <div className="article-category">{article.category}</div>
              <h3 className="article-title">{article.displayTitle || article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              <div className="article-meta">
                <span className="article-date">
                  <SvgIcon name="calendar" />
                  {article.date.split('-').reverse().join('/')}
                </span>
                <span className="article-read-time">
                  <SvgIcon name="clock" />
                  {article.readTime}
                </span>
              </div>
              <button className="article-read-more">
                קרא עוד
                <SvgIcon name="arrowLeft" />
              </button>
            </Link>
          ))}
        </div>

        <div className="articles-cta">
          <Link to="/articles" className="view-all-articles-btn">
            <SvgIcon name="book" />
            צפה בכל המאמרים
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
