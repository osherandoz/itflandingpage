import { useEffect, useState } from 'react';
import { Btn, Eyebrow } from '../components/ui';
import Icon from '../components/Icon';
import { pressItems } from '../data/press';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import {
  AKAMOL_PRICE,
  AKAMOL_COVERS,
  CHAT_PROOF,
  AKAMOL_BLOCKED_MSG,
  AKAMOL_BUY_MSG,
  akamolCheckoutUrl,
} from '../data/akamol';
import './VslBms.css'; // vsl-bar / vsl-foot / vsl-quote: the sales-page pieces this page reuses
import './Akamol.css';

const PRICE = AKAMOL_PRICE.toFixed(2); // "19.90"

function trackCheckout(content) {
  if (typeof window === 'undefined') return;
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', { value: AKAMOL_PRICE, currency: 'ILS', content_name: 'akamol', utm_content: content });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: 'ILS',
      value: AKAMOL_PRICE,
      utm_content: content,
      items: [{ item_id: 'akamol', item_name: 'האקמול לרשתות החברתיות', price: AKAMOL_PRICE, quantity: 1 }],
    });
  }
}

function trackBlockedWhatsApp() {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'whatsapp_click', { page: 'akamol', cta_location: 'akamol-blocked-now' });
  }
}

/* ============================================================
   CONTENT
   ============================================================ */
const GUIDES = [
  {
    name: 'אינסטגרם',
    items: [
      'הגבלה זמנית: למה ברוב המקרים זה 72 שעות, ולמה כל ניסיון ״לבדוק אם עבר״ מאפס את השעון.',
      'הושעיתם: איך מגישים ערעור, למה וידאו סלפי עדיף על תעודה מזהה, ו-7 דברים לבדוק לפני שמצלמים.',
      '96 השעות של הבדיקה: מה לא עושים, ומה זה אומר כשאין תשובה.',
      'פריצה: הקישור הרשמי שמנתק את הפורץ, ולמה מקלידים בו שם משתמש ולא מייל.',
    ],
  },
  {
    name: 'פייסבוק',
    items: [
      'הגבלה זמנית והשעיה, כמו באינסטגרם.',
      'על מה התמיכה של מטא כן עונה (שישה מקרים), ולמה אחרי חצי שנה היא כבר לא תעזור.',
      'פריצה: הכפתור במייל שבולם את הפורץ בלחיצה אחת, ולמה יש לכם שבוע אחד בלבד ללחוץ עליו.',
    ],
  },
  {
    name: 'וואטסאפ',
    items: [
      'שלוש הטעויות שהופכות השבתה לאובדן קבוע.',
      'למה מספר חדש לא פותר את הבעיה: החסימה יושבת על המכשיר.',
    ],
  },
];

const TESTIMONIALS = [
  {
    img: '/images/ofira.jpg',
    name: 'אופירה יחיא',
    role: 'קונדיטורית ויוצרת תוכן',
    quote: 'פרצו לי אנשים מטורקיה, השביתו את החשבון והמצב היה כמעט בלתי הפיך - לאחר כשבועיים אושר החזיר לי את החשבון בנחת וברוגע לא אופייניים.',
  },
  {
    img: '/images/gal.jpg',
    name: 'גל נמני',
    role: 'מנכ״לית Go-Tech',
    quote: 'לאחר שנעקצתי על ידי חברה אחרת, פניתי לאושר ובמסירות הוא החזיר לי את העסק לחיים. ממש ככה!',
  },
];

// Same outlets, same colours as /press
const PRESS_LOGOS = ['ynet-2022', 'facebook-economy-2025']
  .map((id) => pressItems.find((p) => p.id === id))
  .filter(Boolean);

