import React, { useEffect } from 'react';
import { openWhatsApp } from '../utils/whatsapp';
import './HeroSection.css';

const HeroSection = () => {
  useEffect(() => {
    // Preload the logo image to prevent loading delays
    const preloadImage = new Image();
    preloadImage.src = '/images/israeltechforce-logo-white.png';
    
    // Also preload other critical images
    const criticalImages = [
      '/images/testimonial-1.jpg',
      '/images/testimonial-2.jpg',
      '/images/testimonial-3.jpg',
      '/images/testimonial-4.jpg',
      '/images/testimonial-5.jpg',
      '/images/testimonial-6.jpg',
      '/images/default-avatar.png'
    ];
    
    criticalImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-logo">
          <img 
            src="/images/israeltechforce-logo-white.png" 
            alt="IsraelTechForce - מומחים לשחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ"
            loading="eager"
            decoding="sync"
          />
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ שנחסמו או נפרצו
          </h1>
          <p className="hero-subtitle">
            מומחים לשחזור חשבונות רשתות חברתיות עם הצלחה של 95%+ | הצלחנו לשחזר אלפי חשבונות גם כשמטא אמרו שאין סיכוי | תשלום רק אחרי הצלחה מוכחת
          </p>
          <div className="hero-features">
            <span className="hero-feature">✓ שחזור מהיר תוך 24-48 שעות</span>
            <span className="hero-feature">✓ תשלום רק אחרי הצלחה</span>
            <span className="hero-feature">✓ זמינות 24/6</span>
          </div>
          <button className="hero-cta" onClick={openWhatsApp}>
            קבל עזרה מיידית - חינם
          </button>
          <p className="hero-guarantee">
            <strong>100% אחריות</strong> - אם לא הצלחנו לשחזר את החשבון, לא תשלם כלום
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
