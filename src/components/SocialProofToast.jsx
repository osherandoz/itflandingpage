import React, { useState, useEffect, useRef } from 'react';
import './SocialProofToast.css';

const RECOVERIES = [
  { name: 'גל נ.', service: 'אינסטגרם', time: 'לפני 3 דקות' },
  { name: 'מיכל ר.', service: 'פייסבוק', time: 'לפני 12 דקות' },
  { name: 'דני א.', service: 'וואטסאפ', time: 'לפני 28 דקות' },
  { name: 'שרה כ.', service: 'ביזנס מנג׳ר', time: 'לפני 45 דקות' },
  { name: 'יוסי פ.', service: 'אינסטגרם', time: 'לפני שעה' },
  { name: 'נועה ל.', service: 'פייסבוק', time: 'לפני שעתיים' },
  { name: 'אמיר ס.', service: 'וואטסאפ', time: 'לפני 3 שעות' },
  { name: 'חני מ.', service: 'אינסטגרם', time: 'לפני 4 שעות' },
  { name: 'רן ב.', service: 'ביזנס מנג׳ר', time: 'לפני 5 שעות' },
  { name: 'לירון ג.', service: 'פייסבוק', time: 'לפני 6 שעות' },
];

const SocialProofToast = () => {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const lastIdx = useRef(-1);

  useEffect(() => {
    const pickRandom = () => {
      let idx;
      do { idx = Math.floor(Math.random() * RECOVERIES.length); }
      while (idx === lastIdx.current && RECOVERIES.length > 1);
      lastIdx.current = idx;
      return idx;
    };

    const show = () => {
      setCurrent(pickRandom());
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };

    const firstTimer = setTimeout(show, 8000);

    const scheduleNext = () => {
      const delay = 25000 + Math.random() * 15000;
      return setTimeout(() => {
        show();
        intervalRef.current = scheduleNext();
      }, delay);
    };

    const intervalRef = { current: null };
    const kickoff = setTimeout(() => {
      intervalRef.current = scheduleNext();
    }, 8000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(kickoff);
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  if (!visible) return null;

  const { name, service, time } = RECOVERIES[current];

  return (
    <div className="social-proof-toast" role="status" aria-live="polite">
      <span className="spt-icon">✅</span>
      <span className="spt-text">
        חשבון <strong>{name}</strong> ({service}) שוחזר · {time}
      </span>
    </div>
  );
};

export default SocialProofToast;
