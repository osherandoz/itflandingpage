import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { pressItems, communityGroups } from '../data/press';
import { ArrowIcon, Eyebrow } from '../components/ui';
import './Press.css';

const t = {
  items: pressItems,
  groups: communityGroups,
  backLink: 'חזרה לעמוד הראשי',
  eyebrow: 'כפי שסוקרנו בתקשורת',
  titleLight: 'IsraelTechForce',
  titleBold: 'בתקשורת',
  subtitle: 'כתבות, סיקורים וקהילות שמדברים על שחזור חשבונות ברשתות החברתיות',
  articlesHeading: 'כתבות וסיקורים',
  videoBadge: 'סרטון',
  articleBadge: 'כתבה',
  videoLink: 'לצפייה בסרטון',
  articleLink: 'לכתבה המלאה',
  communityEyebrow: 'קבוצות תמיכה',
  communityHeading: 'קהילות בניהולנו',
  communityIntro: 'אנחנו מנהלים קהילות תמיכה פעילות ברשתות החברתיות עם אלפי חברים שחוו חסימות',
  ctaText: 'יש לכם כתבה נוספת שסיקרה אותנו? נשמח לשמוע!',
  ctaBtn: 'צרו קשר',
};

// Outlets that actually covered the work, in order of first appearance
const OUTLETS = [...new Set(pressItems.map((item) => item.siteName))];

// First and last year of coverage, e.g. "2022–2026"
const YEAR_LIST = pressItems.map((item) => Number(item.dateISO.slice(0, 4)));
const YEARS = `${Math.min(...YEAR_LIST)}–${Math.max(...YEAR_LIST)}`;

// "Back" in an RTL layout points to the right.
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const Press = () => {
  return (
    <div dir="rtl" className="pressp">
      <Navbar />

      <main id="main">
        <header className="pressp__hero bg-grid">
          <div className="container">
            <Link to="/" className="pressp__back link link--arrow small">
              <BackIcon />
              {t.backLink}
            </Link>
            <Eyebrow className="pressp__eyebrow">{t.eyebrow}</Eyebrow>
            <h1 className="display pressp__title">
              <span className="lt">{t.titleLight}</span> <span className="mk">{t.titleBold}</span>
            </h1>
            <p className="lead pressp__sub">{t.subtitle}</p>
            <ul className="pressp__outlets" aria-hidden="true">
              {OUTLETS.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </header>

        {/* Press articles */}
        <section className="pressp__articles" aria-labelledby="pressp-articles-title">
          <div className="container">
            <header className="pressp__sec-head m-reveal">
              <Eyebrow num="01"><bdi dir="ltr" className="num">{YEARS}</bdi></Eyebrow>
              <h2 className="h2" id="pressp-articles-title">{t.articlesHeading}</h2>
            </header>

            <ol className="pressp__list">
              {t.items.map((item) => (
                <li key={item.id} className="m-reveal">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressp__row"
                  >
                    <span className="pressp__meta">
                      <time className="pressp__date num" dateTime={item.dateISO}>{item.date}</time>
                      <span className="tag pressp__type">
                        {item.type === 'video' ? t.videoBadge : t.articleBadge}
                      </span>
                    </span>
                    <span className="pressp__outlet">{item.siteName}</span>
                    <div className="pressp__text">
                      <h3 className="pressp__headline">{item.headline}</h3>
                      <p className="pressp__summary">{item.summary}</p>
                      <p className="pressp__more">
                        {item.type === 'video' ? t.videoLink : t.articleLink}
                      </p>
                    </div>
                    <span className="pressp__go" aria-hidden="true"><ArrowIcon /></span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Community groups */}
        <section className="pressp__community theme-mist section" aria-labelledby="pressp-community-title">
          <div className="container pressp__community-grid">
            <header className="m-reveal">
              <Eyebrow num="02">{t.communityEyebrow}</Eyebrow>
              <h2 className="h2" id="pressp-community-title">{t.communityHeading}</h2>
              <p className="lead pressp__community-intro">{t.communityIntro}</p>
            </header>

            <ul className="pressp__groups m-stagger">
              {t.groups.map((group) => (
                <li key={group.id}>
                  <a
                    href={group.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pressp__group"
                  >
                    <span className="pressp__group-name">{group.name}</span>
                    <span className="pressp__group-platform">{group.platform}</span>
                    <span className="pressp__go" aria-hidden="true"><ArrowIcon /></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="pressp__cta">
          <div className="container">
          <div className="pressp__cta-card theme-ink m-reveal">
            <p className="h2 pressp__cta-text">{t.ctaText}</p>
            <Link to="/#contact" className="btn btn--paper">
              <span>{t.ctaBtn}</span>
              <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
            </Link>
          </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
