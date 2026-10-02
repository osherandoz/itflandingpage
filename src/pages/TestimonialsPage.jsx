import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import Icon from '../components/Icon';
import { Btn, Eyebrow } from '../components/ui';
import './TestimonialsPage.css';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';


const TESTIMONIALS_HE = [
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

const t = {
  testimonials: TESTIMONIALS_HE,
  backLink: 'חזרה לעמוד הראשי',
  eyebrow: 'תוצאות',
  title: 'ביקורות לקוחות',
  subtitle:
    '2,500+ לקוחות בחרו ב-IsraelTechForce לשחזור חשבונות הרשתות החברתיות שלהם. הנה מה שהם אומרים.',
  aggregateAria: 'דירוג 4.9 מתוך 5',
  aggregateCount: 'מ-2,500+ לקוחות מרוצים',
  ctaTitle: 'רוצים להצטרף לאלפי הלקוחות המרוצים?',
  ctaText: 'תשלום רק אחרי הצלחה מוכחת. אבחון ראשוני חינמי. 95%+ הצלחה.',
  ctaBtn: 'צרו קשר בוואטסאפ',
  whatsappMessage: 'היי, אני רוצה לשמוע עוד על השירות',
};

// Numbers that carry a sign ("2,500+", "95%+") are isolated so RTL does not
// move the sign to the other side. The copy itself is untouched.
const SIGNED_NUMBER = /(\d[\d,.]*[%+]+)/;
const withBdi = (text) =>
  text.split(SIGNED_NUMBER).map((part, i) => (i % 2 ? <bdi key={i} dir="ltr">{part}</bdi> : part));

// "Back" in an RTL layout points to the right.
const BackIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

const Stars = ({ rating, label }) => (
  <div className="tstp__stars" role="img" aria-label={label}>
    {Array.from({ length: rating }, (_, i) => <Icon key={i} name="star" />)}
  </div>
);

const TestimonialsPage = () => {
  const whatsappUrl = getWhatsAppUrl(t.whatsappMessage);

  return (
    <div dir="rtl" className="tstp">
      <Navbar />

      <main id="main">
        <header className="tstp__hero theme-ink bg-grid">
          <div className="container tstp__hero-grid">
            <div className="tstp__hero-copy">
              <Link to="/" className="tstp__back link link--arrow small">
                <BackIcon />
                {t.backLink}
              </Link>
              <Eyebrow className="tstp__eyebrow">{t.eyebrow}</Eyebrow>
              <h1 className="display tstp__title">
                <span className="lt">ביקורות</span> <span className="mk">לקוחות</span>
              </h1>
              <p className="lead tstp__sub">{withBdi(t.subtitle)}</p>
            </div>

            {/* Aggregate rating */}
            <div className="tstp__score">
              <p className="tstp__score-value num"><bdi dir="ltr">4.9</bdi></p>
              <div className="tstp__score-side">
                <Stars rating={5} label={t.aggregateAria} />
                <p className="tstp__score-count">{withBdi(t.aggregateCount)}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Mosaic: one lead quote, then two more sizes */}
        <section className="tstp__wall theme-mist section" aria-label={t.title}>
          <div className="container">
            <div className="tstp__mosaic m-stagger">
              {t.testimonials.map((testimonial) => (
                <figure key={testimonial.id} className="tstp__card">
                  <Stars rating={testimonial.rating} label={`דירוג ${testimonial.rating} מתוך 5`} />
                  <blockquote className="tstp__quote">{testimonial.quote}</blockquote>
                  <figcaption className="tstp__who">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} - ${testimonial.role}`}
                      width="150"
                      height="150"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.target.src = '/images/default-avatar.png';
                      }}
                    />
                    <span>
                      <b className="tstp__name">{testimonial.name}</b>
                      <span className="tstp__role">{testimonial.role}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="tstp__cta" aria-labelledby="tstp-cta-title">
          <div className="container">
          <div className="tstp__cta-card theme-ink m-reveal">
            <h2 className="h1" id="tstp-cta-title">{t.ctaTitle}</h2>
            <div className="tstp__cta-side">
              <p className="lead">{withBdi(t.ctaText)}</p>
              <Btn variant="go" href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={onWhatsAppClick('testimonials-page')}>
                {t.ctaBtn}
              </Btn>
            </div>
          </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default TestimonialsPage;
