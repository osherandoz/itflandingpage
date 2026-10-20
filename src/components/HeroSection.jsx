import React, { useState } from 'react';
import { FACTS } from '../data/businessFacts';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import Icon from './Icon';
import { ArrowIcon } from './ui';
import './HeroSection.css';

// One touch: pick the platform, the WhatsApp message is already written.
const PLATFORMS = [
  { id: 'wa', label: 'וואטסאפ', name: 'וואטסאפ' },
  { id: 'ig', label: 'אינסטגרם', name: 'אינסטגרם' },
  { id: 'fb', label: 'פייסבוק', name: 'פייסבוק' },
  { id: 'ad', label: 'מנהל מודעות', name: 'מנהל מודעות' },
];

const platformMessage = (platform) =>
  `היי אושר, יש לי תקלה בחשבון ${platform?.name || 'שלי'}. אשמח לבדיקת היתכנות מהירה.`;

const HeroSection = () => {
  const [platform, setPlatform] = useState(null);

  return (
    <div className="hero theme-ink bg-grid">
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__warn">
            <Icon name="alert" />
            <span>החשבון חסום, מושבת או נפרץ? כל שעה קובעת</span>
          </p>

          <h1 className="hero__title">
            מחזירים את הנכס הדיגיטלי לפעילות.{' '}
            <span className="hero__title-risk">לא הצלחנו לשחרר? <span className="mk">לא שילמת שקל.</span></span>
          </h1>

          <p className="hero__sub lead">
            <b>אבחון ראשוני חינם תוך <bdi>10</bdi> דקות</b> · מחיר סופי: <bdi>₪500–₪3,000</bdi>
          </p>

          <fieldset className="hero-pick">
            <legend className="hero-pick__q">איפה הבעיה? בחרו בנגיעה אחת</legend>
            <div className="hero-pick__opts">
              {PLATFORMS.map((p) => (
                <label className="hero-pick__opt" key={p.id}>
                  <input
                    type="radio"
                    name="platform"
                    value={p.id}
                    checked={platform?.id === p.id}
                    onChange={() => setPlatform(p)}
                  />
                  <span>{p.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="hero__actions">
            <a
              className="btn btn--go hero__cta"
              href={getWhatsAppUrl(platformMessage(platform))}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick('hero')}
            >
              <span>שלחו לי את המקרה בוואטסאפ</span>
              <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
            </a>
            <p className="hero__terms small">
              בלי תשלום מראש · אחריות <bdi>24</bdi> שעות מרגע השחרור · <bdi>{FACTS.hours.he}</bdi>
            </p>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__photo">
            <img
              src="/images/brand/osher-stand-800.webp"
              srcSet="/images/brand/osher-stand-480.webp 480w, /images/brand/osher-stand-800.webp 800w"
              sizes="(min-width: 960px) 420px, 70vw"
              alt="אושר רווח, מייסד IsraelTechForce"
              width="800"
              height="1000"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <p className="hero__name">
            אושר רווח
            <span className="hero__name-role">מייסד IsraelTechForce · מנתניה, מאז 2020</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
