import React from 'react';
import { getWhatsAppUrl, trackWhatsAppClick } from '../utils/whatsapp';
import { useLang } from '../i18n';
import Icon from './Icon';
import './HeroSection.css';

const STR = {
  he: {
    liveBadgeAria: 'זמין עכשיו',
    liveBadge: 'זמין עכשיו · מענה תוך דקות',
    trust: ['✓ 2,500+ חשבונות שוחזרו', '⭐ דירוג 4.9/5', '✓ תשלום רק אחרי הצלחה', '✓ זמינות 24/6'],
    logoAlt: 'IsraelTechForce - מומחים לשחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ',
    title: 'אחזיר לך את החשבון.',
    titleHighlight: 'לא הצלחתי, לא שילמת.',
    subtitle: 'מתמחה בחשבונות שמטא הכריזו עליהם כאבודים. פייסבוק, אינסטגרם, WhatsApp ופתרונות מלאים לביזנס מנג׳ר.',
    cta: 'שלחו לי את המקרה בוואטסאפ · תשובה תוך דקות',
    guaranteeStrong: '₪500–3,000 בממוצע.',
    guaranteeRest: ' בלי תשלום מראש, ללא סיכון.',
    whatsappMessage: 'היי, החשבון שלי חסום, אשמח לעזרה',
  },
  en: {
    liveBadgeAria: 'Available now',
    liveBadge: 'Available now · Replies within minutes',
    trust: ['✓ 2,500+ accounts recovered', '⭐ Rated 4.9/5', '✓ Pay only after success', '✓ Available 24/6'],
    logoAlt: 'IsraelTechForce - Facebook, Instagram and WhatsApp account recovery experts',
    title: "I'll get your account back.",
    titleHighlight: "No recovery, no fee.",
    subtitle: 'I specialize in accounts Meta has written off as lost. Facebook, Instagram, WhatsApp, and full Business Manager solutions.',
    cta: 'Send me your case on WhatsApp · Reply within minutes',
    guaranteeStrong: '₪500–3,000 (about $150–$900) on average.',
    guaranteeRest: ' No upfront payment, zero risk.',
    whatsappMessage: "Hi, my account is blocked and I'd love your help",
  },
};

const HeroSection = () => {
  const { lang } = useLang();
  const t = STR[lang];

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
        <div className="hero-live-badge" aria-label={t.liveBadgeAria}>
          <span className="hero-live-dot" aria-hidden="true"></span>
          {t.liveBadge}
        </div>

        {/* Trust bar — every proof point in one compact row */}
        <div className="hero-trust-bar">
          {t.trust.map((item, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="trust-divider" aria-hidden="true">|</span>}
              <span>{item}</span>
            </React.Fragment>
          ))}
        </div>

        {/* Logo — hidden on mobile so the headline lands sooner */}
        <div className="hero-logo">
          <img
            src="/images/logo-hero.webp"
            alt={t.logoAlt}
            width="260"
            height="192"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        <div className="hero-content">
          <h1 className="hero-title">
            {t.title}{' '}
            <span className="hero-highlight">{t.titleHighlight}</span>
          </h1>

          <p className="hero-subtitle">
            {t.subtitle}
          </p>

          <a
            className="hero-cta hero-cta-pulse"
            href={getWhatsAppUrl(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
          >
            <Icon name="whatsapp" aria-hidden="true" />
            {t.cta}
          </a>

          <p className="hero-guarantee">
            <Icon name="shield" aria-hidden="true" />
            <strong>{t.guaranteeStrong}</strong>{t.guaranteeRest}
          </p>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
