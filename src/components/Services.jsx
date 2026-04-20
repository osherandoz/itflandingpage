import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { openWhatsApp } from '../utils/whatsapp';
import './Services.css';

const CARDS = [
  {
    type: 't-fb',
    tag: 'Facebook',
    title: 'שחזור חשבון פייסבוק שנחסם או נפרץ',
    problem: <>התחברת והחשבון נעלם? קיבלת התראה על <b>פעילות חשודה</b>, מישהו שינה את הסיסמה, או העלית תוכן שסומן בטעות? אנחנו מחזירים גישה מלאה - גם כשהתמיכה של פייסבוק עונה באוטומט.</>,
    bullets: ['שחזור גישה ללא סיסמה / אימייל', 'הסרת חסימות לאחר דיווח שווא', 'אבטחה מחדש מפני פריצה חוזרת', 'ניטור אפשרי של נקודות תורפה נוספות'],
    ctaLabel: 'פרטים נוספים',
    path: '/שחזור-חשבון-פייסבוק',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.5 22v-8h2.7l.4-3.1H13.5V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V14h2.7v8h3.4z"/>
      </svg>
    ),
  },
  {
    type: 't-ig',
    tag: 'Instagram',
    title: 'שחזור חשבון אינסטגרם שהושבת',
    problem: <>איבדת גישה בגלל <b>דיווחי הטרדה שקריים</b>, זיהוי פנים שכשל, או חשבון שנעלם אחרי התחזות? אנחנו נטפל לך בזה מול מטא ונשחזר את החשבון.</>,
    bullets: ['שחזור מלא עם כל הפוסטים והעוקבים', 'ערעור דיווחי הטרדה וזכויות יוצרים', 'טיפול בחשבונות שהתחזו אליך', 'תמיכה 24/7 עד לסגירת הטיפול'],
    ctaLabel: 'פרטים נוספים',
    path: '/שחזור-חשבון-אינסטגרם',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    type: 't-wa',
    tag: 'WhatsApp',
    title: 'שחזור מספר וואטסאפ שנחטף',
    problem: <>קיבלת הודעה <b>"הוסף את קוד ה-SMS"</b> והחשבון נעלם? זרים שולחים הודעות מהמספר שלך? אנחנו עוצרים את החטיפה ומחזירים שליטה תוך שעות.</>,
    bullets: ['שחזור חשבון וואטסאפ שנחטף', 'ניטרול אימות דו-שלבי שנגנב', 'אבטחה מחדש ומניעת גישה לגורם זר', 'ליווי אישי עד לסגירה מלאה'],
    ctaLabel: 'פרטים נוספים',
    path: '/שחזור-חשבון-וואטסאפ',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.6 14c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.8-.1-1.6-.5-3.6-1.6-5-3.4-1-1.2-1.6-2.6-1.8-3.2-.1-.6.1-1.1.4-1.4.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.1.1.3 0 .4l-.3.4c-.1.1-.3.3-.4.4-.1.1-.3.3-.1.5.1.3.7 1.1 1.5 1.8 1 .9 1.8 1.2 2.1 1.3.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.7.8c.2.1.3.2.4.3 0 .1 0 .6-.2 1z"/>
      </svg>
    ),
  },
  {
    type: 't-ad',
    tag: 'Ads Manager',
    title: 'חשבון מודעות שהושעה או נחסם',
    problem: <>הקמפיין החם שלך קרס כי <b>מטא החליטה?</b> אמצעי תשלום נדחה או החשבון דווח? אנחנו יודעים איך לערער, להחזיר הרצה, ולמנוע חסימה חוזרת.</>,
    bullets: ['איפוס מודעות ופיקסלים', 'ערעור מקצועי על חסימה', 'החזרת היסטוריית קמפיינים', 'מניעת חסימה חוזרת'],
    ctaLabel: 'פרטים נוספים',
    path: '/שחזור-מנהל-מודעות',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2z"/>
        <path d="M16 8a5 5 0 0 1 0 8"/>
      </svg>
    ),
  },
  {
    type: 't-bm',
    tag: 'Business Manager',
    title: 'תקיעה ב-Business Manager',
    problem: <>איבדת גישה למרכז העסקים, משתמש-על נעלם או הדומיין שלך הועבר? אנחנו <b>מחזירים בעלות</b> על הנכסים ומחברים מחדש דפים, פיקסלים וקטלוגים.</>,
    bullets: ['החזרת בעלות על Business Manager', 'טיפול בהשתלטות שותף-לשעבר', 'חיבור דפים ונכסים בחזרה', 'הגדרת הרשאות חסינה מפני פריצה'],
    ctaLabel: 'פרטים נוספים',
    path: '/שחזור-מנהל-מודעות',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="7" width="18" height="13" rx="2"/>
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
        <path d="M3 13h18"/>
      </svg>
    ),
  },
  {
    type: 't-all',
    tag: 'All Platforms',
    title: 'לא יודע איפה הבעיה? אנחנו מאתרים',
    problem: <>גישה שנעלמה ולא ברור היכן? טוויטר/X, TikTok, LinkedIn, Google Business? <b>אבחון חינם</b> בתוך שעה. אם יש פתרון, נציע אותו עוד באותה שיחה.</>,
    bullets: ['אבחון חינם לכל הפלטפורמות', 'הערכת סיכוי הצלחה לפני תשלום', 'ליווי צמוד של מנהל תיק', 'תגובה ראשונה תוך שעה'],
    ctaLabel: 'קבל עזרה מקצועית אישית',
    path: null,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 17l5-5-5-5"/>
        <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
      </svg>
    ),
  },
];

