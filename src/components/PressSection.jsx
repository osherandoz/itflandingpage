import React from 'react';
import { Link } from 'react-router';
import { pressItems } from '../data/press';
import './PressSection.css';

const SiteLogo = ({ item }) => {
  if (item.siteShortName === 'ynet') {
    return <span className="press-logo-text press-logo-ynet">ynet</span>;
  }
  if (item.siteShortName === 'facebook') {
    return (
      <span className="press-logo-text" style={{ color: item.siteColor }}>
        <i className="fab fa-facebook" aria-hidden="true"></i> {item.siteName}
      </span>
    );
  }
  return <span className="press-logo-text">{item.siteName}</span>;
};

const PressSection = () => {
  return (
    <section className="press-section" aria-label="כפי שסוקרנו בתקשורת">
      <div className="press-container">
        <p className="press-label">כפי שסוקרנו ב:</p>
        <div className="press-items">
          {pressItems.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="press-item"
              aria-label={`${item.siteName}: ${item.headline}`}
            >
              <SiteLogo item={item} />
              <span className="press-headline">"{item.headline}"</span>
              <span className="press-date">{item.date}</span>
            </a>
          ))}
        </div>
        <Link to="/press" className="press-more-link">
          ← צפייה בכל הכתבות
        </Link>
      </div>
    </section>
  );
};

export default PressSection;
