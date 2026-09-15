import { useEffect, useState } from 'react';
import { withCampaignParams } from '../utils/track';
// Heebo heading weights, self-hosted (400/700 already loaded in root)
import '@fontsource/heebo/800.css';
import '@fontsource/heebo/900.css';
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
const IconPlay = (p) => (<Icon {...p} fill="currentColor" stroke="none"><polygon points="6 3 20 12 6 21 6 3" /></Icon>);
const IconCheck = (p) => (<Icon {...p} strokeWidth={3}><polyline points="20 6 9 17 4 12" /></Icon>);
const IconWhatsApp = (p) => (<Icon {...p}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></Icon>);
const IconLock = (p) => (<Icon {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></Icon>);
const IconTarget = (p) => (<Icon {...p}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></Icon>);

const VIDEO_ID = '7Ac7-Kdl1-c';
// 606s on YouTube, checked 2026-09-15. Update if the video is replaced.
const VIDEO_MINUTES = 10;
const VIDEO_TITLE = 'השיטה שתצמצם לכם את הסיכוי להיחסם או להיפרץ בפייסבוק ובאינסטגרם';
// Landing-page variant tag. Kept OUT of utm_content so the ad creative's own
// utm_content survives into checkout (creative attribution and page variant
// are separate dimensions). V2 tags itself the same way.
const LP_VARIANT = 'v1-mistake-headline';
const PURCHASE_URL = `https://mrng.to/engo98ytvh?variant=${LP_VARIANT}`;
// Optimized WebPs (94% smaller than original PNGs). See public/images/vsl-bms/.
const HERO_IMAGE = '/images/vsl-bms/section_invitation-md.webp';
const STORY_IMG_1 = '/images/vsl-bms/account_disabled-sm.webp';
const STORY_IMG_2 = '/images/vsl-bms/business_manager-sm.webp';
const STORY_IMG_3 = '/images/vsl-bms/osher_auth-sm.webp';
const AUTHOR_IMAGE = '/images/vsl-bms/osher_with_laptop-md.webp';

const PRICE = 197;
const WHATSAPP_URL = 'https://wa.me/972509823235';

// In-page anchor clicks, custom event, NOT Lead (Lead fires only on thank-you-lead)
function trackCtaClick() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('trackCustom', 'CTAClick');
  }
}

// Click on a checkout link. `cta` = which button (hero / author / pricing / sticky).
// Purchase itself fires server-side from the payment webhook, never here.
function trackInitiateCheckout(cta) {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', { value: PRICE, currency: 'ILS', content_name: 'BMS Course', cta, lp_variant: LP_VARIANT });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: 'ILS',
      value: PRICE,
      cta,
      lp_variant: LP_VARIANT,
      items: [{ item_id: 'bms-course', item_name: 'BMS Course', price: PRICE, quantity: 1 }],
    });
  }
}

