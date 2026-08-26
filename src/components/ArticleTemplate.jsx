import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { useLang, togglePath } from '../i18n';
import { openWhatsApp, WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './ArticleTemplate.css';

const STR = {
  he: {
    notFoundTitle: 'מאמר לא נמצא',
    notFoundText: 'המאמר שביקשתם לא נמצא.',
    backHome: 'חזור לעמוד הבית',
    placeholderTitle: 'המאמר בדרך...',
    placeholderText: 'המאמר הזה עדיין בכתיבה. בינתיים, יש לך שאלה? נשמח לעזור ישירות.',
    placeholderWhatsApp: 'דברו איתנו בוואטסאפ',
    placeholderBack: '← חזרה לעמוד הבית',
    breadcrumbHome: 'בית',
    breadcrumbArticles: 'מאמרים',
    authorLine: (
      <span>נכתב ע"י <strong>אושר רווח</strong> | מומחה בשחזורי חשבונות</span>
    ),
    shortAnswerLabel: 'תשובה קצרה',
    tocTitle: 'תוכן עניינים',
    ctaTitle: 'אל תשאיר את החשבון שלך חסום',
    ctaDescription: 'הצטרף למאות לקוחות שכבר חזרו לפעילות מלאה. קבל ייעוץ מקצועי חינם וחזור לפעילות תוך זמן קצר.',
    ctaButton: 'לשחרור מיידי - לחץ כאן',
    stickyCtaTitle: 'זקוק לשחרור חסימה עכשיו?',
    stickyCtaText: 'צור קשר עכשיו וקבל עזרה מקצועית',
    stickyCtaButton: 'צור קשר בוואטסאפ',
    whatsappMessage: 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים',
  },
  en: {
    notFoundTitle: 'Article Not Found',
    notFoundText: 'The article you requested was not found.',
    backHome: 'Back to Home',
    placeholderTitle: 'This article is on its way...',
    placeholderText: 'This article is still being written. In the meantime, have a question? We would be happy to help directly.',
    placeholderWhatsApp: 'Talk to Us on WhatsApp',
    placeholderBack: '← Back to Home',
    breadcrumbHome: 'Home',
    breadcrumbArticles: 'Articles',
    authorLine: (
      <span>Written by <strong>Osher Revach</strong> | Account Recovery Expert</span>
    ),
    shortAnswerLabel: 'Short Answer',
    tocTitle: 'Table of Contents',
    ctaTitle: 'Don’t Leave Your Account Locked',
    ctaDescription: 'Join hundreds of clients who are already back in full operation. Get free professional advice and get back online fast.',
    ctaButton: 'Get Unblocked Now - Click Here',
    stickyCtaTitle: 'Need Your Account Unblocked Now?',
    stickyCtaText: 'Get in touch now for professional help',
    stickyCtaButton: 'Contact Us on WhatsApp',
    whatsappMessage: WHATSAPP_DEFAULT_MSG.en,
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

const ArticleTemplate = ({ article }) => {
  const { lang, isEn, dir, prefix } = useLang();
  const { pathname } = useLocation();
  const t = STR[lang];
  const homePath = prefix || '/';
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

  // Update document title and meta tags (must be before early returns)
  useEffect(() => {
    if (!article) return;
    const pageTitle = article.metaTitle || article.title;
    document.title = pageTitle;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', article.metaDescription);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = article.metaDescription;
      document.head.appendChild(metaDescription);
    }

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

  // Article JSON-LD is rendered SSR by the route (buildBlogPostingSchema), no client-side duplicate here.

  // Inject noindex for placeholder articles
  useEffect(() => {
    if (!article || !article.placeholder) return;
    let robotsMeta = document.querySelector('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.name = 'robots';
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = 'noindex, nofollow';
    return () => {
      if (robotsMeta) robotsMeta.remove();
    };
  }, [article]);

  const scrollToHeading = (id) => {
    const heading = headingsRef.current[id];
    if (heading) {
      heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!article) {
    return (
      <div className="article-not-found" dir={dir}>
        <div className="container">
          <h1>{t.notFoundTitle}</h1>
          <p>{t.notFoundText}</p>
          <Link to={homePath} className="back-home-btn">{t.backHome}</Link>
        </div>
      </div>
    );
  }

  if (article.placeholder) {
    return (
      <div dir={dir} style={{ minHeight: '100vh', background: '#0C0E1D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '480px' }}>
          <i className="fas fa-tools" style={{ fontSize: '3rem', color: '#3B82F6', display: 'block', marginBottom: '20px' }}></i>
          <h1 style={{ color: '#ffffff', marginBottom: '12px', fontSize: '1.8rem' }}>{t.placeholderTitle}</h1>
          <p style={{ color: '#e0e0e0', marginBottom: '32px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            {t.placeholderText}
          </p>
          <button
            onClick={() => openWhatsApp(t.whatsappMessage)}
            style={{
              background: '#25D366',
              color: 'white',
              border: 'none',
              padding: '14px 32px',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'inherit',
            }}
          >
            <i className="fab fa-whatsapp"></i>
            {t.placeholderWhatsApp}
          </button>
          <br /><br />
          <Link to={homePath} style={{ color: '#3B82F6', fontSize: '0.95rem' }}>{t.placeholderBack}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="article-template" dir={dir}>
      <div className="article-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to={homePath}>{t.breadcrumbHome}</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`${homePath}#articles`}>{t.breadcrumbArticles}</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{article.title}</span>
          <Link className="breadcrumb-lang-toggle" to={togglePath(pathname)}>
            {isEn ? 'עברית' : 'English'}
          </Link>
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
                {t.authorLine}
              </div>
                <div className="article-meta-details">
                  <span className="article-date">
                    <i className="far fa-calendar"></i>
                    {formatDate(article.date, isEn)}
                  </span>
                  <span className="article-read-time">
                    <i className="far fa-clock"></i>
                    {article.readTime}
                  </span>
                </div>
              </div>
            </header>

            {/* Short answer, direct, self-contained block for AI-engine citation (GEO) */}
            {article.shortAnswer && (
              <div className="article-short-answer">
                <span className="short-answer-label">{t.shortAnswerLabel}</span>
                <p>{article.shortAnswer}</p>
              </div>
            )}

            {/* Table of Contents - Top */}
            {tableOfContents.length > 0 && (
              <div className="table-of-contents-top">
                <h3 className="toc-title">
                  <i className="fas fa-list"></i>
                  {t.tocTitle}
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
              <h3 className="cta-title">{t.ctaTitle}</h3>
              <p className="cta-description">
                {t.ctaDescription}
              </p>
              <button
                onClick={() => {
                  // Navigate to home page and scroll to contact form
                  if (window.location.pathname === homePath) {
                    // Already on home page, just scroll
                    setTimeout(() => {
                      const form = document.getElementById('contact-form');
                      if (form) {
                        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }, 100);
                  } else {
                    // Navigate to home page with hash - use React Router
                    window.location.href = `${homePath}#contact-form`;
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
                {t.ctaButton}
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
              <h4 className="sticky-cta-title">{t.stickyCtaTitle}</h4>
              <p className="sticky-cta-text">{t.stickyCtaText}</p>
              <button onClick={() => openWhatsApp(t.whatsappMessage)} className="sticky-cta-button">
                <i className="fab fa-whatsapp"></i>
                {t.stickyCtaButton}
              </button>
            </div>

            {/* Table of Contents - Sidebar */}
            {tableOfContents.length > 0 && (
              <div className="table-of-contents-sidebar">
                <h4 className="toc-sidebar-title">
                  <i className="fas fa-list"></i>
                  {t.tocTitle}
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
