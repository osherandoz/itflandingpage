import React from 'react';
import './StatsStrip.css';

const StatsStrip = () => (
  <div className="stats-strip" aria-label="סטטיסטיקות שירות">
    <div className="stat-item">
      <span className="stat-number">2,500+</span>
      <span className="stat-label">חשבונות שוחזרו</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">95%</span>
      <span className="stat-label">אחוזי הצלחה</span>
    </div>
    <div className="stat-item">
      <span className="stat-number">24/6</span>
      <span className="stat-label">זמינות שירות</span>
    </div>
  </div>
);

export default StatsStrip;
