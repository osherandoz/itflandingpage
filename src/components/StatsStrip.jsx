import React, { useEffect, useRef, useState } from 'react';
import './StatsStrip.css';

const STATS = [
  { end: 2500, suffix: '+', label: 'חשבונות שוחזרו' },
  { end: 95,   suffix: '%', label: 'אחוזי הצלחה' },
  { end: 24,   suffix: '/6', label: 'זמינות שירות' },
];

const useCountUp = (end, duration, active) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let current = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, end, duration]);
  return count;
};

const StatItem = ({ end, suffix, label, active }) => {
  const count = useCountUp(end, 1800, active);
  return (
    <div className="stat-item">
      <span className="stat-number">
        {count.toLocaleString('he-IL')}
        {suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const StatsStrip = () => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-strip" ref={ref} aria-label="סטטיסטיקות שירות">
      {STATS.map((s) => (
        <StatItem key={s.label} {...s} active={active} />
      ))}
    </div>
  );
};

export default StatsStrip;
