import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import '@fontsource/heebo/400.css';
import '@fontsource/heebo/700.css';
import '@fontsource/heebo/800.css';
import '@fontsource/heebo/900.css';
import './BmsSm.css';

const COUNTDOWN_KEY = 'bms_lp_v2_deadline';
const COUNTDOWN_HOURS = 48;

function pad(n) {
  return String(n).padStart(2, '0');
}

function useCountdown() {
  const [remaining, setRemaining] = useState(COUNTDOWN_HOURS * 3600 * 1000);

  useEffect(() => {
    let deadline = parseInt(localStorage.getItem(COUNTDOWN_KEY) || '0', 10);
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
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function trackFb(event, params) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, params);
}
function trackGa(event, params) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', event, params);
}

function LeadForm() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail]         = useState('');
  const [website, setWebsite]     = useState(''); // honeypot
  const [consent, setConsent]     = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState(false);

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
        setTimeout(() => navigate('/תודה-קליסט'), 400);
      } else {
        setError(data.error || 'שגיאה בשליחה. נסי שוב.');
      }
    } catch {
      setError('שגיאת רשת. נסי שוב.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="lead-success" role="status">
        <i className="fa-solid fa-circle-check" aria-hidden="true" />
        <div>הצ׳קליסט בדרך! מעבירים אותך...</div>
      </div>
    );
  }

  return (
    <form className="lead-card" onSubmit={onSubmit} noValidate>
      <span className="lead-ribbon" aria-hidden="true">חינמי · 100%</span>

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
            autoComplete="given-name"
          />
          <i className="fic fa-regular fa-user" aria-hidden="true" />
        </div>
        <div className="field">
          <label htmlFor="bms-email">כתובת מייל</label>
          <input
            className="finput"
            id="bms-email"
            type="email"
            placeholder="you@agency.co.il"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <i className="fic fa-regular fa-envelope" aria-hidden="true" />
        </div>
      </div>

      <label className="consent-check">
        <input
          type="checkbox"
          checked={consent}
          onChange={e => setConsent(e.target.checked)}
          required
        />
        <span>אני מאשרת קבלת עדכונים ותכנים מאושר רווח למייל. ניתן להסיר בכל עת.</span>
      </label>

      <button className="cta-gold" type="submit" disabled={loading || !consent}>
        {loading ? 'שולחת...' : (
          <>
            אני רוצה לדעת <span className="cta-small">(בחינם)</span>
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          </>
        )}
      </button>

      {error && <div className="form-err" role="alert">{error}</div>}

      <div className="form-trust">
        <span><i className="fa-solid fa-lock" aria-hidden="true" /> הפרטים מוצפנים</span>
        <span><i className="fa-solid fa-circle-check" aria-hidden="true" /> ללא ספאם</span>
        <span><i className="fa-solid fa-bolt" aria-hidden="true" /> במייל בתוך דקה</span>
      </div>
    </form>
  );
}

