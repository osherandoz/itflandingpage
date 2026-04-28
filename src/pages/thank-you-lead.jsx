import { useEffect, useRef, useState } from 'react';
import './thank-you-lead.css';

const VSL_VIDEO_ID = 'YOUR_VSL_ID'; // TODO: replace after YouTube upload
const TRIPWIRE_URL = 'YOUR_TRIPWIRE_CHECKOUT_URL'; // TODO: replace with 129₪ payment link
const COUNTDOWN_KEY = 'bms_ty_countdown_end';
const COUNTDOWN_HOURS = 48;

function pad(n) {
  return String(n).padStart(2, '0');
}

function useCountdown() {
  const [remaining, setRemaining] = useState(COUNTDOWN_HOURS * 3600 * 1000);

  useEffect(() => {
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

function trackFb(event, params) {
  if (typeof window !== 'undefined' && window.fbq) window.fbq('track', event, params);
}
function trackGa(event, params) {
  if (typeof window !== 'undefined' && window.gtag) window.gtag('event', event, params);
}

const SOCIAL_PROOF = [
  {
    name: 'איתי שפירא',
    role: 'בעלים, סוכנות סושיאל',
    metric: 'חסך 100 דקות לאונבורדינג',
    text: 'האונבורדינג לקח לנו פעם שעתיים של ניחושים. היום זה 20 דקות עם צ׳קליסט. השקעה ששילמה את עצמה מהלקוח הראשון.',
    gradient: 'linear-gradient(135deg,#3B82F6,#1D4ED8)',
  },
  {
    name: 'מיכל אברהם',
    role: 'מנהלת סושיאל עצמאית',
    metric: 'סיננה לקוח עם היסטוריית חסימות',
    text: 'שבוע אחרי הקורס סיננתי לקוח עם ביזנס מנג׳ר שהוגבל פעמיים. חסכתי לעצמי הרבה כאב ראש — וכנראה גם את הפרופיל האישי שלי.',
    gradient: 'linear-gradient(135deg,#6366f1,#4338ca)',
  },
  {
    name: 'שרה שמעונוב',
    role: 'מנהלת סושיאל',
    metric: 'שחזרה יכולת הפרסום של לקוחה',
    text: 'אושר סייע לי לפתור תקלת מודעות מורכבת, ובזכותו חזרה היכולת של הלקוחה שלי לקדם ולשווק את העסק שלה.',
    gradient: 'linear-gradient(135deg,#0ea5e9,#0369a1)',
  },
];

const INCLUDES = [
  '15 שיעורים קצרים וממוקדים',
  'שיטת 4 השלבים לעבודה בטוחה',
  'דפי מידע להגדרות ותהליכים',
  'גישה מיידית לאחר הרכישה',
  'צ׳קליסט אונבורדינג — 5 שאלות לפני כל לקוח',
  'שחזור גישה לנכסים אבודים',
];

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

export default function ThankYouLead() {
  const { time: countdown, expired } = useCountdown();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const firedRef = useRef(false);

  useEffect(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    trackFb('CompleteRegistration', { content_name: 'bms-sm-checklist' });
    trackGa('form_submit_lead', { page: 'bms-sm' });
  }, []);

  const onBuyClick = () => {
    trackFb('InitiateCheckout', { value: 129, currency: 'ILS', content_name: 'BMS_tripwire' });
    trackGa('begin_checkout', { value: 129, currency: 'ILS' });
  };

  return (
    <main className="ty" dir="rtl">

      {/* CONFIRMATION */}
      <div className="ty-confirm">
        <i className="fa-solid fa-circle-check" aria-hidden="true" />
        <span>הצ׳קליסט בדרך למייל — בדקי גם את תיבת הספאם</span>
      </div>

      {/* VSL */}
      {VSL_VIDEO_ID !== 'YOUR_VSL_ID' && (
        <section className="ty-vsl-wrap">
          <div className="ty-container">
            <p className="ty-vsl-hook">
              רגע לפני שסוגרים את הטאב — הסרטון הזה שווה לך כסף
            </p>
            <div className="ty-video">
              {videoPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VSL_VIDEO_ID}?autoplay=1&rel=0`}
                  title="BMS — מה קורה כשלקוח מביא תשתית שרופה"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="ty-video-placeholder">
                  <button
                    className="ty-play-btn"
                    onClick={() => setVideoPlaying(true)}
                    aria-label="נגן סרטון"
                  >
                    <i className="fa-solid fa-play" aria-hidden="true" />
                  </button>
                  <p className="ty-video-duration">2–3 דקות שמסבירות הכל</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* BRIDGE */}
      <section className="ty-bridge">
        <div className="ty-container ty-bridge-inner">
          <h1 className="ty-bridge-title">
            הצ׳קליסט נתן לך את השאלות.<br />
            <span className="ty-hl">BMS נותן לך את התשובות.</span>
          </h1>
          <p className="ty-bridge-sub">
            עכשיו שאת יודעת מה לחפש — מה קורה כשמוצאים בעיה?
            מה עושים כשחשבון מוגבל, כשהלקוח לא יודע מי מחזיק לו בנכסים,
            כשמנהל המודעות נחסם יום לפני קמפיין?
          </p>
          <p className="ty-bridge-sub">
            BMS מלמד אותך לפעול — לא רק לזהות.
          </p>
        </div>
      </section>

      {/* TRIPWIRE OFFER */}
      <section className="ty-offer-section">
        <div className="ty-container">

          {!expired && (
            <div className="ty-urgency">
              <span className="ty-urgency-dot" aria-hidden="true" />
              <span>הצעה מיוחדת למצטרפות לרשימה — פגה בעוד</span>
              <span className="ty-urgency-time" aria-live="polite">{countdown}</span>
            </div>
          )}

          <div className="ty-offer-card">
            <div className="ty-offer-badge">הצעת השקה</div>

            <h2 className="ty-offer-title">קורס BMS — Business Manager Security</h2>
            <p className="ty-offer-tagline">
              מ"אני מקווה שזה יעבוד" ל"אני יודעת בדיוק מה לעשות"
            </p>

            <ul className="ty-includes" aria-label="מה כלול בקורס">
              {INCLUDES.map((item) => (
                <li key={item}>
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="ty-price-block">
              <div className="ty-price-old" aria-label="מחיר מלא 197 שקלים">197₪</div>
              <div className="ty-price-now" aria-label="מחיר מיוחד 129 שקלים">
                <span className="ty-cur">₪</span>129
              </div>
              <div className="ty-price-label">מחיר מיוחד למצטרפות לרשימה בלבד</div>
            </div>

            <a
              href={TRIPWIRE_URL}
              className="ty-cta"
              onClick={onBuyClick}
              aria-label="רכשי את קורס BMS ב-129 שקלים"
            >
              אני רוצה להגיע מוכנה לכל לקוח, 129₪ ←
            </a>
            <p className="ty-microcopy">
              <i className="fa-solid fa-lock" aria-hidden="true" />
              תשלום מאובטח · גישה מיידית · ללא ספאם
            </p>
          </div>

        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="ty-proof-section">
        <div className="ty-container">
          <h2 className="ty-proof-title">מה אמרו מנהלות סושיאל שכבר עשו את זה</h2>
          <div className="ty-proof-grid">
            {SOCIAL_PROOF.map((t) => (
              <article key={t.name} className="ty-proof-card">
                <div className="ty-proof-metric">{t.metric}</div>
                <p className="ty-proof-text">"{t.text}"</p>
                <div className="ty-proof-author">
                  <div
                    className="ty-proof-avatar"
                    aria-hidden="true"
                    style={{ background: t.gradient }}
                  >
                    {initials(t.name)}
                  </div>
                  <div>
                    <div className="ty-proof-name">{t.name}</div>
                    <div className="ty-proof-role">{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECOND CTA */}
      <section className="ty-second-cta">
        <div className="ty-container">
          <p className="ty-second-cta-text">
            עוד {expired ? 'לא הרבה זמן' : countdown} ומחיר ה-129₪ נעלם.
          </p>
          <a href={TRIPWIRE_URL} className="ty-cta" onClick={onBuyClick}>
            אני רוצה להגיע מוכנה לכל לקוח, 129₪ ←
          </a>
          <p className="ty-microcopy">
            <i className="fa-solid fa-lock" aria-hidden="true" />
            תשלום מאובטח · גישה מיידית · ללא ספאם
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ty-footer">
        <span>© {new Date().getFullYear()} Israel Tech Force · אושר רווח</span>
        <a href="/bms-sm">חזרה לדף הקורס</a>
      </footer>

    </main>
  );
}
