import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import '@fontsource/heebo/800.css';
import './BmsSm.css';

const VIDEO_ID = 'YOUR_VIDEO_ID'; // TODO: replace after YouTube upload
const CHECKOUT_URL = 'https://www.israeltechforce.com/checkout/bms';
const COUNTDOWN_KEY = 'bms_sm_countdown_end';
const COUNTDOWN_HOURS = 48;

/* ── Copy exact from BMS-SM-Master.md ── */

const TESTIMONIALS = [
  {
    name: 'שרה שמעונוב',
    role: 'מנהלת סושיאל',
    badge: '🎯 הכי רלוונטית',
    stars: 5,
    text: `בתור מנהלת סושיאל, אושר סייע לי לפתור תקלת מודעות מורכבת,\nובזכותו חזרה היכולת של הלקוחה שלי לקדם ולשווק את העסק שלה. תודה אושר!`,
  },
  {
    name: 'מיכל אברהם',
    role: 'מנהלת סושיאל עצמאית',
    badge: null,
    stars: 5,
    text: `לפני הקורס הייתי מקבלת כל לקוח שהגיע, גם אם הרגשתי שיש שם בעיות.\nאחרי BMS יש לי שאלות ספציפיות שאני שואלת לפני כל חתימה.\nשבוע אחרי הקורס סיננתי לקוח עם ביזנס מנג'ר שהוגבל פעמיים.\nחסכתי לעצמי הרבה כאב ראש.`,
  },
  {
    name: 'נועה בן דוד',
    role: 'פרילנסרית, ניהול סושיאל ופרסום ממומן',
    badge: null,
    stars: 5,
    text: `תמיד חשבתי שאני מבינה ביזנס מנג'ר. הקורס הראה לי כמה דברים עשיתי לא נכון.\nבמיוחד בנושא ההרשאות, פשוט לא ידעתי שיש דרך בטוחה יותר לבקש גישה.\nממליצה לכל מי שעובדת עם לקוחות מטא.`,
  },
  {
    name: 'איתי שפירא',
    role: 'בעלים, סוכנות סושיאל',
    badge: null,
    stars: 5,
    text: `הצוות שלי עשה את הקורס ועכשיו יש לנו תהליך אחיד לקבלת לקוחות.\nהאונבורדינג לקח לנו פעם שעתיים של ניחושים. היום זה 20 דקות עם צ'קליסט.\nהשקעה ששילמה את עצמה מהלקוח הראשון.`,
  },
];

const FAQS = [
  {
    q: `אני כבר עובדת שנים עם ביזנס מנג'ר, זה רלוונטי אליי?`,
    a: `בדיוק בשבילך. BMS לא מלמד "איפה לוחצים", הוא מלמד איך המערכת באמת עובדת, למה דברים נחסמים, ואיך לבנות תשתית שתחזיק לאורך זמן.\nרוב מנהלות הסושיאל המנוסות שעשו את הקורס אמרו: "לא ידעתי שלא ידעתי את זה."`,
  },
  {
    q: `מה קורה אם הלקוח שלי הוא שגרם לחסימה?`,
    a: `חלק מהקורס מוקדש לדיוק לזה: איך לזהות מי אחראי, איך לתקן, ואיך לתקשר ללקוח בצורה שמשמרת את הקשר המקצועי.`,
  },
  {
    q: `כמה זמן לוקח?`,
    a: `שעתיים-שלוש בסה"כ. ניתן לעשות בקצב שלך, ולחזור לחלק ספציפי כשיש תקלה אצל לקוח.`,
  },
  {
    q: `האם הקורס מבטיח שלא יהיו בעיות?`,
    a: `לא. אף אחד לא יכול להבטיח זאת. המטרה היא שתגיעי מוכנה יותר, תזהי בעיות מוקדם יותר, ותדעי מה לעשות כשמשהו קורה.`,
  },
  {
    q: `זה מתאים גם לפרילנסרית מתחילה?`,
    a: `כן, אבל גם לוותיקה. הקורס בנוי כך שכל שלב מוסיף שכבה. מתחילה תקבל מסגרת. ותיקה תקבל עומק.`,
  },
];

