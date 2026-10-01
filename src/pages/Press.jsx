import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { pressItems, communityGroups } from '../data/press';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Press.css';

const t = {
  items: pressItems,
  groups: communityGroups,
  backLink: '← חזרה לעמוד הראשי',
  title: 'IsraelTechForce בתקשורת',
  subtitle: 'כתבות, סיקורים וקהילות שמדברים על שחזור חשבונות ברשתות החברתיות',
  articlesHeading: 'כתבות וסיקורים',
  videoBadge: 'סרטון',
  articleBadge: 'כתבה',
  videoLink: 'לצפייה בסרטון',
  articleLink: 'לכתבה המלאה',
  communityHeading: 'קהילות בניהולנו',
  communityIntro: 'אנחנו מנהלים קהילות תמיכה פעילות ברשתות החברתיות עם אלפי חברים שחוו חסימות',
  groupArrowIcon: 'fas fa-arrow-left press-group-arrow',
  ctaText: 'יש לכם כתבה נוספת שסיקרה אותנו? נשמח לשמוע!',
  ctaBtn: 'צרו קשר',
};

const Press = () => {
  return (
    <div dir="rtl" className="press-page">
      <Navbar />

      <main className="press-main">
        <div className="press-page-container">

          <div className="press-page-header">
            <Link to="/" className="press-back-link">{t.backLink}</Link>
            <h1 className="press-page-title">
              <i className="fas fa-newspaper" aria-hidden="true"></i>
              {t.title}
            </h1>
            <p className="press-page-subtitle">{t.subtitle}</p>
          </div>

          {/* Press articles */}
          <section className="press-articles-section">
            <h2 className="press-section-heading">{t.articlesHeading}</h2>
            <div className="press-cards-grid">
              {t.items.map((item) => (
                <article key={item.id} className="press-card">
                  <div className="press-card-header">
                    <span
                      className="press-card-outlet"
                      style={{ color: item.siteColor }}
                    >
                      {item.siteShortName === 'ynet' && (
                        <span className="press-ynet-badge">ynet</span>
                      )}
                      {item.siteShortName === 'facebook' && (
                        <><i className="fab fa-facebook" aria-hidden="true"></i> {item.siteName}</>
                      )}
                    </span>
                    <span className="press-card-type-badge">
                      {item.type === 'video' ? (
                        <><i className="fas fa-play-circle" aria-hidden="true"></i> {t.videoBadge}</>
                      ) : (
                        <><i className="fas fa-newspaper" aria-hidden="true"></i> {t.articleBadge}</>
                      )}
                    </span>
                  </div>

                  <h3 className="press-card-headline">"{item.headline}"</h3>
                  <p className="press-card-summary">{item.summary}</p>

                  <div className="press-card-footer">
                    <time className="press-card-date" dateTime={item.dateISO}>
                      <i className="fas fa-calendar-alt" aria-hidden="true"></i>
                      {item.date}
                    </time>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="press-card-link"
                    >
                      {item.type === 'video' ? t.videoLink : t.articleLink}
                      <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Community groups */}
          <section className="press-community-section">
            <h2 className="press-section-heading">{t.communityHeading}</h2>
            <p className="press-community-intro">{t.communityIntro}</p>
            <div className="press-groups-grid">
              {t.groups.map((group) => (
                <a
                  key={group.id}
                  href={group.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-group-card"
                >
                  <i className={group.icon} aria-hidden="true"></i>
                  <div className="press-group-info">
                    <span className="press-group-name">{group.name}</span>
                    <span className="press-group-platform">{group.platform}</span>
                  </div>
                  <i className={t.groupArrowIcon} aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="press-cta-box">
            <p>{t.ctaText}</p>
            <Link to="/#contact" className="press-cta-btn">
              <i className="fas fa-envelope" aria-hidden="true"></i>
              {t.ctaBtn}
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
