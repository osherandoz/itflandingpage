import { useState } from 'react';
import { Link } from 'react-router';
import '@fontsource/heebo/800.css';
import '@fontsource/heebo/900.css';
import { subscribeToNewsletter, validateEmail } from '../utils/smoove';
import './Newsletter.css';

/* ============================================================
   THE SAFETY SIGNAL. Monthly newsletter subscribe page.
   Register: brand, but built on the site's own dark system
   (#0C0E1D + glass cards + #3B82F6 blue) rather than a one-off
   palette. WhatsApp is a support channel here, not the subject:
   the newsletter covers policy, product, and safety, not just
   the crisis line. All rules scoped to .tss.
   ============================================================ */

const WHATSAPP_URL = 'https://wa.me/972509823235';
const PRESS_MAKO = 'https://www.mako.co.il/nexter-news/Article-4c6901cb708af91026.htm';
const PRESS_ICE = 'https://www.ice.co.il/digital-140/news/article/1122936';

const Icon = ({ children, size = 20, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

const IconCheck = (p) => (<Icon {...p}><polyline points="20 6 9 17 4 12" /></Icon>);
const IconX = (p) => (<Icon {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>);
const IconArrow = (p) => (<Icon {...p}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Icon>);

/* ─── Tracking ────────────────────────────────────────────── */
function trackSubscribe(location) {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: 'The Safety Signal', content_category: 'newsletter' });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'newsletter_subscribe', { form_location: location });
  }
}

/* ============================================================
   SIGNUP FORM. Two fields only. Rendered twice (hero + closing).
   ============================================================ */
function SignupForm({ location }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot, must stay empty
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;

    if (!firstName.trim()) {
      setError('צריך שם פרטי כדי לפנות אליך בשם');
      return;
    }
    if (!validateEmail(email)) {
      setError('כתובת המייל לא נראית תקינה');
      return;
    }

    setBusy(true);
    setError('');

    const result = await subscribeToNewsletter(firstName, '', email, website);

    setBusy(false);
    if (result.success) {
      setDone(true);
      trackSubscribe(location);
      try {
        localStorage.setItem('newsletterSubscribed', 'true');
        localStorage.setItem('newsletterPopupShown', 'true');
      } catch { /* private mode, ignore */ }
    } else {
      setError(result.message);
    }
  };

  if (done) {
    return (
      <div className="tss-form tss-done" role="status">
        <p className="tss-done-title">נרשמת. הגיליון הבא יגיע אליך בתחילת החודש.</p>
        <p className="tss-done-note">
          אם המייל לא מופיע בתיבה הראשית, תבדוק בלשונית קידומים או בספאם ותסמן אותו כ"לא ספאם".
          ככה הגיליונות הבאים יגיעו למקום הנכון.
        </p>
      </div>
    );
  }

  return (
    <form className="tss-form" onSubmit={handleSubmit} noValidate>
      {/* honeypot: hidden from humans, bots fill it */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="tss-honeypot"
      />

      <div className="tss-fields">
        <label className="tss-field">
          <span className="tss-field-label">שם פרטי</span>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); setError(''); }}
            placeholder="אושר"
            autoComplete="given-name"
            disabled={busy}
            required
          />
        </label>

        <label className="tss-field">
          <span className="tss-field-label">כתובת מייל</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(''); }}
            placeholder="you@company.co.il"
            autoComplete="email"
            inputMode="email"
            dir="ltr"
            disabled={busy}
            required
          />
        </label>
      </div>

      <button type="submit" className="tss-submit" disabled={busy}>
        {busy ? 'רגע…' : 'שלחו לי את הגיליון הבא'}
        {!busy && <IconArrow size={18} />}
      </button>

      {error && <p className="tss-error" role="alert">{error}</p>}
    </form>
  );
}

/* ============================================================
   ISSUE ANATOMY. Shared between the hero card and the section.
   ============================================================ */