export default function Akamol() {
  const [showSticky, setShowSticky] = useState(false);
  const [finalInView, setFinalInView] = useState(false);

  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', { content_name: 'akamol', value: AKAMOL_PRICE, currency: 'ILS' });
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The sticky bar steps aside while a real buy button is on screen.
  useEffect(() => {
    const targets = document.querySelectorAll('[data-ak-cta]');
    if (!targets.length) return;
    const seen = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? seen.add(e.target) : seen.delete(e.target)));
      setFinalInView(seen.size > 0);
    }, { threshold: 0.3 });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  // One buy button: Grow when the link exists, otherwise a WhatsApp message.
  const buyProps = (content) => {
    const href = akamolCheckoutUrl(content);
    if (href) return { href, onClick: () => trackCheckout(content) };
    return {
      href: getWhatsAppUrl(AKAMOL_BUY_MSG),
      target: '_blank',
      rel: 'noopener noreferrer',
      onClick: onWhatsAppClick(`akamol-${content}`),
    };
  };

  return (
    <div className="vsl ak">
      <main id="main">
        {/* 1. HERO */}
        <section className="ak-hero theme-ink bg-grid">
          <div className="container ak-hero__grid">
            <div className="ak-hero__copy">
              <p className="ak-hero__eyebrow">מדריך עזרה ראשונה · אינסטגרם · פייסבוק · וואטסאפ</p>
              <h1 className="ak-hero__title">
                <span className="lt">אקמול לא קונים בשתיים בלילה,</span>{' '}
                <span>עם <span className="mk">חום של 39.</span></span>
              </h1>
              <p className="ak-hero__sub">
                עזרה ראשונה לרשתות החברתיות: שלושה מדריכים קצרים, לאינסטגרם, לפייסבוק ולוואטסאפ.
                מה עושים, ומה בשום אופן לא עושים, ב-72 השעות הראשונות אחרי חסימה או פריצה.
              </p>
              <div className="ak-hero__cta">
                <Btn variant="signal" data-ak-cta {...buyProps('hero')}>
                  אני רוצה שזה יהיה אצלי · <bdi>{PRICE} ש״ח</bdi>
                </Btn>
                <p className="small ak-hero__terms">שלושה קובצי PDF · נשלחים למייל מיד · תשלום מאובטח</p>
              </div>
            </div>

            {AKAMOL_COVERS.length > 0 && (
              <div className="ak-covers" aria-hidden={false}>
                {AKAMOL_COVERS.map((c, i) => (
                  <img
                    key={c.src}
                    className={`ak-covers__img ak-covers__img--${i + 1}`}
                    src={c.src}
                    alt={c.alt}
                    width={c.width}
                    height={c.height}
                    decoding="async"
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* 2. THE FRUSTRATION, confirmed */}
        <section className="section theme-mist">
          <div className="container">
            <div className="vsl-prose ak-prose m-reveal">
              <p className="ak-lead">
                ברגע שזה קורה, כולם עושים אותו דבר. לוחצים על כל כפתור, ממלאים כל טופס, וכותבים ל״מומחה״ הראשון שהגיב בתגובות.
              </p>
              <p>
                רוב מי שמגיע אליי עשה אחד משלושה דברים: לא ידע מה פרטי הגישה שלו, מיהר לפעול לפי מה שמצא ברשת או מה שצ׳אטבוט אמר לו,
                או נתן לכמה אנשים לגעת בחשבון במקביל.
              </p>
              <p>
                <strong>זה לא טיפשות. זו פאניקה, וזה בסדר גמור.</strong> הבעיה היא שכל אחד מהדברים האלה הופך מקרה פשוט למסובך.
                אף אחד פשוט לא מספר מראש מה עושים בשעה הראשונה.
              </p>
            </div>
          </div>
        </section>

        {/* 3. THE SOLUTION */}
        <section className="section theme-paper">
          <div className="container ak-split">
            <header className="m-reveal">
              <h2 className="h1">האקמול לרשתות החברתיות</h2>
              <p className="lead">
                שלושה מדריכים קצרים, אחד לכל פלטפורמה, שקוראים בעשר דקות ושומרים בטלפון.
                בלי פילוסופיה, בלי טריקים. סדר פעולות, קישורים רשמיים, ומה לא לעשות.
              </p>
            </header>
            <aside className="ak-callout m-reveal">
              <p>
                הוא לא מבטיח שהחשבון יחזור. אף אחד ישר לא יבטיח לכם את זה.
                הוא מבטיח שלא תסבכו את המצב בעצמכם.
              </p>
            </aside>
          </div>
        </section>

        {/* 4. PROOF */}
        <section className="section theme-mist">
          <div className="container">
            {CHAT_PROOF.enabled && (
              <figure className="ak-chat m-reveal">
                <img src={CHAT_PROOF.src} alt={CHAT_PROOF.alt} width={CHAT_PROOF.width} height={CHAT_PROOF.height} loading="lazy" decoding="async" />
                <figcaption>זו שיחה אמיתית. מה שהיא הייתה צריכה לדעת לפני שבחרה בתעודה מזהה נמצא בפרק 2.</figcaption>
              </figure>
            )}

            <p className="ak-number m-reveal">
              מעל <bdi>2,500</bdi> חשבונות חזרו לפעול מאז <bdi>2020</bdi>.
            </p>

            <div className="vsl-quotes ak-quotes m-reveal" role="group" aria-label="המלצות לקוחות">
              {TESTIMONIALS.map((t) => (
                <div className="vsl-quote" key={t.name}>
                  <img src={t.img} alt={t.name} width="48" height="48" loading="lazy" decoding="async" />
                  <blockquote>
                    <p>{t.quote}</p>
                    <footer>{t.name} · {t.role}</footer>
                  </blockquote>
                </div>
              ))}
            </div>

            <ul className="ak-press m-reveal" aria-label="כפי שסוקרנו בתקשורת">
              {PRESS_LOGOS.map((p) => (
                <li key={p.id} style={{ '--ak-press': p.siteColor }}>
                  <a href="/press">{p.siteName}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 5. THE PERSONAL STORY */}
        <section className="section theme-paper">
          <div className="container">
            <h2 className="h1 m-reveal"><span className="lt">למה</span> כתבתי את זה</h2>
            <div className="vsl-prose ak-prose m-reveal">
              <p>
                ב-2020 בר, אשתי, נחסמה בשיא שלה כיוצרת תוכן. בלי אזהרה, בלי סיבה.
                בלילה ההוא עשיתי בדיוק מה שכולם עושים: ניסיתי הכול, בבת אחת, בלי סדר.
              </p>
              <p>
                החשבון חזר. אבל מה שלמדתי מאז, מאלפי פניות, הוא שרוב מי שמגיע אליי כבר עשה בימים הראשונים משהו שמקשה עליו.
                לא כי הוא לא בסדר. כי אף אחד לא אמר לו מה לא לעשות.
              </p>
              <p><strong>האקמול הוא מה שהייתי רוצה שיהיה לנו באותו לילה.</strong></p>
            </div>
          </div>
        </section>

        {/* 6. WHAT IS INSIDE */}
        <section className="section theme-mist">
          <div className="container">
            <header className="sec-head m-reveal">
              <Eyebrow num="01">שלושה מדריכים</Eyebrow>
              <h2 className="h1">מה יש בפנים</h2>
            </header>

            <div className="ak-guides">
              {GUIDES.map((g, i) => (
                <article className="ak-guide m-reveal" key={g.name}>
                  <h3 className="ak-guide__name"><span className="ak-guide__num num" aria-hidden="true">0{i + 1}</span>{g.name}</h3>
                  <ol className="ak-guide__list">
                    {g.items.map((item) => (
                      <li key={item}><Icon name="check" /><span>{item}</span></li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>

            <p className="ak-bundle m-reveal">
              שלושה מדריכים, <bdi>{PRICE} ש״ח</bdi> לכולם. כל אחד קצר ונקרא לבד, כל פרק עומד בפני עצמו, והקישורים לחיצים.
              בסוף כל מדריך יש קוד AKAMOL50, שנותן 50 ש״ח הנחה על קורס BMS. נשלחים למייל מיד אחרי התשלום.
            </p>
          </div>
        </section>

        {/* 7. WHY NOW */}
        <section className="section theme-paper">
          <div className="container">
            <div className="vsl-prose ak-prose m-reveal">
              <p className="ak-lead">המדריך הזה נמכר באינסטגרם. ביום שהאינסטגרם שלכם נחסם, לא תגיעו אליו.</p>
              <p>
                וחלק מהדברים פוקעים. הכפתור שבולם פריצה לפייסבוק עובד שבוע אחד. התמיכה של מטא מפסיקה לעזור אחרי חצי שנה.
                מי שלא יודע שהם קיימים, מפספס אותם.
              </p>
            </div>
          </div>
        </section>

        {/* 8. MAIN CTA */}
        <section className="section theme-signal ak-cta">
          <div className="container ak-cta__in">
            <Btn variant="ink" data-ak-cta {...buyProps('cta_main')}>
              אני רוצה לדעת מה לעשות, לפני שזה קורה · <bdi>{PRICE} ש״ח</bdi>
            </Btn>
            <p className="small ak-cta__terms">תשלום מאובטח ב-Grow · נשלח למייל מיד · חשבונית אוטומטית</p>
          </div>
        </section>

        {/* 9. CLOSING */}
        <section className="section theme-paper">
          <div className="container">
            <p className="ak-closing m-reveal">
              זה לא שאתם לא טכנולוגיים. פשוט אף אחד לא מלמד מה עושים בשעה הראשונה.
              עכשיו זה יהיה אצלכם בארון התרופות, לפני שתצטרכו.
            </p>
            <div className="vsl-cta">
              <Btn variant="signal" data-ak-cta {...buyProps('closing')}>
                אני רוצה שזה יהיה אצלי · <bdi>{PRICE} ש״ח</bdi>
              </Btn>
              <p className="ak-blocked">
                החשבון שלכם חסום כבר עכשיו? אל תחכו למדריך.{' '}
                <a
                  className="link"
                  href={getWhatsAppUrl(AKAMOL_BLOCKED_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => { trackBlockedWhatsApp(); onWhatsAppClick('akamol-blocked-now')(); }}
                >
                  כתבו לי בוואטסאפ
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* STICKY MOBILE CTA */}
      <div className={`vsl-bar${showSticky && !finalInView ? ' is-visible' : ''}`} role="region" aria-label="קיצור דרך לרכישה">
        <a className="vsl-bar__btn vsl-bar__btn--wide" aria-label={`לקבל את האקמול, ${PRICE} שקלים`} {...buyProps('sticky')}>
          <span><bdi>{PRICE} ש״ח</bdi> · לקבל את האקמול</span>
        </a>
      </div>

      <footer className="vsl-foot theme-ink">
        <div className="container">
          <p>
            המידע במדריכים מבוסס על ניסיון מעשי בטיפול בתיקי שחזור מול מטא, ונכון למועד הפרסום. מטא משנה את המנגנונים שלה מעת לעת.
            המדריך אינו מבטיח שחזור חשבון ואינו מהווה ייעוץ משפטי. אין קשר ל-<span dir="ltr">Meta Platforms, Inc.</span>
          </p>
          <div className="vsl-foot__links">
            <a href="/privacy" className="link">מדיניות פרטיות</a>
            <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="link" onClick={onWhatsAppClick('akamol-footer')}>צור קשר</a>
          </div>
          <p>© 2026 IsraelTechForce | נתניה, ישראל | osher@israeltechforce.com</p>
        </div>
      </footer>
    </div>
  );
}
