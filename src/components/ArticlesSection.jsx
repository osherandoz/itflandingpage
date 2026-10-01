import React from 'react';
import { Link } from 'react-router';
import { getRecentArticles } from '../data/articles';
import { formatDate } from '../i18n';
import { Eyebrow, ArrowIcon } from './ui';
import './ArticlesSection.css';

// This whole component is lazy-loaded by Home, so the article data stays out
// of the initial bundle.
const ArticlesSection = () => {
  const articles = getRecentArticles(3);
  if (articles.length === 0) return null;
  const [lead, ...rest] = articles;

  return (
    <div className="arts section theme-mist">
      <div className="container">
        <header className="sec-head sec-head--split m-reveal">
          <div>
            <Eyebrow num="05">מדריכים</Eyebrow>
            <h2 className="h1">
              <span className="lt">הגנה מתחילה</span> בידע
            </h2>
          </div>
          <p className="lead">מדריכים פרקטיים שמסבירים איך להגן על החשבונות לפני שהבעיה מתחילה.</p>
        </header>

        <div className="arts__grid">
          <Link to={`/articles/${lead.slug}`} className="arts__lead m-reveal">
            <span className="tag tag--solid">{lead.category}</span>
            <h3 className="h2">{lead.displayTitle || lead.title}</h3>
            <p className="arts__excerpt">{lead.excerpt}</p>
            <span className="arts__meta small">
              <span className="num">{formatDate(lead.date)}</span>
              <span aria-hidden="true">·</span>
              <span>{lead.readTime} קריאה</span>
            </span>
            <span className="arts__go" aria-hidden="true"><ArrowIcon /></span>
          </Link>

          <div className="arts__side m-stagger">
            {rest.map((article, i) => (
              <Link key={article.id} to={`/articles/${article.slug}`} className="arts__row">
                <span className="arts__row-num num" aria-hidden="true">0{i + 2}</span>
                <span>
                  <h3 className="arts__row-title">{article.displayTitle || article.title}</h3>
                  <span className="arts__meta small">
                    <span className="num">{formatDate(article.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTime} קריאה</span>
                  </span>
                </span>
                <span className="arts__go" aria-hidden="true"><ArrowIcon /></span>
              </Link>
            ))}
            <Link to="/articles" className="btn btn--ink arts__all">
              <span>צפה בכל המאמרים</span>
              <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesSection;
