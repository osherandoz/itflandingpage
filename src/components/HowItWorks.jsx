import React, { useState, useEffect, useRef } from 'react';
import { openWhatsApp } from '../utils/whatsapp';
import './HowItWorks.css';

const STEPS = [
  {
    icon: 'fas fa-comments',
    title: 'שולחים הודעה',
    description: 'שולחים הודעה בוואטסאפ — נציג עונה תוך דקות ומתחיל לבדוק את המקרה שלך.',
    time: '~ 2 דקות',
    color: '#3B82F6',
  },
  {
    icon: 'fas fa-search',
    title: 'אבחון מהיר',
    description: 'כמה שאלות קצרות ובדיקה מקצועית של הבעיה — בלי בזבוז זמן. אנחנו יודעים בדיוק מה לחפש.',
    time: '~ 10 דקות',
    color: '#8B5CF6',
  },
  {
    icon: 'fas fa-file-invoice',
    title: 'הצעה ושקיפות מלאה',
    description: 'הצעת מחיר ברורה עם אחוז הצלחה משוער לכל אופציה. אין הפתעות — תשלום רק אחרי הצלחה.',
    time: '~ 5 דקות',
    color: '#F59E0B',
  },
  {
    icon: 'fas fa-rocket',
    title: 'יוצאים לדרך',
    description: 'חתמת? יצאנו לדרך. בדרך כלל תראה תוצאות תוך 24–48 שעות.',
    time: '24–48 שעות',
    color: '#10B981',
  },
];

const HowItWorks = () => {
  const [visible, setVisible] = useState(new Set());
  const refs = useRef([]);

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
        <h2 className="section-title">איך זה עובד?</h2>
        <p className="section-subtitle">
          מהפנייה הראשונה ועד לשחזור — תהליך פשוט, שקוף ומהיר
        </p>

        <div className="hiw-timeline">
          {/* Gradient connecting line */}
          <div className="hiw-line" aria-hidden="true" />

          {STEPS.map((step, i) => {
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
                    <i className={step.icon} aria-hidden="true" />
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
          <p className="hiw-cta-text">מוכן להתחיל? אבחון ראשוני — חינמי לחלוטין</p>
          <button className="hiw-cta-btn" onClick={openWhatsApp}>
            <i className="fab fa-whatsapp" aria-hidden="true" />
            שלח הודעה עכשיו
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
