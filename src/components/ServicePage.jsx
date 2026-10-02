import React from 'react';
import { Link } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import ContactForm from './ContactForm';
import Icon from './Icon';
import { Eyebrow, WaBtn, ArrowIcon } from './ui';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import { SERVICE_PATHS } from '../i18n';
import { FACTS } from '../data/businessFacts';
import './FAQ.css';
import './ServicePage.css';

const t = {
  heroSubtitle: 'שירות מקצועי ומהיר לשחזור חשבונות. תשלום רק אחרי הצלחה מוכחת',
  ctaHero: 'שלחו הודעה עכשיו, ללא עלות',
  statsAria: 'נתוני שירות',
  statAccounts: 'חשבונות שוחזרו',
  statHours: 'משך טיפול',
  statSuccess: 'אחוז הצלחה',
  statRating: 'דירוג לקוחות',
  faqSubtitle: 'תשובות לשאלות שלקוחות שואלים אותנו הכי הרבה',
  relatedTitle: 'מאמרים קשורים',
  crossTitle: 'זה לא בדיוק המקרה שלך?',
  breadcrumbHome: 'בית',
  breadcrumbAria: 'מסלול ניווט',
  formSubtitle: 'השאירו שם וטלפון ואחזור אליכם עם אבחון ראשוני, ללא עלות.',
  finalText: 'שלחו הודעת וואטסאפ עכשיו. אבחון ראשוני חינם, ותשלום רק אחרי שהחשבון חזר לידיכם.',
  ctaFinal: 'שלחו הודעה עכשיו',
  whatsappMessage: (keyword) => `היי, אני מעוניין/ת בשירות: ${keyword}`,
  callbackTitle: 'בדקו את החסימה וחזרו אליי',
  callbackSub: 'וואטסאפ חסום? השאירו שם ומספר לחזרה. אבחון ראשוני חינם, בלי התחייבות.',
  callbackSubmit: 'בדקו את החסימה וחזרו אליי',
  callbackAlt: 'או התקשרו:',
  callbackWa: 'יש לכם מספר אחר עם וואטסאפ?',
  callbackNotes: ['המספר שלך חסום מלהשתמש בוואטסאפ', 'הערעור נדחה (חסימה קבועה)', 'לא מצליח/ה לקבל קוד אימות', 'החשבון נפרץ / SIM הוחלף'],
  // Section labels (eyebrows) and link labels, shared with the home page
  labelSteps: 'איך זה עובד',
  labelResults: 'תוצאות',
  labelFaq: 'שאלות נפוצות',
  labelGuides: 'מדריכים',
  labelContact: 'יצירת קשר',
  allTestimonials: 'כל ההמלצות',
  allFaq: 'לכל השאלות והתשובות',
  ratingAria: (n) => `דירוג ${n} מתוך 5`,
};

// Every number comes from the evidence register (businessFacts.js)
const PROOF = [
  { value: FACTS.accountsRecovered.display, label: t.statAccounts },
  { value: FACTS.successRate.display, label: t.statSuccess },
  { value: FACTS.rating.display, label: t.statRating, star: true },
  { value: FACTS.typicalTurnaround.he, label: t.statHours, words: true },
];

