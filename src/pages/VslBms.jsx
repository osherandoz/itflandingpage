import { useEffect, useState } from 'react';
import './VslBms.css';

/* ============================================================
   ICONS. Lucide-style monoline SVG, currentColor
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
const IconShield = (p) => (<Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></Icon>);
const IconReceipt = (p) => (<Icon {...p}><path d="M4 2v20l3-2 3 2 3-2 3 2 3-2 3 2V2" /><path d="M8 7h8M8 11h8M8 15h5" /></Icon>);
const IconZap = (p) => (<Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></Icon>);
const IconVolume = (p) => (<Icon {...p}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></Icon>);
const IconCheck = (p) => (<Icon {...p} strokeWidth={3}><polyline points="20 6 9 17 4 12" /></Icon>);
const IconX = (p) => (<Icon {...p} strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></Icon>);
const IconWhatsApp = (p) => (<Icon {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Icon>);
const IconLock = (p) => (<Icon {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>);
const IconTrendUp = (p) => (<Icon {...p}><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></Icon>);
const IconTarget = (p) => (<Icon {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Icon>);

// TODO: החלף בערכים אמיתיים לפני העלאה לאוויר
const VIDEO_EMBED_URL = '';
const PURCHASE_URL = 'https://mrng.to/engo98ytvh';
// Optimized WebPs (94% smaller than original PNGs). See public/images/vsl-bms/.
const HERO_IMAGE = '/images/vsl-bms/section_invitation-md.webp';
const STORY_IMG_1 = '/images/vsl-bms/account_disabled-sm.webp';
const STORY_IMG_2 = '/images/vsl-bms/business_manager-sm.webp';
const STORY_IMG_3 = '/images/vsl-bms/osher_auth-sm.webp';
const AUTHOR_IMAGE = '/images/vsl-bms/osher_auth-md.webp';

const PRICE = 197;
const WHATSAPP_URL = 'https://wa.me/972509823235';

function trackLead() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead');
  }
}

function trackPurchase() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', { value: PRICE, currency: 'ILS' });
  }
}

export default function VslBms() {
  const [showStickyCta, setShowStickyCta] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }
          });
        },
        { threshold: 0.1 }
      );

      const els = document.querySelectorAll(
        '.vsl-bms-page .deliverable-item, .vsl-bms-page .black-card, .vsl-bms-page .stats-card, .vsl-bms-page .author-quote-card'
      );
      els.forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        observer.observe(el);
      });

      const onScroll = () => setShowStickyCta(window.scrollY > 600);
      window.addEventListener('scroll', onScroll, { passive: true });

      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', onScroll);
      };
    }

    const onScroll = () => setShowStickyCta(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="vsl-bms-page">
      {/* TOP BANNER */}
      <div className="top-banner">
        <span>הדרכה חינמית: 3 מקרים אמיתיים שהיו יכולים להימנע ואיך BMS הוא ההבדל בין עסק שרץ קדימה לעסק שהולך אחורה</span>
      </div>

      {/* HERO + VSL */}
      <section className="hero">
        <h1>
          מנהלות סושיאל, בעלי עסקים או קמפיינרים?<br />
          <span className="gradient-text">הנכסים הדיגיטליים שלכם חשופים</span><br />
          ואתם כנראה לא יודעים את זה.
        </h1>

        <div className="container">
          <div className="video-wrapper">
            <div className="video-banner">
              <div className="vb-line"><IconVolume size={18} />תפעילו רמקולים, תכבו פלאפונים והפרעות</div>
              <div>ותצפו בהדרכה הזו עד הסוף. היא תחסוך לכם אלפי שקלים</div>
            </div>
            <div className="video-player">
              {VIDEO_EMBED_URL ? (
                <iframe
                  src={VIDEO_EMBED_URL}
                  title="VSL BMS"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="video-placeholder">[הוסף URL ל-VIDEO_EMBED_URL בקובץ VslBms.jsx]</div>
              )}
            </div>
          </div>

          <div className="cta-wrapper">
            <a href="#final-cta" className="cta-btn" onClick={trackLead}>
              <span>שתוק וקח את הכסף שלי</span>
              <span className="arrow"><IconArrowLeft size={18} /></span>
            </a>
          </div>
        </div>
      </section>

      {/* INVITATION + BLACK CARD */}
      <section className="invitation">
        <div className="container text-center">
          <h2>עכשיו אתם יודעים. השאלה היא מה עושים עם זה.</h2>

          <p className="subtitle">
            הפרצות קיימות. הסיכון אמיתי.<br />
            הגיע הזמן לסגור אותם, לבנות נכון, פעם אחת ולתמיד.
          </p>

          <img
            src={HERO_IMAGE}
            alt="קורס BMS, Business Manager Setup"
            className="invitation-image"
            width="960"
            height="640"
            loading="lazy"
            decoding="async"
          />

          <div className="invitation-content">
            <p>
              מעל <strong>2500 עסקים</strong> כבר עברו את הניסיון המר הזה. חלקם איתי ישרות, חלקם דרך הכלים שבניתי.
              הדבר המשותף לכולם? <strong>אין זמן טוב לאבד את הדיגיטל.</strong>
            </p>

            <p>
              דף עסקי שנחסם, חשבון אישי שהלך לעזאזל או ביזנס מנג'ר שנפרץ ולוקח איתו את כל הנכסים.
              בכל פעם שאני מקבל פנייה כזו, אני שואל אותה שאלה:{' '}
              <strong>הגדרתם את ה-BMS שלכם נכון?</strong>
            </p>

            <p>התשובה, כמעט תמיד, היא לא.</p>

            <p>
              <strong>BMS זה לא הגדרה טכנית. זה השקט הנפשי שמאחורי כל קמפיין.</strong><br />
              ובקורס הזה אני בונה את התשתית איתכם, מסך אחרי מסך, עד שלא תצטרכו לדאוג יותר.
            </p>
          </div>

          <div className="black-card">
            <h2>הקורס מתאים לך אם:</h2>
            <p>את/ה מנהל/ת סושיאל שמנהל/ת חשבונות של לקוחות, ורוצה לישון בשקט בלילה.</p>
            <p>את/ה קמפיינר/ית שמריץ/ה תקציבי פרסום, ויודע/ת שהסיכון שחשבון יישבת הוא אמיתי.</p>
            <p>את/ה בעל/ת עסק שכל הלידים מגיעים מהדיגיטל, ולא מוכן/ה לסמוך על "יהיה בסדר".</p>

            <a href="#final-cta" className="cta-btn" onClick={trackLead}>
              <span>בנו את התשתית עכשיו</span>
              <span className="arrow"><IconArrowLeft size={18} /></span>
            </a>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* STORY */}
      <section className="story-section">
        <div className="container">
          <div className="story-quote">
            <span className="accent">"</span>אחת לא ידעה. השנייה לא הספיקה.<br />
            השלישית ידעה, אבל אף אחד לא הכין אותה.<br />
            שלושתן יכלו להימנע מזה לחלוטין.<span className="accent">"</span>
          </div>

          <p className="story-question">אז למה אני בכלל עוסק בזה?</p>

          <div className="story-text">
            <p>
              שמי אושר רווח. בן 31 מנתניה. <strong>חמש שנים אני עוסק בהצלת עסקים דיגיטליים.</strong>
              {' '}אבל לא התחלתי מתוך תשוקה לטכנולוגיה. התחלתי מתוך מצוקה.
            </p>

            <p>
              שנת 2020. אשתי בר, שהייתה בשיא הדרך שלה באינסטגרם. <strong>נחסמה.</strong>
              {' '}הגישה לחשבון פשוט נסגרה. ברגע אחד. לא היה שום דבר שהיא עשתה לא בסדר.
              ומשם ניסיתי, חקרתי, ולא הפסקתי עד שהחזרתי לה את הכל.
            </p>

            <p>
              <strong>מאז אני עושה את זה לאחרים.</strong>
              {' '}מעל 2,500 עסקים שחזרו לפעול בדיגיטל. אבל עם הזמן הבנתי:
              לשחזר אחרי זה לא מספיק.{' '}
              <strong>צריך לבנות נכון לפני.</strong>
            </p>

            <p className="photo-caption">חמש שנים בשטח. אלו שלושת הסיפורים שאני רואה הכי הרבה: חשבונות שהושבתו, BM ריק, ואני בלילות הכי קשים שלהם.</p>

            <div className="photo-grid">
              <img src={STORY_IMG_1} alt="חשבון מושבת" width="480" height="480" loading="lazy" decoding="async" />
              <img src={STORY_IMG_2} alt="BM ריק" width="480" height="480" loading="lazy" decoding="async" />
              <img src={STORY_IMG_3} alt="אושר רווח" width="480" height="480" loading="lazy" decoding="async" />
            </div>
            <span className="photo-tag">2020 → היום</span>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* CINEMATIC */}
      <section className="cinematic">
        <div className="cinematic-bg" style={{ backgroundImage: "url('/images/vsl-bms/cinematic_background-md.webp')" }} />
        <div className="container">
          <p className="question-prompt">מה המכנה המשותף לכל שלושת המקרים?</p>

          <h2>
            לא נפרצו בגלל מזל רע.<br />
            הם נפלו בגלל תשתית שגויה.
          </h2>

          <div className="text-center" style={{ marginTop: 40 }}>
            <span className="anti-pill">ומה שכולם מחפשים, זה לא מה שהם צריכים</span>
          </div>

          <h3 className="text-center" style={{ marginTop: 30 }}>
            BMS זה לא <span className="gradient-text">קורס טכנולוגיה</span>.<br />
            זה הנשק שמבדיל בין מי שנשבר למי שנשאר.
          </h3>

          <ul className="anti-list">
            <li><span>לא "הגדרות בייסיק שיש ביוטיוב בחינם"</span><span className="anti-icon" aria-hidden="true"><IconX size={16} /></span></li>
            <li><span>לא "מדריך ישן שכבר לא רלוונטי"</span><span className="anti-icon" aria-hidden="true"><IconX size={16} /></span></li>
            <li><span>לא "כלים שרק מומחים טכניים מבינים"</span><span className="anti-icon" aria-hidden="true"><IconX size={16} /></span></li>
            <li><span>לא "תיאוריה שאי אפשר ליישם מחר בבוקר"</span><span className="anti-icon" aria-hidden="true"><IconX size={16} /></span></li>
          </ul>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="numbers-section">
        <div className="container">
          <h3>3 מקרים. 3 שיעורים. כולם יכלו להסתיים אחרת.</h3>
          <p className="disclaimer-note">המקרים אמיתיים. השמות בדויים לשמירה על חיסיון.</p>

          <ul className="proof-bullets">
            <li>
              <span className="bullet-icon" aria-hidden="true"><IconArrowLeft size={16} /></span>
              <span>
                <strong>לילך, יועצת עסקית ומנהלת דיגיטל:</strong> קמפיין ב-150,000 ש"ח שירדו לה מהאשראי בין לילה,
                עסק ששותק ולקוחות שעזבו. ולא רק זה, גם נעקצה על ידי "מקצוען" שהבטיח לסייע.
              </span>
            </li>
            <li>
              <span className="bullet-icon" aria-hidden="true"><IconArrowLeft size={16} /></span>
              <span>
                <strong>דליה אגם, בעלת עסק:</strong> חצי שנה היא חיפשה מי מחזיקה בדף העסקי של החברה שלה.
                פניות לתמיכה ופניות למחלקה המשפטית של מטא לא עזרו.
                עם הכלים של BMS היא לא הייתה מגיעה למצב הזה.
              </span>
            </li>
            <li>
              <span className="bullet-icon" aria-hidden="true"><IconArrowLeft size={16} /></span>
              <span>
                <strong>מאיה, קמפיינרית:</strong> החשבון של הלקוח שלה נחסם לא באשמתה,
                והיא נשאה בעלויות התיקון (אלפי שקלים).
                כל זה היה נמנע בעזרת הכנה מוקדמת עם BMS.
              </span>
            </li>
            <li className="proof-summary">
              <span className="bullet-icon" aria-hidden="true"><IconTarget size={16} /></span>
              <span>
                <strong>התירוץ של כולן היה:</strong> "זה עבד לי ככה עד עכשיו".
                וכשמשהו השתבש? הן לא ידעו מה לעשות ולמי לפנות. זה הסיפור שקורה יום יום.
              </span>
            </li>
          </ul>

          <div className="stats-card">
            <div className="stat-item">
              <div className="stat-icon" aria-hidden="true"><IconTrendUp size={22} /></div>
              <div className="stat-label">עסקים שוחזרו</div>
              <div className="stat-value">2,500+</div>
              <div className="stat-suffix">בחמש שנים</div>
            </div>
            <div className="divider" />
            <div className="stat-item">
              <div className="stat-icon" aria-hidden="true"><IconTarget size={22} /></div>
              <div className="stat-label">אחוז הצלחה</div>
              <div className="stat-value">95%+</div>
              <div className="stat-suffix">במקרים שטיפלתי</div>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* FRAMEWORK — 3-step methodology */}
      <section className="framework">
        <div className="container-wide">
          <div className="text-center">
            <span className="label-pill">המתודולוגיה</span>
          </div>
          <h2 className="text-center">
            BMS נכון הוא <span className="gradient-text">שלושה שלבים</span><br />
            שכל אחד מהם היה מונע את אחד המקרים.
          </h2>

          <p className="lead">לא תיאוריה. לא רעיון מופשט. תהליך מדויק שאתם עוברים איתי בקורס.</p>

          <div className="framework-steps">
            <div className="framework-step">
              <div className="step-num-pill">01</div>
              <div className="step-icon-wrap"><IconTarget size={26} /></div>
              <h3 className="step-title">בנייה נכונה</h3>
              <p className="step-body">
                תשתית שתוכננה מהיום הראשון. הרשאות, admin גיבוי, חיבורים נכונים.
              </p>
              <div className="step-link-back">
                <span className="step-link-label">היה מציל את</span>
                <strong>לילך</strong>
              </div>
            </div>

            <div className="step-connector" aria-hidden="true">
              <IconArrowLeft size={24} />
            </div>

            <div className="framework-step">
              <div className="step-num-pill">02</div>
              <div className="step-icon-wrap"><IconShield size={26} /></div>
              <h3 className="step-title">הגנה שוטפת</h3>
              <p className="step-body">
                בדיקות חודשיות, התראות, סדר. אתם יודעים בכל רגע מי מחזיק במה.
              </p>
              <div className="step-link-back">
                <span className="step-link-label">היה מציל את</span>
                <strong>דליה</strong>
              </div>
            </div>

            <div className="step-connector" aria-hidden="true">
              <IconArrowLeft size={24} />
            </div>

            <div className="framework-step">
              <div className="step-num-pill">03</div>
              <div className="step-icon-wrap"><IconZap size={26} /></div>
              <h3 className="step-title">שחזור מהיר</h3>
              <p className="step-body">
                כשמשהו משתבש, יש תוכנית. תבניות, ערוצים, סדר פעולות שעובד.
              </p>
              <div className="step-link-back">
                <span className="step-link-label">היה מציל את</span>
                <strong>מאיה</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="authority-section">
        <div className="container">
          <img
            src={AUTHOR_IMAGE}
            alt="אושר רווח, IsraelTechForce"
            className="authority-image"
            width="960"
            height="960"
            loading="lazy"
            decoding="async"
          />

          <div className="author-quote-card">
            <span className="small-label">למה אני כאן בכלל?</span>

            <div className="big-quote">
              "לא רציתי להיות מי שמחזיר.<br />
              רציתי להיות מי שמלמד איך לא להגיע לשם."
            </div>

            <p className="small-text">כשאשתי בר נחסמה ב-2020 לא הייתה לי ברירה. ניסיתי. טעיתי. ניסיתי שוב.</p>
            <p className="small-text">ואחרי שהצלחתי, אנשים התחילו לפנות. ואחרי שהם פנו, הבנתי משהו חשוב:</p>
            <p className="small-text-bold">כולם מחפשים פתרון אחרי. אני רוצה לתת את הכלים לפני.</p>

            <p className="italic">
              "אני לא קוסם. אני לא לוחם סייבר עם טריקים מסתוריים.<br />
              אני פשוט יודע איך המערכת עובדת, ואיך לבנות נכון מההתחלה."
            </p>

            <p className="small-text-bold">זה לא שיווק. זה מה שאני עושה בפועל, כל יום.</p>

            <div className="closing-line">
              <span className="you-chant">"BMS."</span>
              <p className="small-text">לא עוד כלי. לא עוד קורס.</p>
              <p className="small-text-bold">הבסיס שיתן לכם לישון בשקט.</p>
            </div>

            <div className="stage-note">
              <strong>מה שתלמד בקורס הזה</strong> הוא בדיוק מה שהיה מציל את לילך, את דליה ואת מאיה,
              לפני שהן בכלל הגיעו אליי.
            </div>
          </div>

          <div className="cta-wrapper">
            <a href="#final-cta" className="cta-btn" onClick={trackLead}>
              <span>אני רוצה תשתית שעובדת. קחו אותי לקורס</span>
              <span className="arrow"><IconArrowLeft size={18} /></span>
            </a>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* DELIVERABLES. 7 modules */}
      <section className="deliverables">
        <div className="container">
          <div className="text-center">
            <span className="section-label">מה בפנים</span>
          </div>

          <h2>
            בקורס BMS תצא עם<br />
            <span className="gradient-text">תשתית מוכנה</span><br />
            שעומדת בכל סיטואציה.
          </h2>

          <p className="lead">
            לא מצגות. לא תיאוריה. <strong>הדרכות ישירות, screen recording, יישום מידי.</strong>
            {' '}אחרי הקורס אתה מוכן. גם אם לא נגעת ב-Business Manager מעולם.
          </p>

          <div className="deliverable-item">
            <div className="deliverable-head">
              <span className="deliverable-num">מודול 01</span>
              <span className="deliverable-lessons">3 שיעורים</span>
            </div>
            <h3 className="deliverable-title">פרופיל אישי, היסוד של הכל</h3>
            <p className="deliverable-body">
              כל BMS בנוי על פרופיל אישי אחד. אם הוא חשוף, הכל חשוף.
              פותחים מהיסודות: תקנות, ותק, סטטוס חשבון, פרטים ואבטחה.{' '}
              <strong>הבסיס שאם הוא לא יציב, שום דבר אחר לא יחזיק.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-head">
              <span className="deliverable-num">מודול 02</span>
              <span className="deliverable-lessons">שיעור 1</span>
            </div>
            <h3 className="deliverable-title">הבידול העסקי</h3>
            <p className="deliverable-body">
              ההפרדה בין הפרטי לעסקי היא ההבדל בין עסק שמוגן לבין עסק שתלוי בכם אישית.{' '}
              <strong>למה זה קריטי, ואיך עושים את זה נכון, פעם אחת ולתמיד.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-head">
              <span className="deliverable-num">מודול 03</span>
              <span className="deliverable-lessons">2 שיעורים</span>
            </div>
            <h3 className="deliverable-title">מדברים ביזנס</h3>
            <p className="deliverable-body">
              ההבדל בין מרכז החשבונות לביזנס מנג'ר. איך מקימים תיק עסקי נכון,
              ואיך אוספים את כל הנכסים שלכם תחת קורת גג אחת.{' '}
              <strong>הצעד הטכני שלילך לא ידעה לעשות, וזה עלה לה ביוקר.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-head">
              <span className="deliverable-num">מודול 04</span>
              <span className="deliverable-lessons">3 שיעורים</span>
            </div>
            <h3 className="deliverable-title">ביזנס ופלד'ר</h3>
            <p className="deliverable-body">
              חשבון המודעות, הגדרתו ואמצעי התשלום. אנשים, שותפים, הרשאות. מידע על העסק ואבטחה.{' '}
              <strong>כאן הטעויות הכי יקרות נולדות. כאן גם נמנעות.</strong>
            </p>
          </div>

          {/* BONUS DIVIDER */}
          <div className="bonus-divider">
            <span className="bonus-divider-line" aria-hidden="true" />
            <span className="bonus-divider-text">
              <IconZap size={16} />
              ובחבילה גם, 3 בונוסים מתנה
            </span>
            <span className="bonus-divider-line" aria-hidden="true" />
          </div>

          <div className="deliverable-item bonus-item">
            <div className="deliverable-head">
              <span className="deliverable-num bonus-pill">בונוס 01</span>
              <span className="deliverable-lessons">3 שיעורים</span>
            </div>
            <h3 className="deliverable-title">פריצות וחסימות, מה לעשות כשמשהו קורה</h3>
            <p className="deliverable-body">
              הגדרות בסיסיות שחשוב לדעת בעולמות הפריצה.
              מה זו פריצה, איך היא נראית, ומה ההשלכות. מה זו חסימה, ולמה היא קורית.{' '}
              <strong>הידע שדליה לא הייתה צריכה לחפש במשך חצי שנה.</strong>
            </p>
          </div>

          <div className="deliverable-item bonus-item">
            <div className="deliverable-head">
              <span className="deliverable-num bonus-pill">בונוס 02</span>
              <span className="deliverable-lessons">3 שיעורים</span>
            </div>
            <h3 className="deliverable-title">טיפים וטריקים מבפנים</h3>
            <p className="deliverable-body">
              אישור פעילות לרישום בביזנס מנג'ר. אימות דו-שלבי בכניסה.
              והחזרת גישה לנכסים דרך האינסטגרם, אם בכל זאת משהו השתבש.{' '}
              <strong>הקטנים שעושים את ההבדל בין שעה של פאניקה ל-5 דקות של תיקון.</strong>
            </p>
          </div>

          <div className="deliverable-item bonus-item">
            <div className="deliverable-head">
              <span className="deliverable-num bonus-pill">בונוס 03</span>
              <span className="deliverable-lessons">הרצאת אורח</span>
            </div>
            <h3 className="deliverable-title">בר שלג: הוקים (Hooks)</h3>
            <p className="deliverable-body">
              שיעור אורח בלעדי מבר שלג על איך לכתוב Hooks שבאמת מושכים תשומת לב.{' '}
              <strong>כי תשתית טובה זה חצי מהמשחק. החצי השני הוא תוכן שגורם לאנשים לעצור.</strong>
            </p>
          </div>

          <div className="text-center" style={{ marginTop: 60 }}>
            <h3>הכל בחבילה אחת.</h3>
            <div className="course-stats">
              <span className="course-stat"><strong>4</strong> מודולי יסוד</span>
              <span className="course-stat-divider" aria-hidden="true">·</span>
              <span className="course-stat"><strong>3</strong> בונוסים</span>
              <span className="course-stat-divider" aria-hidden="true">·</span>
              <span className="course-stat"><strong>15</strong> שיעורים</span>
            </div>
            <p style={{ marginTop: 16, color: 'var(--text-soft)' }}>
              מה שלמדתי מ-2,500 מקרים, ארוז בצורה שתיישמו מחר בבוקר.
            </p>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* FINAL CTA */}
      <section className="final-cta" id="final-cta">
        <div className="container">
          <h2>
            מוכן/ה לבנות<br />
            <span className="gradient-text">תשתית שאי אפשר לשבור</span>?
          </h2>

          <div className="value-box">
            <div className="value-box-header">
              <p>מה שלוקחים הביתה</p>
            </div>

            <div className="value-box-rows">
              <div className="value-row">
                <span className="label">4 מודולי יסוד, 9 שיעורים מוקלטים (screen recording מלא)</span>
                <span className="value">ערך ₪297</span>
              </div>
              <div className="value-row value-bonus">
                <span className="label"><span className="bonus-tag">בונוס 01</span> מודול פריצות וחסימות</span>
                <span className="value">ערך ₪97</span>
              </div>
              <div className="value-row value-bonus">
                <span className="label"><span className="bonus-tag">בונוס 02</span> מודול טיפים וטריקים</span>
                <span className="value">ערך ₪97</span>
              </div>
              <div className="value-row value-bonus">
                <span className="label"><span className="bonus-tag">בונוס 03</span> הרצאת אורח של בר שלג</span>
                <span className="value">ערך ₪147</span>
              </div>
              <div className="value-row">
                <span className="label">גישה לכל עדכון עתידי בקורס, לנצח</span>
                <span className="value">ללא הגבלה</span>
              </div>
            </div>

            <div className="value-box-price">
              <p className="strike">שווי אמיתי: <s>₪638</s></p>
              <p className="today-label">המחיר שלך היום:</p>
              <div className="price-num">₪{PRICE}</div>
              <p className="micro">תשלום חד-פעמי · כולל מע"מ · גישה מיידית</p>
            </div>
          </div>

          <div className="checklist">
            <div className="checklist-title">זה בשבילך אם:</div>
            <div className="checklist-item"><span className="check-icon" aria-hidden="true"><IconCheck size={14} /></span><span>את/ה מנהל/ת סושיאל שמנהל/ת חשבונות של לקוחות</span></div>
            <div className="checklist-item"><span className="check-icon" aria-hidden="true"><IconCheck size={14} /></span><span>את/ה קמפיינר/ית שעובד/ת עם חשבונות מודעות</span></div>
            <div className="checklist-item"><span className="check-icon" aria-hidden="true"><IconCheck size={14} /></span><span>את/ה בעל/ת עסק שמפרסם/ת בפייסבוק ואינסטגרם</span></div>
            <div className="checklist-item"><span className="check-icon" aria-hidden="true"><IconCheck size={14} /></span><span>רוצה להבין איך להגן על הנכסים הדיגיטליים שלך</span></div>
          </div>

          <a
            href={PURCHASE_URL}
            className="cta-btn"
            onClick={trackPurchase}
            style={{ marginTop: 40 }}
          >
            <span>הצטרפו לקורס ב-₪{PRICE}</span>
            <span className="arrow"><IconArrowLeft size={18} /></span>
          </a>

          <p className="cta-consent-note">
            ברכישה את/ה מסכימ/ה לקבל עדכונים שיווקיים מאיתנו. ניתן להסיר בכל עת.
          </p>

          <div className="trust-bar">
            <div className="trust-item">
              <IconLock size={18} />
              <span>תשלום מאובטח</span>
            </div>
            <div className="trust-divider" aria-hidden="true" />
            <div className="trust-item">
              <IconReceipt size={18} />
              <span>חשבונית מס מיידית</span>
            </div>
            <div className="trust-divider" aria-hidden="true" />
            <div className="trust-item">
              <IconZap size={18} />
              <span>גישה מיידית</span>
            </div>
          </div>

          <div className="whatsapp-cta-wrapper">
            <p className="whatsapp-prompt">יש שאלה לפני שמצטרפים?</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-cta" aria-label="פתח שיחה בוואטסאפ">
              <IconWhatsApp size={20} />
              <span>שלחו הודעה. אושר עונה אישית</span>
            </a>
          </div>
        </div>
      </section>

      {/* STICKY MOBILE CTA */}
      <div className={`sticky-cta ${showStickyCta ? 'visible' : ''}`} role="region" aria-label="קיצור דרך לרכישה">
        <a
          href="#final-cta"
          className="sticky-cta-btn"
          onClick={trackLead}
          aria-label={`הצטרפו לקורס BMS ב-${PRICE} שקלים`}
        >
          <span>הצטרפו ב-₪{PRICE}</span>
          <IconArrowLeft size={16} />
        </a>
      </div>

      {/* FOOTER */}
      <footer className="vsl-footer">
        <p className="disclaimer">
          התוצאות המוצגות בדף זה מבוססות על מקרים אמיתיים. השמות בוידאו בדויים לשמירה על פרטיות.
          התוצאות שלך עשויות להיות שונות בהתאם לנסיבות, לניסיון ולמאמץ שתשקיע.
          <br /><br />
          אין קשר לפייסבוק (Meta Platforms, Inc.). דף זה אינו מאושר, מנוהל, או קשור בשום דרך למטא.
        </p>

        <div className="legal-links">
          <a href="/privacy">מדיניות פרטיות</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">צור קשר</a>
        </div>

        <p className="copyright">
          © 2026 IsraelTechForce | נתניה, ישראל | osher@israeltechforce.com
        </p>
      </footer>
    </div>
  );
}
