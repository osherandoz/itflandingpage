import React from 'react';
import { useLang } from '../i18n';
import './StatsStrip.css';

const STR = {
  he: {
    aria: 'סטטיסטיקות שירות',
    stats: [
      { number: '2,500+', label: 'חשבונות שוחזרו' },
      { number: '95%', label: 'אחוזי הצלחה' },
      { number: '24/6', label: 'זמינות שירות' },
    ],
  },
  en: {
    aria: 'Service statistics',
    stats: [
      { number: '2,500+', label: 'Accounts recovered' },
      { number: '95%', label: 'Success rate' },
      { number: '24/6', label: 'Service availability' },
    ],
  },
};

const StatsStrip = () => {
  const { lang } = useLang();
  const t = STR[lang];

  return (
    <div className="stats-strip" aria-label={t.aria}>
      {t.stats.map((stat) => (
        <div className="stat-item" key={stat.number}>
          <span className="stat-number">{stat.number}</span>
          <span className="stat-label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
};

export default StatsStrip;
