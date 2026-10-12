import React from 'react';
import { Link } from 'react-router';
import { FACTS } from '../data/businessFacts';
import { Eyebrow, FillText, SlotNumber, ArrowIcon } from './ui';
import { pressItems } from '../data/press';
import './AboutMe.css';

const NUMBERS = [
  { value: FACTS.accountsRecovered.display, label: 'חשבונות שוחזרו בהצלחה' },
  { value: FACTS.successRate.display, label: 'אחוזי הצלחה' },
  { value: FACTS.rating.display, label: 'דירוג לקוחות מתוך 5' },
];

const OUTLETS = [...new Set(pressItems.map((item) => item.siteName))];

// Who handles the case: three things that can be checked, not adjectives
const CREDENTIALS = [
  { title: 'משחזר חשבונות מאז 2020', text: 'פייסבוק, אינסטגרם, וואטסאפ, חשבונות מודעות וביזנס מנג׳ר.' },
  { title: 'סוקר בתקשורת', text: OUTLETS.join(' · ') },
  { title: 'תשלום רק אחרי הצלחה', text: <>אבחון ראשוני חינם. <bdi>{FACTS.priceRange.he}</bdi> בממוצע, בלי תשלום מראש.</> },
];

const AboutMe = () => (
  <div className="about section theme-ink bg-grid bg-grid--full">
    <div className="container">
      <div className="about__top">
        <div className="about__copy">
          <Eyebrow num="03">מי אני</Eyebrow>
          <h2 className="about__title">מומחה שחזור חשבונות רשתות חברתיות</h2>

          {/* The statement fills in word by word while it scrolls past */}
          <FillText
            className="about__manifesto"
            text="שלום, אני אושר. אחד מחלוצי תחום השחזור בישראל, עם למעלה מ-2,500 הצלחות מוכחות. מתמחה בפתרון בעיות גם במקרים שמטא טוענים שאין סיכוי."
          />

          <p className="about__text m-reveal">
            מומחה מוביל בישראל לשחזור חשבונות רשתות חברתיות ואחד מחלוצי התחום בארץ. מתמחה בפתרון בעיות מורכבות של חשבונות פייסבוק, אינסטגרם ווואטסאפ שנחסמו או נפרצו. אני מביא איתי ניסיון עשיר, כלים מתקדמים וטכניקות ייחודיות שפותחו לאורך שנים.
          </p>

          <Link to="/אושר-רווח" className="link link--arrow about__more">
            הסיפור המלא, איך זה התחיל
            <ArrowIcon />
          </Link>
        </div>

        <figure className="about__figure m-reveal">
          <img
            src="/images/brand/osher-portrait-800.webp"
            srcSet="/images/brand/osher-portrait-400.webp 400w, /images/brand/osher-portrait-800.webp 800w"
            sizes="(min-width: 960px) 400px, 80vw"
            alt="אושר רווח, מומחה שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ"
            width="800"
            height="800"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="sticker m-in about__sticker">אושר רווח · מייסד ITF</figcaption>
        </figure>
      </div>

      <dl className="about__numbers">
        {NUMBERS.map((n) => (
          <div className="about__number" key={n.label}>
            <dd><SlotNumber value={n.value} /></dd>
            <dt>{n.label}</dt>
          </div>
        ))}
      </dl>

      <div className="about__creds">
        <p className="about__creds-label">( מי מטפל בחשבון שלך )</p>
        <ol className="about__creds-list m-stagger">
          {CREDENTIALS.map((c, i) => (
            <li key={c.title}>
              <span className="about__creds-num num" aria-hidden="true">0{i + 1}</span>
              <b>{c.title}</b>
              <span className="about__creds-text">{c.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </div>
);

export default AboutMe;