const CURRICULUM = [
  {
    num: '01',
    title: 'תקינות וזהות',
    text: `מה לבדוק ראשון כשאת מקבלת גישה לחשבון חדש, ואיך לזהות דגלים אדומים לפני שהם הופכים לבעיה שלך.`,
  },
  {
    num: '02',
    title: 'מבנה והרשאות',
    text: `איך אמור להיראות ביזנס מנג'ר מסודר, ואיך לבקש גישה נכון כדי שלא תהיי תלויה בלקוח לכל פעולה.`,
  },
  {
    num: '03',
    title: 'הפחתת סיכונים',
    text: `איך לעבוד חכם מול מערכת מטא, ואיך להגן על עצמך כשהלקוח עושה משהו שלא ביקשת ממנו.`,
  },
  {
    num: '04',
    title: 'עזרה ראשונה',
    text: `מה עושים כשיש הגבלה, חסימה, או אובדן גישה, ואיך לפעול נכון מול הלקוח ומול מטא בו-זמנית.`,
  },
];

const WHAT_YOU_LEARN = [
  `איך לזהות תשתית בעייתית לפני האונבורדינג`,
  `איך לבקש גישה נכונה לנכסים, בלי לבקש יותר מדי ובלי פחות`,
  `ההבדל בין מרכז החשבונות לביזנס מנג'ר, ולמה זה קריטי ללקוחות שלך`,
  `איך להגדיר הרשאות בלי לייצר בלגן שיפול עליך`,
  `מה לעשות כשלקוח מקבל חסימה, ואיך לתקשר את זה אליו`,
  `איך לשמור על עצמך כשמטא טועה`,
];

const INCLUDES = [
  `📹 15 שיעורים קצרים וממוקדים`,
  `📋 שיטת 4 השלבים לעבודה בטוחה יותר`,
  `📄 דפי מידע מסודרים להגדרות ותהליכים`,
  `⚡ גישה מיידית לאחר הרכישה`,
];

const BONUSES = [
  `🎁 צ'קליסט אונבורדינג: 5 שאלות לפני כל לקוח חדש`,
  `🎁 שחזור גישה לנכסים אבודים`,
  `🎁 אישור פעילות רגישה בביזנס מנג'ר`,
  `🎁 65 הוקים ממירים לפרסום שממיר`,
];

/* ── Helpers ── */

function pad(n) {
  return String(n).padStart(2, '0');
}

