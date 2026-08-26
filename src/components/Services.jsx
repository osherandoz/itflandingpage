import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { getWhatsAppUrl, trackWhatsAppClick } from '../utils/whatsapp';
import { useLang } from '../i18n';
import './Services.css';

const ICONS = {
  't-fb': (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h2.7l.4-3.1H13.5V8.9c0-.9.3-1.5 1.6-1.5h1.7V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.4V14h2.7v8h3.4z"/>
    </svg>
  ),
  't-ig': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
    </svg>
  ),
  't-wa': (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.6 14c-.2.6-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.8-.1-1.6-.5-3.6-1.6-5-3.4-1-1.2-1.6-2.6-1.8-3.2-.1-.6.1-1.1.4-1.4.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.4.2.5.7 1.7.8 1.8.1.1.1.3 0 .4l-.3.4c-.1.1-.3.3-.4.4-.1.1-.3.3-.1.5.1.3.7 1.1 1.5 1.8 1 .9 1.8 1.2 2.1 1.3.2.1.4.1.5-.1l.7-.8c.2-.2.3-.2.5-.1l1.7.8c.2.1.3.2.4.3 0 .1 0 .6-.2 1z"/>
    </svg>
  ),
  't-ad': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 11v2a2 2 0 0 0 2 2h2l5 4V5L7 9H5a2 2 0 0 0-2 2z"/>
      <path d="M16 8a5 5 0 0 1 0 8"/>
    </svg>
  ),
  't-bm': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2"/>
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
      <path d="M3 13h18"/>
    </svg>
  ),
  't-all': (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 17l5-5-5-5"/>
      <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/>
    </svg>
  ),
};

