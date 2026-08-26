import React from 'react';
import { useLang } from '../i18n';
import Icon from './Icon';
import './AboutMe.css';

const STR = {
  he: {
    title: 'מומחה שחזור חשבונות רשתות חברתיות',
    subtitle: 'אחד מחלוצי תחום השחזור בישראל, עם למעלה מ-2,500 הצלחות מוכחות מאחוריו.',
    heading: 'שלום, אני אושר, מומחה שחזור חשבונות',
    p1: 'מומחה מוביל בישראל לשחזור חשבונות רשתות חברתיות ואחד מחלוצי התחום בארץ. מתמחה בפתרון בעיות מורכבות של חשבונות פייסבוק, אינסטגרם ווואטסאפ שנחסמו או נפרצו.',
    p2: 'עם למעלה מ-2,500 חשבונות ששוחזרו בהצלחה ו-95% אחוזי הצלחה, אני מביא איתי ניסיון עשיר, כלים מתקדמים וטכניקות ייחודיות שפותחו לאורך שנים. מתמחה בפתרון בעיות גם במקרים שמטא (Meta) טוענים שאין סיכוי.',
    features: [
      { icon: 'shield', label: 'מומחיות באבטחה מתקדמת' },
      { icon: 'clock', label: 'זמינות 24/6 - תמיכה מיידית' },
      { icon: 'users', label: 'אלפי לקוחות מרוצים בישראל' },
      { icon: 'certificate', label: 'הוכחות מקצועיות ורפרנסים' },
    ],
    alt1: 'אושר רווח, מומחה שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ',
    alt2: 'IsraelTechForce, מומחים לשחזור חשבונות רשתות חברתיות',
    alt3: 'שחזור חשבונות, שירות מקצועי ואמין',
  },
  en: {
    title: 'Social Media Account Recovery Expert',
    subtitle: "One of Israel's pioneers in account recovery, with over 2,500 proven successes behind him.",
    heading: "Hi, I'm Osher, an account recovery expert",
    p1: "A leading account recovery expert in Israel and one of the field's pioneers. I specialize in solving complex cases of Facebook, Instagram, and WhatsApp accounts that got blocked or hacked.",
    p2: "With over 2,500 accounts successfully recovered and a 95% success rate, I bring years of experience, advanced tools, and unique techniques developed over time. I solve cases even when Meta says there's no chance.",
    features: [
      { icon: 'shield', label: 'Advanced security expertise' },
      { icon: 'clock', label: 'Available 24/6 - immediate support' },
      { icon: 'users', label: 'Thousands of satisfied clients in Israel' },
      { icon: 'certificate', label: 'Professional proof and references' },
    ],
    alt1: 'Osher Revach, Facebook, Instagram and WhatsApp account recovery expert',
    alt2: 'IsraelTechForce, social media account recovery experts',
    alt3: 'Account recovery, professional and reliable service',
  },
};

const AboutMe = () => {
  const { lang } = useLang();
  const t = STR[lang];

  return (
    <section className="about-me">
      <div className="container">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">
          {t.subtitle}
        </p>

        <div className="about-content">
          <div className="about-text">
            <h3>{t.heading}</h3>
            <p>
              {t.p1}
            </p>
            <p>
              {t.p2}
            </p>

            <div className="about-features">
              {t.features.map((feature) => (
                <div className="feature" key={feature.icon}>
                  <Icon name={feature.icon} aria-hidden="true" />
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="about-images">
            <div className="image-grid">
              <div className="image-item main-image">
                <img
                  src="/images/osher-photo-1.jpg"
                  alt={t.alt1}
                  width={600}
                  height={800}
                  loading="lazy"
                />
              </div>
              <div className="image-item">
                <img
                  src="/images/osher-photo-2.jpg"
                  alt={t.alt2}
                  width={600}
                  height={800}
                  loading="lazy"
                />
              </div>
              <div className="image-item">
                <img
                  src="/images/osher-photo-3.jpg"
                  alt={t.alt3}
                  width={600}
                  height={800}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