const CHECK_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const MAX_TILT = 6;

const Services = () => {
  const cardRefs = useRef([]);
  const gridRef  = useRef(null);
  const headerRef = useRef(null);

  /* ── Entrance animation ───────────────────────────────── */
  useEffect(() => {
    const targets = [headerRef.current, gridRef.current].filter(Boolean);
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('svc-in'); });
    }, { threshold: 0.1 });
    targets.forEach(t => io.observe(t));
    return () => io.disconnect();
  }, []);

  /* ── 3-D tilt + mouse-follow glow ─────────────────────── */
  useEffect(() => {
    const cleanups = cardRefs.current.map((card) => {
      if (!card) return null;
      const inner = card.querySelector('.svc-card-inner');

      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        const px = x / r.width  - 0.5;
        const py = y / r.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-py * MAX_TILT).toFixed(2)}deg) rotateY(${(px * MAX_TILT).toFixed(2)}deg) translateZ(0)`;
        inner.style.setProperty('--mx', x + 'px');
        inner.style.setProperty('--my', y + 'px');
      };
      const onLeave = () => {
        card.style.transform = '';
        inner.style.setProperty('--mx', '50%');
        inner.style.setProperty('--my', '-20%');
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave); };
    });
    return () => cleanups.forEach(fn => fn?.());
  }, []);

  const trackClick = (title) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', { event_category: 'Service', event_label: title, value: 1 });
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact') || document.querySelector('.contact-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    else openWhatsApp();
  };

  return (
    <section className="svc-section">
      {/* Ambient orbs */}
      <div className="svc-orb svc-orb-a" aria-hidden="true" />
      <div className="svc-orb svc-orb-b" aria-hidden="true" />
      <div className="svc-orb svc-orb-c" aria-hidden="true" />

      <div className="container svc-shell">

        {/* Header */}
        <header className="svc-header svc-reveal" ref={headerRef}>
          <span className="svc-eyebrow">
            <span className="svc-dot" aria-hidden="true" />
            שירותי שחזור מקצועיים · פעילים 24/7
          </span>
          <h2 className="svc-title">
            מחזירים לך את <span className="svc-accent">הדיגיטל</span><br/>
            כשהכל קרס
          </h2>
          <p className="svc-subtitle">
            חשבון נפרץ, נחסם או נעלם? אנחנו מתמחים בשחזור חשבונות ברשתות החברתיות - מהר, בשקט, ובלי להשאיר סוף פתוח.
          </p>
          <div className="svc-stat-row">
            <div className="svc-stat"><b>95%+</b><span>הצלחה בשחזור</span></div>
            <div className="svc-stat-sep" aria-hidden="true" />
            <div className="svc-stat"><b>24/7</b><span>זמינות צוות</span></div>
            <div className="svc-stat-sep" aria-hidden="true" />
            <div className="svc-stat"><b>~48h</b><span>זמן ממוצע</span></div>
          </div>
        </header>

        {/* Cards grid */}
        <div className="svc-grid" id="svc-grid" ref={gridRef}>
          {CARDS.map((card, i) => (
            <article
              key={card.type}
              className={`svc-card ${card.type}`}
              ref={el => { cardRefs.current[i] = el; }}
            >
              <div className="svc-card-inner">
                <div className="svc-card-content">
                  <span className="svc-tag">
                    <span className="svc-tag-dot" aria-hidden="true" />
                    {card.tag}
                  </span>

                  <div className="svc-icon-wrap">{card.icon}</div>

                  <div className="svc-title-row">
                    <h3 className="svc-card-title">{card.title}</h3>
                    <p className="svc-problem">{card.problem}</p>
                  </div>

                  <ul className="svc-bullets">
                    {card.bullets.map((b, bi) => (
                      <li key={bi}>
                        <span className="svc-check">{CHECK_SVG}</span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="svc-divider" aria-hidden="true" />

                  {card.path ? (
                    <Link
                      to={card.path}
                      className="svc-cta"
                      onClick={() => trackClick(card.title)}
                    >
                      {card.ctaLabel}
                      <span className="svc-arrow" aria-hidden="true">←</span>
                    </Link>
                  ) : (
                    <button
                      className="svc-cta"
                      onClick={() => { trackClick(card.title); scrollToContact(); }}
                    >
                      {card.ctaLabel}
                      <span className="svc-arrow" aria-hidden="true">←</span>
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