const SEGMENTS = [
  {
    n: '01',
    title: 'עדכון מטא',
    short: 'מדיניות, אכיפה ופיצ׳רים חדשים',
    body: 'מטא משנה כללים ומוציאה פיצ׳רים חדשים בלי להודיע כמו שצריך. אני עוקב אחרי מה שקורה בממשקי המפרסמים, במדיניות ובעדכוני המוצר, ומתרגם למה שבאמת רלוונטי למי שמנהל דף, קמפיין או עמוד עסקי מישראל.',
  },
  {
    n: '02',
    title: 'התיק של החודש',
    short: 'מקרה אמיתי: מה קרה, מה עשינו, כמה זמן',
    body: 'מקרה אחד מהשבועות האחרונים. איזה חשבון נחסם, מה הייתה הסיבה האמיתית (כמעט תמיד לא זו שכתובה בהודעה של מטא), מה עשינו, וכמה ימים זה לקח. שמות מוסתרים, הפרטים לא.',
  },
  {
    n: '03',
    title: 'בדיקה אחת',
    short: 'פעולה שלוקחת פחות מעשר דקות',
    body: 'משהו קטן שאפשר לעשות באותו יום ומוריד סיכון בפועל. הרשאה שנשארה פתוחה, אימות דו-שלבי שמעולם לא הופעל, מנהל שיצא מהחברה לפני שנתיים ועדיין רשום בנכס.',
  },
];

export const FAQS = [
  {
    q: 'כמה מיילים אני עומד לקבל?',
    a: 'אחד בחודש, בתחילת החודש. אם יוצא משהו דחוף באמת, כמו גל חסימות פעיל, ישלח מייל נוסף. זה קרה פעמיים בשנה האחרונה.',
  },
  {
    q: 'זה עולה כסף?',
    a: 'לא. הגיליון חינם. לפעמים יש בסוף הפניה לקורס או לשירות שלנו, אבל רוב הגיליון הוא מידע שאפשר ליישם בלי לשלם על כלום.',
  },
  {
    q: 'מה קורה עם כתובת המייל שלי?',
    a: 'היא נשמרת אצל ספק הדיוור שלנו ומשמשת רק לשליחת הגיליון. לא נמכרת, לא מושכרת ולא מועברת לצד שלישי.',
  },
  {
    q: 'אפשר להסיר את עצמי?',
    a: 'כן, בקישור בתחתית כל מייל. קליק אחד, בלי טפסים ובלי לשאול למה.',
  },
  {
    q: 'החשבון שלי חסום ממש עכשיו. הגיליון יעזור?',
    a: 'לא בזמן אמת. הגיליון בנוי למניעה. אם אתה באמצע חסימה, כתוב לנו בוואטסאפ ונגיד לך אם יש מה לעשות.',
  },
];

/* ============================================================
   PAGE
   ============================================================ */
