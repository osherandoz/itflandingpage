import { useState } from 'react';
import { subscribeToNewsletter, validateEmail } from '../utils/smoove';
import { FACTS } from '../data/businessFacts';
import { ArrowIcon } from '../components/ui';
import Icon from '../components/Icon';
import './Newsletter.css';

/* ============================================================
   THE SAFETY SIGNAL: squeeze page (brief: Instagram-to-Email CRO).
   One action (subscribe), two fields (first name, email), everything the decision
   needs on the first mobile screen. No nav, no outbound links, no
   secondary sections. All rules scoped to .nls.
   ============================================================ */

// utm_* ride along on the tracking events so each Instagram placement
// (bio_link, stories_sticker, ...) can be compared.
function campaignParams() {
  if (typeof window === 'undefined') return {};
  const q = new URLSearchParams(window.location.search);
  const out = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']) {
    const v = q.get(k);
    if (v) out[k] = v.slice(0, 80);
  }
  return out;
}

function trackSubscribe() {
  if (typeof window === 'undefined') return;
  const utm = campaignParams();
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', { content_name: 'The Safety Signal', content_category: 'newsletter', ...utm });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'newsletter_subscribe', { form_location: 'squeeze', ...utm });
  }
}

const t = {
  kicker: 'THE SAFETY SIGNAL · ניוזלטר חודשי',
  h1a: 'בדיקה אחת בחודש',
  h1b: 'שמורידה את הסיכון שהחשבון העסקי שלך ',
  h1mark: 'ייחסם',
  sub:
    'גיליון אחד בחודש, חמש דקות קריאה: מה מטא שינתה, מקרה חסימה אמיתי ובדיקה של עשר דקות לביצוע באותו יום. בלי ספאם, והסרה בקליק אחד.',
  proof: 'נכתב על ידי אושר רווח, ששחזר',
  proofTail: 'חשבונות. מצוטט ב-N12 וב-ice.',
  nameLabel: 'שם פרטי',
  namePlaceholder: 'שם פרטי',
  nameError: 'איך לקרוא לך? צריך שם פרטי',
  emailLabel: 'כתובת מייל',
  emailPlaceholder: 'you@company.co.il',
  submit: 'שלחו לי את הגיליון הבא',
  busy: 'רגע…',
  emailError: 'כתובת המייל לא נראית תקינה',
  doneTitle: 'נרשמת. הגיליון הבא יגיע אליך בתחילת החודש.',
  doneNote:
    'אם המייל לא מופיע בתיבה הראשית, תבדוק בלשונית קידומים או בספאם ותסמן אותו כ"לא ספאם".',
};

function SignupForm() {
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
      setError(t.nameError);
      return;
    }
    if (!validateEmail(email)) {
      setError(t.emailError);
      return;
    }
    setBusy(true);
    setError('');
    const result = await subscribeToNewsletter(firstName, '', email, website);
    setBusy(false);
    if (result.success) {
      setDone(true);
      trackSubscribe();
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
      <div className="nls__done" role="status">
        <span className="nls__done-icon" aria-hidden="true"><Icon name="check" /></span>
        <p className="nls__done-title">{t.doneTitle}</p>
        <p className="nls__done-note">{t.doneNote}</p>
      </div>
    );
  }

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

      <label className="nls__field">
        <span className="sr-only">{t.nameLabel}</span>
        <input
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value); setError(''); }}
          placeholder={t.namePlaceholder}
          autoComplete="given-name"
          disabled={busy}
          required
          aria-invalid={!!error && !firstName.trim()}
          aria-describedby={error ? 'nls-error' : undefined}
        />
      </label>

      <label className="nls__field">
        <span className="sr-only">{t.emailLabel}</span>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(''); }}
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          inputMode="email"
          dir="ltr"
          disabled={busy}
          required
          aria-invalid={!!error}
          aria-describedby={error ? 'nls-error' : undefined}
        />
      </label>

      <button type="submit" className="btn btn--signal btn--block nls__submit" disabled={busy}>
        <span>{busy ? t.busy : t.submit}</span>
        {!busy && (
          <span className="btn__arrow" aria-hidden="true"><ArrowIcon /></span>
        )}
      </button>

      {error && <p className="nls__error" id="nls-error" role="alert">{error}</p>}
    </form>
  );
}

export default function Newsletter() {
  return (
    <div className="nls theme-ink bg-grid" dir="rtl">
      <main id="main" className="nls__main">
        <img className="nls__logo" src="/images/brand/logo-white-320.webp" alt="IsraelTechForce" width="320" height="236" />

        <p className="nls__kicker" dir="ltr">{t.kicker}</p>

        <h1 className="nls__title">
          <span className="lt">{t.h1a}</span>{' '}
          {t.h1b}<span className="mk">{t.h1mark}</span>
        </h1>

        <p className="nls__sub">{t.sub}</p>

        <SignupForm />

        <p className="nls__proof">
          <Icon name="check" />
          <span>{t.proof} <bdi>{FACTS.accountsRecovered.display}</bdi> {t.proofTail}</span>
        </p>
      </main>
    </div>
  );
}
