import React from 'react';
import { Eyebrow, WaBtn } from './ui';
import './HowItWorks.css';

const STEPS = [
  {
    title: 'אבחון חינם',
    description: 'שולחים את המקרה בוואטסאפ, ואני בודק היתכנות ואומר בכנות מה הסיכוי.',
    time: '10 דקות',
  },
  {
    title: 'הצעת מחיר שקופה, ללא מקדמה',
    description: 'מחיר סופי וקבוע מראש בטווח ₪500–₪3,000 לפי מורכבות המקרה. לא משלמים כלום עד שמתחילים לראות תוצאה.',
    time: 'בלי מקדמה',
  },
  {
    title: 'שחרור, כניסה לחשבון ותשלום',
    description: 'משחררים את הנכס, אתם נכנסים ובודקים שהכל תקין, ורק אז משלמים. מרגע השחרור יש אחריות של 24 שעות מפני נעילה חוזרת.',
    time: 'אחריות 24 שעות',
  },
];

const HowItWorks = () => (
  <div className="hiw section theme-signal">
    <div className="container hiw__grid">
      <header className="hiw__head">
        <div className="hiw__head-inner m-reveal">
          <Eyebrow num="02">איך זה עובד · 3 שלבים</Eyebrow>
          <h2 className="h1">
            <span className="lt">מהפנייה</span> ועד לשחזור
          </h2>
          <p className="lead">שלושה שלבים, ותשלום רק בסוף.</p>
          <div className="hiw__cta">
            <WaBtn message="היי, הגעתי דרך האתר שלך אשמח לקבל פרטים" location="how-it-works">
              שלח הודעה עכשיו
            </WaBtn>
            <p className="small muted">מוכן להתחיל? אבחון ראשוני, חינמי לחלוטין</p>
          </div>
          <p className="hiw__not">
            <b>משלמים רק כשאתה בפנים ובודק שהכל תקין.</b>
          </p>
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