export default function Newsletter() {
  return (
    <div className="tss">
      {/* ── Minimal header. No site nav: this page has one job ── */}
      <header className="tss-top">
        <Link to="/" className="tss-top-logo">
          <img src="/images/israeltechforce-logo-white.png" alt="IsraelTechForce" width="150" height="34" />
        </Link>
        <a className="tss-top-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          חשבון חסום עכשיו?
        </a>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="tss-hero">
        <div className="tss-hero-grid">
          <div className="tss-hero-copy">
            <p className="tss-eyebrow">
              <span className="tss-pulse" aria-hidden="true" />
              <span dir="ltr">THE SAFETY SIGNAL</span>
              <span className="tss-eyebrow-sep" aria-hidden="true">/</span>
              ניוזלטר חודשי
            </p>

            <h1 className="tss-h1">
              מה שקורה אצל מטא מגיע אליך בסוף.
              <em> עדיף שתדע חודש מראש.</em>
            </h1>

            <p className="tss-lead">
              אחת לחודש אני שולח גיליון קצר: מה מטא שינתה במדיניות, אילו פיצ׳רים חדשים יצאו
              לפייסבוק ולאינסטגרם, ומה כדאי לבדוק בחשבון שלך כדי להישאר בצד הבטוח. חמש דקות קריאה.
              אם באותו חודש אין הרבה לדווח, הגיליון פשוט קצר יותר.
            </p>

            <SignupForm location="hero" tone="dark" />

            <ul className="tss-micro">
              <li>גיליון אחד בחודש</li>
              <li>הסרה בקליק אחד</li>
              <li>הכתובת שלך לא נמכרת לאף אחד</li>
            </ul>
          </div>

          {/* Issue preview: structure of an issue, not a past issue */}
          <aside className="tss-card" aria-label="מבנה הגיליון">
            <div className="tss-card-top">
              <span className="tss-card-mark" dir="ltr">THE SAFETY SIGNAL</span>
              <span className="tss-card-meta">גיליון חודשי</span>
            </div>
            <ol className="tss-card-rows">
              {SEGMENTS.map((s) => (
                <li key={s.n}>
                  <span className="tss-card-n" dir="ltr">{s.n}</span>
                  <span className="tss-card-body">
                    <strong>{s.title}</strong>
                    <span>{s.short}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="tss-card-foot">זמן קריאה משוער: 5 דקות</p>
          </aside>
        </div>
      </section>

      {/* ── WHAT'S IN AN ISSUE ──────────────────────────────── */}
      <section className="tss-section tss-inside">
        <h2 className="tss-h2">מה נכנס לגיליון</h2>
        <div className="tss-rows">
          {SEGMENTS.map((s) => (
            <article className="tss-row" key={s.n}>
              <span className="tss-row-n" dir="ltr">{s.n}</span>
              <div className="tss-row-text">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── FIT / NOT FIT ───────────────────────────────────── */}
      <section className="tss-section tss-fit">
        <h2 className="tss-h2">למי הגיליון הזה נכתב</h2>
        <div className="tss-fit-grid">
          <div className="tss-fit-col">
            <h3 className="tss-fit-title tss-fit-title--yes">מתאים לך אם</h3>
            <ul>
              <li><IconCheck size={17} />אתה מנהל חשבונות מודעות של לקוחות ואחראי עליהם</li>
              <li><IconCheck size={17} />כל הלידים של העסק שלך מגיעים מפייסבוק או מאינסטגרם</li>
              <li><IconCheck size={17} />כבר חטפת חסימה פעם אחת ואתה לא רוצה עוד אחת</li>
              <li><IconCheck size={17} />יש לך גישה לנכסים של אנשים אחרים ואתה רוצה לישון בשקט</li>
            </ul>
          </div>
          <div className="tss-fit-col">
            <h3 className="tss-fit-title tss-fit-title--no">פחות מתאים לך אם</h3>
            <ul>
              <li><IconX size={17} />אתה מחפש דרכים לעקוף את מטא. אני לא כותב על זה.</li>
              <li><IconX size={17} />אתה רוצה מייל כל בוקר. זה מגיע פעם בחודש.</li>
              <li><IconX size={17} />אתה לא נוגע בפרסום ממומן ואין לך נכסים לנהל</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── AUTHORITY ───────────────────────────────────────── */}
      <section className="tss-section tss-author">
        <div className="tss-author-grid">
          <img
            className="tss-author-photo"
            src="/images/osher-bms.webp"
            alt="אושר רווח, מומחה אבטחת רשתות חברתיות"
            loading="lazy"
            width="420"
            height="520"
          />
          <div className="tss-author-text">
            <h2 className="tss-h2">מי כותב את זה</h2>
            <p>
              אני אושר רווח. טיפלתי ביותר מ־2,500 חשבונות פייסבוק, אינסטגרם וואטסאפ שנחסמו, נפרצו
              או הושבתו, וחלק גדול מהם היה אפשר למנוע בחמש דקות עבודה חודשים קודם.
            </p>
            <p>
              כשגל החסימות של יולי 2026 פגע בישראל, <a href={PRESS_MAKO} target="_blank" rel="noopener noreferrer">N12</a>{' '}
              ו־<a href={PRESS_ICE} target="_blank" rel="noopener noreferrer">ice</a> פנו אליי לניתוח מה קורה.
              הגיליון הזה הוא מה שאני רואה מהצד השני של החסימה, לפני שזה מגיע אליך כמשבר בזמן אמת.
            </p>
            <p className="tss-author-links">
              <Link to="/press">כל הכתבות</Link>
              <span aria-hidden="true">·</span>
              <Link to="/testimonials">מה לקוחות אומרים</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="tss-section tss-faq">
        <h2 className="tss-h2">לפני שאתה משאיר מייל</h2>
        <div className="tss-faq-list">
          {FAQS.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CLOSING CTA ─────────────────────────────────────── */}
      <section className="tss-close">
        <div className="tss-close-inner">
          <h2 className="tss-close-h">הגיליון הבא יוצא בתחילת החודש</h2>
          <p className="tss-close-sub">
            תשאיר שם וכתובת ותקבל אותו כשהוא יוצא. אם הוא לא שווה את חמש הדקות, ההסרה בתחתית המייל.
          </p>
          <SignupForm location="closing" tone="signal" />
        </div>
      </section>

      <footer className="tss-foot">
        <Link to="/">IsraelTechForce</Link>
        <Link to="/privacy">מדיניות פרטיות</Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">וואטסאפ</a>
      </footer>
    </div>
  );
}
