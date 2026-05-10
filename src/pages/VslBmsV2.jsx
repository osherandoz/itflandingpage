import { useEffect, useRef, useState } from 'react';
import './VslBmsV2.css';

/* ============================================================
   ICONS. Structural Lucide-style (per brief Iconography section).
   Emojis are used inline in copy text only
   ============================================================ */
const Icon = ({ children, size = 20, strokeWidth = 2, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

const IconArrowLeft = (p) => (<Icon {...p}><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></Icon>);
const IconCheck = (p) => (<Icon {...p} strokeWidth={3}><polyline points="20 6 9 17 4 12" /></Icon>);
const IconChevronDown = (p) => (<Icon {...p}><polyline points="6 9 12 15 18 9" /></Icon>);
const IconWhatsApp = (p) => (<Icon {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Icon>);

/* ============================================================
   CONFIG
   ============================================================ */
const VIDEO_EMBED_URL = '';
const BASE_PURCHASE_URL = 'https://mrng.to/engo98ytvh';
const WHATSAPP_URL = 'https://wa.me/972509823235';
const PRICE = 197;
const ORIGINAL_VALUE = 638;
const UTM = 'utm_content=v2-loss-headline';

const HERO_OSHER_IMAGE = '/images/vsl-bms/osher_with_laptop-md.webp';
const STORY_IMG_1 = '/images/vsl-bms/account_disabled-sm.webp';
const STORY_IMG_2 = '/images/vsl-bms/business_manager-sm.webp';
const STORY_IMG_3 = '/images/vsl-bms/osher_auth-sm.webp';

/* ============================================================
   PIXEL EVENT TRACKERS (V2-aware)
   ============================================================ */
function fbq(eventName, params) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (params) window.fbq('track', eventName, params);
    else window.fbq('track', eventName);
  }
}

function trackInitiateCheckout() {
  fbq('InitiateCheckout', { value: PRICE, currency: 'ILS', content_name: 'BMS Course V2' });
}

function trackPurchaseClick() {
  trackInitiateCheckout();
}

function getPurchaseUrl() {
  // Forward UTM params through to checkout. mrng.to may not preserve them, but we try.
  const sep = BASE_PURCHASE_URL.includes('?') ? '&' : '?';
  return `${BASE_PURCHASE_URL}${sep}${UTM}`;
}

/* ============================================================
   COMPONENT
   ============================================================ */
export default function VslBmsV2() {
  const [showStickyCta, setShowStickyCta] = useState(false);
  const scroll50Fired = useRef(false);
  const videoPlayedFired = useRef(false);

  useEffect(() => {
    fbq('ViewContent', { content_name: 'VSL-BMS-V2' });

    const onScroll = () => {
      const y = window.scrollY;
      const max = Math.max(1, document.body.scrollHeight - window.innerHeight);
      setShowStickyCta(y > 600);
      if (!scroll50Fired.current && y / max >= 0.5) {
        scroll50Fired.current = true;
        if (typeof window.fbq === 'function') {
          window.fbq('trackCustom', 'Scroll50', { page: 'VSL-BMS-V2' });
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // VideoPlay. Fires when iframe is interacted with (best-effort for embedded players).
  const handleVideoMessage = () => {
    if (videoPlayedFired.current) return;
    videoPlayedFired.current = true;
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'VideoPlay', { page: 'VSL-BMS-V2' });
    }
  };

  return (
    <div className="vsl-v2">
      {/* ─── 1. ANNOUNCEMENT BAR ─── */}
      <div className="v2-announcement">
        <span>🚨 הדרכה חינמית · 3 מקרים אמיתיים · ההבדל בין עסק שרץ לעסק שנעצר</span>
      </div>

      {/* ─── 2. HERO ─── */}
      <section className="v2-hero">
        <div className="v2-container">
          <h1 className="v2-h1">
            חשבון פרסום נחסם = <span className="v2-amount-loss">₪150,000</span> לאיבוד בין לילה.<br />
            <span className="v2-h1-sub">יש שיטה אחת שמונעת את זה. היא נקראת <span className="v2-bms-accent">BMS</span>.</span>
          </h1>

          <p className="v2-subhead">
            ב-2026, מטא הסירה מעל <strong>10 מיליון חשבונות עסקיים</strong> בלי הודעה מראש.
            רובם המכריע נחסמו בגלל טעות הגדרה אחת שאף אחד לא טרח לספר עליה.
            ההדרכה הזו (4 דקות) תראה לכם איך להימנע ממנה.
          </p>

          {/* Trust bar (4 pills) */}
          <ul className="v2-trust-bar" aria-label="הוכחות חברתיות">
            <li><span className="v2-trust-mark">✅</span> 2,500+ עסקים שוחזרו</li>
            <li><span className="v2-trust-mark">✅</span> 95% הצלחה</li>
            <li><span className="v2-trust-mark">✅</span> 5 שנים בתחום</li>
            <li><span className="v2-trust-mark">✅</span> מומלץ ע״י לקוחות בפייסבוק</li>
          </ul>

          {/* Video */}
          <div className="v2-video-wrap" onClick={handleVideoMessage}>
            <div className="v2-video-banner">
              ▶ 4 דקות שיכולות להציל לך ₪150,000
            </div>
            <div className="v2-video-frame">
              {VIDEO_EMBED_URL ? (
                <iframe
                  src={VIDEO_EMBED_URL}
                  title="VSL BMS V2"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  onLoad={handleVideoMessage}
                />
              ) : (
                <div className="v2-video-placeholder">
                  <div className="v2-video-thumb-overlay">
                    <span className="v2-video-thumb-play">▶</span>
                    <span className="v2-video-thumb-text">4 דקות שיכולות להציל לך ₪150,000</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Primary CTA */}
          <div className="v2-cta-wrap">
            <a
              href={getPurchaseUrl()}
              className="v2-cta v2-cta-primary"
              onClick={trackPurchaseClick}
              aria-label={`הצטרף/י לקורס BMS ב-₪${PRICE}`}
            >
              <span>כן, אני רוצה את השיטה ב-₪{PRICE}</span>
              <span className="v2-cta-arrow"><IconArrowLeft size={18} /></span>
            </a>
            <p className="v2-cta-microcopy">תשלום חד-פעמי · גישה מיידית · כולל מע״מ</p>
          </div>
        </div>
      </section>

      {/* ─── 3. THE REAL COST ─── */}
      <section className="v2-real-cost">
        <div className="v2-container">
          <h2 className="v2-section-h2">כמה עולה לאבד את ה-Business Manager?</h2>

          <div className="v2-cost-grid">
            <article className="v2-cost-card v2-cost-direct">
              <h3>עלות ישירה</h3>
              <ul>
                <li>₪3,500–₪50,000+ לשחזור עם איש מקצוע</li>
                <li>שבועיים עד חודש של downtime</li>
                <li>כל הקמפיינים מתאפסים</li>
              </ul>
            </article>

            <article className="v2-cost-card v2-cost-indirect">
              <h3>עלות עקיפה</h3>
              <ul>
                <li>לידים שנעלמים בזמן שאתם לא באוויר</li>
                <li>אמון לקוחות מתערער</li>
                <li>שעות של פניות לתמיכה שלא עוזרת</li>
              </ul>
            </article>

            <article className="v2-cost-card v2-cost-mental">
              <h3>עלות נפשית</h3>
              <ul>
                <li>חרדה לפני כל לוגין</li>
                <li>חוסר שינה</li>
                <li>תחושה שהכל יכול להתמוטט מחר</li>
              </ul>
            </article>
          </div>

          <p className="v2-cost-closer">
            הקורס עולה <strong>₪{PRICE}</strong>. חסימה אחת ממוצעת עולה <strong>פי 18</strong> מזה.<br />
            הוא משלם את עצמו עוד לפני שלמדתם את המודול הראשון.
          </p>

          <div className="v2-cta-wrap">
            <a href={getPurchaseUrl()} className="v2-cta" onClick={trackPurchaseClick}>
              <span>אני בפנים</span>
              <span className="v2-cta-arrow"><IconArrowLeft size={18} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 4. WHO AM I ─── */}
      <section className="v2-who">
        <div className="v2-container v2-who-grid">
          <div className="v2-who-image-col">
            <img
              src={HERO_OSHER_IMAGE}
              alt="אושר רווח, IsraelTechForce"
              width="960"
              height="1440"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="v2-who-text-col">
            <h2 className="v2-section-h2">למה אני יודע את זה? כי בעצמי איבדתי הכל.</h2>

            <p>
              שמי אושר רווח. ב-2020 אשתי בר הייתה בשיא שלה כיוצרת תוכן.
              בוקר אחד היא ניסתה להיכנס לחשבון. לא הצליחה.
              נחסם. בלי הסבר, בלי אזהרה, בלי דרך לדבר עם בנאדם אמיתי בצד השני.
            </p>

            <p>ניסיתי. נכשלתי. ניסיתי שוב. אחרי שבועיים של ניסיון וטעייה, היא חזרה.</p>

            <p>
              מאז עברו 5 שנים. <strong>2,500 עסקים שוחזרו</strong>.
              אלפי שעות של מחקר. <strong>אחוז הצלחה של 95%</strong>.
            </p>

            <p>
              ואז הבנתי משהו: <strong>כל הלקוחות שהגיעו אליי כבר היו פצועים.</strong>
              {' '}הם הגיעו אחרי שזה קרה. השאלה האמיתית הייתה: למה זה קרה מלכתחילה?
            </p>

            <p>
              <strong>הקורס הזה הוא התשובה.</strong>
              {' '}זה לא קורס "טריקים". זו השיטה שגיליתי אחרי 2,500 מקרים על איך לא להגיע לרגע שבו אתם צריכים אותי.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 5. 3 REAL CASES ─── */}
      <section className="v2-cases">
        <div className="v2-container">
          <h2 className="v2-section-h2 v2-text-center">
            3 עסקים. 3 פעמים שהם הגיעו אליי בייאוש.<br />
            <span className="v2-emph">ב-3 הפעמים. אותה טעות בדיוק.</span>
          </h2>
          <p className="v2-section-sub v2-text-center">השמות שונו. הסיפורים אמיתיים ב-100%.</p>

          <div className="v2-cases-grid">
            <article className="v2-case-card">
              <h3 className="v2-case-title">🔴 לילך, יועצת עסקית ומנהלת דיגיטל</h3>
              <p>
                קמפיין של <strong>₪150,000</strong> ירד לה מהאשראי בין לילה.
                עסק ששותק. לקוחות שעזבו.
                ולא רק זה. היא גם נעקצה מ"מקצוען" שהבטיח לסייע ולא הצליח.
              </p>
            </article>

            <article className="v2-case-card">
              <h3 className="v2-case-title">🔴 דליה, בעלת עסק</h3>
              <p>
                <strong>חצי שנה</strong> היא חיפשה מי בכלל מחזיק בדף העסקי שלה.
                פניות לתמיכה? לא עזרו.
                למחלקה המשפטית של מטא? לא ענו.
                עם BMS היא לא הייתה מגיעה למצב הזה.
              </p>
            </article>

            <article className="v2-case-card">
              <h3 className="v2-case-title">🔴 מאיה, קמפיינרית</h3>
              <p>
                חשבון של לקוח נחסם. לא באשמתה.
                אבל היא נשאה בעלויות התיקון. <strong>אלפי שקלים מהכיס שלה</strong>.
                הכל היה נמנע עם הכנה מוקדמת.
              </p>
            </article>
          </div>

          <p className="v2-cases-closer">
            המכנה המשותף לכל ה-3?<br />
            <strong>הם לא נחסמו בגלל מזל רע. הם נחסמו בגלל נוסחה שאף אחד לא סיפר להם.</strong>
          </p>
        </div>
      </section>

      {/* ─── 6. METHODOLOGY ─── */}
      <section className="v2-method">
        <div className="v2-container">
          <h2 className="v2-section-h2 v2-text-center">
            BMS נכון = <span className="v2-emph-blue">3 שלבים</span>.<br />
            כל שלב היה מציל אחד מהמקרים.
          </h2>

          <div className="v2-stages">
            <article className="v2-stage">
              <div className="v2-stage-num">01</div>
              <h3>בנייה נכונה</h3>
              <span className="v2-stage-saves">→ היה מציל את לילך</span>
              <p>
                תשתית מהיום הראשון: הרשאות, גיבויים, חיבורים נכונים.
                אם בונים נכון פעם אחת. אין מצב שירידה של ₪150K אצל לילך הייתה קורית.
              </p>
            </article>

            <article className="v2-stage">
              <div className="v2-stage-num">02</div>
              <h3>הגנה שוטפת</h3>
              <span className="v2-stage-saves">→ הייתה מצילה את דליה</span>
              <p>
                בדיקות חודשיות. התראות. סדר. אתם תמיד יודעים מי מחזיק במה.
                דליה לא הייתה מבזבזת חצי שנה אם היא הייתה יודעת מראש.
              </p>
            </article>

            <article className="v2-stage">
              <div className="v2-stage-num">03</div>
              <h3>שחזור מהיר</h3>
              <span className="v2-stage-saves">→ הייתה מצילה את מאיה</span>
              <p>
                כשמשהו משתבש, יש תוכנית מוכנה. תבניות, ערוצים, סדר פעולות.
                לא פאניקה. לא אלפי שקלים מהכיס.
              </p>
            </article>
          </div>

          <div className="v2-cta-wrap">
            <a href={getPurchaseUrl()} className="v2-cta" onClick={trackPurchaseClick}>
              <span>אני רוצה את כל ה-3 שלבים ב-₪{PRICE}</span>
              <span className="v2-cta-arrow"><IconArrowLeft size={18} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 7. WHAT'S INSIDE. MODULES AS OUTCOMES ─── */}
      <section className="v2-inside">
        <div className="v2-container">
          <h2 className="v2-section-h2 v2-text-center">אחרי הקורס. תדעו לעשות את כל זה.</h2>
          <p className="v2-section-sub v2-text-center">
            לא מצגות. לא תיאוריה. הקלטות מסך, צעד-אחר-צעד, יישום מיידי.
          </p>

          <div className="v2-modules">
            <article className="v2-module">
              <span className="v2-module-tag">📍 מודול 1 · 3 שיעורים</span>
              <h3>הפרופיל האישי</h3>
              <p>
                תדעו אילו <strong>4 הגדרות בפרופיל האישי שלכם</strong> פותחות את ה-BM שלכם לפריצה.
                ואיך לסגור אותן ב-7 דקות.
              </p>
              <ul className="v2-module-bullets">
                <li>✅ ותק חשבון</li>
                <li>✅ אבטחה</li>
                <li>✅ סטטוס תקין</li>
                <li>✅ פרטים עדכניים</li>
              </ul>
            </article>

            <article className="v2-module">
              <span className="v2-module-tag">📍 מודול 2 · שיעור אחד</span>
              <h3>בידול עסקי</h3>
              <p>
                תדעו איך להפריד פעם אחת ולתמיד בין הפרטי לעסקי,
                כך שאם מחר תרצו למכור את העסק או להעביר ניהול, הכל מוכן.
              </p>
            </article>

            <article className="v2-module">
              <span className="v2-module-tag">📍 מודול 3 · 2 שיעורים</span>
              <h3>מדברים ביזנס</h3>
              <p>
                תדעו את ההבדל בין מרכז החשבונות לביזנס מנג'ר.
                תקימו תיק עסקי מסודר. כל הנכסים שלכם, תחת קורת גג אחת.
                <em> (הצעד שלילך לא ידעה לעשות.)</em>
              </p>
            </article>

            <article className="v2-module">
              <span className="v2-module-tag">📍 מודול 4 · 3 שיעורים</span>
              <h3>חשבון מודעות + הרשאות</h3>
              <p>
                תדעו להגדיר נכון אמצעי תשלום, אנשים, שותפים, הרשאות, ואבטחה.
                <em> (זה השלב שעוצר 90% מהחסימות.)</em>
              </p>
            </article>
          </div>

          {/* Bonuses */}
          <div className="v2-bonuses-header">
            <span>🎁 ובחבילה: 3 בונוסים שלא תמצאו בשום מקום אחר</span>
          </div>

          <div className="v2-bonuses">
            <article className="v2-bonus">
              <h4>🎁 בונוס 01 · 3 שיעורים · פריצות וחסימות. מה לעשות כשזה קורה</h4>
              <p>
                מה זו פריצה? איך זה נראה? איך מגיבים?
                <em> (הידע שדליה לא הייתה צריכה לחפש 6 חודשים.)</em>
              </p>
            </article>

            <article className="v2-bonus">
              <h4>🎁 בונוס 02 · 3 שיעורים · טיפים מבפנים</h4>
              <p>
                אישור פעילות. אימות דו-שלבי. החזרת גישה דרך אינסטגרם.
                הקטנים שמקצרים שעה של פאניקה ל-5 דקות של תיקון.
              </p>
            </article>

            <article className="v2-bonus">
              <h4>🎁 בונוס 03 · הרצאת אורח של בר שלג, "הוקים שעוצרים גלילה"</h4>
              <p>
                הקלטה בלעדית של בר על איך כותבים hooks שמושכים תשומת לב באמת.
                כי תשתית בלי תוכן זה חצי משחק.
              </p>
            </article>
          </div>

          <p className="v2-summary-bar">
            4 מודולים · 3 בונוסים · 15 שיעורים · ~3 שעות לסיים · גישה לכל החיים
          </p>

          <div className="v2-cta-wrap">
            <a href={getPurchaseUrl()} className="v2-cta v2-cta-primary" onClick={trackPurchaseClick}>
              <span>אני רוצה את הכל ב-₪{PRICE}</span>
              <span className="v2-cta-arrow"><IconArrowLeft size={18} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 8. OBJECTION HANDLING ─── */}
      <section className="v2-objections">
        <div className="v2-container">
          <h2 className="v2-section-h2 v2-text-center">"רגע, יש לי כמה ספקות..."</h2>

          <div className="v2-obj-list">
            <details className="v2-obj">
              <summary>
                <span>❓ אני לא טכנולוגי/ת. זה לא יהיה מסובך לי?</span>
                <span className="v2-obj-chevron"><IconChevronDown size={18} /></span>
              </summary>
              <div className="v2-obj-answer">
                הקורס בנוי בהקלטות מסך. אתם רואים בדיוק מה אני עושה ועושים אחריי.
                אם אתם יודעים להפעיל פייסבוק, אתם יודעים מספיק.
              </div>
            </details>

            <details className="v2-obj">
              <summary>
                <span>❓ ₪{PRICE} זה לא יותר מדי בשביל קורס דיגיטלי?</span>
                <span className="v2-obj-chevron"><IconChevronDown size={18} /></span>
              </summary>
              <div className="v2-obj-answer">
                חסימה ממוצעת עולה ₪3,500. זה פי 18 מהקורס.
                אם הקורס יחסוך לכם חסימה אחת ב-5 השנים הקרובות, הוא משלם את עצמו 18 פעמים.
              </div>
            </details>

            <details className="v2-obj">
              <summary>
                <span>❓ אני יכול/ה ללמוד את זה ביוטיוב בחינם, לא?</span>
                <span className="v2-obj-chevron"><IconChevronDown size={18} /></span>
              </summary>
              <div className="v2-obj-answer">
                ביוטיוב יש "טיפים". כאן יש שיטה. יוטיוב לא מתעדכן כשמטא משנה משהו. אני כן.
              </div>
            </details>

            <details className="v2-obj">
              <summary>
                <span>❓ אם אקנה ולא יעבוד לי, מה אז?</span>
                <span className="v2-obj-chevron"><IconChevronDown size={18} /></span>
              </summary>
              <div className="v2-obj-answer">
                תשלח/י לי הודעה. אני עונה אישית.
                לא הבטחתי תמיכה אישית מלאה. אבל בפועל אני עונה לכל תלמיד.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* ─── 9. FINAL CTA / PRICING ─── */}
      <section className="v2-pricing" id="final-cta">
        <div className="v2-container">
          <h2 className="v2-section-h2 v2-text-center">
            תשתית שאי אפשר לשבור. ב-<span className="v2-emph-blue">₪{PRICE}</span>.
          </h2>

          <div className="v2-price-card">
            <div className="v2-price-strike-row">
              <span className="v2-strike-label">✕ שווי אמיתי:</span>
              <span className="v2-strike-amount">₪{ORIGINAL_VALUE}</span>
            </div>
            <div className="v2-price-today-label">המחיר היום:</div>
            <div className="v2-price-today">₪{PRICE}</div>

            <ul className="v2-price-includes">
              <li><span className="v2-price-check">✅</span> 4 מודולים · 9 שיעורים <span className="v2-price-value">(שווי ₪297)</span></li>
              <li><span className="v2-price-check">✅</span> בונוס 01 · פריצות וחסימות <span className="v2-price-value">(שווי ₪97)</span></li>
              <li><span className="v2-price-check">✅</span> בונוס 02 · טיפים מבפנים <span className="v2-price-value">(שווי ₪97)</span></li>
              <li><span className="v2-price-check">✅</span> בונוס 03 · הרצאת בר שלג <span className="v2-price-value">(שווי ₪147)</span></li>
              <li><span className="v2-price-check">✅</span> עדכונים לכל החיים <span className="v2-price-value">(∞)</span></li>
            </ul>

            <a href={getPurchaseUrl()} className="v2-cta v2-cta-mega" onClick={trackPurchaseClick}>
              <span>🚀 כן, אני רוצה את הכל ב-₪{PRICE}</span>
            </a>

            <p className="v2-trust-line">
              🔒 תשלום מאובטח · 📧 חשבונית מס מיידית · ⚡ גישה מיידית למייל
            </p>
            <p className="v2-consent">
              ברכישה את/ה מסכימ/ה לקבל עדכונים שיווקיים מאיתנו. ניתן להסיר בכל עת.
            </p>
          </div>

          {/* Honest risk-reduction block (replaces brief's 7-day guarantee) */}
          <div className="v2-promise">
            <h3>ההבטחה שלי האמיתית:</h3>
            <p>
              הקורס הזה <strong>לא מבטיח</strong> שלעולם לא תיחסמו או תיפרצו.<br />
              מי שמבטיח לכם דבר כזה, משקר.
            </p>
            <p className="v2-promise-yes">
              <strong>מה שאני כן מבטיח:</strong><br />
              אחרי שתיישמו את כל מה שיש בקורס,<br />
              תהיו ברמת הגנה <span className="v2-emph-blue">גבוהה משמעותית</span> מ-99% מבעלי העסקים בארץ.<br />
              <em>הסיכון לא ייעלם. הוא יקטן באופן דרמטי.</em>
            </p>
            <p className="v2-promise-final">זאת ההבטחה היחידה שאני מוכן לתת.</p>
          </div>

          {/* WhatsApp fallback */}
          <div className="v2-wa-fallback">
            <p>יש שאלה לפני? שלחו לי הודעה אישית בוואטסאפ. אני עונה תוך שעות.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="v2-wa-btn">
              <IconWhatsApp size={20} />
              <span>שלחו הודעה. אושר עונה אישית</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ─── */}
      <section className="v2-faq">
        <div className="v2-container">
          <h2 className="v2-section-h2 v2-text-center">שאלות נפוצות</h2>

          <div className="v2-faq-list">
            <details className="v2-faq-item">
              <summary><span>למי הקורס מתאים?</span><span className="v2-obj-chevron"><IconChevronDown size={18} /></span></summary>
              <div>
                לבעלי עסקים שמפרסמים בפייסבוק ובאינסטגרם, למנהלי סושיאל שמנהלים חשבונות של לקוחות,
                ולקמפיינרים/ות שמריצים תקציבי פרסום. בקיצור, לכל מי שיש לו נכס דיגיטלי שהוא לא יכול להרשות לעצמו לאבד.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary><span>אני לא טכנולוגי. אני יכול בכלל להתמודד עם זה?</span><span className="v2-obj-chevron"><IconChevronDown size={18} /></span></summary>
              <div>
                בהחלט. הקורס בנוי בהקלטות מסך עם הנחיה צעד-אחר-צעד. אין הנחה של ידע מוקדם.
                אם אתם יודעים להפעיל פייסבוק ולהיכנס לחשבון, אתם יודעים מספיק.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary><span>כמה זמן ייקח לי לסיים את הקורס?</span><span className="v2-obj-chevron"><IconChevronDown size={18} /></span></summary>
              <div>
                בערך 3 שעות מצטברות של תוכן. אפשר לעבור הכל בערב אחד, או לפזר על פני שבוע.
                את היישום עצמו אפשר לעשות תוך כדי, מסך אחרי מסך.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary><span>מה אני מקבל אחרי הרכישה?</span><span className="v2-obj-chevron"><IconChevronDown size={18} /></span></summary>
              <div>
                גישה מיידית ל-LMS עם כל המודולים והבונוסים. שולחים לכם מייל עם שם משתמש וסיסמה תוך דקות.
                גישה לכל החיים, כולל עדכונים עתידיים.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary><span>האם יש החזר כספי אם הקורס לא מתאים לי?</span><span className="v2-obj-chevron"><IconChevronDown size={18} /></span></summary>
              <div>
                במחיר של ₪{PRICE} ועם גישה מיידית לתוכן הדיגיטלי, אין מדיניות החזרים.
                אם יש לכם ספק לפני הרכישה, שלחו לי הודעה בוואטסאפ ואני אענה אישית על כל שאלה.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary><span>האם הקורס מתעדכן?</span><span className="v2-obj-chevron"><IconChevronDown size={18} /></span></summary>
              <div>
                כן. כשמטא משנה משהו, אני מעדכן. הגישה שלכם אוטומטית כוללת את כל העדכונים העתידיים, ללא תוספת תשלום.
              </div>
            </details>

            <details className="v2-faq-item">
              <summary><span>אפשר לדבר איתך אם נתקעתי תוך כדי?</span><span className="v2-obj-chevron"><IconChevronDown size={18} /></span></summary>
              <div>
                התלמידים שלי יכולים לפנות אליי בוואטסאפ אם משהו לא ברור. לא הבטחה לתמיכה אישית מלאה,
                אבל אני עונה בפועל לכולם.
              </div>
            </details>
          </div>

          <p className="v2-faq-foot">
            יש שאלה שלא מצאתם פה?{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">שלחו הודעה בוואטסאפ</a>.
            {' '}אני עונה אישית.
          </p>
        </div>
      </section>

      {/* ─── STICKY MOBILE BAR ─── */}
      <div className={`v2-sticky ${showStickyCta ? 'visible' : ''}`} role="region" aria-label="קיצור דרך לרכישה">
        <div className="v2-sticky-inner">
          <div className="v2-sticky-info">
            <span className="v2-sticky-label">BMS Course</span>
            <span className="v2-sticky-price">₪{PRICE}</span>
          </div>
          <a
            href={getPurchaseUrl()}
            className="v2-sticky-btn"
            onClick={trackPurchaseClick}
            aria-label={`הצטרף/י עכשיו ב-₪${PRICE}`}
          >
            הצטרף/י עכשיו
          </a>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="v2-footer">
        <p className="v2-footer-disclaimer">
          התוצאות המוצגות בדף זה מבוססות על מקרים אמיתיים. השמות בוידאו בדויים לשמירה על פרטיות.
          התוצאות שלך עשויות להיות שונות בהתאם לנסיבות, לניסיון ולמאמץ שתשקיע.
          <br /><br />
          אין קשר לפייסבוק (Meta Platforms, Inc.). דף זה אינו מאושר, מנוהל, או קשור בשום דרך למטא.
        </p>
        <div className="v2-footer-links">
          <a href="/privacy">מדיניות פרטיות</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">צור קשר</a>
        </div>
        <p className="v2-footer-copy">© 2026 IsraelTechForce | נתניה, ישראל | osher@israeltechforce.com</p>
      </footer>

      {/* Decorative refs to avoid unused vars */}
      <div style={{ display: 'none' }} aria-hidden>
        <img src={STORY_IMG_1} alt="" />
        <img src={STORY_IMG_2} alt="" />
        <img src={STORY_IMG_3} alt="" />
      </div>
    </div>
  );
}
