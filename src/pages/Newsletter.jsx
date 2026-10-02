import { useState } from 'react';
import { Link } from 'react-router';
import { subscribeToNewsletter, validateEmail } from '../utils/smoove';
import { Eyebrow, ArrowIcon } from '../components/ui';
import Icon from '../components/Icon';
import '../components/FAQ.css';
import './Newsletter.css';
import { FAQS } from '../data/newsletterFaqs';

/* ============================================================
   THE SAFETY SIGNAL. Monthly newsletter subscribe page.
   Built on the Signal system (src/styles/system.css): paper hero,
   one unified signup group, the real issue shown as a letter.
   No site nav on purpose: this page has one job. WhatsApp is a
   support channel here, not the subject. All rules scoped to .nls.
   ============================================================ */

const WHATSAPP_URL = 'https://wa.me/972509823235';
const PRESS_MAKO = 'https://www.mako.co.il/nexter-news/Article-4c6901cb708af91026.htm';
const PRESS_ICE = 'https://www.ice.co.il/digital-140/news/article/1122936';

const IconX = () => (
  <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true" focusable="false">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

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

/* ─── Copy ────────────────────────────────────────────────── */
// Real excerpt from the August 2026 issue (Osher supplied the PDF) — swap
// whenever a newer issue should headline the teaser instead.
const SAMPLE_ITEMS_HE = [
  {
    n: '01',
    title: 'בקרת הורים בוואטסאפ נכנסה לישראל',
    body: 'הפיצ׳ר מיועד לילדים עד גיל 13: אישור קשר חדשים, בלי שהילד יכול להיכנס לערוצים, לשתף מיקום, או להיחשף לסטטוסים של זרים. לחיצה אחת על הכפתור, ואין דרך חזרה.',
  },
  {
    n: '02',
    title: 'שלושה שינויים באבטחה בוואטסאפ',
    body: 'קוד הפין הקבוע באימות דו-שלבי הופך לאופציונלי לטובת סיסמה, מספר לא מוכר עכשיו מראה את המדינה שממנה הוא מתקשר, ואימות דו-שלבי זמין גם באנדרואיד וגם באייפון.',
  },
];
const SEGMENTS_HE = [
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

const t = {
  segments: SEGMENTS_HE,
  faqs: FAQS,
  topLink: 'חשבון חסום עכשיו?',
  eyebrowSuffix: 'ניוזלטר חודשי',
  h1a: 'מה מטא משנה בפועל,',
  h1b: 'ומה כדאי ',
  h1mark: 'לבדוק אצלך',
  h1c: ' בעקבות זה.',
  lead:
    'אחת לחודש אני שולח גיליון קצר: מה מטא שינתה במדיניות, אילו פיצ׳רים חדשים יצאו לפייסבוק ולאינסטגרם, ומה כדאי לבדוק בחשבון שלך כדי להישאר בצד הבטוח. חמש דקות קריאה. אם באותו חודש אין הרבה לדווח, הגיליון פשוט קצר יותר.',
  micro: ['גיליון אחד בחודש', 'הסרה בקליק אחד', 'הכתובת שלך לא נמכרת לאף אחד'],
  cardAria: 'מבנה הגיליון',
  cardMeta: 'גיליון חודשי',
  cardFoot: 'זמן קריאה משוער: 5 דקות',
  insideTitle: 'מה נכנס לגיליון',
  sampleEyebrow: 'גיליון אמיתי · אוגוסט 2026',
  sampleTitle: 'טעימה מהגיליון האחרון',
  sampleItems: SAMPLE_ITEMS_HE,
  sampleQuoteLabel: 'ההמלצה של אושר מהגיליון',
  sampleQuote: 'לחיצה על כפתור בקרת ההורים זו החלטה לשנים. אם הילד בן 10, ההחלטה הזו תהיה תקפה עד גיל 13. תחשבו טוב לפני שאתם מפעילים את זה.',
  fitTitle: 'למי הגיליון הזה נכתב',
  fitYesTitle: 'מתאים לך אם',
  fitYes: [
    'אתה מנהל חשבונות מודעות של לקוחות ואחראי עליהם',
    'כל הלידים של העסק שלך מגיעים מפייסבוק או מאינסטגרם',
    'כבר חטפת חסימה פעם אחת ואתה לא רוצה עוד אחת',
    'יש לך גישה לנכסים של אנשים אחרים ואתה רוצה לישון בשקט',
  ],
  fitNoTitle: 'פחות מתאים לך אם',
  fitNo: [
    'אתה מחפש דרכים לעקוף את מטא. אני לא כותב על זה.',
    'אתה רוצה מייל כל בוקר. זה מגיע פעם בחודש.',
    'אתה לא נוגע בפרסום ממומן ואין לך נכסים לנהל',
  ],
  authorPhotoAlt: 'אושר רווח, מומחה אבטחת רשתות חברתיות',
  authorTitle: 'מי כותב את זה',
  authorP1:
    'אני אושר רווח. טיפלתי ביותר מ־2,500 חשבונות פייסבוק, אינסטגרם וואטסאפ שנחסמו, נפרצו או הושבתו, וחלק גדול מהם היה אפשר למנוע בחמש דקות עבודה חודשים קודם.',
  authorP2a: 'כשגל החסימות של יולי 2026 פגע בישראל, ',
  authorP2b: ' ו־',
  authorP2c: ' פנו אליי לניתוח מה קורה. הגיליון הזה הוא מה שאני רואה מהצד השני של החסימה, לפני שזה מגיע אליך כמשבר בזמן אמת.',
  authorLinkPress: 'כל הכתבות',
  authorLinkTestimonials: 'מה לקוחות אומרים',
  faqTitle: 'לפני שאתה משאיר מייל',
  closeTitleA: 'הגיליון הבא יוצא ',
  closeTitleMark: 'בתחילת החודש',
  closeSub: 'תשאיר שם וכתובת ותקבל אותו כשהוא יוצא. אם הוא לא שווה את חמש הדקות, ההסרה בתחתית המייל.',
  footPrivacy: 'מדיניות פרטיות',
  footWhatsapp: 'וואטסאפ',
  formNameError: 'צריך שם פרטי כדי לפנות אליך בשם',
  formEmailError: 'כתובת המייל לא נראית תקינה',
  formDoneTitle: 'נרשמת. הגיליון הבא יגיע אליך בתחילת החודש.',
  formDoneNote:
    'אם המייל לא מופיע בתיבה הראשית, תבדוק בלשונית קידומים או בספאם ותסמן אותו כ"לא ספאם". ככה הגיליונות הבאים יגיעו למקום הנכון.',
  formNameLabel: 'שם פרטי',
  formNamePlaceholder: 'אושר',
  formEmailLabel: 'כתובת מייל',
  formEmailPlaceholder: 'you@company.co.il',
  formBusy: 'רגע…',
  formSubmit: 'שלחו לי את הגיליון הבא',
  // Section labels (UI orientation only)
  labelSample: 'מתוך הגיליון',
  labelFit: 'התאמה',
  labelAuthor: 'הכותב',
  labelFaq: 'שאלות נפוצות',
  labelClose: 'הרשמה',
};

/* ============================================================
   SIGNUP FORM. Two fields and the submit read as one component.
   Rendered twice (hero + closing).
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
      setError(t.formNameError);
      return;
    }
    if (!validateEmail(email)) {
      setError(t.formEmailError);
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
      <div className="nls__form nls__done" role="status">
        <span className="nls__done-icon" aria-hidden="true"><Icon name="check" /></span>
        <p className="nls__done-title">{t.formDoneTitle}</p>
        <p className="nls__done-note">{t.formDoneNote}</p>
      </div>
    );
  }

  const errorId = `nls-error-${location}`;

  return (
    <form className="nls__form" onSubmit={handleSubmit} noValidate data-clarity-mask="true">
      {/* honeypot: hidden from humans, bots fill it */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        className="nls__honeypot"
      />

      <div className={`nls__group${error ? ' has-error' : ''}`}>
        <div className="nls__fields">
          <label className="nls__cell">
            <span className="nls__cell-label">{t.formNameLabel}</span>
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => { setFirstName(e.target.value); setError(''); }}
              placeholder={t.formNamePlaceholder}
              autoComplete="given-name"
              disabled={busy}
              required
              aria-describedby={error ? errorId : undefined}
            />
          </label>

          <label className="nls__cell">
            <span className="nls__cell-label">{t.formEmailLabel}</span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              placeholder={t.formEmailPlaceholder}
              autoComplete="email"
              inputMode="email"
              dir="ltr"
              disabled={busy}
              required
              aria-describedby={error ? errorId : undefined}
            />
          </label>
        </div>

        <button type="submit" className={`btn btn--signal btn--block nls__submit${busy ? ' btn--plain' : ''}`} disabled={busy}>
          <span>{busy ? t.formBusy : t.formSubmit}</span>
          {!busy && (
            <span className="btn__arrow" aria-hidden="true">
              <ArrowIcon />
            </span>
          )}
        </button>
      </div>

      {error && <p className="nls__error" id={errorId} role="alert">{error}</p>}
    </form>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Newsletter() {
  return (
    <div className="nls" dir="rtl">
      {/* ── Minimal header. No site nav: this page has one job ── */}
      <header className="nls__top">
        <div className="container nls__top-bar">
          <Link to="/" className="nls__logo" aria-label="IsraelTechForce">
            <img src="/images/brand/logo-white-320.webp" alt="" width="320" height="236" />
          </Link>
          <a className="link small nls__top-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            {t.topLink}
          </a>
        </div>
      </header>

      <main id="main">
        {/* ── HERO ────────────────────────────────────────────── */}
        <section className="nls__hero theme-ink bg-grid">
          <div className="container nls__hero-grid">
            <div className="nls__hero-copy">
              <p className="nls__kicker">
                ( <span dir="ltr">THE SAFETY SIGNAL</span> · {t.eyebrowSuffix} )
              </p>

              <h1 className="nls__title h1">
                <span className="lt">{t.h1a}</span>{' '}
                {t.h1b}<span className="mk">{t.h1mark}</span>{t.h1c}
              </h1>

              <p className="nls__lead lead">{t.lead}</p>

              <div className="nls__hero-form">
                <SignupForm location="hero" />
                <ul className="nls__micro">
                  {t.micro.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What you get: the structure of an issue, as numbered rows */}
            <aside className="nls__brief" aria-label={t.cardAria}>
              <div className="nls__brief-top">
                <span className="nls__mark" dir="ltr">THE SAFETY SIGNAL</span>
                <span className="tag">{t.cardMeta}</span>
              </div>
              <ol className="nls__brief-rows">
                {t.segments.map((s) => (
                  <li key={s.n}>
                    <span className="nls__n num" dir="ltr">{s.n}</span>
                    <span className="nls__brief-text">
                      <strong>{s.title}</strong>
                      <span>{s.short}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="nls__brief-foot small">{t.cardFoot}</p>
            </aside>
          </div>
        </section>

        {/* ── WHAT'S IN AN ISSUE ──────────────────────────────── */}
        <section className="nls__inside section theme-mist">
          <div className="container nls__split">
            <header className="nls__split-head m-reveal">
              <Eyebrow num="01">{t.cardAria}</Eyebrow>
              <h2 className="h1">{t.insideTitle}</h2>
            </header>
            <div className="rows nls__rows m-stagger">
              {t.segments.map((s) => (
                <article className="row nls__row" key={s.n}>
                  <span className="nls__n nls__n--lg num" dir="ltr">{s.n}</span>
                  <div className="nls__row-text">
                    <h3 className="h3">{s.title}</h3>
                    <p className="muted">{s.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── REAL SAMPLE FROM A PAST ISSUE ───────────────────── */}
        <section className="nls__sample section">
          <div className="container nls__split nls__split--letter">
            <header className="nls__split-head m-reveal">
              <Eyebrow num="02">{t.labelSample}</Eyebrow>
              <h2 className="h1">{t.sampleTitle}</h2>
            </header>

            <article className="card nls__letter m-reveal">
              <span className="sticker m-in nls__letter-sticker">{t.sampleEyebrow}</span>
              <p className="nls__letter-head">
                <span className="nls__mark" dir="ltr">THE SAFETY SIGNAL</span>
              </p>
              <div className="nls__letter-items">
                {t.sampleItems.map((s) => (
                  <section className="nls__letter-item" key={s.n}>
                    <span className="nls__n num" dir="ltr">{s.n}</span>
                    <div>
                      <h3 className="h3">{s.title}</h3>
                      <p className="muted">{s.body}</p>
                    </div>
                  </section>
                ))}
              </div>
              <blockquote className="nls__quote">
                <p className="serif">{t.sampleQuote}</p>
                <cite>{t.sampleQuoteLabel}</cite>
              </blockquote>
            </article>
          </div>
        </section>

        {/* ── FIT / NOT FIT ───────────────────────────────────── */}
        <section className="nls__fit section theme-mist">
          <div className="container">
            <header className="sec-head m-reveal">
              <Eyebrow num="03">{t.labelFit}</Eyebrow>
              <h2 className="h1">{t.fitTitle}</h2>
            </header>
            <div className="nls__fit-grid">
              <div className="card nls__fit-card m-reveal">
                <h3 className="h3">{t.fitYesTitle}</h3>
                <ul>
                  {t.fitYes.map((item) => (
                    <li key={item}>
                      <span className="nls__fit-icon nls__fit-icon--yes" aria-hidden="true"><Icon name="check" /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card theme-ink nls__fit-card nls__fit-card--no m-reveal">
                <h3 className="h3">{t.fitNoTitle}</h3>
                <ul>
                  {t.fitNo.map((item) => (
                    <li key={item}>
                      <span className="nls__fit-icon" aria-hidden="true"><IconX /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── AUTHORITY ───────────────────────────────────────── */}
        <section className="nls__author section">
          <div className="container nls__author-grid">
            <figure className="nls__author-photo m-reveal">
              <img
                src="/images/brand/osher-portrait-800.webp"
                srcSet="/images/brand/osher-portrait-400.webp 400w, /images/brand/osher-portrait-800.webp 800w"
                sizes="(min-width: 960px) 360px, 70vw"
                alt={t.authorPhotoAlt}
                loading="lazy"
                decoding="async"
                width="800"
                height="800"
              />
            </figure>
            <div className="nls__author-text m-reveal">
              <Eyebrow num="04">{t.labelAuthor}</Eyebrow>
              <h2 className="h1">{t.authorTitle}</h2>
              <p className="lead">{t.authorP1}</p>
              <p className="muted">
                {t.authorP2a}<a className="link" href={PRESS_MAKO} target="_blank" rel="noopener noreferrer">N12</a>
                {t.authorP2b}<a className="link" href={PRESS_ICE} target="_blank" rel="noopener noreferrer">ice</a>
                {t.authorP2c}
              </p>
              <p className="nls__author-links">
                <Link className="link link--arrow" to="/press">{t.authorLinkPress}<ArrowIcon /></Link>
                <Link className="link link--arrow" to="/testimonials">{t.authorLinkTestimonials}<ArrowIcon /></Link>
              </p>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────── */}
        <section className="nls__faq section theme-mist">
          <div className="container nls__split">
            <header className="nls__split-head m-reveal">
              <Eyebrow num="05">{t.labelFaq}</Eyebrow>
              <h2 className="h1">{t.faqTitle}</h2>
            </header>
            <div className="faq-list">
              {t.faqs.map((f, i) => (
                <details key={f.q} className="faq-item" name="newsletter-faq">
                  <summary>
                    <span className="faq-item__num num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="faq-item__q">{f.q}</span>
                    <span className="faq-item__icon" aria-hidden="true" />
                  </summary>
                  <p className="faq-item__a">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ─────────────────────────────────────── */}
        <section className="nls__close section theme-ink bg-grid bg-grid--full">
          <div className="container nls__close-grid">
            <div className="m-reveal">
              <Eyebrow num="06">{t.labelClose}</Eyebrow>
              <h2 className="h1">
                <span className="lt">{t.closeTitleA}</span>
                <span className="mk m-in">{t.closeTitleMark}</span>
              </h2>
              <p className="lead">{t.closeSub}</p>
            </div>
            <div className="nls__close-form m-reveal">
              <SignupForm location="closing" />
            </div>
          </div>
        </section>
      </main>

      <footer className="nls__foot theme-ink">
        <div className="container nls__foot-bar small">
          <Link to="/">IsraelTechForce</Link>
          <Link to="/privacy">{t.footPrivacy}</Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t.footWhatsapp}</a>
        </div>
      </footer>
    </div>
  );
}