const STR = {
  he: {
    cards: [
      {
        type: 't-fb',
        tag: 'Facebook',
        title: 'שחזור חשבון פייסבוק שנחסם או נפרץ',
        problem: <>התחברת והחשבון נעלם? קיבלת התראה על <b>פעילות חשודה</b>, מישהו שינה את הסיסמה, או העלית תוכן שסומן בטעות? אני מחזיר גישה מלאה - גם כשהתמיכה של פייסבוק עונה באוטומט.</>,
        bullets: ['שחזור גישה ללא סיסמה / אימייל', 'הסרת חסימות לאחר דיווח שווא', 'אבטחה מחדש מפני פריצה חוזרת', 'ניטור אפשרי של נקודות תורפה נוספות'],
        message: 'היי, החשבון פייסבוק שלי נחסם או נפרץ, אשמח לעזרה',
      },
      {
        type: 't-ig',
        tag: 'Instagram',
        title: 'שחזור חשבון אינסטגרם שהושבת',
        problem: <>איבדת גישה בגלל <b>דיווחי הטרדה שקריים</b>, זיהוי פנים שכשל, או חשבון שנעלם אחרי התחזות? אני מטפל בזה מול מטא ומשחזר את החשבון.</>,
        bullets: ['שחזור מלא עם כל הפוסטים והעוקבים', 'ערעור דיווחי הטרדה וזכויות יוצרים', 'טיפול בחשבונות שהתחזו אליך', 'תמיכה 24/6 עד לסגירת הטיפול'],
        message: 'היי, החשבון אינסטגרם שלי הושבת, אשמח לעזרה',
      },
      {
        type: 't-wa',
        tag: 'WhatsApp',
        title: 'שחזור מספר וואטסאפ שנחטף',
        problem: <>קיבלת הודעה <b>"הוסף את קוד ה-SMS"</b> והחשבון נעלם? זרים שולחים הודעות מהמספר שלך? אני עוצר את החטיפה ומחזיר לך שליטה תוך שעות.</>,
        bullets: ['שחזור חשבון וואטסאפ שנחטף', 'ניטרול אימות דו-שלבי שנגנב', 'אבטחה מחדש ומניעת גישה לגורם זר', 'ליווי אישי עד לסגירה מלאה'],
        message: 'היי, מספר הוואטסאפ שלי נחטף, אשמח לעזרה',
      },
      {
        type: 't-ad',
        tag: 'Ads Manager',
        title: 'חשבון מודעות שהושעה או נחסם',
        problem: <>הקמפיין החם שלך קרס כי <b>מטא החליטה?</b> אמצעי תשלום נדחה או החשבון דווח? אני יודע איך לערער, להחזיר הרצה, ולמנוע חסימה חוזרת.</>,
        bullets: ['איפוס מודעות ופיקסלים', 'ערעור מקצועי על חסימה', 'החזרת היסטוריית קמפיינים', 'מניעת חסימה חוזרת'],
        message: 'היי, חשבון המודעות שלי הושעה או נחסם, אשמח לעזרה',
      },
      {
        type: 't-bm',
        tag: 'Business Manager',
        title: 'תקיעה ב-Business Manager',
        problem: <>איבדת גישה למרכז העסקים, משתמש-על נעלם או הדומיין שלך הועבר? אני <b>מחזיר בעלות</b> על הנכסים ומחבר מחדש דפים, פיקסלים וקטלוגים.</>,
        bullets: ['החזרת בעלות על Business Manager', 'טיפול בהשתלטות שותף-לשעבר', 'חיבור דפים ונכסים בחזרה', 'הגדרת הרשאות חסינה מפני פריצה'],
        message: 'היי, אני תקוע/ה ב-Business Manager, אשמח לעזרה',
      },
      {
        type: 't-all',
        tag: 'All Platforms',
        title: 'לא יודע איפה הבעיה? אני מאתר',
        problem: <>גישה שנעלמה ולא ברור היכן? טוויטר/X, TikTok, LinkedIn, Google Business? <b>אבחון חינם</b> בתוך שעה. אם יש פתרון, אציע אותו עוד באותה שיחה.</>,
        bullets: ['אבחון חינם לכל הפלטפורמות', 'הערכת סיכוי הצלחה לפני תשלום', 'ליווי צמוד של מנהל תיק', 'תגובה ראשונה תוך שעה'],
        message: 'היי, איבדתי גישה לחשבון ולא בטוח/ה איפה הבעיה, אשמח לאבחון',
      },
    ],
    ctaLabel: 'קבל עזרה עכשיו',
    arrow: '←',
    eyebrow: 'שירותי שחזור מקצועיים · פעיל 24/6',
    titleBefore: 'מחזיר לך את ',
    titleAccent: 'הדיגיטל',
    titleAfter: 'כשהכל קרס',
    subtitle: 'חשבון נפרץ, נחסם או נעלם? אני מתמחה בשחזור מהיר ושקט, עד שהחשבון חזר לידיים שלך.',
    stats: [
      { value: '95%+', label: 'הצלחה בשחזור' },
      { value: '24/6', label: 'זמינות אישית' },
      { value: '~48h', label: 'זמן ממוצע' },
    ],
    pagesAria: 'מדריכי שחזור מפורטים',
    pagesTitle: 'מדריכים מפורטים לפי מצב',
    pages: [
      { to: '/שחזור-חשבון-פייסבוק', label: 'שחזור חשבון פייסבוק' },
      { to: '/שחזור-חשבון-אינסטגרם', label: 'שחזור חשבון אינסטגרם' },
      { to: '/שחזור-חשבון-וואטסאפ', label: 'שחזור חשבון וואטסאפ' },
      { to: '/חשבון-פייסבוק-מושבת', label: 'חשבון פייסבוק מושבת' },
      { to: '/חשבון-אינסטגרם-נפרץ', label: 'חשבון אינסטגרם נפרץ' },
      { to: '/שחזור-מנהל-מודעות', label: 'שחזור מנהל מודעות' },
    ],
  },
  en: {
    cards: [
      {
        type: 't-fb',
        tag: 'Facebook',
        title: 'Recover a Blocked or Hacked Facebook Account',
        problem: <>Logged in and your account was gone? Got a <b>suspicious activity</b> alert, someone changed your password, or your content got flagged by mistake? I restore full access - even when Facebook support only answers with bots.</>,
        bullets: ['Regain access without password / email', 'Remove blocks caused by false reports', 'Re-secure against repeat hacks', 'Optional monitoring for remaining weak spots'],
        message: 'Hi, my Facebook account was blocked or hacked, I need help',
      },
      {
        type: 't-ig',
        tag: 'Instagram',
        title: 'Recover a Disabled Instagram Account',
        problem: <>Lost access because of <b>false harassment reports</b>, failed face verification, or an account that vanished after impersonation? I handle it directly with Meta and get your account back.</>,
        bullets: ['Full recovery with all posts and followers', 'Appeal harassment and copyright reports', 'Deal with accounts impersonating you', '24/6 support until your case is closed'],
        message: 'Hi, my Instagram account was disabled, I need help',
      },
      {
        type: 't-wa',
        tag: 'WhatsApp',
        title: 'Recover a Hijacked WhatsApp Number',
        problem: <>Got an <b>"enter the SMS code"</b> message and your account disappeared? Strangers sending messages from your number? I stop the hijack and put you back in control within hours.</>,
        bullets: ['Recover a hijacked WhatsApp account', 'Neutralize stolen two-step verification', 'Re-secure and lock out the attacker', 'Personal guidance until full closure'],
        message: 'Hi, my WhatsApp number was hijacked, I need help',
      },
      {
        type: 't-ad',
        tag: 'Ads Manager',
        title: 'Suspended or Blocked Ad Account',
        problem: <>Your hottest campaign crashed because <b>Meta decided so?</b> Payment method declined or your account got reported? I know how to appeal, get your ads running again, and prevent repeat blocks.</>,
        bullets: ['Reset ads and pixels', 'Professional appeal against the block', 'Restore campaign history', 'Prevent repeat blocks'],
        message: 'Hi, my ad account was suspended or blocked, I need help',
      },
      {
        type: 't-bm',
        tag: 'Business Manager',
        title: 'Locked Out of Business Manager',
        problem: <>Lost access to your business portfolio, the super-admin disappeared, or your domain got transferred? I <b>restore ownership</b> of your assets and reconnect pages, pixels, and catalogs.</>,
        bullets: ['Restore ownership of Business Manager', 'Handle ex-partner takeovers', 'Reconnect pages and assets', 'Set up hack-resistant permissions'],
        message: "Hi, I'm locked out of Business Manager, I need help",
      },
      {
        type: 't-all',
        tag: 'All Platforms',
        title: "Not Sure Where the Problem Is? I'll Find It",
        problem: <>Lost access and can't tell where? Twitter/X, TikTok, LinkedIn, Google Business? <b>Free diagnosis</b> within an hour. If there's a solution, I'll lay it out in that same conversation.</>,
        bullets: ['Free diagnosis for every platform', 'Success-odds estimate before you pay', 'Close guidance from a case manager', 'First response within an hour'],
        message: "Hi, I lost access to an account and I'm not sure where the problem is, I'd love a diagnosis",
      },
    ],
    ctaLabel: 'Get Help Now',
    arrow: '→',
    eyebrow: 'Professional recovery services · Active 24/6',
    titleBefore: 'Getting your ',
    titleAccent: 'digital life',
    titleAfter: 'back when it all crashes',
    subtitle: 'Account hacked, blocked, or gone? I specialize in fast, discreet recovery - until the account is back in your hands.',
    stats: [
      { value: '95%+', label: 'Recovery success' },
      { value: '24/6', label: 'Personal availability' },
      { value: '~48h', label: 'Average turnaround' },
    ],
    pagesAria: 'Detailed recovery guides',
    pagesTitle: 'Detailed guides by situation',
    pages: [
      { to: '/en/facebook-account-recovery', label: 'Facebook Account Recovery' },
      { to: '/en/instagram-account-recovery', label: 'Instagram Account Recovery' },
      { to: '/en/whatsapp-account-recovery', label: 'WhatsApp Account Recovery' },
      { to: '/en/facebook-account-disabled', label: 'Disabled Facebook Account' },
      { to: '/en/instagram-account-hacked', label: 'Hacked Instagram Account' },
      { to: '/en/ads-manager-recovery', label: 'Ads Manager Recovery' },
    ],
  },
};

