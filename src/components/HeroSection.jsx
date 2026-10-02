import React from 'react';
import { FACTS } from '../data/businessFacts';
import { WaBtn } from './ui';
import './HeroSection.css';

const WHATSAPP_MESSAGE = 'היי, החשבון שלי חסום, אשמח לעזרה';

// Every number here comes from the evidence register (businessFacts.js)
const PROOF = [
  { value: FACTS.accountsRecovered.display, label: 'חשבונות שוחזרו' },
  { value: FACTS.successRate.display, label: 'הצלחה בשחזור' },
  { value: `${FACTS.rating.display}/5`, label: 'דירוג לקוחות' },
  { value: 'א׳–ו׳', label: 'זמינות 09:00–16:00' },
];

const HeroSection = () => (
  <div className="hero theme-ink bg-grid">
    <div className="container hero__grid">
      <div className="hero__copy">
        <p className="hero__eyebrow">( שחזור חשבונות פייסבוק · אינסטגרם · וואטסאפ )</p>

        <h1 className="hero__title display">
          <span className="lt hero__title-line">אחזיר לך את החשבון.</span>{' '}
          <span className="hero__title-line">לא הצלחתי, <span className="mk">לא שילמת.</span></span>
        </h1>

        <p className="hero__sub lead">
          מתמחה בחשבונות שמטא הכריזו עליהם כאבודים. פייסבוק, אינסטגרם, WhatsApp ופתרונות מלאים לביזנס מנג׳ר.
        </p>

        <div className="hero__actions">
          <WaBtn message={WHATSAPP_MESSAGE} location="hero">שלחו לי את המקרה בוואטסאפ</WaBtn>
          <p className="hero__terms small">
            <b>אבחון ראשוני חינם.</b> <bdi>{FACTS.priceRange.he}</bdi> בממוצע, בלי תשלום מראש וללא סיכון.
          </p>
        </div>
      </div>

      {/* Real portrait, not the logo already shown in the navbar (audit D1:
          "an authentic portrait beside a compact problem-led introduction") */}
      <div className="hero__visual">
        <div className="hero__photo">
          <img
            src="/images/brand/osher-stand-800.webp"
            srcSet="/images/brand/osher-stand-480.webp 480w, /images/brand/osher-stand-800.webp 800w"
            sizes="(min-width: 960px) 460px, 82vw"
            alt="אושר רווח, מייסד IsraelTechForce"
            width="800"
            height="1000"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </div>

        {/* Illustration of the moment the service exists for */}
        <div className="hero__chip hero__chip--blocked theme-paper" aria-hidden="true">
          <span className="hero__chip-dot" />
          <span>החשבון שלך הושבת</span>
        </div>
        <div className="hero__chip hero__chip--back" aria-hidden="true">
          <span className="hero__chip-dot" />
          <span>הגישה חזרה אליך</span>
        </div>

        <p className="hero__name sticker sticker--paper theme-paper">
          אושר רווח
          <span className="hero__name-role">מייסד IsraelTechForce</span>
        </p>
      </div>
    </div>

    <div className="container">
      <dl className="hero__proof">
        {PROOF.map((item, i) => (
          <div className="hero__proof-item" key={item.label}>
            <span className="hero__proof-num num" aria-hidden="true">0{i + 1}</span>
            <dd className="hero__proof-value"><bdi>{item.value}</bdi></dd>
            <dt className="hero__proof-label">{item.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  </div>
);

export default HeroSection;