export default function VslBms() {
  const [showStickyCta, setShowStickyCta] = useState(false);
  const [heroAnimating, setHeroAnimating] = useState(false);
  // Sticky retires while the real purchase section is on screen.
  const [finalCtaInView, setFinalCtaInView] = useState(false);
  // YouTube player is only loaded after the visitor presses play (keeps the
  // third-party script out of the initial load).
  const [videoStarted, setVideoStarted] = useState(false);
  // Client-only: carry the visitor's utm_* into checkout
  const [purchaseUrl, setPurchaseUrl] = useState(PURCHASE_URL);
  useEffect(() => setPurchaseUrl(withCampaignParams(PURCHASE_URL)), []);
  const checkout = (cta) => `${purchaseUrl}&cta=${cta}`;

  function startVideo() {
    setVideoStarted(true);
    if (typeof window.gtag === 'function') window.gtag('event', 'video_start', { video_title: 'VSL BMS' });
  }

  useEffect(() => {
    const finalCta = document.getElementById('final-cta');
    if (!finalCta) return;
    const ctaObserver = new IntersectionObserver(
      ([entry]) => setFinalCtaInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    ctaObserver.observe(finalCta);
    return () => ctaObserver.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        },
        { threshold: 0.1 }
      );

      requestAnimationFrame(() => setHeroAnimating(true));

      const els = document.querySelectorAll(
        [
          '.vsl-bms-page .deliverable-item',
          '.vsl-bms-page .black-card',
          '.vsl-bms-page .authority-strip',
          '.vsl-bms-page .author-quote-card',
          '.vsl-bms-page .framework-step',
          '.vsl-bms-page .proof-bullets li',
          '.vsl-bms-page .anti-list li',
          '.vsl-bms-page .cinematic h2',
          '.vsl-bms-page .cinematic .question-prompt',
          '.vsl-bms-page .cinematic .anti-pill',
        ].join(', ')
      );
      els.forEach((el) => {
        el.classList.add('reveal-on-scroll');
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
    <div className={`vsl-bms-page${heroAnimating ? ' hero-animate' : ''}`}>
      {/* TOP BANNER */}
      <div className="top-banner" role="banner">
        <span>הדרכה חינמית ({VIDEO_MINUTES} דקות): למה נכסי הפרסום שלכם חשופים, ואיך קורס BMS (Business Manager Setup) מצמצם את הסיכון</span>
      </div>

      <main>

      {/* HERO + VSL */}
      <section className="hero">
        <span className="label-pill hero-kicker">קורס מוקלט בעברית · כ-3 שעות · ₪{PRICE} תשלום אחד</span>
        <h1>
          קורס BMS: מגדירים Business Manager נכון,<br />
          <span className="gradient-text">לפני שהעסק נחסם</span>
        </h1>
        <p className="hero-sub">
          חשבון פייסבוק פרוץ, אינסטגרם חסום, Business Manager קפוא.
          ברוב המקרים שאני פוגש זו הגדרה או הרשאה שאפשר היה לבדוק מראש. כאן לומדים לבדוק.
        </p>

        <div className="container">
          <div className="video-wrapper">
            <div className="video-banner">
              <div className="vb-line"><IconVolume size={18} />הדרכה חינמית, {VIDEO_MINUTES} דקות, עם כתוביות</div>
              <div>{VIDEO_TITLE}</div>
            </div>
            <div className="video-player">
              {videoStarted ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&cc_load_policy=1&cc_lang_pref=he`}
                  title={VIDEO_TITLE}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button type="button" className="video-facade" onClick={startVideo} aria-label={`הפעלת ההדרכה, ${VIDEO_MINUTES} דקות`}>
                  <img
                    src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt=""
                    width="1280"
                    height="720"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span className="video-facade-play"><IconPlay size={22} />הפעילו את ההדרכה · {VIDEO_MINUTES} דקות</span>
                </button>
              )}
            </div>
          </div>

          <div className="video-summary">
            <p className="video-summary-title">הקורס בשורה לכל שאלה:</p>
            <ul>
              <li><strong>מה זה:</strong> קורס מוקלט בעברית על הקמה ואבטחה של נכסי Meta: Business Manager, חשבון מודעות, אנשים והרשאות. BMS הוא השם של הקורס והשיטה, לא כלי של מטא.</li>
              <li><strong>למי:</strong> בעלי עסקים שמפרסמים, מנהלי סושיאל עם חשבונות של לקוחות, וקמפיינרים.</li>
              <li><strong>מה מיישמים:</strong> בדיקת בעלות על הנכסים, סידור הרשאות, הגנה על הפרופיל והחשבון, ותוכנית פעולה ליום שמשהו משתבש.</li>
              <li><strong>כמה זמן:</strong> כ-3 שעות. 15 שיעורים והרצאת אורח. את היישום עושים תוך כדי צפייה.</li>
              <li><strong>מה זה לא:</strong> שחזור אישי של חשבון שכבר נחסם. זה שירות נפרד, ואפשר לשאול עליו בוואטסאפ.</li>
            </ul>
            <p className="video-summary-price">₪{PRICE}. תשלום אחד, כולל מע"מ. אחרי התשלום מגיע מייל עם פרטי הגישה, ומתחילים.</p>
          </div>

          <div className="cta-wrapper">
            <a href={checkout('hero')} className="cta-btn cta-btn-glow" onClick={() => trackInitiateCheckout('hero')}>
              <span>הצטרפו לקורס ב-₪{PRICE}</span>
              <span className="arrow"><IconArrowLeft size={18} /></span>
            </a>
            <a href="#deliverables" className="hero-secondary-link" onClick={trackCtaClick}>
              מה בדיוק יש בקורס? לסילבוס המלא
            </a>
          </div>
        </div>
      </section>

      {/* INVITATION + BLACK CARD */}
      <section className="invitation">
        <div className="container text-center">
          <h2>מוכנים לצעד הבא?</h2>

          <p className="subtitle">
            יש לכם הזדמנות לצמצם את הסיכון, לסגור את הפרצות,<br />
            לבנות נכון ומדויק, ולתחזק את זה בשגרה.
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
              מעל <strong>2,500 חשבונות</strong> כבר עברו את הניסיון המר הזה. חלקם איתי ישירות, חלקם דרך הכלים שבניתי.
              הדבר המשותף לכולם? <strong>אין זמן טוב לאבד את הדיגיטל.</strong>
            </p>

            <p>
              דף עסקי שנחסם, חשבון אישי שהלך לעזאזל או ביזנס מנג'ר שנפרץ ולוקח איתו את כל הנכסים.
              בכל פעם שאני מקבל פנייה כזו, אני שואל אותה שאלה:{' '}
              <strong>הגדרתם את ה-BMS שלכם נכון?</strong>
            </p>

            <p>התשובה, כמעט תמיד, היא לא.</p>

            <p>
              <strong>BMS זה לא רק הגדרה טכנית. זה הסדר שמאחורי כל קמפיין.</strong><br />
              ובקורס הזה אני בונה את התשתית איתכם, מסך אחרי מסך, עד שיש לכם סדר, גיבוי ותוכנית ליום שמשהו משתבש.
            </p>
          </div>

          <div className="black-card">
            <h2>הקורס מתאים לכם אם:</h2>
            <p>אתם מנהלים סושיאל ומנהלים חשבונות של לקוחות, ורוצים לישון בשקט בלילה.</p>
            <p>אתם קמפיינרים שמריצים תקציבי פרסום, ויודעים שהסיכון שחשבון יישבת הוא אמיתי.</p>
            <p>אתם בעלי עסק שכל הלידים מגיעים מהדיגיטל, ולא מוכנים לסמוך על "יהיה בסדר".</p>
          </div>
        </div>
      </section>

      <div className="gradient-divider" aria-hidden="true" />

      {/* NUMBERS, the 3 cases */}
      <section className="numbers-section">
        <div className="container">
          <h2>3 מקרים. 3 שיעורים. כולם יכלו להסתיים אחרת.</h2>
          <p className="disclaimer-note">המקרים אמיתיים. השמות בדויים לשמירה על חיסיון.</p>

          <ul className="proof-bullets">
            <li>
              <span className="bullet-icon" aria-hidden="true"><IconArrowLeft size={16} /></span>
              <span>
                <strong>לילך, יועצת עסקית ומנהלת דיגיטל:</strong> קמפיין ב-150,000 ש"ח שירדו לה מהאשראי בין לילה,
                עסק ששותק ולקוחות שעזבו. ולא רק זה, גם נעקצה על ידי "מקצוען" שהבטיח לסייע.
                הסיכון: חשבון מודעות ואמצעי תשלום שלא היו מוגדרים תחת תיק עסקי מסודר.
              </span>
            </li>
            <li>
              <span className="bullet-icon" aria-hidden="true"><IconArrowLeft size={16} /></span>
              <span>
                <strong>דליה אגם, בעלת עסק:</strong> חצי שנה היא חיפשה מי מחזיקה בדף העסקי של החברה שלה.
                פניות לתמיכה ופניות למחלקה המשפטית של מטא לא עזרו.
                הסיכון: אף אחד לא ידע מי הבעלים של הנכסים. בדיקת בעלות והרשאות, שנלמדת בקורס, מגלה את זה בדקות.
              </span>
            </li>
            <li>
              <span className="bullet-icon" aria-hidden="true"><IconArrowLeft size={16} /></span>
              <span>
                <strong>מאיה, קמפיינרית:</strong> החשבון של הלקוח שלה נחסם לא באשמתה,
                והיא נשאה בעלויות התיקון (אלפי שקלים).
                הסיכון: אין הסכם הרשאות ואין תוכנית תגובה. שני הדברים שמכינים מראש בקורס.
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

          <div className="authority-strip">
            <div className="authority-statement">
              <span className="authority-number">2,500+</span>
              <span className="authority-text">חשבונות שחזרו לפעול בדיגיטל, מאז 2020</span>
            </div>
            <div className="authority-statement">
              <span className="authority-number">95%+</span>
              <span className="authority-text">מהמקרים שקיבלתי לטיפול אחרי אבחון הסתיימו בשחזור</span>
            </div>
          </div>
        </div>
      </section>

      {/* CINEMATIC */}
      <section className="cinematic">
        <div className="cinematic-bg" style={{ backgroundImage: "url('/images/vsl-bms/cinematic_background-md.webp')" }} />
        <div className="container">
          <p className="question-prompt">מה המכנה המשותף לכל שלושת המקרים?</p>

          <h2>
            הם לא נפרצו בגלל מזל רע.<br />
            הם נפלו בגלל הגדרות והרשאות שאף אחד לא בדק.
          </h2>

          <div className="text-center" style={{ marginTop: 40 }}>
            <span className="anti-pill">ומה שכולם מחפשים, זה לא מה שהם צריכים</span>
          </div>
        </div>
      </section>

      {/* FRAMEWORK, 3-step methodology */}
      <section className="framework">
        <div className="container-wide">
          <div className="text-center">
            <span className="label-pill">המתודולוגיה</span>
          </div>
          <h2 className="text-center">
            BMS נכון הוא שלושה שלבים,<br />
            וכל אחד מהם מטפל בסיכון שהפיל את אחד המקרים.
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
                <span className="step-link-label">הסיכון שהפיל את</span>
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
                <span className="step-link-label">הסיכון שהפיל את</span>
                <strong>דליה</strong>
              </div>
            </div>

            <div className="step-connector" aria-hidden="true">
              <IconArrowLeft size={24} />
            </div>

            <div className="framework-step">
              <div className="step-num-pill">03</div>
              <div className="step-icon-wrap"><IconZap size={26} /></div>
              <h3 className="step-title">תגובה לתקלה</h3>
              <p className="step-body">
                כשמשהו משתבש, יש סדר פעולות: מה בודקים בשעה הראשונה, איפה מגישים ערעור, ומתי מסלימים.
              </p>
              <div className="step-link-back">
                <span className="step-link-label">הסיכון שהפיל את</span>
                <strong>מאיה</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERABLES. 7 modules */}
      <section className="deliverables" id="deliverables">
        <div className="container">
          <div className="text-center">
            <span className="section-label">מה בפנים</span>
          </div>

          <h2>
            בקורס BMS יוצאים עם<br />
            תשתית מסודרת<br />
            ותוכנית ליום שמשהו משתבש.
          </h2>

          <div className="featured-callout">
            <div className="featured-callout-line"><strong>לא מצגות. לא תיאוריה.</strong></div>
            <div className="featured-callout-main">הדרכות ישירות, הקלטת מסך, יישום מיידי.</div>
            <div className="featured-callout-line">אחרי הקורס אתם מוכנים. גם אם לא נגעתם ב-Business Manager מעולם.</div>
          </div>

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
            <h3 className="deliverable-title">הפרדה בין הפרטי לעסקי</h3>
            <p className="deliverable-body">
              ההפרדה בין הפרטי לעסקי היא ההבדל בין עסק שמוגן לבין עסק שתלוי בכם אישית.{' '}
              <strong>למה זה קריטי, איך עושים את זה נכון, ואיך שומרים על זה כשהעסק גדל.</strong>
            </p>
          </div>

          <div className="deliverable-item">
            <div className="deliverable-head">
              <span className="deliverable-num">מודול 03</span>
              <span className="deliverable-lessons">2 שיעורים</span>
            </div>
            <h3 className="deliverable-title">הקמת Business Manager ואיסוף הנכסים</h3>
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
            <h3 className="deliverable-title">חשבון מודעות, תשלום, אנשים והרשאות</h3>
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
            <h3 className="deliverable-title">אימות דו-שלבי, אישורי פעילות והחזרת גישה דרך אינסטגרם</h3>
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
              שיעור אורח מבר שלג על איך לכתוב Hooks שמושכים תשומת לב.{' '}
              <strong>תוספת מעבר לליבת הקורס: תשתית טובה זה חצי מהמשחק, והחצי השני הוא תוכן שגורם לאנשים לעצור.</strong>
            </p>
          </div>

          <div className="text-center" style={{ marginTop: 60 }}>
            <h3>הכל בחבילה אחת.</h3>
            <div className="course-stats">
              <span className="course-stat"><strong>4</strong> מודולי יסוד</span>
              <span className="course-stat-divider" aria-hidden="true">·</span>
              <span className="course-stat"><strong>3</strong> בונוסים</span>
              <span className="course-stat-divider" aria-hidden="true">·</span>
              <span className="course-stat"><strong>15</strong> שיעורים + הרצאת אורח</span>
            </div>
            <p style={{ marginTop: 16, color: 'var(--text-soft)' }}>
              מה שלמדתי מ-2,500 מקרים, ארוז בצורה שתיישמו מחר בבוקר.
            </p>
          </div>
        </div>
      </section>

      <div className="gradient-divider" aria-hidden="true" />

      {/* STORY, founder, told once */}
      <section className="story-section">
        <div className="container">
          <h2 className="story-headline">למה לסמוך עליי?</h2>

          <div className="story-text">
            <p>
              אני אושר רווח, בן 31 מנתניה. <strong>מאז 2020 אני עוסק בהצלת עסקים דיגיטליים.</strong>
              {' '}לפני זה הייתי מתכנת בהייטק. אבל לא התחלתי מתוך תשוקה לטכנולוגיה. התחלתי מתוך מצוקה.
            </p>

            <p>
              שנת 2020. אשתי בר, שהייתה בשיא שלה כיוצרת תוכן. <strong>נחסמה.</strong>
              {' '}הגישה לחשבון פשוט נסגרה. ברגע אחד. לא היה שום דבר שהיא עשתה לא בסדר.
              ניסיתי, חקרתי, ולא הפסקתי עד שהחשבון חזר.
            </p>

            <p>
              <strong>מאז אני עושה את זה לאחרים.</strong>
              {' '}מעל 2,500 חשבונות שחזרו לפעול בדיגיטל. אבל עם הזמן החלטתי לחקור,
              אם אני פוגש את הלקוח רק אחרי, מה בעצם קורה שם לפני?
            </p>

            <p>
              בניתי רשימת בדיקות מסודרת שמצמצמת באופן משמעותי את הסיכון לחסימות ופריצות.
              {' '}<strong>כי אנשים לא נחסמים סתם. ברוב המקרים יש הגדרה או הרשאה שאפשר היה לבדוק מראש.</strong>
            </p>

            <p className="photo-caption">
              לילות כימים עם אלפי בעלי עסקים עם BM (ביזנס מנג'ר) מושבת,
              ואלפי שקלים שהם יכלו להרוויח. לא חבל?
            </p>

            <div className="photo-grid">
              <img src={STORY_IMG_1} alt="צילום מסך של חשבון פייסבוק מושבת" width="480" height="480" loading="lazy" decoding="async" />
              <img src={STORY_IMG_2} alt="Business Manager ריק ללא נכסים" width="480" height="480" loading="lazy" decoding="async" />
              <img src={STORY_IMG_3} alt="אושר רווח עובד על שחזור חשבון לקוח" width="480" height="480" loading="lazy" decoding="async" />
            </div>
            <span className="photo-tag">מ-2020 ועד היום</span>
          </div>
        </div>
      </section>

      <div className="gradient-divider" aria-hidden="true" />

      {/* AUTHORITY, quote + mid-page purchase button */}
      <section className="authority-section">
        <div className="container">
          <img
            src={AUTHOR_IMAGE}
            alt="אושר רווח, IsraelTechForce"
            className="authority-image"
            width="960"
            height="1440"
            loading="lazy"
            decoding="async"
          />

          <div className="author-quote-card">
            <h2 className="small-label">למה אני כאן בכלל?</h2>

            <div className="big-quote">
              לא רציתי להיות מי שמחזיר את החשבונות.<br />
              רציתי להיות מי שמלמד איך לא להגיע לשם.
            </div>

            <p className="small-text-bold">כולם מחפשים פתרון אחרי. אני רוצה לתת את הכלים לא להגיע לשם.</p>

            <p className="italic">
              אני לא קוסם. אני לא לוחם סייבר עם טריקים מסתוריים.<br />
              אני פשוט יודע איך המערכת עובדת, ואיך לבנות נכון מההתחלה.
            </p>

            <p className="small-text-bold">זה לא שיווק. זה מה שאני עושה בפועל, כל יום.</p>

            <div className="closing-line">
              <span className="you-chant">BMS</span>
              <p className="small-text">לא עוד כלי. לא עוד קורס.</p>
              <p className="small-text-bold">הבסיס שמסדר את הנכסים ומכין אתכם ליום רע.</p>
            </div>

            <div className="stage-note">
              <strong>מה שתלמד בקורס הזה</strong> מטפל בדיוק בסיכונים שהפילו את לילך, את דליה ואת מאיה,
              לפני שהן בכלל הגיעו אליי.
            </div>
          </div>

          <div className="cta-wrapper">
            <a href={checkout('author')} className="cta-btn" onClick={() => trackInitiateCheckout('author')}>
              <span>הצטרף לקורס עכשיו, {PRICE} ש"ח בלבד</span>
              <span className="arrow"><IconArrowLeft size={18} /></span>
            </a>
          </div>
        </div>
      </section>

      <div className="gradient-divider" aria-hidden="true" />

      {/* FINAL CTA. Price + button first, value breakdown and proof underneath */}
      <section className="final-cta" id="final-cta">
        <div className="container">
          <h2>
            מוכנים לבנות<br />
            <span className="gradient-text">תשתית שמחזיקה גם ביום רע</span>?
          </h2>

          <div className="offer-head">
            <div className="value-box-price">
              <p className="strike-real-value">
                <span className="strike-label">שווי אמיתי:</span>
                <span className="strike-amount">
                  <span className="strike-amount-text">₪638</span>
                  <span className="strike-x" aria-hidden="true">✕</span>
                </span>
              </p>
              <p className="today-label">המחיר שלך היום:</p>
              <div className="price-num">₪{PRICE}</div>
              <p className="micro">תשלום חד-פעמי · כולל מע"מ · פרטי הגישה נשלחים למייל תוך דקות</p>
            </div>

            <a href={checkout('pricing')} className="cta-btn" onClick={() => trackInitiateCheckout('pricing')}>
              <span>הצטרפו לקורס ב-₪{PRICE}</span>
              <span className="arrow"><IconArrowLeft size={18} /></span>
            </a>

            <p className="cta-consent-note">
              אחרי הרכישה תקבלו למייל את פרטי הגישה ועדכונים על הקורס. ניתן להסיר דיוור בכל עת.
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
          </div>

          <div className="value-box">
            <div className="value-box-header">
              <p>מה שלוקחים הביתה</p>
            </div>

            <div className="value-box-rows">
              <div className="value-row">
                <span className="label">4 מודולי יסוד, 9 שיעורים מוקלטים (הקלטת מסך מלאה)</span>
                <span className="value">ערך ₪297</span>
              </div>
              <div className="value-row value-bonus">
                <span className="label"><span className="bonus-tag">בונוס 01</span> מודול פריצות וחסימות</span>
                <span className="value">ערך ₪97</span>
              </div>
              <div className="value-row value-bonus">
                <span className="label"><span className="bonus-tag">בונוס 02</span> מודול אימות ואישורי פעילות</span>
                <span className="value">ערך ₪97</span>
              </div>
              <div className="value-row value-bonus">
                <span className="label"><span className="bonus-tag">בונוס 03</span> הרצאת אורח של בר שלג</span>
                <span className="value">ערך ₪147</span>
              </div>
              <div className="value-row">
                <span className="label">גישה ללא הגבלת זמן, כולל כל עדכון עתידי של הקורס</span>
                <span className="value">ללא הגבלה</span>
              </div>
            </div>
          </div>

          <div className="checklist">
            <div className="checklist-title">זה בשבילכם אם:</div>
            <div className="checklist-item"><span className="check-icon" aria-hidden="true"><IconCheck size={14} /></span><span>אתם מנהלים סושיאל עם חשבונות של לקוחות</span></div>
            <div className="checklist-item"><span className="check-icon" aria-hidden="true"><IconCheck size={14} /></span><span>אתם קמפיינרים שעובדים עם חשבונות מודעות</span></div>
            <div className="checklist-item"><span className="check-icon" aria-hidden="true"><IconCheck size={14} /></span><span>אתם בעלי עסק שמפרסם בפייסבוק ואינסטגרם</span></div>
            <div className="checklist-item"><span className="check-icon" aria-hidden="true"><IconCheck size={14} /></span><span>אתם רוצים להגן על הנכסים הדיגיטליים שלכם</span></div>
          </div>

          {/* Social proof: recovery-service clients, labeled as such (not course students) */}
          <div className="vsl-testimonials" aria-label="המלצות לקוחות">
            <p className="vsl-testimonials-title">לקוחות שירות השחזור על העבודה עם אושר:</p>
            <div className="vsl-testimonial">
              <img src="/images/matanel.jpg" alt="מתנאל לייני" width="48" height="48" loading="lazy" decoding="async" />
              <blockquote>
                <p>"הצליח להחזיר לי את החשבון מחסימות שלא ברא השטן, רק תנו לו את ההזדמנות והוא יסדר."</p>
                <footer>מתנאל לייני · יוצר תוכן ומשפיען</footer>
              </blockquote>
            </div>
            <div className="vsl-testimonial">
              <img src="/images/gal.jpg" alt="גל נמני" width="48" height="48" loading="lazy" decoding="async" />
              <blockquote>
                <p>"לאחר שנעקצתי על ידי חברה אחרת, פניתי לאושר ובמסירות הוא החזיר לי את העסק לחיים. ממש ככה!"</p>
                <footer>גל נמני · מנכ"לית Go-Tech</footer>
              </blockquote>
            </div>
            <div className="vsl-testimonial">
              <img src="/images/ofira.jpg" alt="אופירה יחיא" width="48" height="48" loading="lazy" decoding="async" />
              <blockquote>
                <p>"המצב היה כמעט בלתי הפיך - לאחר כשבועיים אושר החזיר לי את החשבון בנחת וברוגע לא אופייניים."</p>
                <footer>אופירה יחיא · קונדיטורית ויוצרת תוכן</footer>
              </blockquote>
            </div>
            <p className="vsl-testimonials-note">ההמלצות כאן הן על שירות השחזור, לא על הקורס עצמו.</p>
            <a href="/testimonials" className="vsl-testimonials-more">לכל ההמלצות ←</a>
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

      <div className="gradient-divider" aria-hidden="true" />

      {/* FAQ, placed after Final CTA so the price reveal stays the peak */}
      <section className="faq-section" aria-labelledby="faq-heading">
        <div className="container">
          <div className="text-center">
            <span className="section-label">שאלות נפוצות</span>
          </div>
          <h2 id="faq-heading" className="text-center">
            יש לכם שאלה? סביר להניח שהתשובה כאן.
          </h2>

          <div className="faq-list">
            <details className="faq-item">
              <summary>למי הקורס מתאים?</summary>
              <div className="faq-answer">
                לבעלי עסקים שמפרסמים בפייסבוק ובאינסטגרם, למנהלי סושיאל שמנהלים חשבונות של לקוחות,
                ולקמפיינרים/ות שמריצים תקציבי פרסום. בקיצור, לכל מי שיש לו נכס דיגיטלי שהוא לא יכול להרשות לעצמו לאבד.
              </div>
            </details>

            <details className="faq-item">
              <summary>מה ההבדל בין הקורס לשירות השחזור?</summary>
              <div className="faq-answer">
                הקורס מלמד אתכם להקים ולאבטח את הנכסים בעצמכם, מראש. שירות השחזור הוא טיפול אישי שלי בחשבון שכבר נחסם או נפרץ,
                בתשלום נפרד ורק אחרי הצלחה. אם החשבון שלכם חסום עכשיו, כתבו לי בוואטסאפ לפני שאתם קונים את הקורס.
              </div>
            </details>

            <details className="faq-item">
              <summary>אני לא טכנולוגי. אני יכול בכלל להתמודד עם זה?</summary>
              <div className="faq-answer">
                בהחלט. הקורס בנוי בהקלטות מסך עם הנחיה צעד-אחר-צעד. אין הנחה של ידע מוקדם.
                אם אתם יודעים להפעיל פייסבוק ולהיכנס לחשבון, אתם יודעים מספיק.
              </div>
            </details>

            <details className="faq-item">
              <summary>כמה זמן ייקח לי לסיים את הקורס?</summary>
              <div className="faq-answer">
                בערך 3 שעות מצטברות של תוכן. אפשר לעבור הכל בערב אחד, או לפזר על פני שבוע.
                את היישום עצמו אפשר לעשות תוך כדי, מסך אחרי מסך.
              </div>
            </details>

            <details className="faq-item">
              <summary>מה אני מקבל אחרי הרכישה?</summary>
              <div className="faq-answer">
                גישה מיידית ל-LMS עם כל המודולים והבונוסים. שולחים לכם מייל עם שם משתמש וסיסמה תוך דקות.
                גישה ללא הגבלת זמן, כולל כל עדכון עתידי של הקורס. לא הגיע מייל? כתבו בוואטסאפ ונסדר.
              </div>
            </details>

            <details className="faq-item">
              <summary>האם יש החזר כספי אם הקורס לא מתאים לי?</summary>
              <div className="faq-answer">
                לפני שאתם מתלבטים: הסילבוס המלא מפורט כאן בדף (4 מודולים + 3 בונוסים, כ-3 שעות),
                הגישה היא ללא הגבלת זמן כולל עדכונים, ואני זמין בוואטסאפ לכל שאלה, גם לפני הרכישה.
                מכיוון שמדובר בתוכן דיגיטלי עם גישה מיידית, לא ניתן החזר לאחר הרכישה, בהתאם לחוק הגנת הצרכן.
                יש ספק? שלחו לי הודעה ואענה אישית.
              </div>
            </details>

            <details className="faq-item">
              <summary>מה ההבדל בין הקורס הזה לכל מה שיש בחינם ביוטיוב?</summary>
              <div className="faq-answer">
                ביוטיוב יש "טיפים". כאן יש שיטה. הקורס בנוי על עבודה מאז 2020 עם מעל 2,500 חשבונות אמיתיים שהושבתו או נפרצו,
                והוא מתעדכן בהתאם לשינויים האחרונים של מטא. אין כפילויות, אין מילוי זמן, רק יישום.
              </div>
            </details>

            <details className="faq-item">
              <summary>האם הקורס מתעדכן?</summary>
              <div className="faq-answer">
                כן. כשמטא משנה משהו, אני מעדכן. הגישה שלכם אוטומטית כוללת את כל העדכונים העתידיים, ללא תוספת תשלום.
              </div>
            </details>

            <details className="faq-item">
              <summary>אפשר לדבר איתך אם נתקעתי תוך כדי?</summary>
              <div className="faq-answer">
                התלמידים שלי יכולים לפנות אליי בוואטסאפ בשאלות על יישום החומר מהקורס.
                זו לא תמיכה אישית מלאה, ולא שחזור של חשבון חסום (זה שירות נפרד), אבל על שאלות יישום אני עונה בפועל לכולם.
              </div>
            </details>
          </div>

          <p className="faq-foot">
            יש שאלה שלא מצאתם פה?{' '}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="faq-foot-link">שלחו הודעה בוואטסאפ</a>.
            {' '}אני עונה אישית.
          </p>
        </div>
      </section>

      </main>

      {/* STICKY MOBILE CTA, always straight to checkout, hidden while the purchase section is on screen */}
      <div className={`sticky-cta ${showStickyCta && !finalCtaInView ? 'visible' : ''}`} role="region" aria-label="קיצור דרך לרכישה">
        <a
          href={checkout('sticky')}
          className="sticky-cta-btn"
          onClick={() => trackInitiateCheckout('sticky')}
          aria-label={`לתשלום, קורס BMS ב-${PRICE} שקלים`}
        >
          <span>לתשלום · ₪{PRICE}</span>
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
