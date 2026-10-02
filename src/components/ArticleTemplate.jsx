import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import Icon from './Icon';
import { Eyebrow, WaBtn, ArrowIcon } from './ui';
import { SERVICE_PATHS, formatDate } from '../i18n';
import { articles } from '../data/articles';
import { trackWhatsAppClick } from '../utils/whatsapp';
import './ArticleTemplate.css';

const AUTHOR_PATH = '/אושר-רווח';

const t = {
  notFoundTitle: 'מאמר לא נמצא',
  notFoundText: 'המאמר שביקשתם לא נמצא.',
  backHome: 'חזור לעמוד הבית',
  placeholderTitle: 'המאמר בדרך...',
  placeholderText: 'המאמר הזה עדיין בכתיבה. בינתיים, יש לך שאלה? נשמח לעזור ישירות.',
  placeholderWhatsApp: 'דברו איתנו בוואטסאפ',
  placeholderBack: '← חזרה לעמוד הבית',
  breadcrumbLabel: 'פירורי לחם',
  breadcrumbHome: 'בית',
  breadcrumbArticles: 'מאמרים',
  authorBy: 'נכתב ע"י',
  authorName: 'אושר רווח',
  authorRole: 'מומחה בשחזורי חשבונות',
  authorMore: 'הסיפור המלא, איך זה התחיל',
  authorAlt: 'אושר רווח, מומחה שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ',
  readSuffix: 'קריאה',
  shortAnswerLabel: 'תשובה קצרה',
  tocTitle: 'תוכן עניינים',
  ctaTitleLight: 'אל תשאיר את החשבון שלך',
  ctaTitleMark: 'חסום',
  ctaDescription: 'הצטרף למאות לקוחות שכבר חזרו לפעילות מלאה. קבל ייעוץ מקצועי חינם וחזור לפעילות תוך זמן קצר.',
  ctaButton: 'לשחרור מיידי - לחץ כאן',
  stickyCtaTitle: 'זקוק לשחרור חסימה עכשיו?',
  stickyCtaText: 'צור קשר עכשיו וקבל עזרה מקצועית',
  stickyCtaButton: 'צור קשר בוואטסאפ',
  serviceCardEyebrow: 'השירות שפותר את זה',
  serviceCardText: 'עמוד השירות המלא: איך זה עובד, כמה זמן זה לוקח ומה לקוחות מספרים.',
  serviceCardLink: (label) => `לעמוד ${label} ←`,
  moreTitleLight: 'מדריכים',
  moreTitleBold: 'נוספים',
  moreAll: 'צפה בכל המאמרים',
  whatsappMessage: 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים',
};

// Article slug → the service page that sells the fix it describes. Without this
// every article dead-ends in WhatsApp and the money pages get no traffic or link
// equity from the content that ranks for them.
const ARTICLE_SERVICE = {
  'whatsapp-unblock': 'whatsapp-recovery',
  'whatsapp-recovery-guide': 'whatsapp-recovery',
  'facebook-account-disabled': 'facebook-disabled',
  'facebook-disabled-vs-limited': 'facebook-disabled',
  'facebook-recovery-no-email-phone': 'facebook-recovery',
  'instagram-hacked-recovery': 'instagram-hacked',
  'shadowban-instagram-2025': 'instagram-recovery',
  'protect-instagram-account': 'instagram-recovery',
  'ads-manager-blocked': 'ads-manager',
};

const SERVICE_LABELS = {
  'facebook-recovery': 'שחזור חשבון פייסבוק',
  'instagram-recovery': 'שחזור חשבון אינסטגרם',
  'whatsapp-recovery': 'שחזור חשבון וואטסאפ',
  'facebook-disabled': 'חשבון פייסבוק מושבת',
  'instagram-hacked': 'חשבון אינסטגרם נפרץ',
  'ads-manager': 'שחזור מנהל מודעות',
};

