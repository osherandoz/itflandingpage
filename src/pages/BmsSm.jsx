import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { FACTS } from '../data/businessFacts';
import { Eyebrow, ArrowIcon, SlotNumber } from '../components/ui';
import Icon from '../components/Icon';
import '../components/FAQ.css';
import './BmsSm.css';

function trackFb(event, params) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, params);
}
function trackGa(event, params) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', event, params);
}

const DOMAIN_TYPOS = {
  'gmial.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gmail.co': 'gmail.com',
  'gmail.co.il': 'gmail.com', 'gmail.cm': 'gmail.com', 'gamil.com': 'gmail.com',
  'gmaill.com': 'gmail.com', 'gmal.com': 'gmail.com', 'gnail.com': 'gmail.com',
  'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com',
  'yhoo.com': 'yahoo.com', 'hotmial.com': 'hotmail.com', 'hotmai.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com', 'outlok.com': 'outlook.com', 'outook.com': 'outlook.com',
  'walla.com': 'walla.co.il', 'wala.co.il': 'walla.co.il',
};

/* Small local icons (the shared Icon set has no lock / bolt / alert / close) */
const svg = (children, props) => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
    {children}
  </svg>
);
const IconLock = (p) => svg(<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></>, p);
const IconBolt = (p) => svg(<path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />, p);
const IconAlert = (p) => svg(<><circle cx="12" cy="12" r="9" /><path d="M12 7.5v5" /><circle cx="12" cy="16.2" r="0.4" fill="currentColor" /></>, p);
const IconClose = (p) => svg(<path d="M18 6L6 18M6 6l12 12" />, p);

