import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Icon from '../components/Icon';
import { Btn, WaBtn, ArrowIcon } from '../components/ui';
import { subscribeToNewsletter, validateEmail } from '../utils/smoove';
import { onWhatsAppClick } from '../utils/whatsapp';
import { CHECKS, FAQS, LEVELS, UPDATED, score, visibleChecks } from '../data/securityCheck.instagram';
import '../components/FAQ.css';
import '../components/ServicePage.css'; // breadcrumb (.svcp__crumbs)
import './SecurityCheck.css';

/* ============================================================
   "בדוק כמה החשבון שלך מוגן" (docs/security-check-brief.md).
   Everything is computed in the browser. The visitor's marks live in
   localStorage only and are never sent anywhere: analytics events below
   carry no segment, check id, result or score (brief section 8 wins over
   the parameters listed in section 10). All rules scoped to .sck.
   ============================================================ */

const STORE_KEY = 'itf-security-check-v1';

const SEGMENTS = [
  { id: 'personal', label: 'חשבון אישי או של העסק שלי' },
  { id: 'agency', label: 'חשבונות של לקוחות (מנהל/ת סושיאל, פרילנסר, סוכנות)' },
];

// ponytail: no secure-setup page exists yet, so that CTA opens WhatsApp. Swap `href` when it does.
const SETUP_MSG = 'היי, עשיתי את בדיקת האבטחה לאינסטגרם ואשמח להקמה מוגנת בזום';

const gaEvent = (name, params) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') window.gtag('event', name, params);
};

function readStore() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
    if (s && typeof s === 'object') return s;
  } catch { /* storage blocked: start fresh */ }
  return null;
}

/* ─── Optional email signup (same /api/subscribe as /newsletter) ─── */
function ReminderForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (busy) return;
    if (!firstName.trim()) return setError('צריך שם פרטי כדי לפנות אליך בשם');
    if (!validateEmail(email)) return setError('כתובת המייל לא נראית תקינה');
    setBusy(true);
    setError('');
    // Name + email only. The marks on this page are never part of the request.
    const r = await subscribeToNewsletter(firstName, '', email, website, 'security-check');
    setBusy(false);
    if (!r.success) return setError(r.message);
    setDone(true);
    gaEvent('check_email_submit');
    if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: 'security-check', content_category: 'newsletter' });
  };

  if (done) {
    return (
      <p className="sck__form-done" role="status">
        <Icon name="check" /> נרשמת. התזכורת תגיע בעוד שלושה חודשים, והגיליון החודשי בתחילת כל חודש.
      </p>
    );
  }

  return (
    <form className="sck__form" onSubmit={submit} noValidate data-clarity-mask="true">
      <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)}
        autoComplete="off" tabIndex={-1} aria-hidden="true" className="sck__honeypot" />
      <label className="sck__field">
        <span>שם פרטי</span>
        <input type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value); setError(''); }}
          autoComplete="given-name" disabled={busy} required />
      </label>
      <label className="sck__field">
        <span>כתובת מייל</span>
        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(''); }}
          autoComplete="email" inputMode="email" dir="ltr" disabled={busy} required />
      </label>
      <Btn variant="signal" type="submit" disabled={busy} arrow={!busy}>{busy ? 'רגע…' : 'שלחו לי תזכורת'}</Btn>
      {error && <p className="sck__form-error" role="alert">{error}</p>}
    </form>
  );
}

/* ─── One check card ─── */
function CheckCard({ check, n, mark, onMark, hidden }) {
  return (
    <li className={`sck-card card${mark ? ` is-${mark}` : ''}`} id={`check-${check.id}`} hidden={hidden} tabIndex={-1}>
      <div className="sck-card__head">
        <span className="sck-card__num num" aria-hidden="true">{String(n).padStart(2, '0')}</span>
        <h3 className="h3">{check.title}</h3>
      </div>
      <p className="sck-card__why muted">{check.why}</p>
      <details className="sck-card__how" open={n === 1 || undefined}>
        <summary>איך בודקים</summary>
        <ol className="sck-card__path">
          {check.steps.map((s) => <li key={s}>{s}</li>)}
        </ol>
      </details>
      {check.tip && <p className="sck-card__tip small"><b>טיפ:</b> {check.tip}</p>}
      <div className="sck-card__marks" role="group" aria-label={`תוצאה: ${check.title}`}>
        <button type="button" className="sck-mark sck-mark--ok" aria-pressed={mark === 'ok'} onClick={() => onMark(check.id, 'ok')}>
          <Icon name="check" /> בדקתי, הכל תקין
        </button>
        <button type="button" className="sck-mark sck-mark--fix" aria-pressed={mark === 'fix'} onClick={() => onMark(check.id, 'fix')}>
          <span aria-hidden="true">!</span> צריך לתקן
        </button>
      </div>
    </li>
  );
}

