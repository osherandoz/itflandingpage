import React from 'react';
import { openWhatsApp } from '../utils/whatsapp';
import './HeroSection.css';

const HeroSection = () => {

  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* LIVE availability badge */}
        <div className="hero-live-badge" aria-label="זמינים עכשיו">
          <span className="hero-live-dot" aria-hidden="true"></span>
          זמינים עכשיו · מענה תוך דקות
        </div>

        {/* Trust Bar */}
        <div className="hero-trust-bar">
          <span>✓ 2,500+ חשבונות שוחזרו</span>
          <span className="trust-divider" aria-hidden="true">|</span>
          <span>⭐ דירוג 4.9/5</span>
          <span className="trust-divider" aria-hidden="true">|</span>
          <span>✓ תשלום רק אחרי הצלחה</span>
        </div>

        {/* Logo — visible on all screen sizes */}
        <div className="hero-logo">
          <img
            src="/images/israeltechforce-logo-white.png"
            alt="IsraelTechForce — מומחים לשחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ"
            width="3000"
            height="2212"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            חסמו לך את החשבון?{' '}
            <span className="hero-highlight">אנחנו מחזירים אותך</span>{' '}
            בזמן הקצר ביותר
          </h1>

          <p className="hero-urgency" role="alert">
            ⚠️ כל יום שעובר פוגע בסיכויי השחזור — פעל עכשיו
          </p>

          <p className="hero-subtitle">
            95%+ הצלחה בשחזור חשבונות פייסבוק, אינסטגרם ו-WhatsApp —
            גם במקרים שמטא אמרו שאין סיכוי.{' '}
            <strong>וגם פתרונות לעסקים: ביזנס מנג׳ר, דפים עסקיים וחשבונות מודעות</strong>
          </p>

          <div className="hero-features">
            <span className="hero-feature">✓ שחזור מהיר ככל האפשר</span>
            <span className="hero-feature">✓ תשלום רק אחרי הצלחה</span>
            <span className="hero-feature">✓ זמינות 24/6</span>
          </div>

          <button className="hero-cta hero-cta-pulse" onClick={openWhatsApp}>
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
            שלחו הודעה עכשיו — חינם
          </button>

          <p className="hero-last-recovery" aria-live="polite">
            <span className="hero-last-recovery-dot" aria-hidden="true">⚡</span>
            חשבון אחרון שוחזר: לפני שעתיים
          </p>

          <p className="hero-guarantee">
            <i className="fas fa-shield-alt" aria-hidden="true"></i>
            <strong>בלי תשלום מראש</strong> — לא הצלחנו? לא משלמים. נקודה.
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