// All 6 testimonials inlined so the template has no extra data dependency
const ALL_TESTIMONIALS = [
  {
    id: 1,
    name: 'מתנאל לייני',
    role: 'יוצר תוכן ומשפיען',
    image: '/images/matanel.jpg',
    quote:
      'מתחילת המלחמה אושר מלווה אותי בכל צרה, הצליח להחזיר לי את החשבון מחסימות שלא ברא השטן, רק תנו לו את ההזדמנות והוא יסדר.',
    rating: 5,
  },
  {
    id: 2,
    name: 'חני אסור',
    role: 'יוצרת תוכן בתחום הקולינריה',
    image: '/images/hani.jpg',
    quote:
      'פרצו לי לאינסטגרם ולפייסבוק, ראיתי את מפעל חיי קורס. דיברתי עם עוד כמה אנשים שהלחיצו אותי, אושר בא - הרגיע וסידר.',
    rating: 5,
  },
  {
    id: 3,
    name: 'גל נמני',
    role: 'מנכלית Go-Tech',
    image: '/images/gal.jpg',
    quote:
      'לאחר שנעקצתי על ידי חברה אחרת, פניתי לאושר ובמסירות הוא החזיר לי את העסק לחיים. ממש ככה!',
    rating: 5,
  },
  {
    id: 4,
    name: 'אופירה יחיא',
    role: 'קונדיטורית ויוצרת תוכן',
    image: '/images/ofira.jpg',
    quote:
      'פרצו לי אנשים מטורקיה, השביתו את החשבון והמצב היה כמעט בלתי הפיך - לאחר כשבועיים אושר החזיר לי את החשבון בנחת וברוגע לא אופייניים.',
    rating: 5,
  },
  {
    id: 5,
    name: 'יש עתיד',
    role: 'מפלגת יש עתיד - לקהילה הערבית',
    image: '/images/yeshatid.jpg',
    quote:
      'ביום בהיר אחד ירד עלינו המסך מסיבה הזויה לחלוטין, אושר איבחן מהר את הבעיה ובפעילות יסודית החזיר אותנו לפעילות אחרי יומיים',
    rating: 5,
  },
  {
    id: 6,
    name: 'ליראק ישראל',
    role: 'הברנד הישראלי לחברת הטיפוח המובילה',
    image: '/images/lierac.jpg',
    quote:
      'תמיכה מעולה בפתרון בעיות פרסום. אושר מקצועי, זמין ועוזר בכל בעיה. מאוד מרוצה מהשירות!',
    rating: 5,
  },
];

// "keyword: promise" / "problem? promise" → the light part and the black part
// of the headline. The rendered text stays exactly pageData.title.
const splitTitle = (title) => {
  const m = title.match(/^(.+?[:?])\s+(.+)$/);
  return m ? [m[1], m[2]] : ['', title];
};

const pad = (n) => String(n).padStart(2, '0');

