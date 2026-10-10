import React from 'react';
import { Eyebrow, WaBtn } from './ui';
import './HowItWorks.css';

const STEPS = [
  {
    title: 'שולחים הודעה',
    description: 'שולחים הודעה בוואטסאפ, אני עונה תוך דקות ומתחיל לבדוק את המקרה שלך.',
    time: '~ 2 דקות',
  },
  {
    title: 'אבחון מהיר',
    description: 'כמה שאלות קצרות ובדיקה מקצועית של הבעיה, בלי בזבוז זמן. אני יודע בדיוק מה לחפש.',
    time: '~ 10 דקות',
  },
  {
    title: 'הצעה ושקיפות מלאה',
    description: 'הצעת מחיר ברורה עם אחוז הצלחה משוער לכל אופציה. אין הפתעות, תשלום רק אחרי הצלחה.',
    time: '~ 5 דקות',
  },
  {
    title: 'יוצאים לדרך',
    description: 'חתמת? אני יוצא לדרך. משך הטיפול תלוי במקרה.',
    time: 'תלוי מקרה',
  },
];

const HowItWorks = () => (
  <div className="hiw section theme-signal">
    <div className="container hiw__grid">
      <header className="hiw__head">
        <div className="hiw__head-inner m-reveal">
          <Eyebrow num="02">איך זה עובד</Eyebrow>
          <h2 className="h1">
            <span className="lt">מהפנייה</span> ועד לשחזור
          </h2>
          <p className="lead">מסבירים לך בדיוק מה קורה בכל שלב, בלי הפתעות.</p>
          <div className="hiw__cta">
            <WaBtn message="היי, הגעתי דרך האתר שלך אשמח לקבל פרטים" location="how-it-works">
              שלח הודעה עכשיו
            </WaBtn>
            <p className="small muted">מוכן להתחיל? אבחון ראשוני, חינמי לחלוטין</p>
          </div>
        </div>
      </header>

      {/* The rail fills as the list scrolls through the viewport */}
      <ol className="hiw__steps" data-scrub="0.7 0.55">
        <li className="hiw__rail" aria-hidden="true"><span /></li>
        {STEPS.map((step, i) => (
          <li className="hiw__step m-reveal" key={step.title}>
            <span className="hiw__node num" aria-hidden="true">0{i + 1}</span>
            <div className="hiw__card theme-paper">
              <span className="tag">{step.time}</span>
              <h3 className="h3">{step.title}</h3>
              <p className="muted">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </div>
);

export default HowItWorks;
