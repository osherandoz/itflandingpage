import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import '@fontsource/heebo/400.css';
import '@fontsource/heebo/700.css';
import '@fontsource/heebo/800.css';
import '@fontsource/heebo/900.css';
import './BmsSm.css';

function trackFb(event, params) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, params);
}
function trackGa(event, params) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', event, params);
}

function LeadForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName]       = useState('');
  const [email, setEmail]               = useState('');
  const [website, setWebsite]           = useState(''); // honeypot
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');
  const [success, setSuccess]           = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);

  const emailOk       = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
  const showEmailErr  = emailBlurred && email.length > 0 && !emailOk;
  const showEmailOk   = emailBlurred && emailOk;

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
      <div className="lead-success" role="status" aria-live="polite">
        <i className="fa-solid fa-circle-check lead-success-icon" aria-hidden="true" />
        <div className="lead-success-text">הצ׳קליסט בדרך!</div>
        <div className="lead-success-sub">מעבירים אותך בעוד כמה שניות...</div>
        <div className="lead-success-bar" aria-hidden="true">
          <div className="lead-success-fill" />
        </div>
      </div>
    );
  }

  return (
    <form className="lead-card" onSubmit={onSubmit} noValidate>
      <span className="lead-ribbon" aria-hidden="true">חינמי לגמרי</span>

      {/* Honeypot */}
      <input
        className="honeypot"
        type="text"
        name="website"
        value={website}
        onChange={e => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="form-grid">
        <div className="field">
          <label htmlFor="bms-fname">שם פרטי</label>
          <input
            className="finput"
            id="bms-fname"
            type="text"
            placeholder="לדוגמה: מאיה"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
            minLength={2}
            maxLength={60}
            autoComplete="given-name"
          />
          <i className="fic fa-regular fa-user" aria-hidden="true" />
        </div>
        <div className={`field${showEmailErr ? ' field-err' : showEmailOk ? ' field-ok' : ''}`}>
          <label htmlFor="bms-email">כתובת מייל</label>
          <input
            className="finput"
            id="bms-email"
            type="email"
            placeholder="you@agency.co.il"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onBlur={() => setEmailBlurred(true)}
            required
            maxLength={254}
            autoComplete="email"
            aria-invalid={showEmailErr || undefined}
            aria-describedby={showEmailErr ? 'bms-email-err' : undefined}
          />
          {showEmailErr
            ? <i className="fic fa-solid fa-circle-exclamation fic-err" aria-hidden="true" />
            : showEmailOk
            ? <i className="fic fa-solid fa-circle-check fic-ok" aria-hidden="true" />
            : <i className="fic fa-regular fa-envelope" aria-hidden="true" />
          }
          {showEmailErr && (
            <span id="bms-email-err" className="field-hint-err" role="alert">
              נראה שהמייל לא תקין
            </span>
          )}
        </div>
      </div>

      <button className="cta-gold" type="submit" disabled={loading} aria-busy={loading}>
        {loading ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
            שולחת...
          </>
        ) : (
          <>
            אני רוצה את הצ׳קליסט
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </>
        )}
      </button>

      {error && (
        <div className="form-err" role="alert">
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
          {' '}{error}
        </div>
      )}

      <div className="form-trust">
        <span><i className="fa-solid fa-lock" aria-hidden="true" /> הפרטים מוצפנים</span>
        <span><i className="fa-solid fa-circle-check" aria-hidden="true" /> ללא ספאם</span>
        <span><i className="fa-solid fa-bolt" aria-hidden="true" /> במייל בתוך דקה</span>
      </div>
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

function FaqSection() {
  const [open, setOpen] = useState(0);
  const toggle = (i) => setOpen(prev => prev === i ? -1 : i);

  return (
    <section className="faq-section" id="faq" aria-labelledby="faqHead">
      <div className="wrap">
        <div className="faq-shell">
          <div className="sec-head">
            <h2 id="faqHead">
              שאלות שמנהלות <span className="gold">תמיד שואלות</span>
            </h2>
            <p>תשובות ישירות לכל מה שעולה לפני שלוחצים להוריד.</p>
          </div>

          <div className="faq-list" role="list">
            {BMS_FAQS.map((item, i) => (
              <div
                key={i}
                className={`faq-item${open === i ? ' is-open' : ''}`}
                role="listitem"
              >
                <button
                  className="faq-q"
                  onClick={() => toggle(i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{item.q}</span>
                  <i className="fa-solid fa-chevron-down faq-chevron" aria-hidden="true" />
                </button>
                <div
                  className="faq-a"
                  id={`faq-answer-${i}`}
                  aria-hidden={open !== i}
                >
                  <div className="faq-a-inner">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="faq-cta-nudge">
            עוד שאלות?{' '}
            <a href="https://wa.me/972509823235" target="_blank" rel="noopener noreferrer">
              שלחי הודעה בוואטסאפ
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default function BmsSm() {
  const firedRef = useRef(false);
  const [stickyClosed, setStickyClosed] = useState(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackFb('ViewContent', { content_name: 'bms-sm-lp' });
    trackGa('page_view_bms', { page: 'bms-sm' });
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('bmsm-sticky-dismissed') === '1') setStickyClosed(true);
    } catch {}
  }, []);

  const dismissSticky = () => {
    setStickyClosed(true);
    try { sessionStorage.setItem('bmsm-sticky-dismissed', '1'); } catch {}
  };

  return (
    <div className="bmsm-v2" dir="rtl">
      <a href="#getit" className="bmsm-skip-link">דלגי לטופס</a>

      {/* ── TOPBAR ──────────────────────────────────────────── */}
      <div className="topbar">
        <span className="dot" aria-hidden="true" />
        <span>צ׳קליסט סינון לקוחות 2026</span>
        <span className="pill">לכל מנהלת סושיאל</span>
      </div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <div className="hero">
        <div className="wrap">

          {/* NAV */}
          <nav className="nav" aria-label="ראשי">
            <div className="brand">
              <div className="brand-mark" aria-hidden="true">או</div>
              <div className="brand-text">
                אושר רווח
                <small>BMS · מומחה תשתיות מטא</small>
              </div>
            </div>
            <div className="nav-meta">
              <span className="vbadge">
                <i className="fa-solid fa-shield-halved" aria-hidden="true" />
                {' '}מומחה תשתיות מאומת
              </span>
              <span>
                <i className="fa-solid fa-star" aria-hidden="true" style={{ color: 'var(--accent-light)' }} />
                {' '}4.9
              </span>
            </div>
          </nav>

          {/* HERO GRID */}
          <div className="hero-grid">

            {/* RIGHT: Copy */}
            <div className="hero-copy">
              <span className="eyebrow">
                <span className="ldot" aria-hidden="true" />
                {' '}צ׳קליסט סינון לקוחות · עדכון 2026
              </span>

              <h1>
                תפסיקי לשלם בזמן ובאנרגיה<br />
                על <span className="accent">הבלאגן</span> של הלקוחות שלך.
              </h1>

              <p className="lede">
                צ׳קליסט הסינון המעודכן ל‑2026:{' '}
                <b>איך להבין מה קורה מאחורי הקלעים</b> של החשבון
                ב‑5 דקות, ולהגן על המוניטין המקצועי שלך לפני שאת בכלל מסכימה לקחת את הלקוח.
              </p>

              <div className="meta-row">
                <span className="chip">
                  <i className="fa-solid fa-file-pdf" aria-hidden="true" />
                  5 בדיקות קריטיות
                </span>
                <span className="chip">
                  <i className="fa-solid fa-clock" aria-hidden="true" />
                  ‏5 דקות קריאה
                </span>
              </div>

              <div className="anchor-cta">
                <a href="#getit" className="btn-gold">
                  <i className="fa-solid fa-arrow-down" aria-hidden="true" />
                  קבלי את הצ׳קליסט עכשיו
                </a>
                <a href="#how" className="btn-ghost">
                  <i className="fa-regular fa-circle-play" aria-hidden="true" />
                  {' '}ראי מה כלול
                </a>
              </div>
            </div>

            {/* LEFT: PDF on iPad */}
            <div className="visual-stage" aria-hidden="true">
              <div className="ipad">
                <div className="ipad-screen">
                  <div className="pdf">
                    <div className="pdf-toolbar">
                      <div className="tb-left">
                        <i className="fa-solid fa-file-pdf" />
                        <span>BMS_Client_Screening_2026.pdf</span>
                      </div>
                      <div className="tb-right">
                        <span className="pgs">
                          <i className="fa-solid fa-bookmark" style={{ fontSize: '.55rem' }} />
                          {' '}03 / 14
                        </span>
                      </div>
                    </div>

                    <div className="pdf-stage">
                      <div className="pdf-tabs">
                        <div className="pdf-tab" />
                        <div className="pdf-tab" />
                        <div className="pdf-tab active" />
                        <div className="pdf-tab" />
                        <div className="pdf-tab" />
                      </div>

                      <div className="page-stack">
                        <div className="page behind-2" />
                        <div className="page behind-1" />
                        <div className="page front">
                          <div className="pdf-h-row">
                            <div className="doc">צ׳קליסט סינון לקוחות 2026</div>
                            <div className="pg">עמ׳ 03</div>
                          </div>
                          <h2 className="pdf-title">
                            חלק א׳: בדיקת <span className="gold">בעלות הנכסים</span>
                          </h2>
                          <div className="pdf-sub">
                            לפני שאת מסכימה על מחיר: תוודאי שאת יודעת מי הבעלים האמיתי של
                            החשבון, של הפיקסל, ושל מנהל העסקים.
                          </div>
                          <div className="pdf-section">
                            <h4>‏01 · בדיקת בעלות חשבון פרסום <span>4 בדיקות</span></h4>
                            <div className="pdf-li">
                              <span className="num done">✓</span>
                              <div><b>הלקוחה</b> רשומה כבעלים, לא העובד הקודם.</div>
                              <span className="tag">תקין</span>
                            </div>
                            <div className="pdf-li">
                              <span className="num done">✓</span>
                              <div>אמצעי תשלום מחובר ל<b>חשבון העסק</b>.</div>
                              <span className="tag">תקין</span>
                            </div>
                            <div className="pdf-li">
                              <span className="num">3</span>
                              <div>הפיקסל לא משויך לסוכנות הקודמת.</div>
                              <span className="tag warn">לבדוק</span>
                            </div>
                            <div className="pdf-li">
                              <span className="num">4</span>
                              <div>קטלוג המוצרים מחובר לדומיין הנכון.</div>
                              <span className="tag warn">לבדוק</span>
                            </div>
                          </div>
                          <div className="pdf-section">
                            <h4>‏02 · הרשאות גישה <span>3 בדיקות</span></h4>
                            <div className="pdf-li">
                              <span className="num">5</span>
                              <div>אין משתמשים <b>לא מזוהים</b> ברמת מנהל.</div>
                              <span className="tag">סטטוס</span>
                            </div>
                            <div className="pdf-li">
                              <span className="num">6</span>
                              <div>הוסרו עובדים לשעבר ושותפים ישנים.</div>
                              <span className="tag">סטטוס</span>
                            </div>
                          </div>
                          <div className="pdf-foot">
                            <span>‏© 2026 · אושר רווח</span>
                            <span className="stamp">
                              <i className="fa-solid fa-shield-halved" style={{ fontSize: '.55rem' }} />
                              {' '}BMS Verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="float-badge fb-1">
                <span className="b-ic"><i className="fa-solid fa-file-lines" /></span>
                <div>
                  PDF מלא · 2026
                  <small>עם כל שאלות הסינון</small>
                </div>
              </div>
              <div className="float-badge fb-2">
                <span className="b-ic"><i className="fa-solid fa-shield-halved" /></span>
                <div>
                  5 בדיקות
                  <small>לפני כל לקוח חדש</small>
                </div>
              </div>
            </div>

          </div>{/* /hero-grid */}
        </div>
      </div>

      {/* ── FORM SECTION ────────────────────────────────────── */}
      <section className="form-section" id="getit" aria-label="קבלי את הצ׳קליסט">
        <div className="wrap">
          <div className="form-shell">
            <div className="head">
              <h2>
                שלחי לי את הצ׳קליסט,{' '}
                <span className="gold">זה לוקח שניה</span>
              </h2>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── BENEFITS ────────────────────────────────────────── */}
      <section className="benefits" id="how" aria-labelledby="benefitsHead">
        <div className="wrap">
          <div className="sec-head">
            <h2 id="benefitsHead">
              3 שכבות שמגנות על <span className="gold">המוניטין, הכסף, והזמן</span> שלך
            </h2>
            <p>
              נבנה אחרי חמש שנים של ראיית אותן טעויות שוב ושוב.
              אפשר לא לחזור עליהן.
            </p>
          </div>

          <div className="benefit-grid">
            <article className="benefit">
              <div className="benefit-num" aria-hidden="true">01</div>
              <div className="benefit-icon">
                <i className="fa-solid fa-user-shield" aria-hidden="true" />
              </div>
              <h3>הפרדה מהתקלות של הלקוח</h3>
              <p>
                הצ׳קליסט מראה בדיוק איך לשמור את החשבון הפרטי שלך מחוץ לבלגן של הלקוח,
                כך שהתקלות שלו לא הופכות לבעיה שלך.
              </p>
            </article>

            <article className="benefit">
              <div className="benefit-num" aria-hidden="true">02</div>
              <div className="benefit-icon">
                <i className="fa-solid fa-handshake" aria-hidden="true" />
              </div>
              <h3>ביטחון בשיחת המכירה</h3>
              <p>
                תדעי בדיוק מה המצב של החשבון לפני שסיכמת על מחיר. את נכנסת לשיחה כשאת
                יודעת מה שווה ומה לא, ויוצאת ממנה עם הצעה ריאלית, לא הבטחת שווא.
              </p>
            </article>

            <article className="benefit">
              <div className="benefit-num" aria-hidden="true">03</div>
              <div className="benefit-icon">
                <i className="fa-solid fa-shield-halved" aria-hidden="true" />
              </div>
              <h3>תיעוד שמכסה אותך לפני הבעיה</h3>
              <p>
                תיעוד מסודר של מצב החשבון ביום שאת מתחילה. זה מה שמפריד בין
                ״זה לא הייתי אני״ לבין ״אין לי איך להוכיח את זה״.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <FaqSection />

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section className="about-strip" aria-label="על אושר רווח">
        <div className="wrap">
          <div className="about-card">
            <div className="about-photo" aria-hidden="true">או</div>
            <div>
              <h4>אושר רווח · מומחה תשתיות מטא</h4>
              <p>
                חמש שנים של טיפול בכל סוגי הלקוחות למעל 2,500 עסקים בישראל.
                הצ׳קליסט הזה הוא תקציר של כל הטעויות שראיתי, ואיך אפשר למנוע
                אותן עוד לפני שלוקחים את הלקוח.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat"><b>2,500+</b><span>עסקים</span></div>
              <div className="stat"><b>5</b><span>שנות ניסיון</span></div>
              <div className="stat"><b>0</b><span>חשבונות שאבדו</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="footer">
        <div className="wrap">
          © {new Date().getFullYear()} Israel Tech Force · אושר רווח · כל הזכויות שמורות
          {' '}·{' '}
          <a href="/privacy">פרטיות</a>
          {' '}·{' '}
          <a href="/terms">תנאי שימוש</a>
        </div>
      </footer>

      {/* ── STICKY MOBILE CTA ───────────────────────────────── */}
      {!stickyClosed && (
        <div className="sticky-cta" aria-label="קבלי את הצ׳קליסט">
          <div className="txt">צ׳קליסט סינון לקוחות · 2026</div>
          <a href="#getit">קבלי את הצ׳קליסט</a>
          <button
            className="sticky-dismiss"
            onClick={dismissSticky}
            aria-label="סגרי פס זה"
            type="button"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </div>
      )}

    </div>
  );
}
