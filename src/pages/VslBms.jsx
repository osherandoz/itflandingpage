import { useEffect } from 'react';
import './VslBms.css';

// TODO: החלף בערכים אמיתיים לפני העלאה לאוויר
const VIDEO_EMBED_URL = ''; // למשל: https://player.vimeo.com/video/XXXXXXXXX
const PURCHASE_URL = '#'; // לינק חשבונית ירוקה / Smoove / סליקה
const HERO_IMAGE = '/images/vsl-bms/section_invitation.png';
const STORY_IMG_1 = '/images/vsl-bms/account_disabled.png';
const STORY_IMG_2 = '/images/vsl-bms/business_manager.png';
const STORY_IMG_3 = '/images/vsl-bms/osher_auth.png';
const AUTHOR_IMAGE = '/images/vsl-bms/osher_auth.png';

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
  useEffect(() => {
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

    return () => observer.disconnect();
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
              <div>🔊 תפעילו רמקולים, תכבו פלאפונים והפרעות</div>
              <div>ותצפו בהדרכה הזו עד הסוף — היא תחסוך לכם אלפי שקלים 🔊</div>
            </div>
            <div className="video-player">
              {VIDEO_EMBED_URL ? (
                <iframe
                  src={VIDEO_EMBED_URL}
                  title="VSL — BMS"
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
              <span className="arrow">←</span>
              <span>שתוק וקח את הכסף שלי</span>
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
            הגיע הזמן לסגור אותם — לבנות נכון, פעם אחת ולתמיד.
          </p>

          <img src={HERO_IMAGE} alt="קורס BMS — Business Manager Setup" className="invitation-image" loading="lazy" />

          <div className="invitation-content">
            <p>
              מעל <strong>2,500 עסקים</strong> כבר עברו את הנסיון הזה — חלקם איתי ישירות, חלקם דרך הכלים שבניתי.
              הדבר המשותף לכולם? <strong>אף אחד לא תכנן שזה יקרה.</strong>
            </p>

            <p>
              חשבון מודעות שיושבת. דף עסקי שנחסם. Business Manager שנפרץ ולוקח איתו את כל הנכסים.
              בכל פעם שאני מקבל פנייה כזאת — אני שואל את אותה שאלה:{' '}
              <strong>היה לכם BMS בנוי נכון?</strong>
            </p>

            <p>התשובה, כמעט תמיד, היא לא.</p>

            <p>
              <strong>BMS זה לא הגדרה טכנית. זה השקט הנפשי שמאחורי כל קמפיין.</strong><br />
              ובקורס הזה אני בונה אותו איתך — מסך אחרי מסך — עד שיש לך תשתית שאתם לא צריכים לדאוג לה יותר.
            </p>
          </div>

          <div className="black-card">
            <h2>הקורס מתאים לך אם:</h2>
            <p>את/ה מנהל/ת סושיאל שמנהל/ת חשבונות של לקוחות — ורוצה לישון בשקט בלילה.</p>
            <p>את/ה קמפיינר/ית שמריץ/ה תקציבי פרסום — ויודע/ת שהסיכון שחשבון יישבת הוא אמיתי.</p>
            <p>את/ה בעל/ת עסק שכל הלידים מגיעים מהדיגיטל — ולא מוכן/ה לסמוך על "יהיה בסדר".</p>

            <a href="#final-cta" className="cta-btn" onClick={trackLead}>
              <span className="arrow">←</span>
              <span>בנו את התשתית עכשיו</span>
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
            השלישית ידעה — אבל אף אחד לא הכין אותה.<br />
            שלושתן יכלו להימנע מזה לחלוטין.<span className="accent">"</span>
          </div>

          <p className="story-question">אז למה אני בכלל עוסק בזה?</p>

          <div className="story-text">
            <p>
              שמי אושר רווח. בן 31 מנתניה. <strong>חמש שנים אני עוסק בהצלת עסקים דיגיטליים.</strong>
              {' '}אבל לא התחלתי מתוך תשוקה לטכנולוגיה. התחלתי מתוך מצוקה.
            </p>

            <p>
              שנת 2020. אשתי בר, שהייתה בשיא הדרך שלה באינסטגרם — <strong>נחסמה.</strong>
              {' '}הגישה לחשבון פשוט נסגרה. ברגע אחד. לא היה שום דבר שהיא עשתה לא בסדר.
              ומשם — ניסיתי, חקרתי, ולא הפסקתי עד שהחזרתי לה את הכל.
            </p>

            <p>
              <strong>מאז אני עושה את זה לאחרים.</strong>
              {' '}מעל 2,500 עסקים שחזרו לפעול בדיגיטל. אבל עם הזמן הבנתי:
              לשחזר אחרי — זה לא מספיק.{' '}
              <strong>צריך לבנות נכון לפני.</strong>
            </p>

            <div className="photo-grid">
              <img src={STORY_IMG_1} alt="חשבון מושבת" loading="lazy" />
              <img src={STORY_IMG_2} alt="BM ריק" loading="lazy" />
              <img src={STORY_IMG_3} alt="אושר רווח" loading="lazy" />
              <span className="photo-tag">2020 → היום</span>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* CINEMATIC */}
      <section className="cinematic">
        <div className="cinematic-bg" style={{ backgroundImage: "url('/images/vsl-bms/cinematic_background.png')" }} />
        <div className="container">
          <p className="question-prompt">מה המכנה המשותף לכל שלושת המקרים?</p>

          <h2>
            לא נפרצו בגלל מזל רע.<br />
            הם נפלו בגלל תשתית שגויה.
          </h2>

          <div className="text-center" style={{ marginTop: 40 }}>
            <span className="anti-pill">ומה שכולם מחפשים — זה לא מה שהם צריכים</span>
          </div>

          <h3 className="text-center" style={{ marginTop: 30 }}>
            BMS זה לא <span className="gradient-text">קורס טכנולוגיה</span>.<br />
            זה הנשק שמבדיל בין מי שנשבר — למי שנשאר.
          </h3>

          <ul className="anti-list">
            <li>לא "הגדרות בייסיק שיש ביוטיוב בחינם"</li>
            <li>לא "מדריך ישן שכבר לא רלוונטי"</li>
            <li>לא "כלים שרק מומחים טכניים מבינים"</li>
            <li>לא "תיאוריה שאי אפשר ליישם מחר בבוקר"</li>
          </ul>
        </div>
      </section>

      {/* NUMBERS */}
      <section className="numbers-section">
        <div className="container">
          <h3>3 מקרים. 3 שיעורים. כולם יכלו להסתיים אחרת.</h3>

          <ul className="proof-bullets">
            <li>
              <span>
                <strong>גל — מנהלת סושיאל:</strong> קמפיין ב-80,000 ש"ח. חשבון מודעות ששותק.
                שלושה שבועות ערעורים — ואין מי שמדבר. מתן, הלקוח, כבר לא ביקש הצעת מחיר.
                BMS מוגדר נכון? הכל היה חוזר תוך 48 שעות.
              </span>
            </li>
            <li>
              <span>
                <strong>רחלי רז — בעלת עסק:</strong> הרצוג לא עזר. תמיכת מטא לא עזרה.
                שישה שבועות בחוץ. כלים שמלמדים בקורס? היו מחזירים אותה בשבוע הראשון.
              </span>
            </li>
            <li>
              <span>
                <strong>בל שיינר — קמפיינרית:</strong> לקוח ביקש להרים קמפיין. חשבון נחסם ביום השלישי.
                לא היה גיבוי. לא היה admin נוסף. ההפסד — אלפי שקלים.
                הכנה מוקדמת של שעה אחת? הייתה מונעת את הכל.
              </span>
            </li>
            <li>
              <span>
                <strong>המכנה המשותף:</strong> תשתית לא הייתה. BMS לא נבנה — או נבנה בחפזה.
                וכשמשהו השתבש — לא היה לאן לרוץ. זה הסיפור שחוזר על עצמו, שוב ושוב.
              </span>
            </li>
          </ul>

          <div className="stats-card">
            <div className="stat-item">
              <div className="stat-label">עסקים שוחזרו</div>
              <div className="stat-value">2,500+</div>
              <div className="stat-suffix">בחמש שנים</div>
            </div>
            <div className="divider" />
            <div className="stat-item">
              <div className="stat-label">אחוז הצלחה</div>
              <div className="stat-value">95%+</div>
              <div className="stat-suffix">במקרים שטיפלתי</div>
            </div>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* FRAMEWORK */}
      <section className="framework">
        <div className="container">
          <span className="label-pill">המתודולוגיה</span>
          <h2>
            כל מקרה כזה עובר<br />
            <span className="gradient-text">שלושה שלבים</span> מדויקים.
          </h2>

          <p className="lead">BMS נכון הוא לא רק מניעה — הוא גם תוכנית חירום כשקורה משהו.</p>

          <div className="circle-diagram">
            <span className="circle-label top">בנייה נכונה</span>

            <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="200" r="170" fill="none" stroke="#1e293b" strokeWidth="4" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="#2563eb" strokeWidth="3" />
              <path d="M 200 30 A 170 170 0 0 1 360 250" fill="none" stroke="#1e293b" strokeWidth="4" />
              <polygon points="350,235 365,260 340,265" fill="#1e293b" />
              <path d="M 200 370 A 170 170 0 0 1 40 150" fill="none" stroke="#1e293b" strokeWidth="4" />
              <polygon points="50,165 35,140 60,135" fill="#1e293b" />
            </svg>

            <span className="circle-label center">הגנה.</span>
            <span className="circle-label bottom">שחזור מהיר</span>
          </div>
        </div>
      </section>

      {/* AUTHORITY */}
      <section className="authority-section">
        <div className="container">
          <img src={AUTHOR_IMAGE} alt="אושר רווח — IsraelTechForce" className="authority-image" loading="lazy" />

          <div className="author-quote-card">
            <span className="small-label">למה אני כאן בכלל?</span>

            <div className="big-quote">
              "לא רציתי להיות מי שמחזיר.<br />
              רציתי להיות מי שמלמד איך לא להגיע לשם."
            </div>

            <p className="small-text">כשאשתי בר נחסמה ב-2020 — לא הייתה לי ברירה. ניסיתי. טעיתי. ניסיתי שוב.</p>
            <p className="small-text">ואחרי שהצלחתי — אנשים התחילו לפנות. ואחרי שהם פנו, הבנתי משהו חשוב:</p>
            <p className="small-text-bold">כולם מחפשים פתרון אחרי. אני רוצה לתת את הכלים לפני.</p>

            <p className="italic">
              "אני לא קוסם. אני לא לוחם סייבר עם טריקים מסתוריים.<br />
              אני פשוט יודע איך המערכת עובדת — ואיך לבנות נכון מההתחלה."
            </p>

            <p className="small-text-bold">זה לא שיווק. זה מה שאני עושה בפועל, כל יום.</p>

            <div className="closing-line">
              <span className="you-chant">"BMS."</span>
              <p className="small-text">לא עוד כלי. לא עוד קורס.</p>
              <p className="small-text-bold">הבסיס שיתן לכם לישון בשקט.</p>
            </div>

            <div className="stage-note">
              <strong>מה שתלמד בקורס הזה</strong> הוא בדיוק מה שהיה מציל את גל, את רחלי ואת בל —
              לפני שהם בכלל הגיעו אליי.
            </div>
          </div>

          <div className="cta-wrapper">
            <a href="#final-cta" className="cta-btn" onClick={trackLead}>
              <span className="arrow">←</span>
              <span>אני רוצה תשתית שעובדת — קחו אותי לקורס</span>
            </a>
          </div>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* DELIVERABLES — 7 modules */}
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
            {' '}אחרי הקורס — אתה מוכן. גם אם לא נגעת ב-Business Manager מעולם.
          </p>

          <div className="deliverable-item">
            <div className="deliverable-num">מודול 01</div>
            <h3 className="deliverable-title">מה זה Business Manager ולמה הוא קריטי</h3>
            <p className="deliverable-body">
              לא כולם יודעים למה BMS קיים. כאן תבינו — ומה קורה לעסקים שבחרו להתעלם.{' '}
              <strong>אחרי הפרק הזה, אתם בונים כי אתם מבינים. לא כי מישהו אמר לכם.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-num">מודול 02</div>
            <h3 className="deliverable-title">הקמה נכונה מאפס — צעד אחר צעד</h3>
            <p className="deliverable-body">
              בדיוק אילו הגדרות לבצע, באיזה סדר, ומה אסור לדלג עליו.{' '}
              <strong>Screen recording מלא — לא מה שאתה חושב שצריך, מה שבאמת עובד.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-num">מודול 03</div>
            <h3 className="deliverable-title">הרשאות נכונות — גם ללקוחות, גם לצוות</h3>
            <p className="deliverable-body">
              הטעות שגל עשתה — לתת הרשאות Admin לאנשים שלא צריכים אותן.{' '}
              <strong>תלמד בדיוק מי צריך מה, ואיך להגן על עצמך גם כשעובדים עם לקוחות.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-num">מודול 04</div>
            <h3 className="deliverable-title">גיבוי ותכנית חירום — מה לעשות כשמשהו קורה</h3>
            <p className="deliverable-body">
              מה שהיה מציל את בל. גיבוי נכון של נכסים, Admin נוסף, וסדר פעולות ברגע שמשהו נסגר.{' '}
              <strong>כי לפעמים זה קורה גם כשעשית הכל נכון — וצריך לדעת לאן לרוץ.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-num">מודול 05</div>
            <h3 className="deliverable-title">אבחון תקלות ופנייה נכונה למטא</h3>
            <p className="deliverable-body">
              מה שרחלי לא ידעה לעשות. איך לזהות סוג הבעיה, לאיזה ערוץ לפנות,
              ואיך לנסח ערעור שמישהו קורא בצד השני.{' '}
              <strong>לא כל פנייה נשמעת אותו דבר — הפרטים האלה קובעים הכל.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-num">מודול 06</div>
            <h3 className="deliverable-title">הכנה מוקדמת מול לקוח — מה לוודא לפני שמתחילים</h3>
            <p className="deliverable-body">
              רשימת בדיקה מלאה שאתה עובר עם כל לקוח חדש — לפני שאתה נוגע בחשבון.{' '}
              <strong>שעה של עבודה מראש שווה חודש של ערעורים אחרי.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-num">מודול 07</div>
            <h3 className="deliverable-title">שמירה שוטפת — איך מחזיקים את זה לאורך זמן</h3>
            <p className="deliverable-body">
              BMS נכון זה לא הגדרה חד-פעמית. מה לבדוק כל חודש, אילו שינויים לעקוב אחריהם,
              ואיך תמיד להיות מוכן.{' '}
              <strong>כי מי שנשאר מוכן — לא צריך להתקשר אליי בבהלה.</strong>
            </p>
          </div>

          <div className="text-center" style={{ marginTop: 60 }}>
            <h3>כל זה. בקורס אחד.</h3>
            <p style={{ marginTop: 16, color: 'var(--text-soft)' }}>
              מה שלמדתי מ-2,500 מקרים — ארוז בצורה שתוכל ליישם מחר בבוקר.
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
                <span className="label">7 מודולים מוקלטים — screen recording מלא</span>
                <span className="value">ערך ₪297</span>
              </div>
              <div className="value-row">
                <span className="label">רשימת בדיקה להכנה מוקדמת מול לקוח</span>
                <span className="value">ערך ₪97</span>
              </div>
              <div className="value-row">
                <span className="label">מדריך פנייה נכונה למטא — כולל תבניות</span>
                <span className="value">ערך ₪97</span>
              </div>
              <div className="value-row">
                <span className="label">תוכנית חירום: מה עושים כשמשהו קורה</span>
                <span className="value">ערך ₪97</span>
              </div>
              <div className="value-row">
                <span className="label">גישה לכל עדכון עתידי בקורס — לנצח</span>
                <span className="value">ללא הגבלה</span>
              </div>
            </div>

            <div className="value-box-price">
              <p className="strike">שווי אמיתי: <s>₪588</s></p>
              <p className="today-label">המחיר שלך היום:</p>
              <div className="price-num">₪{PRICE}</div>
              <p className="micro">תשלום חד-פעמי · כולל מע"מ · גישה מיידית</p>
            </div>
          </div>

          <div className="checklist">
            <div className="checklist-title">זה בשבילך אם:</div>
            <div className="checklist-item">את/ה מנהל/ת סושיאל שמנהל/ת חשבונות של לקוחות</div>
            <div className="checklist-item">את/ה קמפיינר/ית שעובד/ת עם חשבונות מודעות</div>
            <div className="checklist-item">את/ה בעל/ת עסק שמפרסם/ת בפייסבוק ואינסטגרם</div>
            <div className="checklist-item">רוצה להבין איך להגן על הנכסים הדיגיטליים שלך</div>
          </div>

          <a
            href={PURCHASE_URL}
            className="cta-btn"
            onClick={trackPurchase}
            style={{ marginTop: 40 }}
          >
            <span className="arrow">←</span>
            <span>תשלום אחד. תשתית לכל החיים. הצטרפו עכשיו ב-₪{PRICE}</span>
          </a>

          <div className="trust-row">
            <span>🔒 תשלום מאובטח</span>
            <span>🧾 חשבונית מס מיידית</span>
            <span>⚡ גישה מיידית לאחר התשלום</span>
          </div>

          <p className="whatsapp-line">
            יש שאלה לפני?{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">שלחו הודעה בוואטסאפ</a>
            {' '}— אושר עונה אישית.
          </p>
        </div>
      </section>

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
