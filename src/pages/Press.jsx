import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { pressItems, communityGroups } from '../data/press';
import './Press.css';

const Press = () => {
  return (
    <div dir="rtl" className="press-page">
      <Navbar />

      <main className="press-main">
        <div className="press-page-container">

          <div className="press-page-header">
            <Link to="/" className="press-back-link">← חזרה לעמוד הראשי</Link>
            <h1 className="press-page-title">
              <i className="fas fa-newspaper" aria-hidden="true"></i>
              IsraelTechForce בתקשורת
            </h1>
            <p className="press-page-subtitle">
              כתבות, סיקורים וקהילות שמדברים על שחזור חשבונות ברשתות החברתיות
            </p>
          </div>

          {/* Press articles */}
          <section className="press-articles-section">
            <h2 className="press-section-heading">כתבות וסיקורים</h2>
            <div className="press-cards-grid">
              {pressItems.map((item) => (
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
                        <><i className="fas fa-play-circle" aria-hidden="true"></i> סרטון</>
                      ) : (
                        <><i className="fas fa-newspaper" aria-hidden="true"></i> כתבה</>
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
                      {item.type === 'video' ? 'לצפייה בסרטון' : 'לכתבה המלאה'}
                      <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Community groups */}
          <section className="press-community-section">
            <h2 className="press-section-heading">קהילות בניהולנו</h2>
            <p className="press-community-intro">
              אנחנו מנהלים קהילות תמיכה פעילות ברשתות החברתיות עם אלפי חברים שחוו חסימות
            </p>
            <div className="press-groups-grid">
              {communityGroups.map((group) => (
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
                  <i className="fas fa-arrow-left press-group-arrow" aria-hidden="true"></i>
                </a>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="press-cta-box">
            <p>יש לכם כתבה נוספת שסיקרה אותנו? נשמח לשמוע!</p>
            <Link to="/#contact" className="press-cta-btn">
              <i className="fas fa-envelope" aria-hidden="true"></i>
              צרו קשר
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Press;