// Rendered twice (hero + closing); `where` keeps the field ids unique.
function LeadForm({ where }) {
  const navigate = useNavigate();
  const [firstName, setFirstName]             = useState('');
  const [email, setEmail]                     = useState('');
  const [website, setWebsite]                 = useState(''); // honeypot
  const [loading, setLoading]                 = useState(false);
  const [error, setError]                     = useState('');
  const [success, setSuccess]                 = useState(false);
  const [emailBlurred, setEmailBlurred]       = useState(false);
  const [emailSuggestion, setEmailSuggestion] = useState('');

  const emailOk       = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const showEmailErr  = emailBlurred && email.length > 0 && !emailOk;
  const showEmailOk   = emailBlurred && emailOk;

  const nameId = `bms-fname-${where}`;
  const emailId = `bms-email-${where}`;
  const emailErrId = `bms-email-err-${where}`;

  const handleEmailBlur = () => {
    setEmailBlurred(true);
    const atIdx = email.lastIndexOf('@');
    if (atIdx > 0) {
      const domain = email.slice(atIdx + 1).toLowerCase();
      const fix = DOMAIN_TYPOS[domain];
      setEmailSuggestion(fix ? `${email.slice(0, atIdx)}@${fix}` : '');
    }
  };

  const acceptSuggestion = () => {
    setEmail(emailSuggestion);
    setEmailSuggestion('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/bms-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email, website }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
        trackFb('Lead', { content_name: 'bms-sm-checklist' });
        trackGa('generate_lead', { page: 'bms-sm' });
        setTimeout(() => navigate('/תודה-קליסט'), 3000);
      } else {
        setError(data.error || 'משהו השתבש. בדקי את הפרטים ונסי שוב.');
      }
    } catch {
      setError('לא הצלחנו להתחבר לשרת. בדקי חיבור לאינטרנט ולחצי שוב על הכפתור.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="card theme-paper bmsm__form bmsm__success" role="status" aria-live="polite">
        <span className="bmsm__success-icon" aria-hidden="true"><Icon name="check" /></span>
        <p className="bmsm__success-title">הצ׳קליסט בדרך!</p>
        <p className="bmsm__success-sub">מעבירים אותך בעוד כמה שניות...</p>
        <div className="bmsm__success-bar" aria-hidden="true"><span /></div>
      </div>
    );
  }

  return (
    <form className="card theme-paper bmsm__form" onSubmit={onSubmit} noValidate data-clarity-mask="true">
      <span className="sticker sticker--paper bmsm__form-sticker" aria-hidden="true">חינמי לגמרי</span>

      {/* Honeypot */}
      <input
        className="bmsm__honeypot"
        type="text"
        name="website"
        value={website}
        onChange={e => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="bmsm__fields">
        <div className="field">
          <label htmlFor={nameId}>שם פרטי</label>
          <input
            id={nameId}
            type="text"
            placeholder="לדוגמה: מאיה"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            minLength={2}
            maxLength={60}
            autoComplete="given-name"
          />
        </div>
        <div className={`field bmsm__email${showEmailErr ? ' is-err' : showEmailOk ? ' is-ok' : ''}`}>
          <label htmlFor={emailId}>כתובת מייל</label>
          <div className="bmsm__email-wrap">
            <input
              id={emailId}
              className={showEmailErr ? 'error' : undefined}
              type="email"
              inputMode="email"
              dir="ltr"
              placeholder="you@agency.co.il"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={handleEmailBlur}
              required
              maxLength={254}
              autoComplete="email"
              aria-invalid={showEmailErr || undefined}
              aria-describedby={showEmailErr ? emailErrId : undefined}
            />
            {showEmailErr && <IconAlert className="bmsm__email-state bmsm__email-state--err" />}
            {showEmailOk && <Icon name="check" className="bmsm__email-state bmsm__email-state--ok" />}
          </div>
          {showEmailErr && (
            <span id={emailErrId} className="field__error" role="alert">
              נראה שהמייל לא תקין
            </span>
          )}
          {emailSuggestion && !showEmailErr && (
            <span className="bmsm__suggest small">
              האם התכוונת ל-
              <button type="button" className="link" onClick={acceptSuggestion}>
                <bdi>{emailSuggestion}</bdi>
              </button>
              ?
            </span>
          )}
        </div>
      </div>

      <button className={`btn btn--signal btn--block bmsm__submit${loading ? ' btn--plain' : ''}`} type="submit" disabled={loading} aria-busy={loading}>
        {loading ? (
          <span className="bmsm__submit-busy">
            <Icon name="spinner" spin />
            שולחת...
          </span>
        ) : (
          <>
            <span>אני רוצה את הצ׳קליסט</span>
            <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
          </>
        )}
      </button>

      {error && (
        <div className="bmsm__form-err" role="alert">
          <IconAlert />
          <span>{error}</span>
        </div>
      )}

      <ul className="bmsm__trust">
        <li><IconLock /> הפרטים מוצפנים</li>
        <li><Icon name="check" /> ללא ספאם</li>
        <li><IconBolt /> במייל בתוך דקה</li>
      </ul>
    </form>
  );
}

const BMS_FAQS = [
  {
    q: 'אני כבר עובדת שנים עם ביזנס מנג׳ר, זה רלוונטי אליי?',
    a: 'דווקא כן. ניסיון לא מחסן מבעיות בסיסיות: הרשאות שנשארו פתוחות מעובד ישן, פיקסל שמשויך לסוכנות הקודמת, חשבון שהבעלות עליו לא ברורה. הצ׳קליסט מארגן את כל הבדיקות שחשבת שאת כבר יודעת לעשות.',
  },
  {
    q: 'מה קורה אם הלקוח שלי הוא שגרם לבעיה? זה עוזר גם בדיעבד?',
    a: 'הצ׳קליסט בנוי בעיקר למניעה, לפני שמסכימים ללקוח חדש. אם כבר יש בעיה, הוא עוזר להבין מה קרה ולאסוף תיעוד שמוכיח שהמצב היה כך לפני שהגעת. זה לא מחליף ייעוץ, אבל זה הגנה ראשונית טובה.',
  },
  {
    q: 'כמה זמן לוקח למלא אותו עם לקוח חדש?',
    a: 'חמש דקות אם הלקוח מסופק ויודע לענות. עשר דקות אם הוא לא בטוח מה קורה בחשבון שלו. שמרי אותו כ-PDF ומלאי אותו לפני כל אונבורדינג.',
  },
  {
    q: 'הצ׳קליסט מבטיח שלא יהיו בעיות?',
    a: 'לא. אין מסמך שמבטיח את זה. אבל מנהלת שנכנסת ללקוח עם תיעוד מסודר יודעת לאן להצביע כשמשהו משתבש, ולא נשאלת "מה עשית לנו?" בלי תשובה.',
  },
  {
    q: 'זה מתאים גם למי שרק מתחילה בתחום?',
    a: 'כן. אם את בתחילת הדרך, הצ׳קליסט ילמד אותך מה בכלל צריך לבדוק לפני שחותמים על לקוח. אם את ותיקה, הוא ייתן לך פורמט עקבי שתוכלי לסמוך עליו.',
  },
];

const BENEFITS = [
  {
    title: 'הפרדה מהתקלות של הלקוח',
    body: 'הצ׳קליסט מראה בדיוק איך לשמור את החשבון הפרטי שלך מחוץ לבלגן של הלקוח, כך שהתקלות שלו לא הופכות לבעיה שלך.',
  },
  {
    title: 'ביטחון בשיחת המכירה',
    body: 'תדעי בדיוק מה המצב של החשבון לפני שסיכמת על מחיר. את נכנסת לשיחה כשאת יודעת מה שווה ומה לא, ויוצאת ממנה עם הצעה ריאלית, לא הבטחת שווא.',
  },
  {
    title: 'תיעוד שמכסה אותך לפני הבעיה',
    body: 'תיעוד מסודר של מצב החשבון ביום שאת מתחילה. זה מה שמפריד בין ״זה לא הייתי אני״ לבין ״אין לי איך להוכיח את זה״.',
  },
];

// Every number comes from the evidence register (businessFacts.js)
const STATS = [
  { value: FACTS.accountsRecovered.display, label: 'חשבונות שוחזרו' },
  { value: FACTS.successRate.display, label: 'הצלחה בשחזור' },
  { value: FACTS.rating.display, label: 'דירוג לקוחות מתוך 5' },
];

function FaqSection() {
  return (
    <section className="bmsm__faq section" id="faq" aria-labelledby="faqHead">
      <div className="container bmsm__split">
        <header className="bmsm__split-head m-reveal">
          <Eyebrow num="03">שאלות נפוצות</Eyebrow>
          <h2 className="h1" id="faqHead">
            <span className="lt">שאלות שמנהלות</span> <span className="mk m-in">תמיד שואלות</span>
          </h2>
          <p className="lead">תשובות ישירות לכל מה שעולה לפני שלוחצים להוריד.</p>
          <p className="bmsm__nudge">
            עוד שאלות?{' '}
            <a className="link" href="https://wa.me/972509823235" target="_blank" rel="noopener noreferrer">
              שלחי הודעה בוואטסאפ
            </a>
          </p>
        </header>

        <div className="faq-list">
          {BMS_FAQS.map((item, i) => (
            <details key={item.q} className="faq-item" name="bmsm-faq" open={i === 0 || undefined}>
              <summary>
                <span className="faq-item__num num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="faq-item__q">{item.q}</span>
                <span className="faq-item__icon" aria-hidden="true" />
              </summary>
              <p className="faq-item__a">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function BmsSm() {
  const firedRef = useRef(false);
  const finalRef = useRef(null);
  const [stickyClosed, setStickyClosed] = useState(false);
  const [stickyShown, setStickyShown] = useState(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackFb('ViewContent', { content_name: 'bms-sm-lp' });
    trackGa('page_view_bms', { page: 'bms-sm' });
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('bmsm-sticky-dismissed') === '1') setStickyClosed(true);
    } catch { /* storage blocked, ignore */ }
  }, []);

  // The bar appears once the hero form has scrolled away and steps aside
  // again when the closing form is on screen: never two forms' CTAs at once.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const end = finalRef.current;
      const atEnd = end ? end.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      setStickyShown(window.scrollY > 640 && !atEnd);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const dismissSticky = () => {
    setStickyClosed(true);
    try { sessionStorage.setItem('bmsm-sticky-dismissed', '1'); } catch { /* ignore */ }
  };

  return (
    <div className="bmsm" dir="rtl">
      <a href="#getit" className="skip-link bmsm__skip">דלגי לטופס</a>

      {/* ── TOPBAR ──────────────────────────────────────────── */}
      <div className="bmsm__topbar theme-ink">
        <div className="container bmsm__topbar-in">
          <span className="bmsm__dot" aria-hidden="true" />
          <span>צ׳קליסט סינון לקוחות 2026</span>
          <span className="bmsm__pill">לכל מנהלת סושיאל</span>
        </div>
      </div>

      {/* ── BRAND ROW ───────────────────────────────────────── */}
      <header className="bmsm__nav theme-ink">
        <div className="container bmsm__nav-in">
          <div className="bmsm__brand">
            <span className="bmsm__brand-mark" aria-hidden="true">או</span>
            <span className="bmsm__brand-text">
              אושר רווח
              <small>BMS · מומחה תשתיות מטא</small>
            </span>
          </div>
          <p className="bmsm__nav-meta small">
            <span>
              <Icon name="shield" />
              מומחה תשתיות מטא · <bdi>{FACTS.accountsRecovered.display}</bdi> שחזורים
            </span>
            <span>
              <Icon name="star" />
              <bdi>{FACTS.rating.display}</bdi>
            </span>
          </p>
        </div>
      </header>

      <main id="main">
        {/* ── HERO: headline, then the form ───────────────────── */}
        <section className="bmsm__hero theme-ink bg-grid">
          <div className="container bmsm__hero-grid">
            <div className="bmsm__hero-head">
              <p className="bmsm__kicker">( צ׳קליסט סינון לקוחות · עדכון 2026 )</p>
              <h1 className="bmsm__title h1">
                <span className="lt">תפסיקי לשלם בזמן ובאנרגיה</span>{' '}
                על <span className="mk">הבלאגן</span> של הלקוחות שלך.
              </h1>
            </div>

            <div className="bmsm__hero-form" id="getit" aria-label="קבלי את הצ׳קליסט" role="region">
              <LeadForm where="hero" />
            </div>

            <div className="bmsm__hero-lede">
              <p className="lead">
                צ׳קליסט הסינון המעודכן ל‑2026:{' '}
                <b>איך להבין מה קורה מאחורי הקלעים</b> של החשבון
                ב‑5 דקות, ולהגן על המוניטין המקצועי שלך לפני שאת בכלל מסכימה לקחת את הלקוח.
              </p>
              <ul className="bmsm__chips">
                <li className="tag">5 בדיקות קריטיות</li>
                <li className="tag">‏5 דקות קריאה</li>
                <li>
                  <a href="#how" className="link link--arrow small">
                    ראי מה כלול
                    <ArrowIcon />
                  </a>
                </li>
              </ul>
            </div>

            {/* The checklist itself, as a document lying on the page */}
            <figure className="bmsm__doc">
              <img
                src="/images/newchecklist.webp"
                alt="צ׳קליסט סינון לקוחות 2026 פתוח על טאבלט ועל טלפון"
                width="819"
                height="1024"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="sticker bmsm__doc-sticker bmsm__doc-sticker--a">
                PDF מלא · 2026
                <small>עם כל שאלות הסינון</small>
              </figcaption>
              <span className="sticker sticker--paper bmsm__doc-sticker bmsm__doc-sticker--b" aria-hidden="true">
                5 בדיקות
                <small>לפני כל לקוח חדש</small>
              </span>
            </figure>
          </div>
        </section>

        {/* ── WHAT'S INSIDE ───────────────────────────────────── */}
        <section className="bmsm__inside section theme-mist" id="how" aria-labelledby="benefitsHead">
          <div className="container bmsm__split">
            <header className="bmsm__split-head m-reveal">
              <Eyebrow num="01">מה כלול</Eyebrow>
              <h2 className="h1" id="benefitsHead">
                <span className="lt">3 שכבות שמגנות על</span>{' '}
                <span className="mk m-in">המוניטין, הכסף, והזמן</span> שלך
              </h2>
              <p className="lead">
                נבנה אחרי חמש שנים של ראיית אותן טעויות שוב ושוב.
                אפשר לא לחזור עליהן.
              </p>
              <a href="#getit" className="btn btn--ink bmsm__inside-cta">
                <span>קבלי את הצ׳קליסט עכשיו</span>
                <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
              </a>
            </header>

            <ol className="rows bmsm__rows m-stagger">
              {BENEFITS.map((b, i) => (
                <li className="row bmsm__row" key={b.title}>
                  <span className="bmsm__row-num num" aria-hidden="true">0{i + 1}</span>
                  <div className="bmsm__row-text">
                    <h3 className="h3">{b.title}</h3>
                    <p className="muted">{b.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── ABOUT ───────────────────────────────────────────── */}
        <section className="bmsm__about section theme-ink" aria-label="על אושר רווח">
          <div className="container">
            <div className="bmsm__about-grid">
              <figure className="bmsm__about-photo m-reveal">
                <img
                  src="/images/brand/osher-portrait-400.webp"
                  srcSet="/images/brand/osher-portrait-400.webp 400w, /images/brand/osher-portrait-800.webp 800w"
                  sizes="(min-width: 960px) 280px, 160px"
                  alt="אושר רווח"
                  width="400"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <div className="bmsm__about-text m-reveal">
                <Eyebrow num="02">מי מאחורי הצ׳קליסט</Eyebrow>
                <h2 className="h2">אושר רווח · <span className="lt">מומחה תשתיות מטא</span></h2>
                <p className="lead">
                  חמש שנים של טיפול בכל סוגי הלקוחות למעל 2,500 חשבונות של עסקים בישראל.
                  הצ׳קליסט הזה הוא תקציר של כל הטעויות שראיתי, ואיך אפשר למנוע
                  אותן עוד לפני שלוקחים את הלקוח.
                </p>
              </div>
            </div>
            <dl className="bmsm__stats">
              {STATS.map((s) => (
                <div className="bmsm__stat" key={s.label}>
                  <dd><SlotNumber value={s.value} /></dd>
                  <dt>{s.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <FaqSection />

        {/* ── FORM, AGAIN ─────────────────────────────────────── */}
        <section className="bmsm__final section theme-mist" ref={finalRef} aria-labelledby="finalHead">
          <div className="container bmsm__final-grid">
            <div className="m-reveal">
              <Eyebrow num="04">חינם, ישר למייל</Eyebrow>
              <h2 className="h1" id="finalHead">
                <span className="lt">תשלח לי את הצ׳קליסט,</span>{' '}
                <span className="mk m-in">זה לוקח שניה</span>
              </h2>
            </div>
            <div className="bmsm__final-form m-reveal">
              <LeadForm where="final" />
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="bmsm__footer theme-ink">
        <div className="container small">
          © {new Date().getFullYear()} Israel Tech Force · אושר רווח · כל הזכויות שמורות
          {' '}·{' '}
          <a className="link" href="/privacy">פרטיות</a>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ───────────────────────────────── */}
      {!stickyClosed && (
        <div className={`bmsm__sticky${stickyShown ? ' is-visible' : ''}`} aria-label="קבלי את הצ׳קליסט" aria-hidden={!stickyShown}>
          <button
            className="bmsm__sticky-close"
            onClick={dismissSticky}
            aria-label="סגרי פס זה"
            type="button"
            tabIndex={stickyShown ? 0 : -1}
          >
            <IconClose />
          </button>
          <p className="bmsm__sticky-note">צ׳קליסט סינון לקוחות · 2026</p>
          <a className="bmsm__sticky-btn" href="#getit" tabIndex={stickyShown ? 0 : -1}>קבלי את הצ׳קליסט</a>
        </div>
      )}

    </div>
  );
}
