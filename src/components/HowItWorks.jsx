import React, { useState, useEffect, useRef } from 'react';
import { getWhatsAppUrl, trackWhatsAppClick, WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import { useLang } from '../i18n';
import Icon from './Icon';
import './HowItWorks.css';

const STR = {
  he: {
    steps: [
      {
        icon: 'comments',
        title: 'שולחים הודעה',
        description: 'שולחים הודעה בוואטסאפ, אני עונה תוך דקות ומתחיל לבדוק את המקרה שלך.',
        time: '~ 2 דקות',
        color: '#3B82F6',
      },
      {
        icon: 'search',
        title: 'אבחון מהיר',
        description: 'כמה שאלות קצרות ובדיקה מקצועית של הבעיה, בלי בזבוז זמן. אני יודע בדיוק מה לחפש.',
        time: '~ 10 דקות',
        color: '#8B5CF6',
      },
      {
        icon: 'invoice',
        title: 'הצעה ושקיפות מלאה',
        description: 'הצעת מחיר ברורה עם אחוז הצלחה משוער לכל אופציה. אין הפתעות, תשלום רק אחרי הצלחה.',
        time: '~ 5 דקות',
        color: '#F59E0B',
      },
      {
        icon: 'rocket',
        title: 'יוצאים לדרך',
        description: 'חתמת? אני יוצא לדרך. בדרך כלל תראה תוצאות תוך 24–48 שעות.',
        time: '24–48 שעות',
        color: '#10B981',
      },
    ],
    title: 'מהפנייה ועד לשחזור',
    subtitle: 'מסבירים לך בדיוק מה קורה בכל שלב, בלי הפתעות.',
    ctaText: 'מוכן להתחיל? אבחון ראשוני, חינמי לחלוטין',
    ctaButton: 'שלח הודעה עכשיו',
    whatsappMessage: 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים',
  },
  en: {
    steps: [
      {
        icon: 'comments',
        title: 'Send a Message',
        description: 'Message me on WhatsApp - I reply within minutes and start looking into your case.',
        time: '~ 2 minutes',
        color: '#3B82F6',
      },
      {
        icon: 'search',
        title: 'Quick Diagnosis',
        description: 'A few short questions and a professional review of the problem, no time wasted. I know exactly what to look for.',
        time: '~ 10 minutes',
        color: '#8B5CF6',
      },
      {
        icon: 'invoice',
        title: 'Clear Quote, Full Transparency',
        description: 'A clear price quote with an estimated success rate for each option. No surprises - you pay only after success.',
        time: '~ 5 minutes',
        color: '#F59E0B',
      },
      {
        icon: 'rocket',
        title: 'We Get to Work',
        description: "Signed off? I get to work. You'll usually see results within 24–48 hours.",
        time: '24–48 hours',
        color: '#10B981',
      },
    ],
    title: 'From First Message to Recovery',
    subtitle: "You'll know exactly what happens at every step, no surprises.",
    ctaText: 'Ready to start? Your first diagnosis is completely free',
    ctaButton: 'Send a Message Now',
    whatsappMessage: WHATSAPP_DEFAULT_MSG.en,
  },
};

const HowItWorks = () => {
  const [visible, setVisible] = useState(new Set());
  const refs = useRef([]);
  const { lang } = useLang();
  const t = STR[lang];

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setVisible(prev => new Set([...prev, i])); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  return (
    <section className="hiw-section">
      <div className="container">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">
          {t.subtitle}
        </p>

        <div className="hiw-timeline">
          {/* Gradient connecting line */}
          <div className="hiw-line" aria-hidden="true" />

          {t.steps.map((step, i) => {
            const isRight = i % 2 === 0;
            return (
              <div
                key={i}
                ref={el => { refs.current[i] = el; }}
                className={`hiw-row ${isRight ? 'hiw-row--right' : 'hiw-row--left'} ${visible.has(i) ? 'hiw-row--visible' : ''}`}
              >
                {/* Card */}
                <div className="hiw-card" style={{ '--c': step.color }}>
                  <div className="hiw-card-icon">
                    <Icon name={step.icon} aria-hidden="true" />
                  </div>
                  <div className="hiw-card-body">
                    <span className="hiw-time-badge">{step.time}</span>
                    <h3 className="hiw-card-title">{step.title}</h3>
                    <p className="hiw-card-desc">{step.description}</p>
                  </div>
                </div>

                {/* Node on the line */}
                <div className="hiw-node" style={{ '--c': step.color }}>
                  <span>{i + 1}</span>
                </div>

                {/* Spacer (opposite side) */}
                <div className="hiw-spacer" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="hiw-cta">
          <p className="hiw-cta-text">{t.ctaText}</p>
          <a
            className="hiw-cta-btn"
            href={getWhatsAppUrl(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
          >
            <Icon name="whatsapp" aria-hidden="true" />
            {t.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