function useCountdown() {
  const [remaining, setRemaining] = useState(COUNTDOWN_HOURS * 3600 * 1000);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let deadline = Number(localStorage.getItem(COUNTDOWN_KEY));
    const now = Date.now();
    if (!deadline || deadline < now) {
      deadline = now + COUNTDOWN_HOURS * 3600 * 1000;
      localStorage.setItem(COUNTDOWN_KEY, String(deadline));
    }
    const tick = () => setRemaining(Math.max(0, deadline - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(remaining / 3600000);
  const m = Math.floor((remaining % 3600000) / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  return { time: `${pad(h)}:${pad(m)}:${pad(s)}`, expired: remaining === 0 };
}

function trackEvent(name, gaEvent, params = {}) {
  if (typeof window === 'undefined') return;
  if (window.fbq) window.fbq('track', name, params);
  if (window.gtag) window.gtag('event', gaEvent || name, { ...params, page_path: '/bms-sm' });
}

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

/* ── LeadForm ── */

function LeadForm({ variant = 'hero', onSuccess }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!firstName.trim()) { setError('נא למלא שם פרטי'); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('נא למלא כתובת מייל תקינה'); return;
    }
    if (phone.trim() && !/^[\d+\-\s()]{9,20}$/.test(phone.trim())) {
      setError('מספר טלפון לא תקין'); return;
    }
    if (!newsletter) { setError('יש לאשר הצטרפות לרשימת הדיוור'); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/bms-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          newsletter,
          website,
          source: `bms-sm-${variant}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        trackEvent('Lead', 'generate_lead', { content_name: 'BMS_SM_lead', form_variant: variant, source: 'bms-sm' });
        trackEvent('CompleteRegistration', 'form_submit_lead', { page: 'bms-sm', form_variant: variant });
        if (onSuccess) onSuccess();
        navigate('/תודה-קליסט');
      } else {
        setStatus('idle');
        setError(data.error || 'שגיאה בשליחה. נסי שוב.');
      }
    } catch {
      setStatus('idle');
      setError('שגיאת רשת. נסי שוב.');
    }
  };

  return (
    <form onSubmit={submit} noValidate>
      <div className="form-row">
        <input className="input" type="text" placeholder="שם פרטי" value={firstName}
          onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" required />
        <input className="input" type="email" placeholder="כתובת מייל" value={email}
          onChange={(e) => setEmail(e.target.value)} autoComplete="email" inputMode="email" required />
      </div>
      <input className="input" type="tel" placeholder="טלפון נייד (לא חובה)" value={phone}
        onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" />
      <div className="honeypot" aria-hidden="true">
        <label>Website<input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label>
      </div>
      <label className="newsletter-check">
        <input
          type="checkbox"
          checked={newsletter}
          onChange={(e) => setNewsletter(e.target.checked)}
          required
        />
        <span>אני מסכימה להצטרף לרשימת הדיוור</span>
      </label>
      <button type="submit" className="btn-cta" disabled={status === 'loading'}>
        {status === 'loading' ? 'שולחת...' : `שלחי לי את הצ'קליסט ←`}
      </button>
      <p className="form-sec">
        <i className="fa-solid fa-lock" aria-hidden="true" />
        🔒 פרטייך מאובטחים. ללא ספאם.
      </p>
      {error && <div className="form-err" role="alert">{error}</div>}
    </form>
  );
}

/* ── Main component ── */

export default function BmsSm() {
  const { time: countdown, expired: countdownExpired } = useCountdown();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [exitOpen, setExitOpen] = useState(false);

  const scrollDepthFired = useRef({ 25: false, 50: false, 75: false, 90: false });
  const exitFired = useRef(false);
  const popupShownThisSession = useRef(false);

  /* PageView */
  useEffect(() => {
    trackEvent('PageView', 'page_view', { page_title: 'BMS Social Managers', page_path: '/bms-sm' });
  }, []);

  /* Scroll depth */
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.round((window.scrollY / max) * 100);
      [25, 50, 75, 90].forEach((mark) => {
        if (pct >= mark && !scrollDepthFired.current[mark]) {
          scrollDepthFired.current[mark] = true;
          trackEvent('ViewContent', 'scroll_depth', { page: 'bms-sm', percent: mark });
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Exit intent (desktop only) */
  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 860) return;
    const onLeave = (e) => {
      if (exitFired.current || popupShownThisSession.current) return;
      if (e.clientY <= 0) {
        exitFired.current = true;
        popupShownThisSession.current = true;
        setExitOpen(true);
        trackEvent('ViewContent', 'exit_popup_shown', { page: 'bms-sm' });
      }
    };
    document.addEventListener('mouseleave', onLeave);
    return () => document.removeEventListener('mouseleave', onLeave);
  }, []);

  const onBuyClick = useCallback(() => {
    trackEvent('InitiateCheckout', 'begin_checkout', {
      value: 197, currency: 'ILS', content_name: 'BMS_SM_course', source: 'bms-sm',
    });
  }, []);

  const scrollToOffer = (e) => {
    if (e) e.preventDefault();
    document.getElementById('offer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);
  const toggleFaq = (i) => setOpenFaq((prev) => (prev === i ? null : i));

  return (
    <div className="bmsm" dir="rtl">

      {/* TOPBAR */}
      {!countdownExpired && (
        <div className="topbar" role="alert" aria-live="polite">
          <div className="topbar-inner">
            <span className="topbar-dot" aria-hidden="true" />
            <span>⏰ מחיר ההשקה 197₪ מסתיים בעוד:</span>
            <span className="topbar-time">{countdown}</span>
            <a href="#offer" onClick={scrollToOffer} className="topbar-link">
              לרכישה לחץ כאן ←
            </a>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav className="nav" aria-label="ניווט ראשי">
        <div className="wrap nav-inner">
          <div className="brand">
            <div className="brand-mark" aria-hidden="true">BMS</div>
            <div className="brand-text">
              Business Manager Security
              <small>by Israel Tech Force</small>
            </div>
          </div>
          <div className="nav-meta" aria-hidden="true">
            <span><i className="fa-solid fa-shield-halved" />5+ שנות ניסיון</span>
            <span><i className="fa-solid fa-users" />מאות מנהלות סושיאל</span>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-grid">

          <div>
            <div className="hero-eyebrow">
              🎯 למנהלות סושיאל ופרילנסריות שעובדות עם לקוחות מטא
            </div>

            <h1>
              השקעת שבוע שלם באונבורדינג וחתמת עם הלקוח,{' '}
              <span className="warn">ואז גילית שהחשבונות שלו במצב גרוע.</span>
            </h1>

            <p className="hero-sub">
              הבעיה היא לא שאת לא מספיקה טובה,
              הבעיה היא שאף אחד לא לימד אותך אלו לקוחות לקחת.
            </p>

            <div className="hero-badges" aria-label="אישורי ניסיון">
              {[
                '5 שנות ניסיון בתחום',
                'אלפי חשבונות שניצלו',
                'מאות מנהלות סושיאל שחזרו לשלוט',
                'מומחה אבטחת חשבונות מטא',
              ].map((b) => (
                <span key={b} className="hero-badge">
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="lead-card">
            <div className="lead-ribbon">חינם</div>
            <h2 className="lead-title">
              קבלי את הצ'קליסט "לקחת או לברוח" חינם
            </h2>
            <p className="lead-subtitle">
              5 דברים לבדוק שאת לוקחת לקוח חדש
            </p>
            <LeadForm variant="hero" />
          </div>

        </div>
      </section>

      {/* VIDEO — hidden until VIDEO_ID is set */}
      {VIDEO_ID !== 'YOUR_VIDEO_ID' && (
        <section className="section section-darker">
          <div className="wrap">
            <div className="sec-head">
              <h2 className="sec-title">
                כך מזהים תשתית פרסום שרופה, לפני שהיא עולה לך לקוח
              </h2>
              <p className="sec-sub">
                אושר רווח מראה את 3 הסימנים שכל מנהלת סושיאל חייבת לדעת לזהות
                לפני שהיא מקבלת אחריות על חשבון פרסום.
              </p>
            </div>

            <div className="video-wrap" role="region" aria-label="וידאו הסבר">
              {videoPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                  title="BMS: כך מזהים תשתית פרסום שרופה"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="video-placeholder">
                  <button
                    className="play-btn"
                    onClick={() => {
                      setVideoPlaying(true);
                      trackEvent('ViewContent', 'video_play', { page: 'bms-sm' });
                    }}
                    aria-label="נגן וידאו"
                  >
                    <i className="fa-solid fa-play" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* PROBLEM */}
      <section className="section section-dark">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">טרגדיות קורות בשלשות</h2>
            <p className="sec-sub">
              לא צריך לקבל כל אחד, אל תתני לבעיה שלו להפוך לבעיה שלך.
            </p>
          </div>

          <div className="problem-grid">
            <article className="problem-card">
              <div className="problem-icon">
                <img src="/images/scenraio1.png" alt="" aria-hidden="true" />
              </div>
              <div className="problem-tag">תרחיש 1</div>
              <h3 className="problem-title">הזמן שלך הלך לפח</h3>
              <p className="problem-text">
                שיחות מקדימות, הכרות, בניית אסטרטגיה.
                חתמת עם הלקוח, אפילו קיבלת מקדמה יפה ורצית להתחיל לעבוד ואז:
                אין לו מושג מה פרטי ההתחברות שלו, חצי מהעוקבים שלו קנויים ועברו שם 8 מנהלות לפנייך.
                עכשיו תצטרכי לתקן את מה שלא את שברת.
              </p>
            </article>

            <article className="problem-card">
              <div className="problem-icon">
                <img src="/images/scenraio2.png" alt="" aria-hidden="true" />
              </div>
              <div className="problem-tag">תרחיש 2</div>
              <h3 className="problem-title">הלקוח לא מבין למה זה קורה</h3>
              <p className="problem-text">
                "אני משלם לך ואין תוצאות"
                לכי תסבירי לו עכשיו, חודש אחרי תחילת העבודה שגילית שהכל בנוי שם עקום,
                האינסטגרם לא מתקשר עם הפייסבוק, מנהל המודעות מוגבל.
                את מנסה להסביר, הוא שומע תירוצים.
              </p>
            </article>

            <article className="problem-card">
              <div className="problem-icon">
                <img src="/images/scenraio3.png" alt="" aria-hidden="true" />
              </div>
              <div className="problem-tag">תרחיש 3</div>
              <h3 className="problem-title">מכרת לו הכל ולא נתת לו כלום</h3>
              <p className="problem-text">
                הלקוח סגר איתך חבילה מושלמת, טיפול 10000 לסושיאל שלו.
                אבל אין לך את הכלים לטפל בזה מסיבה פשוטה:
                הוא לא יודע מי מחזיק לו בנכסים, אשתו? המנהלת הקודמת? אולי בת דודה?
                את עכשיו מבזבזת זמן במקום לרוץ תכלס.
              </p>
            </article>
          </div>

          <div className="problem-footer">
            זה לא כישלון מקצועי.{' '}
            <strong>זה מחסור במידע שאף אחד לא לימד אותך. עד עכשיו.</strong>
          </div>
        </div>
      </section>

      {/* REFRAME */}
      <section className="section section-mid">
        <div className="wrap">
          <h2 className="reframe-headline">
            מנהלת סושיאל טובה יודעת לשווק.{' '}
            <span className="hl">מנהלת סושיאל מעולה, יודעת גם מה לשאול לפני שהיא מתחילה.</span>
          </h2>
          <p className="reframe-cta-pill">
            BMS מלמד אותך לשאול את השאלות האלה.{' '}
            ולדעת מה לעשות עם התשובות.
          </p>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="section section-dark">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">
              מנהלות סושיאל שכבר עשו את זה, וחזרו לספר
            </h2>
            <p className="sec-sub">100% ממליצות | 5 ביקורות | ממשתמשות אמיתיות</p>
          </div>

          <div
            className="rating-strip"
            role="img"
            aria-label="דירוג ממוצע 5 מתוך 5, 100% ממליצות"
          >
            <span className="rating-strip-big">
              <i className="fa-solid fa-star" aria-hidden="true" />
              5.0
            </span>
            <span className="rating-sep" aria-hidden="true" />
            <small>100% ממליצות</small>
            <span className="rating-sep" aria-hidden="true" />
            <small>ממשתמשות אמיתיות</small>
          </div>

          <div className="t-grid">
            {TESTIMONIALS.map((t, i) => (
              <article key={t.name} className={`t-card${t.badge ? ' t-card-featured' : ''}`}>
                <span className="t-bigquote" aria-hidden="true">"</span>
                {t.badge && (
                  <div className="t-featured-tag">{t.badge}</div>
                )}
                <p className="t-quote">{t.text}</p>
                <div className="t-footer">
                  <div
                    className="t-avatar"
                    aria-hidden="true"
                    style={{ background: [
                      'linear-gradient(135deg,#3B82F6,#1D4ED8)',
                      'linear-gradient(135deg,#6366f1,#4338ca)',
                      'linear-gradient(135deg,#0ea5e9,#0369a1)',
                      'linear-gradient(135deg,#8b5cf6,#6d28d9)',
                    ][i % 4] }}
                  >
                    {initials(t.name)}
                  </div>
                  <div>
                    <div className="t-name">{t.name}</div>
                    {t.role && <div className="t-role">{t.role}</div>}
                    <div className="t-stars" aria-label={`${t.stars} מתוך 5 כוכבים`}>
                      {stars(t.stars)}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IS OSHER */}
      <section className="section section-darker">
        <div className="wrap">
          <div className="who-grid">

            <div className="who-portrait">
              <img
                src="/images/osher-bms.png"
                alt="אושר רווח, מומחה אבטחת חשבונות מטא"
                className="who-photo"
              />
              <div className="who-portrait-badge">
                <strong>אושר רווח</strong>
                <small>מומחה אבטחת חשבונות מטא</small>
              </div>
            </div>

            <div className="who-text">
              <h2>
                למה דווקא <span className="hl">אושר רווח?</span>
              </h2>
              <p className="who-para">
                אני לא מלמד תיאוריה, אני מביא אליך את השטח.
              </p>
              <p className="who-para">
                5 שנים אני רואה מנהלות סושיאל מגיעות אליי
                אחרי שכבר קיבלו לקוח עם תשתית שרופה.
                חלקן בכייה. חלקן כועסות. כולן בזבזו זמן שלא מגיע להן.
              </p>
              <p className="who-para">
                הקורס הזה נבנה כדי שלא תצטרכי להגיע אליי אחרי.
                כדי שתגיעי לכל לקוח חדש: <strong>מוכנה, בטוחה, וברת-סמכות.</strong>
              </p>

              <div className="who-creds" role="list">
                {[
                  { icon: 'fa-solid fa-shield-halved', text: '5 שנות ניסיון באבטחת חשבונות מטא' },
                  { icon: 'fa-solid fa-trophy',        text: 'אלפי חשבונות שניצלו' },
                  { icon: 'fa-solid fa-newspaper',     text: 'כיסוי תקשורתי: Ynet, ערוץ הכלכלה' },
                  { icon: 'fa-solid fa-star',          text: 'מומחה מוכר בקהילת הפרסום הישראלית' },
                ].map((c) => (
                  <div key={c.text} className="who-cred" role="listitem">
                    <i className={c.icon} aria-hidden="true" />
                    {c.text}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section className="section section-dark">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">מה מחכה לך בתוך BMS</h2>
            <p className="sec-sub">
              לא עוד קורס של "איפה לוחצים".
              שיטה שתעשה אותך לאדם הכי בקיא בחדר
              כשמדובר בתשתית פרסום.
            </p>
          </div>

          <div className="curr-bg">
          <div className="curr-grid">
            {CURRICULUM.map((stage) => (
              <article key={stage.num} className="curr-card">
                <div className="curr-num" aria-hidden="true">{stage.num}</div>
                <h3 className="curr-title">{stage.title}</h3>
                <p className="curr-text">{stage.text}</p>
              </article>
            ))}
          </div>

          <div className="curr-details">
            <div className="curr-detail-card">
              <div className="curr-detail-title">
                <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
                מה תלמדי
              </div>
              <ul className="curr-list">
                {WHAT_YOU_LEARN.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="curr-detail-card">
              <div className="curr-detail-title">
                <i className="fa-solid fa-box-open" aria-hidden="true" />
                מה מקבלים
              </div>
              <ul className="curr-list plain">
                {INCLUDES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="curr-detail-title" style={{ marginTop: 20 }}>
                <i className="fa-solid fa-gift" aria-hidden="true" />
                בונוסים
              </div>
              <ul className="curr-list plain">
                {BONUSES.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          </div>{/* /curr-bg */}
        </div>
      </section>

      {/* OFFER */}
      <section className="section section-darker" id="offer">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">כמה שווה לך לקוח שלא יצור לך בעיות?</h2>
          </div>

          <div className="offer-wrap">

            <div className="offer-value">
              <h3>הסבר הערך</h3>
              <div className="offer-math">
                <div className="offer-math-row">
                  <span>שעה של ייעוץ עם מומחה מטא</span>
                  <b>400–800₪</b>
                </div>
                <div className="offer-math-row">
                  <span>תיקון תשתית שרופה בדיעבד</span>
                  <b>500–3,000₪</b>
                </div>
                <div className="offer-math-row">
                  <span>לקוח כועס שעוזב ומספר לחברות</span>
                  <b>אין לזה מחיר</b>
                </div>
                <div className="offer-math-rule" aria-hidden="true" />
                <div className="offer-math-row offer-math-total">
                  <span>BMS נותן לך את הכלים שיחסכו את כל אלה</span>
                </div>
              </div>

              <div className="offer-trust">
                <div className="offer-trust-item">
                  <i className="fa-solid fa-bolt" aria-hidden="true" />
                  ⚡ גישה מיידית לאחר הרכישה
                </div>
                <div className="offer-trust-item">
                  <i className="fa-solid fa-lock" aria-hidden="true" />
                  🔒 תשלום מאובטח
                </div>
                <div className="offer-trust-item">
                  <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                  🛡️ ערבות 7 ימים
                </div>
              </div>
            </div>

            <div className="offer-price">
              <div>
                <div className="offer-price-tag">מחיר ההשקה</div>
                <div className="offer-price-old" aria-label="מחיר רגיל 297 שקלים">297₪</div>
                <div className="offer-price-now" aria-label="מחיר ההשקה 197 שקלים">
                  <span className="cur">₪</span>197
                </div>
                <div className="offer-price-label">המחיר שלך היום: 197₪ בלבד</div>
              </div>

              <a
                href={CHECKOUT_URL}
                className="btn-cta"
                onClick={onBuyClick}
                aria-label="רכשי את הקורס BMS ב-197 שקלים"
              >
                אני רוצה להגיע מוכנה לכל לקוח, 197₪ ←
              </a>
            </div>

          </div>

          <div className="guarantee" role="note">
            <i className="fa-solid fa-shield-halved" aria-hidden="true" />
            <div className="guarantee-title">🛡️ ערבות מלאה: 7 ימים כסף חזרה, ללא שאלות.</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-dark">
        <div className="wrap">
          <div className="sec-head">
            <h2 className="sec-title">שאלות נפוצות</h2>
          </div>

          <div className="faq-list" role="list">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className={`faq-item${isOpen ? ' open' : ''}`} role="listitem">
                  <button
                    className="faq-q"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                  >
                    <span>{faq.q}</span>
                    <span className="faq-chev" aria-hidden="true">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </button>
                  <div id={`faq-a-${i}`} className="faq-a" role="region" aria-hidden={!isOpen}>
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} Israel Tech Force · אושר רווח</span>
          <nav className="footer-links" aria-label="קישורי אתר">
            <a href="/">לאתר הראשי</a>
            <a href="/privacy">מדיניות פרטיות</a>
          </nav>
        </div>
      </footer>

      {/* STICKY CTA (mobile) */}
      <div className="sticky-cta">
        <a href={CHECKOUT_URL} className="btn-cta" onClick={onBuyClick} aria-label="רכשי את הקורס BMS ב-197 שקלים">
          אני רוצה להגיע מוכנה לכל לקוח, 197₪ ←
        </a>
      </div>

      {/* EXIT POPUP */}
      {exitOpen && (
        <div
          className="exit-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-title"
          onClick={() => setExitOpen(false)}
        >
          <div className="exit-modal" onClick={(e) => e.stopPropagation()}>
            <button className="exit-close" onClick={() => setExitOpen(false)} aria-label="סגרי חלון">
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
            <h3 id="exit-title">רגע לפני שאת עוזבת</h3>
            <p>
              את יודעת שהשאלה הבאה היא רק עניין של זמן:
              "למה הפרסום לא עובד?" ואת תצטרכי לענות.
              קבלי את הצ׳קליסט חינם עכשיו.
            </p>
            <LeadForm variant="exit" onSuccess={() => setTimeout(() => setExitOpen(false), 2500)} />
          </div>
        </div>
      )}

    </div>
  );
}
