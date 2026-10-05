import { useEffect, useState } from 'react';
import { withCampaignParams } from '../utils/track';
import { Btn, Eyebrow, FillText, SlotNumber } from '../components/ui';
import Icon from '../components/Icon';
import '../components/FAQ.css';
// Shared by both VSL variants (V2 imports this file too): one visual system,
// so the A/B test compares the offers, not the paint.
import './VslBms.css';

/* Local icons that the shared Icon set does not carry */
const svg = { viewBox: '0 0 24 24', 'aria-hidden': true, focusable: 'false' };
const line = { ...svg, fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
const IconPlay = () => (<svg {...svg} fill="currentColor"><path d="M7 4l13 8-13 8z" /></svg>);
const IconVolume = () => (<svg {...line}><path d="M11 5L6 9H2v6h4l5 4z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>);
const IconLock = () => (<svg {...line}><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);
const IconZap = () => (<svg {...line}><path d="M13 2L3 14h9l-1 8 10-12h-9z" /></svg>);

const VIDEO_ID = '7Ac7-Kdl1-c';
// 606s on YouTube, checked 2026-09-15. Update if the video is replaced.
const VIDEO_MINUTES = 10;
const VIDEO_TITLE = 'השיטה שתצמצם לכם את הסיכוי להיחסם או להיפרץ בפייסבוק ובאינסטגרם';
// Landing-page variant tag. Kept OUT of utm_content so the ad creative's own
// utm_content survives into checkout (creative attribution and page variant
// are separate dimensions). V2 tags itself the same way.
const LP_VARIANT = 'v1-mistake-headline';
const PURCHASE_URL = `https://mrng.to/engo98ytvh?variant=${LP_VARIANT}`;
// Optimized WebPs. See public/images/vsl-bms/. The originals (osher_with_laptop
// is 5504x8256) are never referenced: only the -sm / -md variants.
const IMG = '/images/vsl-bms';

const PRICE = 297;
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

/* ============================================================
   CONTENT
   ============================================================ */
const SUMMARY = [
  ['מה זה:', 'קורס מוקלט בעברית על הקמה ואבטחה של נכסי Meta: Business Manager, חשבון מודעות, אנשים והרשאות. BMS הוא השם של הקורס והשיטה, לא כלי של מטא.'],
  ['למי:', 'בעלי עסקים שמפרסמים, מנהלי סושיאל עם חשבונות של לקוחות, וקמפיינרים.'],
  ['מה מיישמים:', 'בדיקת בעלות על הנכסים, סידור הרשאות, הגנה על הפרופיל והחשבון, ותוכנית פעולה ליום שמשהו משתבש.'],
  ['כמה זמן:', 'כ-3 שעות. 15 שיעורים והרצאת אורח. את היישום עושים תוך כדי צפייה.'],
  ['מה זה לא:', 'שחזור אישי של חשבון שכבר נחסם. זה שירות נפרד, ואפשר לשאול עליו בוואטסאפ.'],
];

const CASES = [
  {
    name: 'לילך,',
    role: 'יועצת עסקית ומנהלת דיגיטל:',
    story: 'קמפיין ב-150,000 ש"ח שירדו לה מהאשראי בין לילה, עסק ששותק ולקוחות שעזבו. ולא רק זה, גם נעקצה על ידי "מקצוען" שהבטיח לסייע.',
    risk: 'חשבון מודעות ואמצעי תשלום שלא היו מוגדרים תחת תיק עסקי מסודר.',
  },
  {
    name: 'דליה אגם,',
    role: 'בעלת עסק:',
    story: 'חצי שנה היא חיפשה מי מחזיקה בדף העסקי של החברה שלה. פניות לתמיכה ופניות למחלקה המשפטית של מטא לא עזרו.',
    risk: 'אף אחד לא ידע מי הבעלים של הנכסים. בדיקת בעלות והרשאות, שנלמדת בקורס, מגלה את זה בדקות.',
  },
  {
    name: 'מאיה,',
    role: 'קמפיינרית:',
    story: 'החשבון של הלקוח שלה נחסם לא באשמתה, והיא נשאה בעלויות התיקון (אלפי שקלים).',
    risk: 'אין הסכם הרשאות ואין תוכנית תגובה. שני הדברים שמכינים מראש בקורס.',
  },
];

const STEPS = [
  { title: 'בנייה נכונה', body: 'תשתית שתוכננה מהיום הראשון. הרשאות, admin גיבוי, חיבורים נכונים.', who: 'לילך' },
  { title: 'הגנה שוטפת', body: 'בדיקות חודשיות, התראות, סדר. אתם יודעים בכל רגע מי מחזיק במה.', who: 'דליה' },
  { title: 'תגובה לתקלה', body: 'כשמשהו משתבש, יש סדר פעולות: מה בודקים בשעה הראשונה, איפה מגישים ערעור, ומתי מסלימים.', who: 'מאיה' },
];

const MODULES = [
  {
    label: 'מודול 01',
    lessons: '3 שיעורים',
    title: 'פרופיל אישי, היסוד של הכל',
    body: 'כל BMS בנוי על פרופיל אישי אחד. אם הוא חשוף, הכל חשוף. פותחים מהיסודות: תקנות, ותק, סטטוס חשבון, פרטים ואבטחה.',
    punch: 'הבסיס שאם הוא לא יציב, שום דבר אחר לא יחזיק.',
  },
  {
    label: 'מודול 02',
    lessons: 'שיעור 1',
    title: 'הפרדה בין הפרטי לעסקי',
    body: 'ההפרדה בין הפרטי לעסקי היא ההבדל בין עסק שמוגן לבין עסק שתלוי בכם אישית.',
    punch: 'למה זה קריטי, איך עושים את זה נכון, ואיך שומרים על זה כשהעסק גדל.',
  },
  {
    label: 'מודול 03',
    lessons: '2 שיעורים',
    title: 'הקמת Business Manager ואיסוף הנכסים',
    body: "ההבדל בין מרכז החשבונות לביזנס מנג'ר. איך מקימים תיק עסקי נכון, ואיך אוספים את כל הנכסים שלכם תחת קורת גג אחת.",
    punch: 'הצעד הטכני שלילך לא ידעה לעשות, וזה עלה לה ביוקר.',
  },
  {
    label: 'מודול 04',
    lessons: '3 שיעורים',
    title: 'חשבון מודעות, תשלום, אנשים והרשאות',
    body: 'חשבון המודעות, הגדרתו ואמצעי התשלום. אנשים, שותפים, הרשאות. מידע על העסק ואבטחה.',
    punch: 'כאן הטעויות הכי יקרות נולדות. כאן גם נמנעות.',
  },
];

const BONUSES = [
  {
    label: 'בונוס 01',
    lessons: '3 שיעורים',
    title: 'פריצות וחסימות, מה לעשות כשמשהו קורה',
    body: 'הגדרות בסיסיות שחשוב לדעת בעולמות הפריצה. מה זו פריצה, איך היא נראית, ומה ההשלכות. מה זו חסימה, ולמה היא קורית.',
    punch: 'הידע שדליה לא הייתה צריכה לחפש במשך חצי שנה.',
  },
  {
    label: 'בונוס 02',
    lessons: '3 שיעורים',
    title: 'אימות דו-שלבי, אישורי פעילות והחזרת גישה דרך אינסטגרם',
    body: "אישור פעילות לרישום בביזנס מנג'ר. אימות דו-שלבי בכניסה. והחזרת גישה לנכסים דרך האינסטגרם, אם בכל זאת משהו השתבש.",
    punch: 'הקטנים שעושים את ההבדל בין שעה של פאניקה ל-5 דקות של תיקון.',
  },
  {
    label: 'בונוס 03',
    lessons: 'הרצאת אורח',
    title: 'בר שלג: הוקים (Hooks)',
    body: 'שיעור אורח מבר שלג על איך לכתוב Hooks שמושכים תשומת לב.',
    punch: 'תוספת מעבר לליבת הקורס: תשתית טובה זה חצי מהמשחק, והחצי השני הוא תוכן שגורם לאנשים לעצור.',
  },
];

const INCLUDED = [
  { label: '4 מודולי יסוד, 9 שיעורים מוקלטים (הקלטת מסך מלאה)', value: 'ערך ₪297' },
  { bonus: 'בונוס 01', label: 'מודול פריצות וחסימות', value: 'ערך ₪97' },
  { bonus: 'בונוס 02', label: 'מודול אימות ואישורי פעילות', value: 'ערך ₪97' },
  { bonus: 'בונוס 03', label: 'הרצאת אורח של בר שלג', value: 'ערך ₪147' },
  { label: 'גישה ללא הגבלת זמן, כולל כל עדכון עתידי של הקורס', value: 'ללא הגבלה' },
];

const FOR_YOU = [
  'אתם מנהלים סושיאל עם חשבונות של לקוחות',
  'אתם קמפיינרים שעובדים עם חשבונות מודעות',
  'אתם בעלי עסק שמפרסם בפייסבוק ואינסטגרם',
  'אתם רוצים להגן על הנכסים הדיגיטליים שלכם',
];

// Recovery-service clients, labelled as such on the page (not course students)
const TESTIMONIALS = [
  { img: '/images/matanel.jpg', name: 'מתנאל לייני', role: 'יוצר תוכן ומשפיען', quote: '"הצליח להחזיר לי את החשבון מחסימות שלא ברא השטן, רק תנו לו את ההזדמנות והוא יסדר."' },
  { img: '/images/gal.jpg', name: 'גל נמני', role: 'מנכ"לית Go-Tech', quote: '"לאחר שנעקצתי על ידי חברה אחרת, פניתי לאושר ובמסירות הוא החזיר לי את העסק לחיים. ממש ככה!"' },
  { img: '/images/ofira.jpg', name: 'אופירה יחיא', role: 'קונדיטורית ויוצרת תוכן', quote: '"המצב היה כמעט בלתי הפיך - לאחר כשבועיים אושר החזיר לי את החשבון בנחת וברוגע לא אופייניים."' },
];

const FAQS = [
  ['למי הקורס מתאים?', 'לבעלי עסקים שמפרסמים בפייסבוק ובאינסטגרם, למנהלי סושיאל שמנהלים חשבונות של לקוחות, ולקמפיינרים שמריצים תקציבי פרסום. בקיצור, לכל מי שיש לו נכס דיגיטלי שהוא לא יכול להרשות לעצמו לאבד.'],
  ['מה ההבדל בין הקורס לשירות השחזור?', 'הקורס מלמד אתכם להקים ולאבטח את הנכסים בעצמכם, מראש. שירות השחזור הוא טיפול אישי שלי בחשבון שכבר נחסם או נפרץ, בתשלום נפרד ורק אחרי הצלחה. אם החשבון שלכם חסום עכשיו, כתבו לי בוואטסאפ לפני שאתם קונים את הקורס.'],
  ['אין לי רקע טכנולוגי. אפשר בכלל להתמודד עם זה?', 'בהחלט. הקורס בנוי בהקלטות מסך עם הנחיה צעד-אחר-צעד. אין הנחה של ידע מוקדם. אם אתם יודעים להפעיל פייסבוק ולהיכנס לחשבון, אתם יודעים מספיק.'],
  ['כמה זמן ייקח לי לסיים את הקורס?', 'בערך 3 שעות מצטברות של תוכן. אפשר לעבור הכל בערב אחד, או לפזר על פני שבוע. את היישום עצמו אפשר לעשות תוך כדי, מסך אחרי מסך.'],
  ['מה מקבלים אחרי הרכישה?', 'גישה מיידית ל-LMS עם כל המודולים והבונוסים. שולחים לכם מייל עם שם משתמש וסיסמה תוך דקות. גישה ללא הגבלת זמן, כולל כל עדכון עתידי של הקורס. לא הגיע מייל? כתבו בוואטסאפ ונסדר.'],
  ['האם יש החזר כספי אם הקורס לא מתאים לי?', 'לפני שאתם מתלבטים: הסילבוס המלא מפורט כאן בדף (4 מודולים + 3 בונוסים, כ-3 שעות), הגישה היא ללא הגבלת זמן כולל עדכונים, ואני זמין בוואטסאפ לכל שאלה, גם לפני הרכישה. מכיוון שמדובר בתוכן דיגיטלי עם גישה מיידית, לא ניתן החזר לאחר הרכישה, בהתאם לחוק הגנת הצרכן. יש ספק? שלחו לי הודעה ואענה אישית.'],
  ['מה ההבדל בין הקורס הזה לכל מה שיש בחינם ביוטיוב?', 'ביוטיוב יש "טיפים". כאן יש שיטה. הקורס בנוי על עבודה מאז 2020 עם מעל 2,500 חשבונות אמיתיים שהושבתו או נפרצו, והוא מתעדכן בהתאם לשינויים האחרונים של מטא. אין כפילויות, אין מילוי זמן, רק יישום.'],
  ['האם הקורס מתעדכן?', 'כן. כשמטא משנה משהו, אני מעדכן. הגישה שלכם אוטומטית כוללת את כל העדכונים העתידיים, ללא תוספת תשלום.'],
  ['אפשר לדבר איתך אם נתקעתי תוך כדי?', 'התלמידים שלי יכולים לפנות אליי בוואטסאפ בשאלות על יישום החומר מהקורס. זו לא תמיכה אישית מלאה, ולא שחזור של חשבון חסום (זה שירות נפרד), אבל על שאלות יישום אני עונה בפועל לכולם.'],
];

const RailItem = ({ item, node, bonus }) => (
  <li className={`vsl-rail__item m-reveal${bonus ? ' vsl-rail__item--bonus' : ''}`}>
    <span className="vsl-rail__node num" aria-hidden="true">{node}</span>
    <div className="vsl-rail__card">
      <p className="vsl-rail__meta">
        {bonus
          ? <span className="sticker sticker--paper m-in">{item.label}</span>
          : <span className="vsl-rail__label">{item.label}</span>}
        <span className="tag">{item.lessons}</span>
      </p>
      <h3 className="h3">{item.title}</h3>
      <p className="muted">{item.body} <strong>{item.punch}</strong></p>
    </div>
  </li>
);

export default function VslBms() {
  const [showStickyCta, setShowStickyCta] = useState(false);
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

  // Scroll reveals come from the shared motion engine (app/root.jsx); the page
  // only tracks when the sticky purchase bar should show.
  useEffect(() => {
    const onScroll = () => setShowStickyCta(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const stickyVisible = showStickyCta && !finalCtaInView;

  return (
    <div className="vsl">
      {/* TOP BANNER */}
      <div className="vsl__strip" role="banner">
        <p className="container">הדרכה חינמית ({VIDEO_MINUTES} דקות): למה נכסי הפרסום שלכם חשופים, ואיך קורס BMS (Business Manager Setup) מצמצם את הסיכון</p>
      </div>

      <main id="main">

      {/* HERO + VSL */}
      <section className="vsl-hero theme-ink bg-grid">
        <div className="container vsl-hero__grid">
          <div className="vsl-hero__copy">
            <p className="vsl-hero__kicker">קורס מוקלט בעברית · כ-3 שעות · <bdi>₪{PRICE}</bdi> תשלום אחד</p>
            <h1 className="vsl-hero__title">
              <span className="lt">קורס BMS: מגדירים Business Manager נכון,</span>{' '}
              <span>לפני <span className="mk">שהעסק נחסם</span></span>
            </h1>
            <p className="vsl-hero__sub">
              חשבון פייסבוק פרוץ, אינסטגרם חסום, Business Manager קפוא.
              ברוב המקרים שאני פוגש זו הגדרה או הרשאה שאפשר היה לבדוק מראש. כאן לומדים לבדוק.
            </p>
          </div>

          <figure className="vsl-video">
            <figcaption className="vsl-video__cap">
              <span className="vsl-video__cap-line"><IconVolume />הדרכה חינמית, {VIDEO_MINUTES} דקות, עם כתוביות</span>
              <span>{VIDEO_TITLE}</span>
            </figcaption>
            <div className="vsl-video__frame">
              {videoStarted ? (
                <iframe
                  src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0&cc_load_policy=1&cc_lang_pref=he`}
                  title={VIDEO_TITLE}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button type="button" className="vsl-video__facade" onClick={startVideo}>
                  <img
                    src={`https://i.ytimg.com/vi/${VIDEO_ID}/maxresdefault.jpg`}
                    alt=""
                    width="1280"
                    height="720"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span className="vsl-video__play"><IconPlay />הפעילו את ההדרכה · {VIDEO_MINUTES} דקות</span>
                </button>
              )}
            </div>
          </figure>

          <div className="vsl-hero__cta">
            <Btn variant="signal" href={checkout('hero')} onClick={() => trackInitiateCheckout('hero')}>
              הצטרפו לקורס ב-₪{PRICE}
            </Btn>
            <p className="vsl-hero__terms small"><bdi>₪{PRICE}</bdi>. תשלום אחד, כולל מע"מ. אחרי התשלום מגיע מייל עם פרטי הגישה, ומתחילים.</p>
            <a href="#deliverables" className="link small" onClick={trackCtaClick}>
              מה בדיוק יש בקורס? לסילבוס המלא
            </a>
          </div>
        </div>
      </section>

      {/* THE COURSE IN ONE LINE PER QUESTION */}
      <section className="section section--tight theme-mist">
        <div className="container vsl-sum">
          <h2 className="h3 vsl-sum__title">הקורס בשורה לכל שאלה:</h2>
          <dl className="vsl-sum__rows m-stagger">
            {SUMMARY.map(([term, text]) => (
              <div className="vsl-sum__row" key={term}>
                <dt>{term}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* INVITATION + WHO IT FITS */}
      <section className="section theme-paper">
        <div className="container">
          <header className="sec-head m-reveal">
            <h2 className="h1"><span className="lt">מוכנים</span> לצעד הבא?</h2>
            <p className="lead">
              יש לכם הזדמנות לצמצם את הסיכון, לסגור את הפרצות,
              לבנות נכון ומדויק, ולתחזק את זה בשגרה.
            </p>
          </header>

          <div className="vsl-duo">
            <div className="vsl-prose m-reveal">
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
                <strong>BMS זה לא רק הגדרה טכנית. זה הסדר שמאחורי כל קמפיין.</strong>{' '}
                ובקורס הזה אני בונה את התשתית איתכם, מסך אחרי מסך, עד שיש לכם סדר, גיבוי ותוכנית ליום שמשהו משתבש.
              </p>
            </div>

            <img
              src={`${IMG}/section_invitation-md.webp`}
              srcSet={`${IMG}/section_invitation-sm.webp 480w, ${IMG}/section_invitation-md.webp 960w`}
              sizes="(min-width: 960px) 520px, 92vw"
              alt="קורס BMS, Business Manager Setup"
              className="vsl-duo__img m-reveal"
              width="960"
              height="640"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="vsl-fit card card--ink theme-ink m-reveal">
            <h2 className="h3">הקורס מתאים לכם אם:</h2>
            <ul className="vsl-fit__list">
              <li><Icon name="check" /><p>אתם מנהלים סושיאל ומנהלים חשבונות של לקוחות, ורוצים לישון בשקט בלילה.</p></li>
              <li><Icon name="check" /><p>אתם קמפיינרים שמריצים תקציבי פרסום, ויודעים שהסיכון שחשבון יישבת הוא אמיתי.</p></li>
              <li><Icon name="check" /><p>אתם בעלי עסק שכל הלידים מגיעים מהדיגיטל, ולא מוכנים לסמוך על "יהיה בסדר".</p></li>
            </ul>
          </div>
        </div>
      </section>

      {/* NUMBERS, the 3 cases */}
      <section className="section theme-mist">
        <div className="container">
          <header className="sec-head sec-head--split m-reveal">
            <h2 className="h1"><span className="lt">3 מקרים. 3 שיעורים.</span> כולם יכלו להסתיים אחרת.</h2>
            <p className="lead">המקרים אמיתיים. השמות בדויים לשמירה על חיסיון.</p>
          </header>

          <ol className="vsl-rows">
            {CASES.map((c, i) => (
              <li className="vsl-row m-reveal" key={c.name}>
                <span className="vsl-row__num num" aria-hidden="true">0{i + 1}</span>
                <h3 className="vsl-row__title">{c.name} <span className="lt">{c.role}</span></h3>
                <div className="vsl-row__body">
                  <p>{c.story}</p>
                  <p className="vsl-row__risk"><b>הסיכון:</b> {c.risk}</p>
                </div>
              </li>
            ))}
          </ol>

          <p className="vsl-note m-reveal">
            <strong>התירוץ של כולן היה:</strong> "זה עבד לי ככה עד עכשיו".
            וכשמשהו השתבש? הן לא ידעו מה לעשות ולמי לפנות. זה הסיפור שקורה יום יום.
          </p>

          <dl className="vsl-nums">
            <div className="vsl-nums__item">
              <dd><SlotNumber value="2,500+" /></dd>
              <dt>חשבונות שחזרו לפעול בדיגיטל, מאז 2020</dt>
            </div>
            <div className="vsl-nums__item">
              <dd><SlotNumber value="95%+" /></dd>
              <dt>מהמקרים שקיבלתי לטיפול אחרי אבחון הסתיימו בשחזור</dt>
            </div>
          </dl>
        </div>
      </section>

      {/* THE COMMON DENOMINATOR */}
      <section className="section theme-ink vsl-state">
        <div className="container">
          <p className="vsl-state__q">מה המכנה המשותף לכל שלושת המקרים?</p>
          <FillText
            as="h2"
            className="vsl-state__title"
            text="הם לא נפרצו בגלל מזל רע. הם נפלו בגלל הגדרות והרשאות שאף אחד לא בדק."
          />
          <p className="sticker sticker--paper m-in vsl-state__tag">ומה שכולם מחפשים, זה לא מה שהם צריכים</p>
        </div>
      </section>

      {/* FRAMEWORK, 3-step methodology */}
      <section className="section theme-paper">
        <div className="container">
          <header className="sec-head m-reveal">
            <Eyebrow num="01">המתודולוגיה</Eyebrow>
            <h2 className="h2 vsl-h-wide">
              <span className="lt">BMS נכון הוא שלושה שלבים,</span>{' '}
              וכל אחד מהם מטפל בסיכון שהפיל את אחד המקרים.
            </h2>
            <p className="lead">לא תיאוריה. לא רעיון מופשט. תהליך מדויק שאתם עוברים איתי בקורס.</p>
          </header>

          <ol className="vsl-rows vsl-rows--tagged">
            {STEPS.map((s, i) => (
              <li className="vsl-row m-reveal" key={s.title}>
                <span className="vsl-row__num num" aria-hidden="true">0{i + 1}</span>
                <h3 className="vsl-row__title">{s.title}</h3>
                <p className="vsl-row__body">{s.body}</p>
                <p className="vsl-row__tag tag">הסיכון שהפיל את <strong>{s.who}</strong></p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* DELIVERABLES. 4 modules + 3 bonuses on a rail that fills with scroll */}
      <section className="section theme-mist" id="deliverables">
        <div className="container vsl-split">
          <header className="vsl-split__side">
            <div className="vsl-split__sticky m-reveal">
              <Eyebrow num="02">מה בפנים</Eyebrow>
              <h2 className="h2">
                <span className="lt">בקורס BMS יוצאים עם</span>{' '}
                תשתית מסודרת ותוכנית ליום שמשהו משתבש.
              </h2>
              <div className="vsl-callout">
                <p><strong>לא מצגות. לא תיאוריה.</strong></p>
                <p className="vsl-callout__main">הדרכות ישירות, הקלטת מסך, יישום מיידי.</p>
                <p>אחרי הקורס אתם מוכנים. גם אם לא נגעתם ב-Business Manager מעולם.</p>
              </div>
            </div>
          </header>

          <ol className="vsl-rail" data-scrub="0.7 0.55">
            <li className="vsl-rail__line" aria-hidden="true"><span /></li>
            {MODULES.map((m, i) => <RailItem key={m.label} item={m} node={`0${i + 1}`} />)}
            <li className="vsl-rail__break m-reveal">
              <span className="vsl-rail__node vsl-rail__node--plus" aria-hidden="true">+</span>
              <p>ובחבילה גם, 3 בונוסים מתנה</p>
            </li>
            {BONUSES.map((b) => <RailItem key={b.label} item={b} node="+" bonus />)}
          </ol>
        </div>

        <div className="container vsl-pack m-reveal">
          <h3 className="h2">הכל בחבילה אחת.</h3>
          <ul className="vsl-pack__stats">
            <li><strong className="num">4</strong> מודולי יסוד</li>
            <li><strong className="num">3</strong> בונוסים</li>
            <li><strong className="num">15</strong> שיעורים + הרצאת אורח</li>
          </ul>
          <p className="lead">מה שלמדתי מ-2,500 מקרים, ארוז בצורה שתיישמו מחר בבוקר.</p>
        </div>
      </section>

      {/* STORY, founder, told once */}
      <section className="section theme-paper">
        <div className="container vsl-duo vsl-duo--story">
          <div>
            <h2 className="h1 vsl-duo__title m-reveal"><span className="lt">למה</span> לסמוך עליי?</h2>
            <div className="vsl-prose m-reveal">
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
            </div>
          </div>

          <figure className="vsl-photos m-reveal">
            <div className="vsl-photos__grid">
              <img src={`${IMG}/account_disabled-sm.webp`} srcSet={`${IMG}/account_disabled-sm.webp 480w, ${IMG}/account_disabled-md.webp 960w`} sizes="(min-width: 960px) 460px, 92vw" alt="צילום מסך של חשבון פייסבוק מושבת" width="480" height="480" loading="lazy" decoding="async" />
              <img src={`${IMG}/business_manager-sm.webp`} alt="Business Manager ריק ללא נכסים" width="480" height="480" loading="lazy" decoding="async" />
              <img src={`${IMG}/osher_auth-sm.webp`} alt="אושר רווח עובד על שחזור חשבון לקוח" width="480" height="480" loading="lazy" decoding="async" />
            </div>
            <span className="sticker m-in vsl-photos__tag">מ-2020 ועד היום</span>
            <figcaption className="vsl-photos__cap">
              לילות כימים עם אלפי בעלי עסקים עם BM (ביזנס מנג'ר) מושבת,
              ואלפי שקלים שהם יכלו להרוויח. לא חבל?
            </figcaption>
          </figure>
        </div>
      </section>

      {/* AUTHORITY, quote + mid-page purchase button */}
      <section className="section theme-ink">
        <div className="container vsl-author">
          <img
            src={`${IMG}/osher_with_laptop-md.webp`}
            srcSet={`${IMG}/osher_with_laptop-sm.webp 480w, ${IMG}/osher_with_laptop-md.webp 960w`}
            sizes="(min-width: 960px) 420px, 80vw"
            alt="אושר רווח, IsraelTechForce"
            className="vsl-author__img m-reveal"
            width="960"
            height="1440"
            loading="lazy"
            decoding="async"
          />

          <div className="vsl-author__body">
            <h2 className="vsl-author__label">למה אני כאן בכלל?</h2>

            <blockquote className="vsl-author__quote serif m-reveal">
              <span>לא רציתי להיות מי שמחזיר את החשבונות.</span>{' '}
              <span>רציתי להיות מי שמלמד איך לא להגיע לשם.</span>
            </blockquote>

            <div className="vsl-prose m-reveal">
              <p><strong>כולם מחפשים פתרון אחרי. אני רוצה לתת את הכלים לא להגיע לשם.</strong></p>
              <p>
                אני לא קוסם. אני לא לוחם סייבר עם טריקים מסתוריים.
                אני פשוט יודע איך המערכת עובדת, ואיך לבנות נכון מההתחלה.
              </p>
              <p><strong>זה לא שיווק. זה מה שאני עושה בפועל, כל יום.</strong></p>
            </div>

            <div className="vsl-author__close m-reveal">
              <span className="vsl-author__chant">BMS</span>
              <div>
                <p>לא עוד כלי. לא עוד קורס.</p>
                <p><strong>הבסיס שמסדר את הנכסים ומכין אתכם ליום רע.</strong></p>
              </div>
            </div>

            <p className="vsl-author__note">
              <strong>מה שתלמדו בקורס הזה</strong> מטפל בדיוק בסיכונים שהפילו את לילך, את דליה ואת מאיה,
              לפני שהן בכלל הגיעו אליי.
            </p>

            <div className="vsl-cta">
              <Btn variant="signal" href={checkout('author')} onClick={() => trackInitiateCheckout('author')}>
                הצטרפו לקורס עכשיו, {PRICE} ש"ח בלבד
              </Btn>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA. Price + button first, value breakdown and proof underneath */}
      <section className="section theme-paper" id="final-cta">
        <div className="container">
          <header className="sec-head m-reveal">
            <h2 className="h1">
              <span className="lt">מוכנים לבנות</span>{' '}
              <span className="mk m-in">תשתית שמחזיקה</span> גם ביום רע?
            </h2>
          </header>

          <div className="vsl-offer card card--ink theme-ink m-reveal">
            <div className="vsl-offer__head">
              <p className="vsl-offer__was">שווי אמיתי: <s><bdi>₪638</bdi></s></p>
              <p className="vsl-offer__today">המחיר שלכם היום:</p>
              <p className="vsl-offer__price num"><bdi>₪{PRICE}</bdi></p>
              <p className="small muted">תשלום חד-פעמי · כולל מע"מ · פרטי הגישה נשלחים למייל תוך דקות</p>
            </div>

            <div className="vsl-offer__foot">
              <Btn variant="signal" block href={checkout('pricing')} onClick={() => trackInitiateCheckout('pricing')}>
                הצטרפו לקורס ב-₪{PRICE}
              </Btn>
              <p className="small dim">
                אחרי הרכישה תקבלו למייל את פרטי הגישה ועדכונים על הקורס. ניתן להסיר דיוור בכל עת.
              </p>
              <ul className="vsl-offer__trust">
                <li><IconLock />תשלום מאובטח</li>
                <li><Icon name="invoice" />חשבונית מס מיידית</li>
                <li><IconZap />גישה מיידית</li>
              </ul>
            </div>

            <div className="value-box">
              <p className="vsl-incl__title">מה שלוקחים הביתה</p>
              <ul className="vsl-incl">
                {INCLUDED.map((row) => (
                  <li key={row.label}>
                    <Icon name="check" />
                    <span>{row.bonus && <span className="tag">{row.bonus}</span>} {row.label}</span>
                    <bdi className="vsl-incl__val num">{row.value}</bdi>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="vsl-proof">
            <div className="vsl-foryou card m-reveal">
              <h3 className="h3">זה בשבילכם אם:</h3>
              <ul className="vsl-checks">
                {FOR_YOU.map((text) => (
                  <li key={text}><Icon name="check" /><span>{text}</span></li>
                ))}
              </ul>
            </div>

            {/* Social proof: recovery-service clients, labeled as such (not course students) */}
            <div className="vsl-quotes m-reveal" aria-label="המלצות לקוחות" role="group">
              <p className="vsl-quotes__title">לקוחות שירות השחזור על העבודה עם אושר:</p>
              {TESTIMONIALS.map((t) => (
                <div className="vsl-quote" key={t.name}>
                  <img src={t.img} alt={t.name} width="48" height="48" loading="lazy" decoding="async" />
                  <blockquote>
                    <p>{t.quote}</p>
                    <footer>{t.name} · {t.role}</footer>
                  </blockquote>
                </div>
              ))}
              <p className="small dim">ההמלצות כאן הן על שירות השחזור, לא על הקורס עצמו.</p>
              <a href="/testimonials" className="link small">לכל ההמלצות ←</a>
            </div>
          </div>

          <div className="vsl-wa">
            <p className="vsl-wa__q">יש שאלה לפני שמצטרפים?</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--plain vsl-wa__btn" aria-label="פתח שיחה בוואטסאפ">
              <Icon name="whatsapp" />
              <span>שלחו הודעה. אושר עונה אישית</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ, placed after Final CTA so the price reveal stays the peak */}
      <section className="section theme-mist" aria-labelledby="faq-heading">
        <div className="container vsl-split">
          <header className="vsl-split__side">
            <div className="vsl-split__sticky m-reveal">
              <Eyebrow num="03">שאלות נפוצות</Eyebrow>
              <h2 id="faq-heading" className="h2">
                <span className="lt">יש לכם שאלה?</span> סביר להניח שהתשובה כאן.
              </h2>
              <p className="vsl-faq-foot">
                יש שאלה שלא מצאתם פה?{' '}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">שלחו הודעה בוואטסאפ</a>.
                {' '}אני עונה אישית.
              </p>
            </div>
          </header>

          <div className="faq-list">
            {FAQS.map(([q, a], i) => (
              <details className="faq-item" name="vsl-faq" key={q}>
                <summary>
                  <span className="faq-item__num num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-item__q">{q}</span>
                  <span className="faq-item__icon" aria-hidden="true" />
                </summary>
                <p className="faq-item__a">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      </main>

      {/* STICKY MOBILE CTA, always straight to checkout, hidden while the purchase section is on screen */}
      <div className={`vsl-bar${stickyVisible ? ' is-visible' : ''}`} role="region" aria-label="קיצור דרך לרכישה">
        <a
          href={checkout('sticky')}
          className="vsl-bar__btn vsl-bar__btn--wide"
          onClick={() => trackInitiateCheckout('sticky')}
          aria-label={`לתשלום, קורס BMS ב-${PRICE} שקלים`}
        >
          <span>לתשלום · ₪{PRICE}</span>
        </a>
      </div>

      {/* FOOTER */}
      <footer className="vsl-foot theme-ink">
        <div className="container">
          <p>
            התוצאות המוצגות בדף זה מבוססות על מקרים אמיתיים. השמות בוידאו בדויים לשמירה על פרטיות.
            התוצאות שלכם עשויות להיות שונות בהתאם לנסיבות, לניסיון ולמאמץ שתשקיעו.
          </p>
          <p>אין קשר לפייסבוק (<span dir="ltr">Meta Platforms, Inc.</span>). דף זה אינו מאושר, מנוהל, או קשור בשום דרך למטא.</p>
          <div className="vsl-foot__links">
            <a href="/privacy" className="link">מדיניות פרטיות</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">צור קשר</a>
          </div>
          <p>© 2026 IsraelTechForce | נתניה, ישראל | osher@israeltechforce.com</p>
        </div>
      </footer>
    </div>
  );
}
