import React from 'react';
import { Link } from 'react-router';
import { FACTS } from '../data/businessFacts';
import './ProofStrip.css';

// Every number comes from the evidence register (businessFacts.js)
const STATS = [
  { value: FACTS.accountsRecovered.display, label: 'חשבונות שוחזרו' },
  { value: FACTS.successRate.display, label: 'שיעור הצלחה' },
  { value: `${FACTS.rating.display}/5`, label: 'דירוג לקוחות' },
  { value: '24h', label: 'אחריות מרגע השחרור' },
];

// The four outlets named in the brief, as quiet monochrome wordmarks
const MEDIA = ['mako / N12', 'Ynet', 'ice', 'ערוץ הכלכלה'];

const ProofStrip = () => (
  <section className="proof theme-ink" aria-label="הוכחות סמכות">
    <div className="container proof__inner">
      <dl className="proof__stats">
        {STATS.map((s) => (
          <div className="proof__stat" key={s.label}>
            <dd className="proof__value num"><bdi>{s.value}</bdi></dd>
            <dt className="proof__label">{s.label}</dt>
          </div>
        ))}
      </dl>

      <div className="proof__media">
        <p className="proof__media-label">כפי שסוקרנו ב</p>
        <ul className="proof__logos">
          {MEDIA.map((m) => (
            <li key={m} dir="auto">{m}</li>
          ))}
        </ul>
        <Link to="/press" className="link small proof__more">לכל הכתבות</Link>
      </div>
    </div>
  </section>
);

export default ProofStrip;