const MAX_TILT = 6;

const CHECK_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const Services = () => {
  const cardRefs = useRef([]);
  const gridRef  = useRef(null);
  const headerRef = useRef(null);
  const { lang } = useLang();
  const t = STR[lang];

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
    trackWhatsAppClick();
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', { event_category: 'Service', event_label: title, value: 1 });
    }
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
            {t.eyebrow}
          </span>
          <h2 className="svc-title">
            {t.titleBefore}<span className="svc-accent">{t.titleAccent}</span><br/>
            {t.titleAfter}
          </h2>
          <p className="svc-subtitle">
            {t.subtitle}
          </p>
          <div className="svc-stat-row">
            {t.stats.map((stat, si) => (
              <React.Fragment key={stat.value}>
                {si > 0 && <div className="svc-stat-sep" aria-hidden="true" />}
                <div className="svc-stat"><b>{stat.value}</b><span>{stat.label}</span></div>
              </React.Fragment>
            ))}
          </div>
        </header>

        {/* Cards grid */}
        <div className="svc-grid" id="svc-grid" ref={gridRef}>
          {t.cards.map((card, i) => (
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

                  <div className="svc-icon-wrap">{ICONS[card.type]}</div>

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

                  <a
                    href={getWhatsAppUrl(card.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="svc-cta"
                    onClick={() => trackClick(card.title)}
                  >
                    {t.ctaLabel}
                    <span className="svc-arrow" aria-hidden="true">{t.arrow}</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Deep-dive service pages */}
        <nav className="svc-pages" aria-label={t.pagesAria}>
          <h3 className="svc-pages-title">{t.pagesTitle}</h3>
          <div className="svc-pages-links">
            {t.pages.map((page) => (
              <Link key={page.to} to={page.to}>{page.label}</Link>
            ))}
          </div>
        </nav>

      </div>
    </section>
  );
};

export default Services;
