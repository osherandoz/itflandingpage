import React, { useState } from 'react';
import { FACTS } from '../data/businessFacts';
import { caseMessage } from '../utils/whatsapp';
import { WaBtn } from './ui';
import './HeroSection.css';

// Every number here comes from the evidence register (businessFacts.js)
const PROOF = [
  { value: FACTS.accountsRecovered.display, label: 'חשבונות שוחזרו' },
  { value: FACTS.successRate.display, label: 'הצלחה בשחזור' },
  { value: `${FACTS.rating.display}/5`, label: 'דירוג לקוחות' },
  { value: 'א׳–ו׳', label: 'זמינות 09:00–16:00' },
];

// The case picker: two taps and the WhatsApp message is already written.
// `say` is how the choice reads inside the message.
const WHERE = [
  { id: 'fb', label: 'פייסבוק', say: 'חשבון הפייסבוק שלי' },
  { id: 'ig', label: 'אינסטגרם', say: 'חשבון האינסטגרם שלי' },
  { id: 'wa', label: 'וואטסאפ', say: 'חשבון הוואטסאפ שלי' },
  { id: 'ad', label: 'חשבון מודעות', say: 'חשבון המודעות שלי' },
  { id: 'bm', label: 'ביזנס מנג׳ר', say: 'הביזנס מנג׳ר שלי' },
];
const WHAT = [
  { id: 'blocked', label: 'נחסם', say: 'נחסם' },
  { id: 'hacked', label: 'נפרץ', say: 'נפרץ' },
  { id: 'disabled', label: 'הושבת', say: 'הושבת' },
  { id: 'unknown', label: 'לא ברור', say: 'לא זמין ולא ברור לי למה' },
];

const Choice = ({ name, legend, options, value, onChange }) => (
  <fieldset className="hero-case__set">
    <legend className="hero-case__q">{legend}</legend>
    <div className="hero-case__opts">
      {options.map((o) => (
        <label className="hero-case__opt" key={o.id}>
          <input
            type="radio"
            name={name}
            value={o.id}
            checked={value?.id === o.id}
            onChange={() => onChange(o)}
          />
          <span>{o.label}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

const HeroSection = () => {
  const [where, setWhere] = useState(null);
  const [what, setWhat] = useState(null);

  return (
    <div className="hero theme-ink bg-grid">
      <div className="container">
        <p className="hero__eyebrow">( שחזור חשבונות פייסבוק · אינסטגרם · וואטסאפ )</p>

        <h1 className="hero__title">
          <span className="lt hero__title-line">אחזיר לך את החשבון.</span>{' '}
          <span className="hero__title-line">לא הצלחתי, <span className="mk">לא שילמת.</span></span>
        </h1>
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__sub lead">
            מתמחה בחשבונות שמטא הכריזו עליהם כאבודים. פייסבוק, אינסטגרם, WhatsApp ופתרונות מלאים לביזנס מנג׳ר.
          </p>

          <form className="hero-case" aria-label="פתיחת תיק בוואטסאפ" onSubmit={(e) => e.preventDefault()}>
            <p className="hero-case__head">
              <span className="hero-case__label">( פתיחת תיק · שתי נגיעות )</span>
              {/* The file fills in as the visitor taps */}
              <span className="hero-case__file" aria-live="polite">
                {where || what ? [where?.label, what?.label].filter(Boolean).join(' · ') : 'עוד לא נבחר'}
              </span>
            </p>
            <Choice name="where" legend="איפה הבעיה?" options={WHERE} value={where} onChange={setWhere} />
            <Choice name="what" legend="מה קרה?" options={WHAT} value={what} onChange={setWhat} />

            <div className="hero__actions">
              <WaBtn message={caseMessage(where, what)} location="hero">שלחו לי את המקרה בוואטסאפ</WaBtn>
              <p className="hero__terms small">
                <b>אבחון ראשוני חינם.</b> <bdi>{FACTS.priceRange.he}</bdi> בממוצע, בלי תשלום מראש וללא סיכון.
              </p>
            </div>
          </form>
        </div>

        <div className="hero__visual">
          {/* The signal: rings going out from the portrait, drawn once */}
          <svg className="hero__rings" viewBox="0 0 800 800" fill="none" aria-hidden="true">
            {[120, 210, 300, 390].map((r, i) => (
              <circle key={r} cx="400" cy="400" r={r} style={{ '--i': i }} />
            ))}
          </svg>

          <div className="hero__photo">
            <img
              src="/images/brand/osher-stand-800.webp"
              srcSet="/images/brand/osher-stand-480.webp 480w, /images/brand/osher-stand-800.webp 800w"
              sizes="(min-width: 960px) 420px, 82vw"
              alt="אושר רווח, מייסד IsraelTechForce"
              width="800"
              height="1000"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
            {/* Starts drained of colour like a disabled account, then the
                colour sweeps back as the "access restored" chip lands */}
            <span className="hero__drain" aria-hidden="true" />
          </div>

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
};

export default HeroSection;