export default function BmsSm() {
  const countdown = useCountdown();
  const firedRef  = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackFb('ViewContent', { content_name: 'bms-sm-lp' });
    trackGa('page_view_bms', { page: 'bms-sm' });
  }, []);

  return (
    <div className="bmsm-v2" dir="rtl">

      {/* ── TOPBAR ──────────────────────────────────────────── */}
      <div className="topbar" role="status" aria-live="polite">
        <span className="dot" aria-hidden="true" />
        <span>הצ׳קליסט המעודכן ל‑2026 · גישה חינמית נסגרת בעוד</span>
        <span className="pill" aria-label={`נותרו ${countdown}`}>{countdown}</span>
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
                <i className="fa-solid fa-star" aria-hidden="true" style={{ color: 'var(--gold)' }} />
                {' '}4.9 · 312 ביקורות
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
                <b>איך להבין מה קורה ״מאחורי הקלעים״</b> של החשבון
                ב‑5 דקות — ולהגן על המוניטין המקצועי שלך לפני שאת בכלל מסכימה לקחת את הלקוח.
              </p>

              <div className="meta-row">
                <span className="chip">
                  <i className="fa-solid fa-file-pdf" aria-hidden="true" />
                  5 שאלות פשוטות
                </span>
                <span className="chip">
                  <i className="fa-solid fa-clock" aria-hidden="true" />
                  ‏5 דקות קריאה
                </span>
                <span className="chip">
                  <i className="fa-solid fa-arrow-rotate-right" aria-hidden="true" />
                  עודכן אפריל 2026
                </span>
              </div>

              <div className="anchor-cta">
                <a href="#getit" className="btn-gold">
                  <i className="fa-solid fa-arrow-down" aria-hidden="true" />
                  קבלי את הצ׳קליסט עכשיו
                </a>
                <a href="#how" className="btn-ghost">
                  <i className="fa-regular fa-circle-play" aria-hidden="true" />
                  {' '}איך זה עובד
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
                            לפני שאת מסכימה על מחיר — תוודאי שאת יודעת מי הבעלים האמיתי של
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
                  PDF · עודכן 2026
                  <small>מסמך מעודכן</small>
                </div>
              </div>
              <div className="float-badge fb-2">
                <span className="b-ic"><i className="fa-solid fa-shield-halved" /></span>
                <div>
                  5 שאלות
                  <small>סינון לקוח חדש</small>
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
                תשלח לי את הצ׳קליסט{' '}
                <span className="gold">— זה לוקח שניה</span>
              </h2>
              <p>מגיע למייל שלך תוך דקה. בלי ספאם, בלי שטויות, וגם אפשר להסיר בלחיצה.</p>
            </div>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── BENEFITS ────────────────────────────────────────── */}
      <section className="benefits" id="how" aria-labelledby="benefitsHead">
        <div className="wrap">
          <div className="sec-head">
            <span className="sec-eyebrow">
              <span className="ldot" aria-hidden="true" />
              {' '}מה כלול בצ׳קליסט
            </span>
            <h2 id="benefitsHead">
              מה את מקבלת <span className="gold">בצ׳קליסט הזה</span>
            </h2>
            <p>
              שלוש שכבות הגנה שמפרידות בין מנהלת סושיאל מקצועית
              לבין מי שלוקחת על עצמה את הבלגן של הלקוח.
            </p>
          </div>

          <div className="benefit-grid">
            <article className="benefit">
              <div className="benefit-num" aria-hidden="true">01</div>
              <div className="benefit-icon">
                <i className="fa-solid fa-user-shield" aria-hidden="true" />
              </div>
              <h3>הגנה על הפרופיל האישי</h3>
              <p>
                לנתק את החשבון הפרטי שלך מהתקלות של הלקוח. הצ׳קליסט יראה לך איך להפריד
                את עצמך מהלקוח ולשמור על החשבונות שלך.
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
                יודעת מה שווה ומה לא — ויוצאת ממנה עם הצעה ריאלית, לא הבטחת שווא.
              </p>
            </article>

            <article className="benefit">
              <div className="benefit-num" aria-hidden="true">03</div>
              <div className="benefit-icon">
                <i className="fa-solid fa-shield-halved" aria-hidden="true" />
              </div>
              <h3>חסינות מקצועית</h3>
              <p>
                לוודא שאת לא לוקחת אחריות על טעויות שנעשו לפני שהגעת. תיעוד מסודר של
                מצב החשבון ביום ההתחלה שמכסה אותך כשהדברים יסתבכו אחר כך.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────── */}
      <section className="about-strip" aria-label="על אושר רווח">
        <div className="wrap">
          <div className="about-card">
            <div className="about-photo" aria-hidden="true">או</div>
            <div>
              <h4>אושר רווח · מומחה תשתיות מטא</h4>
              <p>
                חמש שנים של טיפול בכל סוגי הלקוחות למעל 2500 עסקים בישראל.
                הצ׳קליסט הזה הוא תקציר של כל הטעויות שראיתי — ואיך אתן יכולות למנוע
                אותן עוד לפני שלקחתן את הלקוח.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat"><b>2500+</b><span>עסקים</span></div>
              <div className="stat"><b>5</b><span>שנים</span></div>
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
      <div className="sticky-cta" aria-label="קבלי את הצ׳קליסט">
        <div className="txt">צ׳קליסט סינון לקוחות · 2026</div>
        <a href="#getit">קבלי עכשיו</a>
      </div>

    </div>
  );
}