const ServicePage = ({ pageData }) => {
  const visibleTestimonials = pageData.testimonialIds
    .map((id) => ALL_TESTIMONIALS.find((tm) => tm.id === id))
    .filter(Boolean);

  const waMessage = t.whatsappMessage(pageData.keyword);
  const isWhatsApp = pageData.slug === 'whatsapp-recovery';
  const [titleLead, titleMain] = splitTitle(pageData.title);
  const related = pageData.relatedArticles || [];
  const cross = pageData.crossLinks || [];

  return (
    <div dir="rtl" className="svcp">
      <Navbar />

      <main id="main">
        {/* ---- HERO ---- */}
        <section className={`svcp__hero theme-ink bg-grid${isWhatsApp ? ' svcp__hero--callback' : ''}`}>
          <div className="container">
            {/* Visible counterpart to the BreadcrumbList schema */}
            <nav className="svcp__crumbs" aria-label={t.breadcrumbAria}>
              <ol>
                <li>
                  <Link to="/">{t.breadcrumbHome}</Link>
                </li>
                <li aria-current="page">{pageData.title}</li>
              </ol>
            </nav>

            <div className="svcp__hero-grid">
              <div className="svcp__hero-copy">
                <p className="svcp__kicker">( {pageData.keyword} )</p>

                <h1 className="svcp__title display">
                  {titleLead && <><span className="lt svcp__title-line">{titleLead}</span>{' '}</>}
                  <span className="svcp__title-line"><span className="mk">{titleMain}</span></span>
                </h1>

                {isWhatsApp ? (
                  /* Callback-first: a visitor whose WhatsApp is blocked cannot use a WhatsApp CTA */
                  <>
                    <p className="svcp__sub lead">{t.callbackSub}</p>
                    <ul className="svcp__alt">
                      <li>
                        <Icon name="phone" />
                        <span>
                          {t.callbackAlt}{' '}
                          <a className="link" href={`tel:${FACTS.phone}`} dir="ltr">{FACTS.phoneDisplay}</a>
                          {' · '}{FACTS.hours.he}
                        </span>
                      </li>
                      <li>
                        <Icon name="whatsapp" />
                        <span>
                          {t.callbackWa}{' '}
                          <a
                            className="link"
                            href={getWhatsAppUrl(waMessage)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onWhatsAppClick('service-hero')}
                          >
                            {t.ctaHero}
                          </a>
                        </span>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p className="svcp__sub lead">{t.heroSubtitle}</p>
                    <div className="svcp__actions">
                      <WaBtn message={waMessage} location="service-hero">{t.ctaHero}</WaBtn>
                      <p className="svcp__terms small">
                        <b>אבחון ראשוני חינם.</b> <bdi>{FACTS.priceRange.he}</bdi> בממוצע, בלי תשלום מראש וללא סיכון.
                      </p>
                    </div>
                  </>
                )}
              </div>

              {isWhatsApp && (
                <div className="theme-paper svcp__hero-form card">
                  <ContactForm
                    heading={t.callbackTitle}
                    subheading={t.formSubtitle}
                    submitLabel={t.callbackSubmit}
                    noteOptions={t.callbackNotes}
                    location="service-hero-callback"
                    hideWhatsApp
                    altPhoneField
                  />
                </div>
              )}

              {/* Proof instead of a decorative image: the four facts, set large */}
              <div className="svcp__proof" role="group" aria-label={t.statsAria}>
                <p className="svcp__proof-head" aria-hidden="true">( {t.statsAria} )</p>
                <dl className="svcp__proof-list">
                  {PROOF.map((item, i) => (
                    <div className="svcp__proof-item" key={item.label}>
                      <span className="svcp__proof-num num" aria-hidden="true">{pad(i + 1)}</span>
                      <dt className="svcp__proof-label">{item.label}</dt>
                      <dd className={`svcp__proof-value${item.words ? ' svcp__proof-value--words' : ''}`}>
                        <bdi>{item.value}</bdi>
                        {item.star && <Icon name="star" className="svcp__proof-star" />}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* ---- WHAT IS IT ---- */}
        <section className="svcp__about section">
          <div className="container svcp__about-grid">
            <header className="svcp__about-head">
              <div className="svcp__sticky m-reveal">
                <Eyebrow num="01">{pageData.keyword}</Eyebrow>
                <h2 className="h1">
                  <span className="lt">מה זה</span> ולמה זה קורה?
                </h2>
              </div>
            </header>
            <div
              className="svcp__prose m-reveal"
              dangerouslySetInnerHTML={{ __html: pageData.whatIsIt }}
            />
          </div>
        </section>

        {/* ---- STEPS ---- */}
        <section className="svcp__steps section theme-ink">
          <div className="container">
            <header className="sec-head m-reveal">
              <Eyebrow num="02">{t.labelSteps}</Eyebrow>
              <h2 className="h1">
                <span className="lt">הפתרון שלנו:</span> 3 שלבים פשוטים
              </h2>
            </header>

            {/* The top rule fills as the list scrolls through the viewport */}
            <ol className="svcp__steps-list" data-scrub="0.85 0.5">
              {pageData.steps.map((step, index) => (
                <li key={step.title} className="svcp__step m-reveal">
                  <span className="svcp__step-num num" aria-hidden="true">{pad(index + 1)}</span>
                  <h3 className="svcp__step-title h3">{step.title}</h3>
                  <p className="svcp__step-desc">{step.desc}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---- TESTIMONIALS ---- */}
        <section className="svcp__tst section">
          <div className="container">
            <header className="sec-head sec-head--split m-reveal">
              <div>
                <Eyebrow num="03">{t.labelResults}</Eyebrow>
                <h2 className="h1">
                  <span className="lt">מה הלקוחות שלנו</span> אומרים
                </h2>
              </div>
              <Link to="/testimonials" className="link link--arrow svcp__tst-all">
                {t.allTestimonials}
                <ArrowIcon />
              </Link>
            </header>

            {/* One lead quote, two smaller beside it */}
            <div className="svcp__tst-grid m-stagger">
              {visibleTestimonials.map((tm) => (
                <figure key={tm.id} className="svcp-quote">
                  <div className="svcp-quote__stars" role="img" aria-label={t.ratingAria(tm.rating)}>
                    {Array.from({ length: tm.rating }, (_, i) => <Icon key={i} name="star" />)}
                  </div>
                  <blockquote className="svcp-quote__text">{tm.quote}</blockquote>
                  <figcaption className="svcp-quote__who">
                    <img
                      src={tm.image}
                      alt={`${tm.name}, ${tm.role}`}
                      width="48"
                      height="48"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.src = '/images/default-avatar.png';
                      }}
                    />
                    <span>
                      <b>{tm.name}</b>
                      <span className="svcp-quote__role">{tm.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="svcp__faq section theme-mist">
          <div className="container svcp__faq-grid">
            <header className="svcp__faq-head">
              <div className="svcp__sticky m-reveal">
                <Eyebrow num="04">{t.labelFaq}</Eyebrow>
                <h2 className="h1">
                  <span className="lt">שאלות נפוצות על</span> {pageData.keyword}
                </h2>
                <p className="lead">{t.faqSubtitle}</p>
                <Link to="/faq" className="link link--arrow small svcp__faq-all">
                  {t.allFaq}
                  <ArrowIcon />
                </Link>
              </div>
            </header>

            {/* Native <details>: answers stay in the HTML, no state to hydrate */}
            <div className="faq-list">
              {pageData.faqs.map((faq, i) => (
                <details key={faq.question} className="faq-item" name={`svc-faq-${pageData.slug}`}>
                  <summary>
                    <span className="faq-item__num num" aria-hidden="true">{pad(i + 1)}</span>
                    <span className="faq-item__q">{faq.question}</span>
                    <span className="faq-item__icon" aria-hidden="true" />
                  </summary>
                  <p className="faq-item__a">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---- RELATED ARTICLES + SIBLING SERVICE ---- */}
        {/* The cross link sends each specific intent to the page that owns it,
            so the two near-neighbour pages stop competing for the same query. */}
        {(related.length > 0 || cross.length > 0) && (
          <section className="svcp__more section">
            <div className={`container svcp__more-grid${related.length > 0 ? '' : ' svcp__more-grid--solo'}`}>
              {related.length > 0 && (
                <header className="svcp__more-head m-reveal">
                  <Eyebrow num="05">{t.labelGuides}</Eyebrow>
                  <h2 className="h1">
                    <span className="lt">מאמרים</span> קשורים
                  </h2>
                </header>
              )}

              {related.length > 0 && (
                <ul className="svcp__arts m-stagger">
                  {related.map((a, i) => (
                    <li key={a.slug}>
                      <Link to={`/articles/${a.slug}`} className="svcp__art">
                        <span className="svcp__art-num num" aria-hidden="true">{pad(i + 1)}</span>
                        <span className="svcp__art-title">{a.title}</span>
                        <span className="svcp__go" aria-hidden="true"><ArrowIcon /></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {cross.length > 0 && (
                <div className="svcp__cross m-reveal">
                  <h2 className="svcp__cross-title">{t.crossTitle}</h2>
                  {cross.map((c) => (
                    <Link key={c.slug} to={SERVICE_PATHS[c.slug]} className="svcp__cross-link">
                      <span className="svcp__cross-label">{c.label}</span>
                      <span className="svcp__cross-note">{c.note}</span>
                      <span className="svcp__go" aria-hidden="true"><ArrowIcon /></span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ---- CTA BAND ---- */}
        {/* Sits before the callback form, not after it: the shared footer opens
            with its own WhatsApp band, and two ink CTA bands in a row read as a repeat. */}
        <section className="svcp__final section theme-ink bg-grid bg-grid--full">
          <div className="container svcp__final-grid">
            <h2 className="svcp__final-title display m-reveal">
              <span className="lt">מוכנים לפתור</span> <span className="mk m-in">את הבעיה?</span>
            </h2>
            <div className="svcp__final-side m-reveal">
              <p className="lead">{t.finalText}</p>
              <WaBtn message={waMessage} location="service-final">{t.ctaFinal}</WaBtn>
            </div>
          </div>
        </section>
        {/* ---- LEAD FORM ---- */}
        <section className="svcp__form section theme-mist">
          <div className="container svcp__form-grid">
            <div className="svcp__form-copy m-reveal">
              <Eyebrow num="06">{t.labelContact}</Eyebrow>
              <h2 className="h1">
                <span className="lt">מעדיפים שאחזור</span> אליכם?
              </h2>
              <p className="lead">{t.formSubtitle}</p>
            </div>
            <div className="card svcp__form-card m-reveal">
              <ContactForm location="service-form" />
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ServicePage;
