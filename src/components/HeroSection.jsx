import React from 'react';
import { getWhatsAppUrl, trackWhatsAppClick } from '../utils/whatsapp';
import Icon from './Icon';
import './HeroSection.css';

const HERO_MESSAGE = 'היי, החשבון שלי חסום, אשמח לעזרה';

const HeroSection = () => {

  return (
    <section className="hero-section">
      {/* Decorative floating social icons, background only */}
      <div className="hero-bg-icons" aria-hidden="true">
        <Icon name="facebook" className="hero-bg-icon" style={{ top: '12%', right: '8%', fontSize: '5rem', animationDelay: '0s' }} />
        <Icon name="instagram" className="hero-bg-icon" style={{ top: '55%', right: '4%', fontSize: '3.5rem', animationDelay: '1.4s' }} />
        <Icon name="whatsapp" className="hero-bg-icon" style={{ top: '75%', right: '14%', fontSize: '4rem', animationDelay: '2.8s' }} />
        <Icon name="facebook" className="hero-bg-icon" style={{ top: '80%', left: '6%', fontSize: '3rem', animationDelay: '0.7s' }} />
        <Icon name="instagram" className="hero-bg-icon" style={{ top: '20%', left: '5%', fontSize: '4.5rem', animationDelay: '2.1s' }} />
        <Icon name="whatsapp" className="hero-bg-icon" style={{ top: '42%', left: '10%', fontSize: '3rem', animationDelay: '3.5s' }} />
      </div>

      <div className="hero-container">

        {/* LIVE availability badge */}
        <div className="hero-live-badge" aria-label="זמין עכשיו">
          <span className="hero-live-dot" aria-hidden="true"></span>
          זמין עכשיו · מענה תוך דקות
        </div>

        {/* Trust bar — every proof point in one compact row */}
        <div className="hero-trust-bar">
          <span>✓ 2,500+ חשבונות שוחזרו</span>
          <span className="trust-divider" aria-hidden="true">|</span>
          <span>⭐ דירוג 4.9/5</span>
          <span className="trust-divider" aria-hidden="true">|</span>
          <span>✓ תשלום רק אחרי הצלחה</span>
          <span className="trust-divider" aria-hidden="true">|</span>
          <span>✓ זמינות 24/6</span>
        </div>

        {/* Logo — hidden on mobile so the headline lands sooner */}
        <div className="hero-logo">
          <img
            src="/images/logo-hero.webp"
            alt="IsraelTechForce - מומחים לשחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ"
            width="260"
            height="192"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            אחזיר לך את החשבון.{' '}
            <span className="hero-highlight">לא הצלחתי, לא שילמת.</span>
          </h1>

          <p className="hero-subtitle">
            מתמחה בחשבונות שמטא הכריזו עליהם כאבודים. פייסבוק, אינסטגרם, WhatsApp ופתרונות מלאים לביזנס מנג׳ר.
          </p>

          <a
            className="hero-cta hero-cta-pulse"
            href={getWhatsAppUrl(HERO_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
          >
            <Icon name="whatsapp" aria-hidden="true" />
            שלחו לי את המקרה בוואטסאפ · תשובה תוך דקות
          </a>

          <p className="hero-guarantee">
            <Icon name="shield" aria-hidden="true" />
            <strong>₪500–3,000 בממוצע.</strong> בלי תשלום מראש, ללא סיכון.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
