import React from 'react';
import { Link } from 'react-router-dom';
import { getRecentArticles } from '../data/articles';
import './ArticlesSection.css';

const ArticlesSection = () => {
  const articles = getRecentArticles(3);

  return (
    <section className="articles-section" id="articles">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">מרכז ידע ומומחיות</h2>
          <p className="section-subtitle">
            מדריכים מקצועיים, טיפים וכלים שיעזרו לכם לשמור על החשבונות שלכם בטוחים ופעילים
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
                <i className={article.icon}></i>
              </div>
              <div className="article-category">{article.category}</div>
              <h3 className="article-title">{article.displayTitle || article.title}</h3>
              <p className="article-excerpt">{article.excerpt}</p>
              <div className="article-meta">
                <span className="article-date">
                  <i className="far fa-calendar"></i>
                  {new Date(article.date).toLocaleDateString('he-IL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                <span className="article-read-time">
                  <i className="far fa-clock"></i>
                  {article.readTime}
                </span>
              </div>
              <button className="article-read-more">
                קרא עוד
                <i className="fas fa-arrow-left"></i>
              </button>
            </Link>
          ))}
        </div>

        <div className="articles-cta">
          <Link to="/articles" className="view-all-articles-btn">
            <i className="fas fa-book"></i>
            צפה בכל המאמרים
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