const ENTITIES = { '&nbsp;': ' ', '&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>' };
const plainText = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&(nbsp|amp|quot|#39|lt|gt);/g, (m) => ENTITIES[m])
    .trim();

// Gives every h2/h3 of the article HTML an id and returns the table of
// contents with it. Pure string work, so the server render already has the
// TOC and the anchors (no layout shift after hydration). The body is also cut
// in two before its middle h2, which is where the inline CTA sits.
function prepareContent(html) {
  const toc = [];
  const ctaAt = html.indexOf('class="article-cta-box"');
  const withIds = html.replace(/<(h2|h3)(\s[^>]*)?>([\s\S]*?)<\/\1>/g, (match, tag, attrs = '', inner, offset) => {
    // the heading of the closing CTA box is not a section of the article
    if (ctaAt !== -1 && offset > ctaAt) return match;
    const id = `heading-${toc.length}`;
    toc.push({ id, text: plainText(inner), level: tag });
    return `<${tag} id="${id}"${attrs}>${inner}</${tag}>`;
  });

  const h2s = toc.filter((item) => item.level === 'h2');
  let parts = [withIds];
  if (h2s.length >= 4) {
    const at = withIds.indexOf(`<h2 id="${h2s[Math.floor(h2s.length / 2)].id}"`);
    if (at > 0) parts = [withIds.slice(0, at), withIds.slice(at)];
  }
  return { toc, parts };
}

// "Question? The rest" / "Topic: the rest" → black hook + light remainder.
const splitTitle = (title) => {
  const m = title.match(/^(.*?[?:])\s+(.+)$/);
  return m ? [m[1], m[2]] : [title, ''];
};

const Avatar = ({ size, eager }) => (
  <img
    className="artp__avatar"
    src="/images/brand/osher-portrait-400.webp"
    alt={t.authorAlt}
    width={size}
    height={size}
    loading={eager ? undefined : 'lazy'}
    decoding="async"
  />
);

const TocList = ({ items, active, onPick }) => (
  <ol className="artp__toc-list">
    {items.map((item) => (
      <li key={item.id} className={`artp__toc-item artp__toc-item--${item.level}`}>
        <a
          href={`#${item.id}`}
          onClick={(e) => onPick(e, item.id)}
          className={active === item.id ? 'is-active' : undefined}
          aria-current={active === item.id ? 'location' : undefined}
        >
          {item.text}
        </a>
      </li>
    ))}
  </ol>
);

const Shell = ({ children }) => (
  <div className="artp" dir="rtl">
    <Navbar />
    <main id="main">{children}</main>
    <Footer />
    <FloatingWhatsApp />
  </div>
);

const ArticleTemplate = ({ article }) => {
  const homePath = '/';
  const serviceSlug = article ? ARTICLE_SERVICE[article.slug] : undefined;
  const serviceLink = serviceSlug
    ? { to: SERVICE_PATHS[serviceSlug], label: SERVICE_LABELS[serviceSlug] }
    : null;
  const [activeHeading, setActiveHeading] = useState('');

  const content = article && !article.placeholder ? article.content : '';
  const { toc: tableOfContents, parts } = useMemo(() => prepareContent(content), [content]);

  // Highlight the section being read in the table of contents
  useEffect(() => {
    if (tableOfContents.length === 0) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = '';
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const heading = document.getElementById(tableOfContents[i].id);
        if (heading && heading.getBoundingClientRect().top <= 200) {
          current = tableOfContents[i].id;
          break;
        }
      }
      setActiveHeading(current);
    };
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
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

  const scrollToHeading = (e, id) => {
    const heading = document.getElementById(id);
    if (!heading) return;
    e.preventDefault();
    heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // The WhatsApp link inside the article HTML is plain markup: count its
  // clicks like every other WhatsApp CTA on the site.
  const onBodyClick = (e) => {
    if (e.target.closest && e.target.closest('a.cta-button')) trackWhatsAppClick('article-inline');
  };

  if (!article) {
    return (
      <Shell>
        <section className="artp__empty">
          <div className="container">
            <h1 className="h1">{t.notFoundTitle}</h1>
            <p className="lead">{t.notFoundText}</p>
            <Link to={homePath} className="btn btn--ink btn--plain">{t.backHome}</Link>
          </div>
        </section>
      </Shell>
    );
  }

  if (article.placeholder) {
    return (
      <Shell>
        <section className="artp__empty">
          <div className="container">
            <h1 className="h1">{t.placeholderTitle}</h1>
            <p className="lead">{t.placeholderText}</p>
            <WaBtn message={t.whatsappMessage} location="article-inline">{t.placeholderWhatsApp}</WaBtn>
            <Link to={homePath} className="link small">{t.placeholderBack}</Link>
          </div>
        </section>
      </Shell>
    );
  }

  const [titleHook, titleRest] = splitTitle(article.title);
  const moreArticles = articles
    .filter((a) => !a.placeholder && a.slug !== article.slug)
    .map((a, i) => ({
      a,
      i,
      score: (ARTICLE_SERVICE[a.slug] === serviceSlug ? 2 : 0) + (a.icon === article.icon ? 1 : 0),
    }))
    .sort((x, y) => y.score - x.score || x.i - y.i)
    .slice(0, 4)
    .map((x) => x.a);

  return (
    <Shell>
      <article>
        <header className="artp__head theme-ink bg-grid">
          <div className="container">
            <nav className="artp__crumbs" aria-label={t.breadcrumbLabel}>
              <Link to={homePath}>{t.breadcrumbHome}</Link>
              <span aria-hidden="true">/</span>
              <Link to="/articles">{t.breadcrumbArticles}</Link>
              <span aria-hidden="true">/</span>
              <span className="artp__crumb-current" aria-current="page">{article.title}</span>
            </nav>

            <p className="artp__kicker">
              <span className="tag artp__cat">
                <Icon name={article.icon} />
                {article.category}
              </span>
            </p>

            <h1 className="artp__title">
              {titleHook}
              {titleRest && <> <span className="lt">{titleRest}</span></>}
            </h1>

            <div className="artp__byline">
              <div className="artp__by">
                <Avatar size={48} eager />
                <p className="artp__by-text">
                  <span>
                    {t.authorBy} <Link to={AUTHOR_PATH} className="link">{t.authorName}</Link>
                  </span>
                  <span className="artp__by-role">{t.authorRole}</span>
                </p>
              </div>
              <p className="artp__facts">
                <bdi className="num">{formatDate(article.date)}</bdi>
                <span aria-hidden="true">·</span>
                <span>{article.readTime} {t.readSuffix}</span>
              </p>
            </div>
          </div>
        </header>

        <div className="artp__read">
          <div className="container artp__layout">
            {tableOfContents.length > 0 && (
              // data-scrub: --p follows reading progress and draws the rail
              <aside className="artp__aside" data-scrub="0.001 1">
                <nav className="artp__toc" aria-label={t.tocTitle}>
                  <p className="artp__toc-title">{t.tocTitle}</p>
                  <TocList items={tableOfContents} active={activeHeading} onPick={scrollToHeading} />
                </nav>
              </aside>
            )}

            <div className="artp__main">
              {/* Short answer, direct, self-contained block for AI-engine citation (GEO) */}
              {article.shortAnswer && (
                <div className="artp__answer">
                  <span className="tag tag--solid">{t.shortAnswerLabel}</span>
                  <p>{article.shortAnswer}</p>
                </div>
              )}

              {tableOfContents.length > 0 && (
                <details className="artp__toc-m">
                  <summary>
                    <span>{t.tocTitle}</span>
                    <span className="artp__toc-m-icon" aria-hidden="true" />
                  </summary>
                  <nav aria-label={t.tocTitle}>
                    <TocList items={tableOfContents} active={activeHeading} onPick={scrollToHeading} />
                  </nav>
                </details>
              )}

              {/* Article body. The delegated handler only observes link clicks. */}
              <div className="artp__body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: parts[0] }} />

              {parts[1] && (
                <>
                  <aside className="artp__cta theme-ink">
                    <div>
                      <p className="artp__cta-title">{t.stickyCtaTitle}</p>
                      <p className="artp__cta-text">{t.stickyCtaText}</p>
                    </div>
                    <WaBtn message={t.whatsappMessage} location="article-inline">{t.stickyCtaButton}</WaBtn>
                  </aside>
                  <div className="artp__body" onClick={onBodyClick} dangerouslySetInnerHTML={{ __html: parts[1] }} />
                </>
              )}

              <footer className="artp__after">
                {/* Related service page — the article's path to the money page */}
                {serviceLink && (
                  <div className="artp__service theme-mist m-reveal">
                    <span className="artp__service-eyebrow">{t.serviceCardEyebrow}</span>
                    <p className="artp__service-title">{serviceLink.label}</p>
                    <p className="artp__service-text">{t.serviceCardText}</p>
                    <Link to={serviceLink.to} className="link">
                      {t.serviceCardLink(serviceLink.label)}
                    </Link>
                  </div>
                )}

                <div className="artp__author m-reveal">
                  <Avatar size={72} />
                  <div className="artp__author-text">
                    <p className="artp__author-name">{t.authorName}</p>
                    <p className="artp__author-role">{t.authorRole}</p>
                    <Link to={AUTHOR_PATH} className="link link--arrow small">
                      {t.authorMore}
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </article>

      <section className="artp__end section theme-ink">
        <div className="container artp__end-grid">
          <h2 className="h1 m-reveal">
            <span className="lt">{t.ctaTitleLight}</span> <span className="mk m-in">{t.ctaTitleMark}</span>
          </h2>
          <div className="artp__end-side m-reveal">
            <p className="lead">{t.ctaDescription}</p>
            <div className="artp__end-actions">
              <WaBtn message={t.whatsappMessage} location="article-final">{t.stickyCtaButton}</WaBtn>
              {/* Home scrolls to #contact-form on arrival (see Home.jsx) */}
              <Link to={`${homePath}#contact-form`} className="btn btn--ghost">
                <span>{t.ctaButton}</span>
                <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {moreArticles.length > 0 && (
        <section className="artp__more section theme-mist">
          <div className="container">
            <header className="artp__more-head m-reveal">
              <div>
                <Eyebrow>{article.category}</Eyebrow>
                <h2 className="h1">
                  <span className="lt">{t.moreTitleLight}</span> {t.moreTitleBold}
                </h2>
              </div>
              <Link to="/articles" className="link link--arrow">
                {t.moreAll}
                <ArrowIcon />
              </Link>
            </header>

            <div className="artp__rows m-stagger">
              {moreArticles.map((item, i) => (
                <Link key={item.id} to={`/articles/${item.slug}`} className="artp__row">
                  <span className="artp__row-num num" aria-hidden="true">0{i + 1}</span>
                  <h3 className="artp__row-title">{item.displayTitle || item.title}</h3>
                  <span className="artp__row-meta small">
                    <bdi className="num">{formatDate(item.date)}</bdi>
                    <span aria-hidden="true">·</span>
                    <span>{item.readTime} {t.readSuffix}</span>
                  </span>
                  <span className="artp__go" aria-hidden="true"><ArrowIcon /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Shell>
  );
};

export default ArticleTemplate;
