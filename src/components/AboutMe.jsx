import React from 'react';
import { Link } from 'react-router';
import { FACTS } from '../data/businessFacts';
import { Eyebrow, FillText, SlotNumber, ArrowIcon } from './ui';
import Icon from './Icon';
import './AboutMe.css';

const NUMBERS = [
  { value: FACTS.accountsRecovered.display, label: 'חשבונות שוחזרו בהצלחה' },
  { value: FACTS.successRate.display, label: 'אחוזי הצלחה' },
  { value: FACTS.rating.display, label: 'דירוג לקוחות מתוך 5' },
];

const FEATURES = [
  { icon: 'shield', label: 'מומחיות באבטחה מתקדמת' },
  { icon: 'clock', label: 'זמינות א׳–ו׳ 09:00–16:00' },
  { icon: 'users', label: 'אלפי לקוחות מרוצים בישראל' },
  { icon: 'certificate', label: 'הוכחות מקצועיות ורפרנסים' },
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

      <ul className="about__features m-stagger">
        {FEATURES.map((feature) => (
          <li key={feature.icon}>
            <Icon name={feature.icon} />
            <span>{feature.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default AboutMe;
