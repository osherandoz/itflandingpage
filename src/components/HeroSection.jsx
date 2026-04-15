import React, { useEffect } from 'react';
import { openWhatsApp } from '../utils/whatsapp';
import './HeroSection.css';

const HeroSection = () => {
  useEffect(() => {
    const img = new Image();
    img.src = '/images/israeltechforce-logo-white.png';
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">

        {/* Trust Bar */}
        <div className="hero-trust-bar">
          <span>✓ 5,000+ חשבונות שוחזרו</span>
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
            loading="eager"
            decoding="sync"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            חסמו לך את החשבון?{' '}
            <span className="hero-highlight">אנחנו מחזירים אותך</span>{' '}
            תוך 24 שעות
          </h1>

          <p className="hero-subtitle">
            95%+ הצלחה בשחזור חשבונות פייסבוק, אינסטגרם ו-WhatsApp —
            גם במקרים שמטא אמרו שאין סיכוי
          </p>

          <div className="hero-features">
            <span className="hero-feature">✓ שחזור תוך 24-48 שעות</span>
            <span className="hero-feature">✓ תשלום רק אחרי הצלחה</span>
            <span className="hero-feature">✓ זמינות 24/6</span>
          </div>

          <button className="hero-cta" onClick={openWhatsApp}>
            <i className="fab fa-whatsapp" aria-hidden="true"></i>
            שלחו הודעה עכשיו — חינם
          </button>

          <p className="hero-guarantee">
            <i className="fas fa-shield-alt" aria-hidden="true"></i>
            <strong>100% אחריות</strong> — לא הצלחנו? לא תשלם כלום
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
