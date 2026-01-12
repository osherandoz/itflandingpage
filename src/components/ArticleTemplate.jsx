import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticleBySlug } from '../data/articles';
import { openWhatsApp } from '../utils/whatsapp';
import './ArticleTemplate.css';

const ArticleTemplate = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');
  const contentRef = useRef(null);
  const headingsRef = useRef({});

  useEffect(() => {
    if (!article) return;

    // Parse HTML content and extract headings for TOC
    const parser = new DOMParser();
    const doc = parser.parseFromString(article.content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');
    
    const toc = Array.from(headings).map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;
      return {
        id,
        text: heading.textContent,
        level: heading.tagName.toLowerCase(),
        element: heading
      };
    });

    setTableOfContents(toc);

    // Store heading elements for scroll tracking
    headings.forEach((heading, index) => {
      headingsRef.current[`heading-${index}`] = heading;
    });

    // Update content with IDs
    if (contentRef.current) {
      contentRef.current.innerHTML = doc.body.innerHTML;
    }
  }, [article]);

  useEffect(() => {
    if (tableOfContents.length === 0) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const heading = headingsRef.current[tableOfContents[i].id];
        if (heading) {
          const offsetTop = heading.offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveHeading(tableOfContents[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [tableOfContents]);

  const scrollToHeading = (id) => {
    const heading = headingsRef.current[id];
    if (heading) {
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!article) {
    return (
      <div className="article-not-found">
        <div className="container">
          <h1>מאמר לא נמצא</h1>
          <p>המאמר שביקשתם לא נמצא.</p>
          <Link to="/" className="back-home-btn">חזור לעמוד הבית</Link>
        </div>
      </div>
    );
  }

  // Update document title and meta description
  useEffect(() => {
    // Use metaTitle if available, otherwise use title
    const pageTitle = article.metaTitle || article.title;
    document.title = pageTitle;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', article.metaDescription);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = article.metaDescription;
      document.head.appendChild(metaDescription);
    }

    // Add Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', pageTitle);
    } else {
      const ogTitleMeta = document.createElement('meta');
      ogTitleMeta.setAttribute('property', 'og:title');
      ogTitleMeta.content = pageTitle;
      document.head.appendChild(ogTitleMeta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', article.metaDescription);
    } else {
      const ogDescMeta = document.createElement('meta');
      ogDescMeta.setAttribute('property', 'og:description');
      ogDescMeta.content = article.metaDescription;
      document.head.appendChild(ogDescMeta);
    }
  }, [article]);

  return (
    <div className="article-template">
      <div className="article-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">בית</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/#articles">מאמרים</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{article.title}</span>
        </nav>

        <div className="article-layout">
          {/* Main Content */}
          <article className="article-content">
            {/* Header */}
            <header className="article-header">
              <div className="article-category-badge">
                <i className={article.icon}></i>
                {article.category}
              </div>
              <h1 className="article-title">{article.title}</h1>
              <div className="article-meta-info">
              <div className="article-author">
                <i className="fas fa-user"></i>
                <span>נכתב ע"י <strong>אושר רווח</strong> | מומחה בשחזורי חשבונות</span>
              </div>
                <div className="article-meta-details">
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
              </div>
            </header>

            {/* Table of Contents - Top */}
            {tableOfContents.length > 0 && (
              <div className="table-of-contents-top">
                <h3 className="toc-title">
                  <i className="fas fa-list"></i>
                  תוכן עניינים
                </h3>
                <ul className="toc-list">
                  {tableOfContents.map((item) => (
                    <li key={item.id} className={`toc-item ${item.level}`}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToHeading(item.id);
                        }}
                        className={activeHeading === item.id ? 'active' : ''}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Body */}
            <div 
              ref={contentRef}
              className="article-body"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* CTA Box */}
            <div className="article-cta-box">
              <div className="cta-icon">🚨</div>
              <h3 className="cta-title">אל תשאיר את החשבון שלך חסום</h3>
              <p className="cta-description">
                הצטרף למאות לקוחות שכבר חזרו לפעילות מלאה. קבל ייעוץ מקצועי חינם וחזור לפעילות תוך זמן קצר.
              </p>
              <button 
                onClick={() => {
                  // Navigate to home page and scroll to contact form
                  if (window.location.pathname === '/') {
                    // Already on home page, just scroll
                    setTimeout(() => {
                      const form = document.getElementById('contact-form');
                      if (form) {
                        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  } else {
                    // Navigate to home page with hash - use React Router
                    window.location.href = '/#contact-form';
                    // After navigation, scroll to form
                    setTimeout(() => {
                      const form = document.getElementById('contact-form');
                      if (form) {
                        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 500);
                  }
                }} 
                className="cta-button"
              >
                <i className="fas fa-arrow-down"></i>
                לשחרור מיידי - לחץ כאן
              </button>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="article-sidebar">
            {/* Sticky CTA */}
            <div className="sidebar-cta sticky-cta">
              <div className="sticky-cta-icon">
                <i className="fas fa-headset"></i>
              </div>
              <h4 className="sticky-cta-title">זקוק לשחרור חסימה עכשיו?</h4>
              <p className="sticky-cta-text">צור קשר עכשיו וקבל עזרה מקצועית</p>
              <button onClick={openWhatsApp} className="sticky-cta-button">
                <i className="fab fa-whatsapp"></i>
                צור קשר בוואטסאפ
              </button>
            </div>

            {/* Table of Contents - Sidebar */}
            {tableOfContents.length > 0 && (
              <div className="table-of-contents-sidebar">
                <h4 className="toc-sidebar-title">
                  <i className="fas fa-list"></i>
                  תוכן עניינים
                </h4>
                <ul className="toc-sidebar-list">
                  {tableOfContents.map((item) => (
                    <li key={item.id} className={`toc-sidebar-item ${item.level}`}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToHeading(item.id);
                        }}
                        className={activeHeading === item.id ? 'active' : ''}
                      >
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleTemplate;