/* ─── Page ─── */
export default function SecurityCheck() {
  const [segment, setSegment] = useState('personal');
  const [marks, setMarks] = useState({});
  const started = useRef(false);
  const completed = useRef(false);

  // Visitors who came from another page already have Clarity recording: stop it here.
  useEffect(() => {
    window.clarity?.('stop');
    return () => window.clarity?.('start');
  }, []);

  // Restore after hydration so server and first client render match.
  useEffect(() => {
    const s = readStore();
    if (!s) return;
    if (s.segment === 'agency' || s.segment === 'personal') setSegment(s.segment);
    if (s.marks && typeof s.marks === 'object') setMarks(s.marks);
  }, []);

  const save = (seg, m) => {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ segment: seg, marks: m })); } catch { /* fine without it */ }
  };

  const pickSegment = (seg) => { setSegment(seg); save(seg, marks); };

  const onMark = (id, value) => {
    const next = { ...marks };
    if (next[id] === value) delete next[id]; else next[id] = value;
    setMarks(next);
    save(segment, next);
    if (!started.current) { started.current = true; gaEvent('check_start'); }
  };

  const res = score(segment, marks);
  useEffect(() => {
    if (res.marked === res.total && !completed.current) { completed.current = true; gaEvent('check_complete'); }
  }, [res.marked, res.total]);

  const goTo = (id) => {
    const el = document.getElementById(`check-${id}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    el.focus({ preventScroll: true });
    el.querySelector('details')?.setAttribute('open', '');
  };

  const level = LEVELS[res.level];
  const cta = segment === 'agency'
    ? { type: 'bms', to: '/VSL-BMS', text: 'נכסים של לקוחות? ככה מגנים עליהם. קורס BMS, מחיר השקה 99 ש"ח' }
    : res.level === 'high'
      ? { type: 'newsletter', to: '/newsletter', text: 'מצוין. הגיליון החודשי ישמור אותך מעודכן' }
      : { type: 'setup', wa: SETUP_MSG, text: 'רוצה שנעבור על זה יחד? הקמה מוגנת, שיחת זום אחת' };
  const ctaClick = () => gaEvent('check_cta_click', { type: cta.type });

  return (
    <div dir="rtl" className="sck">
      <Navbar />

      <main id="main">
        <section className="sck__hero theme-ink bg-grid">
          <div className="container container--narrow">
            <nav className="svcp__crumbs" aria-label="מסלול ניווט">
              <ol>
                <li><Link to="/">בית</Link></li>
                <li aria-current="page">בדיקת אבטחה לאינסטגרם</li>
              </ol>
            </nav>
            <p className="sck__updated small">עודכן לאחרונה: {UPDATED}</p>
            <h1 className="h1">בדוק כמה החשבון שלך <span className="mk">מוגן</span></h1>
            <p className="lead">5 דקות, ללא עלות. בלי הרשמה ובלי סיסמאות.</p>
            <p className="sck__trust">
              <Icon name="check" />
              <span>שום דבר ממה שתסמן בדף הזה לא נשלח אלינו ולא נשמר אצלנו. אנחנו לעולם לא נבקש ממך סיסמה או קוד אימות.</span>
            </p>

            <fieldset className="sck__segment">
              <legend className="h3">מה אתה בודק?</legend>
              {SEGMENTS.map((s) => (
                <label key={s.id} className="sck__seg-opt">
                  <input type="radio" name="sck-segment" value={s.id} checked={segment === s.id} onChange={() => pickSegment(s.id)} />
                  <span>{s.label}</span>
                </label>
              ))}
            </fieldset>
          </div>
        </section>

        <div className="sck__progress" role="status" aria-live="polite">
          <div className="container container--narrow sck__progress-bar">
            <span>סומנו <bdi>{res.marked}</bdi> מתוך <bdi>{res.total}</bdi></span>
            <span className="sck__meter" aria-hidden="true"><span style={{ width: `${(res.marked / res.total) * 100}%` }} /></span>
          </div>
        </div>

        <section className="section sck__checks" aria-label="הבדיקות">
          <div className="container container--narrow">
            <ol className="sck__list">
              {/* All nine render on the server (SEO); agency-only cards are hidden for personal readers */}
              {CHECKS.map((c) => (
                <CheckCard key={c.id} check={c} n={visibleChecks(segment).indexOf(c) + 1} mark={marks[c.id]}
                  onMark={onMark} hidden={c.agency && segment !== 'agency'} />
              ))}
            </ol>
          </div>
        </section>

        <section className="section theme-mist sck__result-sec" aria-labelledby="sck-result-title">
          <div className="container container--narrow">
            <article className={`sck-result card sck-result--${res.marked ? res.level : 'none'}`}>
              <h2 id="sck-result-title" className="h2">התוצאה שלך</h2>
              {res.marked === 0 ? (
                <p className="muted">סמן לפחות בדיקה אחת כדי לקבל ציון.</p>
              ) : (
                <>
                  <p className="sck-result__score"><bdi>{res.ok}</bdi> מתוך <bdi>{res.total}</bdi> תקינים</p>
                  <p className="sck-result__level"><span className="sck-result__dot" aria-hidden="true" /><b>{level.label}.</b> {level.text}</p>
                  {res.unchecked > 0 && <p className="small muted"><bdi>{res.unchecked}</bdi> בדיקות עוד לא נבדקו ונספרות כלא תקינות.</p>}
                  {res.urgent.length > 0 && (
                    <>
                      <h3 className="h3 sck-result__urgent-title">התיקונים הדחופים</h3>
                      <ol className="sck-result__urgent">
                        {res.urgent.map((c) => (
                          <li key={c.id}>
                            <span>{c.title}</span>
                            <button type="button" className="link link--arrow" onClick={() => goTo(c.id)}>איך מתקנים<ArrowIcon /></button>
                          </li>
                        ))}
                      </ol>
                    </>
                  )}
                </>
              )}
            </article>

            <div className="sck__ctas">
              {res.marked > 0 && (cta.wa
                ? <WaBtn message={cta.wa} location="security-check-setup"
                    onClick={() => { onWhatsAppClick('security-check-setup')(); ctaClick(); }}>{cta.text}</WaBtn>
                : <Btn variant="signal" href={cta.to} onClick={ctaClick}>{cta.text}</Btn>)}
              <p className="sck__wa">
                משהו נראה לא תקין? זה קורה עכשיו?{' '}
                <WaBtn message="היי, עשיתי את בדיקת האבטחה ומשהו נראה לא תקין בחשבון" location="security-check"
                  onClick={() => { onWhatsAppClick('security-check')(); gaEvent('check_cta_click', { type: 'whatsapp' }); }}>
                  כתוב לנו בוואטסאפ
                </WaBtn>
              </p>
            </div>

            <div className="sck__remind">
              <h3 className="h3">תזכורת לבדיקה חוזרת</h3>
              <p className="muted">שלחו לי תזכורת לבדיקה חוזרת בעוד 3 חודשים, ואת הגיליון החודשי. לא חובה, והתוצאה נשארת אצלך בכל מקרה.</p>
              <ReminderForm />
            </div>
          </div>
        </section>

        <section className="section sck__faq" aria-labelledby="sck-faq-title">
          <div className="container container--narrow">
            <h2 id="sck-faq-title" className="h2">שאלות נפוצות</h2>
            <div className="faq-list">
              {FAQS.map((f, i) => (
                <details key={f.q} className="faq-item" name="sck-faq">
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
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
