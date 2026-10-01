import { useEffect, useRef, useState } from 'react';
import { withCampaignParams } from '../utils/track';
import { Btn } from '../components/ui';
import Icon from '../components/Icon';
import '../components/FAQ.css';
// The visual system is shared with V1 (VslBms.css) so the A/B test compares
// the offers, not the paint. VslBmsV2.css only holds what V2 alone renders.
import './VslBms.css';
import './VslBmsV2.css';

const IconPlay = () => (<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M7 4l13 8-13 8z" /></svg>);

/* ============================================================
   CONFIG
   ============================================================ */
const VIDEO_EMBED_URL = 'https://www.youtube.com/embed/7Ac7-Kdl1-c';
const BASE_PURCHASE_URL = 'https://mrng.to/engo98ytvh';
const WHATSAPP_URL = 'https://wa.me/972509823235';
const PRICE = 197;
const ORIGINAL_VALUE = 638;
// Page-variant tag. Not utm_content, so the ad creative's own utm_content survives (same as V1).
const UTM = 'variant=v2-loss-headline';

// Only the -sm / -md variants: the 5504x8256 original must never reach a phone.
const IMG = '/images/vsl-bms';

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
   CONTENT
   ============================================================ */
const COSTS = [
  {
    title: 'עלות ישירה',
    items: [<><bdi dir="ltr" className="num">₪3,500–₪50,000+</bdi> לשחזור עם איש מקצוע</>, 'שבועיים עד חודש של downtime', 'כל הקמפיינים מתאפסים'],
  },
  {
    title: 'עלות עקיפה',
    items: ['לידים שנעלמים בזמן שאתם לא באוויר', 'אמון לקוחות מתערער', 'שעות של פניות לתמיכה שלא עוזרת'],
  },
  {
    title: 'עלות נפשית',
    items: ['חרדה לפני כל לוגין', 'חוסר שינה', 'תחושה שהכל יכול להתמוטט מחר'],
  },
];

const CASES = [
  {
    name: 'לילך,',
    role: 'יועצת עסקית ומנהלת דיגיטל',
    story: (
      <>
        קמפיין של <strong>₪150,000</strong> ירד לה מהאשראי בין לילה.
        עסק ששותק. לקוחות שעזבו.
        ולא רק זה. היא גם נעקצה מ"מקצוען" שהבטיח לסייע ולא הצליח.
      </>
    ),
  },
  {
    name: 'דליה,',
    role: 'בעלת עסק',
    story: (
      <>
        <strong>חצי שנה</strong> היא חיפשה מי בכלל מחזיק בדף העסקי שלה.
        פניות לתמיכה? לא עזרו.
        למחלקה המשפטית של מטא? לא ענו.
        עם BMS היא לא הייתה מגיעה למצב הזה.
      </>
    ),
  },
  {
    name: 'מאיה,',
    role: 'קמפיינרית',
    story: (
      <>
        חשבון של לקוח נחסם. לא באשמתה.
        אבל היא נשאה בעלויות התיקון. <strong>אלפי שקלים מהכיס שלה</strong>.
        הכל היה נמנע עם הכנה מוקדמת.
      </>
    ),
  },
];

const STAGES = [
  {
    title: 'בנייה נכונה',
    saves: 'היה מציל את לילך',
    body: 'תשתית מהיום הראשון: הרשאות, גיבויים, חיבורים נכונים. אם בונים נכון פעם אחת. אין מצב שירידה של ₪150K אצל לילך הייתה קורית.',
  },
  {
    title: 'הגנה שוטפת',
    saves: 'הייתה מצילה את דליה',
    body: 'בדיקות חודשיות. התראות. סדר. אתם תמיד יודעים מי מחזיק במה. דליה לא הייתה מבזבזת חצי שנה אם היא הייתה יודעת מראש.',
  },
  {
    title: 'שחזור מהיר',
    saves: 'הייתה מצילה את מאיה',
    body: 'כשמשהו משתבש, יש תוכנית מוכנה. תבניות, ערוצים, סדר פעולות. לא פאניקה. לא אלפי שקלים מהכיס.',
  },
];

const MODULES = [
  {
    label: 'מודול 1',
    lessons: '3 שיעורים',
    title: 'הפרופיל האישי',
    body: (
      <>
        תדעו אילו <strong>4 הגדרות בפרופיל האישי שלכם</strong> פותחות את ה-BM שלכם לפריצה.
        ואיך לסגור אותן ב-7 דקות.
      </>
    ),
    bullets: ['ותק חשבון', 'אבטחה', 'סטטוס תקין', 'פרטים עדכניים'],
  },
  {
    label: 'מודול 2',
    lessons: 'שיעור אחד',
    title: 'בידול עסקי',
    body: 'תדעו איך להפריד פעם אחת ולתמיד בין הפרטי לעסקי, כך שאם מחר תרצו למכור את העסק או להעביר ניהול, הכל מוכן.',
  },
  {
    label: 'מודול 3',
    lessons: '2 שיעורים',
    title: 'מדברים ביזנס',
    body: (
      <>
        תדעו את ההבדל בין מרכז החשבונות לביזנס מנג'ר.
        תקימו תיק עסקי מסודר. כל הנכסים שלכם, תחת קורת גג אחת.
        <em> (הצעד שלילך לא ידעה לעשות.)</em>
      </>
    ),
  },
  {
    label: 'מודול 4',
    lessons: '3 שיעורים',
    title: 'חשבון מודעות + הרשאות',
    body: (
      <>
        תדעו להגדיר נכון אמצעי תשלום, אנשים, שותפים, הרשאות, ואבטחה.
        <em> (זה השלב שעוצר 90% מהחסימות.)</em>
      </>
    ),
  },
];

const BONUSES = [
  {
    label: 'בונוס 01',
    lessons: '3 שיעורים',
    title: 'פריצות וחסימות. מה לעשות כשזה קורה',
    body: (
      <>
        מה זו פריצה? איך זה נראה? איך מגיבים?
        <em> (הידע שדליה לא הייתה צריכה לחפש 6 חודשים.)</em>
      </>
    ),
  },
  {
    label: 'בונוס 02',
    lessons: '3 שיעורים',
    title: 'טיפים מבפנים',
    body: 'אישור פעילות. אימות דו-שלבי. החזרת גישה דרך אינסטגרם. הקטנים שמקצרים שעה של פאניקה ל-5 דקות של תיקון.',
  },
  {
    label: 'בונוס 03',
    title: 'הרצאת אורח של בר שלג, "הוקים שעוצרים גלילה"',
    body: 'הקלטה בלעדית של בר על איך כותבים hooks שמושכים תשומת לב באמת. כי תשתית בלי תוכן זה חצי משחק.',
  },
];

const PACK = ['4 מודולים', '3 בונוסים', '15 שיעורים', '~3 שעות לסיים', 'גישה לכל החיים'];

const OBJECTIONS = [
  ['אני לא טכנולוגי/ת. זה לא יהיה מסובך לי?', 'הקורס בנוי בהקלטות מסך. אתם רואים בדיוק מה אני עושה ועושים אחריי. אם אתם יודעים להפעיל פייסבוק, אתם יודעים מספיק.'],
  [`₪${PRICE} זה לא יותר מדי בשביל קורס דיגיטלי?`, 'חסימה ממוצעת עולה ₪3,500. זה פי 18 מהקורס. אם הקורס יחסוך לכם חסימה אחת ב-5 השנים הקרובות, הוא משלם את עצמו 18 פעמים.'],
  ['אני יכול/ה ללמוד את זה ביוטיוב בחינם, לא?', 'ביוטיוב יש "טיפים". כאן יש שיטה. יוטיוב לא מתעדכן כשמטא משנה משהו. אני כן.'],
  ['אם אקנה ולא יעבוד לי, מה אז?', 'תשלח/י לי הודעה. אני עונה אישית. לא הבטחתי תמיכה אישית מלאה. אבל בפועל אני עונה לכל תלמיד.'],
];

const INCLUDED = [
  { label: <><span className="num">4</span> מודולים · <span className="num">9</span> שיעורים</>, value: <>שווי <bdi className="num">₪297</bdi></> },
  { label: <>בונוס <span className="num">01</span> · פריצות וחסימות</>, value: <>שווי <bdi className="num">₪97</bdi></> },
  { label: <>בונוס <span className="num">02</span> · טיפים מבפנים</>, value: <>שווי <bdi className="num">₪97</bdi></> },
  { label: <>בונוס <span className="num">03</span> · הרצאת בר שלג</>, value: <>שווי <bdi className="num">₪147</bdi></> },
  { label: 'עדכונים לכל החיים', value: '∞' },
];

const FAQS = [
  ['למי הקורס מתאים?', 'לבעלי עסקים שמפרסמים בפייסבוק ובאינסטגרם, למנהלי סושיאל שמנהלים חשבונות של לקוחות, ולקמפיינרים/ות שמריצים תקציבי פרסום. בקיצור, לכל מי שיש לו נכס דיגיטלי שהוא לא יכול להרשות לעצמו לאבד.'],
  ['אני לא טכנולוגי. אני יכול בכלל להתמודד עם זה?', 'בהחלט. הקורס בנוי בהקלטות מסך עם הנחיה צעד-אחר-צעד. אין הנחה של ידע מוקדם. אם אתם יודעים להפעיל פייסבוק ולהיכנס לחשבון, אתם יודעים מספיק.'],
  ['כמה זמן ייקח לי לסיים את הקורס?', 'בערך 3 שעות מצטברות של תוכן. אפשר לעבור הכל בערב אחד, או לפזר על פני שבוע. את היישום עצמו אפשר לעשות תוך כדי, מסך אחרי מסך.'],
  ['מה אני מקבל אחרי הרכישה?', 'גישה מיידית ל-LMS עם כל המודולים והבונוסים. שולחים לכם מייל עם שם משתמש וסיסמה תוך דקות. גישה לכל החיים, כולל עדכונים עתידיים.'],
  ['האם יש החזר כספי אם הקורס לא מתאים לי?', `במחיר של ₪${PRICE} ועם גישה מיידית לתוכן הדיגיטלי, אין מדיניות החזרים. אם יש לכם ספק לפני הרכישה, שלחו לי הודעה בוואטסאפ ואני אענה אישית על כל שאלה.`],
  ['האם הקורס מתעדכן?', 'כן. כשמטא משנה משהו, אני מעדכן. הגישה שלכם אוטומטית כוללת את כל העדכונים העתידיים, ללא תוספת תשלום.'],
  ['אפשר לדבר איתך אם נתקעתי תוך כדי?', 'התלמידים שלי יכולים לפנות אליי בוואטסאפ אם משהו לא ברור. לא הבטחה לתמיכה אישית מלאה, אבל אני עונה בפועל לכולם.'],
];

const RailItem = ({ item, node, bonus }) => (
  <li className={`vsl-rail__item m-reveal${bonus ? ' vsl-rail__item--bonus' : ''}`}>
    <span className="vsl-rail__node num" aria-hidden="true">{node}</span>
    <div className="vsl-rail__card">
      <p className="vsl-rail__meta">
        {bonus
          ? <span className="sticker sticker--paper m-in">{item.label}</span>
          : <span className="vsl-rail__label">{item.label}</span>}
        {item.lessons && <span className="tag">{item.lessons}</span>}
      </p>
      <h3 className="h3">{item.title}</h3>
      <p className="muted">{item.body}</p>
      {item.bullets && (
        <ul className="vsl-rail__bullets">
          {item.bullets.map((b) => <li key={b}><Icon name="check" />{b}</li>)}
        </ul>
      )}
    </div>
  </li>
);

const Accordion = ({ items, name }) => (
  <div className="faq-list">
    {items.map(([q, a], i) => (
      <details className="faq-item" name={name} key={q}>
        <summary>
          <span className="faq-item__num num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
          <span className="faq-item__q">{q}</span>
          <span className="faq-item__icon" aria-hidden="true" />
        </summary>
        <p className="faq-item__a">{a}</p>
      </details>
    ))}
  </div>
);

/* ============================================================
   COMPONENT
   ============================================================ */
export default function VslBmsV2() {
  const [showStickyCta, setShowStickyCta] = useState(false);
  // Client-only: carry the visitor's utm_source/medium/campaign into checkout
  const [purchaseUrl, setPurchaseUrl] = useState(getPurchaseUrl());
  useEffect(() => setPurchaseUrl(withCampaignParams(getPurchaseUrl())), []);
  const scroll50Fired = useRef(false);
  // The YouTube player (about 1MB of script) loads only after the visitor
  // presses play; until then the frame holds the video's poster image.
  const [videoStarted, setVideoStarted] = useState(false);

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

  // VideoPlay now fires on the actual press of play, once.
  const startVideo = () => {
    setVideoStarted(true);
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'VideoPlay', { page: 'VSL-BMS-V2' });
    }
  };

  return (
    <div className="vsl">
      {/* ─── 1. ANNOUNCEMENT BAR ─── */}
      <div className="vsl__strip">
        <p className="container">הדרכה חינמית · 3 מקרים אמיתיים · ההבדל בין עסק שרץ לעסק שנעצר</p>
      </div>

      <main id="main">

      {/* ─── 2. HERO ─── */}
      <section className="vsl-hero theme-ink bg-grid">
        <div className="container vsl-hero__grid">
          <div className="vsl-hero__copy">
            <h1 className="vsl-hero__title">
              <span className="lt">חשבון פרסום נחסם =</span>{' '}
              <span><bdi className="mk num">150,000</bdi> הלכו לאיבוד בין לילה</span>
              <span className="vsl-hero__title-sub">יש שיטה אחת שמונעת את זה. היא נקראת <b>BMS</b>.</span>
            </h1>

            <p className="vsl-hero__sub">
              מטא מסירה <strong>חשבונות עסקיים בלי הודעה מראש</strong>, וברוב המקרים שהגיעו אליי
              הסיבה הייתה טעות הגדרה אחת שאף אחד לא טרח לספר עליה.
              ההדרכה הזו (<span className="num">4</span> דקות) תראה לכם איך להימנע ממנה.
            </p>

            {/* Trust bar */}
            <ul className="vsl-hero__proof" aria-label="הוכחות חברתיות">
              <li><Icon name="check" /><span><b><bdi className="num">2,500+</bdi></b> עסקים שוחזרו</span></li>
              <li><Icon name="check" /><span><b><bdi className="num">95%</bdi></b> הצלחה</span></li>
              <li><Icon name="check" /><span><b className="num">5</b> שנים בתחום</span></li>
              <li><Icon name="check" /><span>מומלץ ע״י לקוחות בפייסבוק</span></li>
            </ul>
          </div>

          {/* Video */}
          <figure className="vsl-video">
            <figcaption className="vsl-video__cap">
              <span className="vsl-video__cap-line">
                <IconPlay /><span><span className="num">4</span> דקות שיכולות להציל לך <bdi className="num">₪150,000</bdi></span>
              </span>
            </figcaption>
            <div className="vsl-video__frame">
              {VIDEO_EMBED_URL && videoStarted ? (
                <iframe
                  src={`${VIDEO_EMBED_URL}?autoplay=1&rel=0`}
                  title="VSL BMS V2"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              ) : VIDEO_EMBED_URL ? (
                <button type="button" className="vsl-video__facade" onClick={startVideo}>
                  <img
                    src={`https://i.ytimg.com/vi/${VIDEO_EMBED_URL.split('/').pop()}/maxresdefault.jpg`}
                    alt=""
                    width="1280"
                    height="720"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <span className="vsl-video__play"><IconPlay />הפעילו את ההדרכה</span>
                </button>
              ) : (
                <div className="vsl-video__facade">
                  <span className="vsl-video__play"><IconPlay />4 דקות שיכולות להציל לך ₪150,000</span>
                </div>
              )}
            </div>
          </figure>

          {/* Primary CTA */}
          <div className="vsl-hero__cta">
            <Btn
              variant="signal"
              href={purchaseUrl}
              onClick={trackPurchaseClick}
              aria-label={`הצטרף/י לקורס BMS ב-₪${PRICE}`}
            >
              כן, אני רוצה את השיטה ב-₪{PRICE}
            </Btn>
            <p className="vsl-hero__terms small">תשלום חד-פעמי · גישה מיידית · כולל מע״מ</p>
          </div>
        </div>
      </section>

      {/* ─── 3. THE REAL COST ─── */}
      <section className="section theme-paper">
        <div className="container">
          <header className="sec-head m-reveal">
            <h2 className="h1"><span className="lt">כמה עולה</span> לאבד את ה-Business Manager?</h2>
          </header>

          <ol className="vsl-rows vsl-rows--list">
            {COSTS.map((cost, i) => (
              <li className="vsl-row m-reveal" key={cost.title}>
                <span className="vsl-row__num num" aria-hidden="true">0{i + 1}</span>
                <h3 className="vsl-row__title">{cost.title}</h3>
                <ul className="vsl-row__body vsl-row__list">
                  {cost.items.map((item, n) => <li key={n}>{item}</li>)}
                </ul>
              </li>
            ))}
          </ol>

          <p className="vsl-note m-reveal">
            הקורס עולה <strong><bdi className="num">₪{PRICE}</bdi></strong>. חסימה אחת ממוצעת עולה <strong>פי <span className="num">18</span></strong> מזה.{' '}
            הוא משלם את עצמו עוד לפני שלמדתם את המודול הראשון.
          </p>

          <div className="vsl-cta">
            <Btn variant="signal" href={purchaseUrl} onClick={trackPurchaseClick}>אני בפנים</Btn>
          </div>
        </div>
      </section>

      {/* ─── 4. WHO AM I ─── */}
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
            <h2 className="h1 m-reveal"><span className="lt">למה אני יודע את זה?</span> כי בעצמי איבדתי הכל.</h2>

            <div className="vsl-prose m-reveal">
              <p>
                שמי אושר רווח. ב-2020 אשתי בר הייתה בשיא שלה כיוצרת תוכן.
                בוקר אחד היא ניסתה להיכנס לחשבון. לא הצליחה.
                נחסם. בלי הסבר, בלי אזהרה, בלי דרך לדבר עם בנאדם אמיתי בצד השני.
              </p>
              <p>ניסיתי. נכשלתי. ניסיתי שוב. אחרי שבועיים של ניסיון וטעייה, היא חזרה.</p>
              <p>
                מאז עברו <span className="num">5</span> שנים. <strong><span className="num">2,500</span> עסקים שוחזרו</strong>.
                אלפי שעות של מחקר. <strong>אחוז הצלחה של <bdi className="num">95%</bdi></strong>.
              </p>
              <p>
                ואז הבנתי משהו: <strong>כל הלקוחות שהגיעו אליי כבר היו פצועים.</strong>
                {' '}הם הגיעו אחרי שזה קרה. השאלה האמיתית הייתה: למה זה קרה מלכתחילה?
              </p>
              <p>
                <strong>הקורס הזה הוא התשובה.</strong>
                {' '}זה לא קורס "טריקים". זו השיטה שגיליתי אחרי <span className="num">2,500</span> מקרים על איך לא להגיע לרגע שבו אתם צריכים אותי.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. 3 REAL CASES ─── */}
      <section className="section theme-mist">
        <div className="container">
          <header className="sec-head m-reveal">
            <h2 className="h2 vsl-h-wide">
              <span className="lt">3 עסקים. 3 פעמים שהם הגיעו אליי בייאוש.</span>{' '}
              ב-3 הפעמים. <span className="mk m-in">אותה טעות בדיוק.</span>
            </h2>
            <p className="lead">השמות שונו. הסיפורים אמיתיים ב-100%.</p>
          </header>

          <ol className="vsl-rows">
            {CASES.map((c, i) => (
              <li className="vsl-row m-reveal" key={c.name}>
                <span className="vsl-row__num num" aria-hidden="true">0{i + 1}</span>
                <h3 className="vsl-row__title">{c.name} <span className="lt">{c.role}</span></h3>
                <p className="vsl-row__body">{c.story}</p>
              </li>
            ))}
          </ol>

          <p className="vsl-note m-reveal">
            המכנה המשותף לכל ה-3?{' '}
            <strong>הם לא נחסמו בגלל מזל רע. הם נחסמו בגלל נוסחה שאף אחד לא סיפר להם.</strong>
          </p>
        </div>
      </section>

      {/* ─── 6. METHODOLOGY ─── */}
      <section className="section theme-paper">
        <div className="container">
          <header className="sec-head m-reveal">
            <h2 className="h1">
              <span className="lt">BMS נכון =</span> <span className="mk m-in">3 שלבים</span>.{' '}
              כל שלב היה מציל אחד מהמקרים.
            </h2>
          </header>

          <ol className="vsl-rows vsl-rows--tagged">
            {STAGES.map((s, i) => (
              <li className="vsl-row m-reveal" key={s.title}>
                <span className="vsl-row__num num" aria-hidden="true">0{i + 1}</span>
                <h3 className="vsl-row__title">{s.title}</h3>
                <p className="vsl-row__body">{s.body}</p>
                <p className="vsl-row__tag tag">{s.saves}</p>
              </li>
            ))}
          </ol>

          <div className="vsl-cta">
            <Btn variant="signal" href={purchaseUrl} onClick={trackPurchaseClick}>אני רוצה את כל ה-3 שלבים ב-₪{PRICE}</Btn>
          </div>
        </div>
      </section>

      {/* ─── 7. WHAT'S INSIDE. MODULES AS OUTCOMES ─── */}
      <section className="section theme-mist">
        <div className="container vsl-split">
          <header className="vsl-split__side">
            <div className="vsl-split__sticky m-reveal">
              <h2 className="h1"><span className="lt">אחרי הקורס.</span> תדעו לעשות את כל זה.</h2>
              <p className="lead">לא מצגות. לא תיאוריה. הקלטות מסך, צעד-אחר-צעד, יישום מיידי.</p>
            </div>
          </header>

          <ol className="vsl-rail" data-scrub="0.7 0.55">
            <li className="vsl-rail__line" aria-hidden="true"><span /></li>
            {MODULES.map((m, i) => <RailItem key={m.label} item={m} node={`0${i + 1}`} />)}
            {/* Bonuses */}
            <li className="vsl-rail__break m-reveal">
              <span className="vsl-rail__node vsl-rail__node--plus" aria-hidden="true">+</span>
              <p>ובחבילה: 3 בונוסים שלא תמצאו בשום מקום אחר</p>
            </li>
            {BONUSES.map((b) => <RailItem key={b.label} item={b} node="+" bonus />)}
          </ol>
        </div>

        <div className="container vsl-pack m-reveal">
          <ul className="vsl-pack__line">
            {PACK.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="vsl-cta">
            <Btn variant="signal" href={purchaseUrl} onClick={trackPurchaseClick}>אני רוצה את הכל ב-₪{PRICE}</Btn>
          </div>
        </div>
      </section>

      {/* ─── 8. OBJECTION HANDLING ─── */}
      <section className="section theme-paper">
        <div className="container vsl-split">
          <header className="vsl-split__side">
            <div className="vsl-split__sticky m-reveal">
              <h2 className="h1"><span className="lt">"רגע,</span> יש לי כמה ספקות..."</h2>
            </div>
          </header>
          <Accordion items={OBJECTIONS} name="v2-obj" />
        </div>
      </section>

      {/* ─── 9. FINAL CTA / PRICING ─── */}
      <section className="section theme-mist" id="final-cta">
        <div className="container">
          <header className="sec-head m-reveal">
            <h2 className="h1">
              <span className="lt">תשתית שאי אפשר לשבור.</span> ב-<bdi className="mk m-in num">₪{PRICE}</bdi>.
            </h2>
          </header>

          <div className="vsl-offer card card--ink theme-ink m-reveal">
            <div className="vsl-offer__head">
              <p className="vsl-offer__was">שווי אמיתי: <s><bdi>₪{ORIGINAL_VALUE}</bdi></s></p>
              <p className="vsl-offer__today">המחיר היום</p>
              <p className="vsl-offer__price num"><bdi>₪{PRICE}</bdi></p>
            </div>

            <div className="vsl-offer__incl">
              <ul className="vsl-incl">
                {INCLUDED.map((row, i) => (
                  <li key={i}>
                    <Icon name="check" />
                    <span>{row.label}</span>
                    <span className="vsl-incl__val">{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="vsl-offer__foot">
              <Btn variant="signal" block href={purchaseUrl} onClick={trackPurchaseClick}>
                כן, אני רוצה את הכל ב-₪{PRICE}
              </Btn>
              <p className="small muted">תשלום מאובטח · חשבונית מס מיידית · גישה מיידית למייל</p>
              <p className="small dim">ברכישה את/ה מסכימ/ה לקבל עדכונים שיווקיים מאיתנו. ניתן להסיר בכל עת.</p>
            </div>
          </div>

          {/* Honest risk-reduction block (replaces brief's 7-day guarantee) */}
          <div className="vsl-promise card m-reveal">
            <h3 className="h3">ההבטחה שלי האמיתית:</h3>
            <p className="vsl-promise__no serif">
              הקורס הזה <strong>לא מבטיח</strong> שלעולם לא תיחסמו או תיפרצו.{' '}
              מי שמבטיח לכם דבר כזה, משקר.
            </p>
            <p>
              <strong>מה שאני כן מבטיח:</strong>{' '}
              אחרי שתיישמו את כל מה שיש בקורס,
              תהיו ברמת הגנה <span className="mk">גבוהה משמעותית</span> מ-99% מבעלי העסקים בארץ.{' '}
              <em>הסיכון לא ייעלם. הוא יקטן באופן דרמטי.</em>
            </p>
            <p><strong>זאת ההבטחה היחידה שאני מוכן לתת.</strong></p>
          </div>

          {/* WhatsApp fallback */}
          <div className="vsl-wa">
            <p className="vsl-wa__q">יש שאלה לפני? שלחו לי הודעה אישית בוואטסאפ. אני עונה תוך שעות.</p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--plain vsl-wa__btn">
              <Icon name="whatsapp" />
              <span>שלחו הודעה. אושר עונה אישית</span>
            </a>
          </div>
        </div>
      </section>

      {/* ─── 10. FAQ ─── */}
      <section className="section theme-paper">
        <div className="container vsl-split">
          <header className="vsl-split__side">
            <div className="vsl-split__sticky m-reveal">
              <h2 className="h1">שאלות נפוצות</h2>
              <p className="vsl-faq-foot">
                יש שאלה שלא מצאתם פה?{' '}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="link">שלחו הודעה בוואטסאפ</a>.
                {' '}אני עונה אישית.
              </p>
            </div>
          </header>
          <Accordion items={FAQS} name="v2-faq" />
        </div>
      </section>

      </main>

      {/* ─── STICKY MOBILE BAR ─── */}
      <div className={`vsl-bar${showStickyCta ? ' is-visible' : ''}`} role="region" aria-label="קיצור דרך לרכישה">
        <p className="vsl-bar__info">
          <span>BMS Course</span>
          <bdi className="num">₪{PRICE}</bdi>
        </p>
        <a
          href={purchaseUrl}
          className="vsl-bar__btn"
          onClick={trackPurchaseClick}
          aria-label={`הצטרף/י עכשיו ב-₪${PRICE}`}
        >
          הצטרף/י עכשיו
        </a>
      </div>

      {/* ─── FOOTER ─── */}
      <footer className="vsl-foot theme-ink">
        <div className="container">
          <p>
            התוצאות המוצגות בדף זה מבוססות על מקרים אמיתיים. השמות בוידאו בדויים לשמירה על פרטיות.
            התוצאות שלך עשויות להיות שונות בהתאם לנסיבות, לניסיון ולמאמץ שתשקיע.
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
