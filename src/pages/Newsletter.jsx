import { useState } from 'react';
import { Link, useLocation } from 'react-router';
import '@fontsource/heebo/800.css';
import '@fontsource/heebo/900.css';
import { subscribeToNewsletter, validateEmail } from '../utils/smoove';
import { useLang, togglePath } from '../i18n';
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
const IconArrowRtl = (p) => (<Icon {...p}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Icon>);
const IconArrowLtr = (p) => (<Icon {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></Icon>);

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

const SEGMENTS_EN = [
  {
    n: '01',
    title: 'Meta Update',
    short: 'Policy, enforcement, and new features',
    body: "Meta changes the rules and ships new features without properly announcing them. I follow what happens in the advertiser interfaces, in policy, and in product updates, and translate it into what actually matters to anyone running a page, a campaign, or a business profile from Israel.",
  },
  {
    n: '02',
    title: 'Case of the Month',
    short: 'A real case: what happened, what we did, how long it took',
    body: "One case from the past few weeks. Which account got blocked, what the real reason was (almost never the one written in Meta's notice), what we did, and how many days it took. Names hidden, details not.",
  },
  {
    n: '03',
    title: 'One Check',
    short: 'An action that takes less than ten minutes',
    body: 'Something small you can do the same day that genuinely lowers risk. A permission left open, two-factor authentication that was never enabled, an admin who left the company two years ago and is still listed on the asset.',
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

export const FAQS_EN = [
  {
    q: 'How many emails am I going to get?',
    a: "One a month, at the start of the month. If something truly urgent comes up, like an active ban wave, an extra email goes out. That happened twice in the past year.",
  },
  {
    q: 'Does it cost money?',
    a: "No. The issue is free. Sometimes there's a pointer at the end to our course or service, but most of the issue is information you can apply without paying for anything.",
  },
  {
    q: 'What happens with my email address?',
    a: 'It is stored with our email provider and used only to send the issue. It is not sold, not rented, and not passed to any third party.',
  },
  {
    q: 'Can I unsubscribe?',
    a: 'Yes, via the link at the bottom of every email. One click, no forms, and no asking why.',
  },
  {
    q: 'My account is blocked right now. Will the issue help?',
    a: "Not in real time. The issue is built for prevention. If you're in the middle of a block, write to us on WhatsApp and we'll tell you if there's something to do.",
  },
];

const STR = {
  he: {
    segments: SEGMENTS_HE,
    faqs: FAQS,
    topLink: 'חשבון חסום עכשיו?',
    eyebrowSuffix: 'ניוזלטר חודשי',
    h1a: 'מה שקורה אצל מטא מגיע אליך בסוף.',
    h1b: ' עדיף שתדע חודש מראש.',
    lead:
      'אחת לחודש אני שולח גיליון קצר: מה מטא שינתה במדיניות, אילו פיצ׳רים חדשים יצאו לפייסבוק ולאינסטגרם, ומה כדאי לבדוק בחשבון שלך כדי להישאר בצד הבטוח. חמש דקות קריאה. אם באותו חודש אין הרבה לדווח, הגיליון פשוט קצר יותר.',
    micro: ['גיליון אחד בחודש', 'הסרה בקליק אחד', 'הכתובת שלך לא נמכרת לאף אחד'],
    cardAria: 'מבנה הגיליון',
    cardMeta: 'גיליון חודשי',
    cardFoot: 'זמן קריאה משוער: 5 דקות',
    insideTitle: 'מה נכנס לגיליון',
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
    closeTitle: 'הגיליון הבא יוצא בתחילת החודש',
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
  },
  en: {
    segments: SEGMENTS_EN,
    faqs: FAQS_EN,
    topLink: 'Account blocked right now?',
    eyebrowSuffix: 'Monthly newsletter',
    h1a: "What happens at Meta eventually reaches you.",
    h1b: ' Better to know a month ahead.',
    lead:
      "Once a month I send a short issue: what Meta changed in policy, which new features shipped for Facebook and Instagram, and what's worth checking in your account to stay on the safe side. Five minutes of reading. If there isn't much to report that month, the issue is simply shorter.",
    micro: ['One issue a month', 'One-click unsubscribe', 'Your address is never sold to anyone'],
    cardAria: 'Issue structure',
    cardMeta: 'Monthly issue',
    cardFoot: 'Estimated reading time: 5 minutes',
    insideTitle: "What Goes Into an Issue",
    fitTitle: 'Who This Newsletter Is Written For',
    fitYesTitle: "It's for you if",
    fitYes: [
      "You manage clients' ad accounts and are responsible for them",
      'All of your business leads come from Facebook or Instagram',
      "You've already been hit by a ban once and don't want another",
      "You have access to other people's assets and want to sleep well at night",
    ],
    fitNoTitle: "It's less for you if",
    fitNo: [
      "You're looking for ways to bypass Meta. I don't write about that.",
      'You want an email every morning. This arrives once a month.',
      "You don't touch paid advertising and have no assets to manage",
    ],
    authorPhotoAlt: 'Osher Revach, social media security expert',
    authorTitle: 'Who Writes This',
    authorP1:
      "I'm Osher Revach. I've handled more than 2,500 Facebook, Instagram, and WhatsApp accounts that were blocked, hacked, or disabled — and a large share of them could have been prevented with five minutes of work months earlier.",
    authorP2a: 'When the ban wave of July 2026 hit Israel, ',
    authorP2b: ' and ',
    authorP2c: " reached out to me to analyze what was happening. This newsletter is what I see from the other side of the ban, before it reaches you as a real-time crisis.",
    authorLinkPress: 'All the articles',
    authorLinkTestimonials: 'What customers say',
    faqTitle: 'Before You Leave Your Email',
    closeTitle: 'The next issue goes out at the start of the month',
    closeSub:
      "Leave a name and an address and you'll get it when it comes out. If it isn't worth the five minutes, the unsubscribe link is at the bottom of the email.",
    footPrivacy: 'Privacy Policy',
    footWhatsapp: 'WhatsApp',
    formNameError: 'We need a first name so we can address you by name',
    formEmailError: "That email address doesn't look valid",
    formDoneTitle: "You're in. The next issue will reach you at the start of the month.",
    formDoneNote:
      'If the email doesn\'t show up in your primary inbox, check the Promotions tab or spam and mark it as "not spam". That way the next issues land in the right place.',
    formNameLabel: 'First name',
    formNamePlaceholder: 'Osher',
    formEmailLabel: 'Email address',
    formEmailPlaceholder: 'you@company.com',
    formBusy: 'One moment…',
    formSubmit: 'Send me the next issue',
  },
};

/* ============================================================
   SIGNUP FORM. Two fields only. Rendered twice (hero + closing).
   ============================================================ */
function SignupForm({ location, t, isEn }) {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot, must stay empty
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const IconArrow = isEn ? IconArrowLtr : IconArrowRtl;

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

    const result = await subscribeToNewsletter(firstName, '', email, website, lang);

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
        <p className="tss-done-title">{t.formDoneTitle}</p>
        <p className="tss-done-note">{t.formDoneNote}</p>
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
          <span className="tss-field-label">{t.formNameLabel}</span>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => { setFirstName(e.target.value); setError(''); }}
            placeholder={t.formNamePlaceholder}
            autoComplete="given-name"
            disabled={busy}
            required
          />
        </label>

        <label className="tss-field">
          <span className="tss-field-label">{t.formEmailLabel}</span>
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
          />
        </label>
      </div>

      <button type="submit" className="tss-submit" disabled={busy}>
        {busy ? t.formBusy : t.formSubmit}
        {!busy && <IconArrow size={18} />}
      </button>

      {error && <p className="tss-error" role="alert">{error}</p>}
    </form>
  );
}

/* ============================================================
   PAGE
   ============================================================ */
export default function Newsletter() {
  const { lang, isEn, dir, prefix } = useLang();
  const { pathname } = useLocation();
  const t = STR[lang];

  return (
    <div className="tss" dir={dir}>
      {/* ── Minimal header. No site nav: this page has one job ── */}
      <header className="tss-top">
        <Link to={prefix || '/'} className="tss-top-logo">
          <img src="/images/israeltechforce-logo-white.png" alt="IsraelTechForce" width="150" height="34" />
        </Link>
        <a className="tss-top-link" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          {t.topLink}
        </a>
        <Link className="tss-top-link tss-lang-toggle" to={togglePath(pathname)}>
          {isEn ? 'עברית' : 'English'}
        </Link>
      </header>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="tss-hero">
        <div className="tss-hero-grid">
          <div className="tss-hero-copy">
            <p className="tss-eyebrow">
              <span className="tss-pulse" aria-hidden="true" />
              <span dir="ltr">THE SAFETY SIGNAL</span>
              <span className="tss-eyebrow-sep" aria-hidden="true">/</span>
              {t.eyebrowSuffix}
            </p>

            <h1 className="tss-h1">
              {t.h1a}
              <em>{t.h1b}</em>
            </h1>

            <p className="tss-lead">{t.lead}</p>

            <SignupForm location="hero" t={t} isEn={isEn} />

            <ul className="tss-micro">
              {t.micro.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
          </div>

          {/* Issue preview: structure of an issue, not a past issue */}
          <aside className="tss-card" aria-label={t.cardAria}>
            <div className="tss-card-top">
              <span className="tss-card-mark" dir="ltr">THE SAFETY SIGNAL</span>
              <span className="tss-card-meta">{t.cardMeta}</span>
            </div>
            <ol className="tss-card-rows">
              {t.segments.map((s) => (
                <li key={s.n}>
                  <span className="tss-card-n" dir="ltr">{s.n}</span>
                  <span className="tss-card-body">
                    <strong>{s.title}</strong>
                    <span>{s.short}</span>
                  </span>
                </li>
              ))}
            </ol>
            <p className="tss-card-foot">{t.cardFoot}</p>
          </aside>
        </div>
      </section>

      {/* ── WHAT'S IN AN ISSUE ──────────────────────────────── */}
      <section className="tss-section tss-inside">
        <h2 className="tss-h2">{t.insideTitle}</h2>
        <div className="tss-rows">
          {t.segments.map((s) => (
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
        <h2 className="tss-h2">{t.fitTitle}</h2>
        <div className="tss-fit-grid">
          <div className="tss-fit-col">
            <h3 className="tss-fit-title tss-fit-title--yes">{t.fitYesTitle}</h3>
            <ul>
              {t.fitYes.map((item) => (
                <li key={item}><IconCheck size={17} />{item}</li>
              ))}
            </ul>
          </div>
          <div className="tss-fit-col">
            <h3 className="tss-fit-title tss-fit-title--no">{t.fitNoTitle}</h3>
            <ul>
              {t.fitNo.map((item) => (
                <li key={item}><IconX size={17} />{item}</li>
              ))}
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
            alt={t.authorPhotoAlt}
            loading="lazy"
            width="420"
            height="520"
          />
          <div className="tss-author-text">
            <h2 className="tss-h2">{t.authorTitle}</h2>
            <p>{t.authorP1}</p>
            <p>
              {t.authorP2a}<a href={PRESS_MAKO} target="_blank" rel="noopener noreferrer">N12</a>
              {t.authorP2b}<a href={PRESS_ICE} target="_blank" rel="noopener noreferrer">ice</a>
              {t.authorP2c}
            </p>
            <p className="tss-author-links">
              <Link to={`${prefix}/press`}>{t.authorLinkPress}</Link>
              <span aria-hidden="true">·</span>
              <Link to={`${prefix}/testimonials`}>{t.authorLinkTestimonials}</Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="tss-section tss-faq">
        <h2 className="tss-h2">{t.faqTitle}</h2>
        <div className="tss-faq-list">
          {t.faqs.map((f) => (
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
          <h2 className="tss-close-h">{t.closeTitle}</h2>
          <p className="tss-close-sub">{t.closeSub}</p>
          <SignupForm location="closing" t={t} isEn={isEn} />
        </div>
      </section>

      <footer className="tss-foot">
        <Link to={prefix || '/'}>IsraelTechForce</Link>
        <Link to={`${prefix}/privacy`}>{t.footPrivacy}</Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">{t.footWhatsapp}</a>
      </footer>
    </div>
  );
}
