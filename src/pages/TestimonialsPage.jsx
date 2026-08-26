import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { useLang } from '../i18n';
import { WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './TestimonialsPage.css';

const WHATSAPP_NUMBER = '972547274750';

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

const TESTIMONIALS_EN = [
  {
    id: 1,
    name: 'Matanel Layani',
    role: 'Content creator and influencer',
    image: '/images/matanel.jpg',
    quote:
      "Since the start of the war, Osher has been there for me through every crisis. He managed to get my account back from bans you wouldn't believe. Just give him the chance and he'll sort it out.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Hani Asor',
    role: 'Culinary content creator',
    image: '/images/hani.jpg',
    quote:
      "My Instagram and Facebook were hacked, and I watched my life's work collapse. I spoke with a few other people who only stressed me out — then Osher came along, calmed everything down, and fixed it.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Gal Nimni',
    role: 'CEO of Go-Tech',
    image: '/images/gal.jpg',
    quote:
      'After getting burned by another company, I turned to Osher, and with real dedication he brought my business back to life. Just like that!',
    rating: 5,
  },
  {
    id: 4,
    name: 'Ofira Yahya',
    role: 'Pastry chef and content creator',
    image: '/images/ofira.jpg',
    quote:
      "Hackers from Turkey broke in and disabled my account — the situation was almost irreversible. Within about two weeks, Osher got my account back with an unusual calm and composure.",
    rating: 5,
  },
  {
    id: 5,
    name: 'Yesh Atid',
    role: 'The Yesh Atid party — Arab community outreach',
    image: '/images/yeshatid.jpg',
    quote:
      'One bright day everything went dark on us for a completely absurd reason. Osher quickly diagnosed the problem and, with thorough work, had us back up and running within two days.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Lierac Israel',
    role: 'The Israeli branch of the leading skincare brand',
    image: '/images/lierac.jpg',
    quote:
      'Excellent support in resolving advertising issues. Osher is professional, available, and helps with every problem. Very satisfied with the service!',
    rating: 5,
  },
];

const STR = {
  he: {
    testimonials: TESTIMONIALS_HE,
    backLink: 'חזרה לעמוד הראשי',
    backIcon: 'fas fa-arrow-right',
    title: 'ביקורות לקוחות',
    subtitle:
      '2,500+ לקוחות בחרו ב-IsraelTechForce לשחזור חשבונות הרשתות החברתיות שלהם. הנה מה שהם אומרים.',
    aggregateAria: 'דירוג 4.9 מתוך 5',
    aggregateCount: 'מ-2,500+ לקוחות מרוצים',
    ctaTitle: 'רוצים להצטרף לאלפי הלקוחות המרוצים?',
    ctaText: 'תשלום רק אחרי הצלחה מוכחת. אבחון ראשוני חינמי. 95%+ הצלחה.',
    ctaBtn: 'צרו קשר בוואטסאפ',
    whatsappMessage: 'היי, אני רוצה לשמוע עוד על השירות',
  },
  en: {
    testimonials: TESTIMONIALS_EN,
    backLink: 'Back to home page',
    backIcon: 'fas fa-arrow-left',
    title: 'Customer Reviews',
    subtitle:
      "2,500+ customers chose IsraelTechForce to recover their social media accounts. Here's what they say.",
    aggregateAria: 'Rated 4.9 out of 5',
    aggregateCount: 'from 2,500+ satisfied customers',
    ctaTitle: 'Want to join thousands of satisfied customers?',
    ctaText: 'Payment only after proven success. Free initial diagnosis. 95%+ success rate.',
    ctaBtn: 'Contact Us on WhatsApp',
    whatsappMessage: WHATSAPP_DEFAULT_MSG.en,
  },
};

const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <i
      key={i}
      className={`fas fa-star ${i < rating ? 'filled' : 'empty'}`}
      aria-hidden="true"
    ></i>
  ));

const TestimonialsPage = () => {
  const { lang, dir, prefix } = useLang();
  const t = STR[lang];
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(t.whatsappMessage)}`;

  return (
    <div dir={dir} className="testimonials-page">
      <Navbar />

      <main className="testimonials-main">
        <div className="container">

          {/* Page header */}
          <div className="testimonials-page-header">
            <Link to={prefix || '/'} className="testimonials-back-link">
              <i className={t.backIcon} aria-hidden="true"></i>
              {t.backLink}
            </Link>
            <h1 className="testimonials-page-title">{t.title}</h1>
            <p className="testimonials-page-subtitle">{t.subtitle}</p>

            {/* Aggregate rating display */}
            <div className="testimonials-aggregate">
              <div className="aggregate-score">4.9</div>
              <div className="aggregate-details">
                <div className="aggregate-stars" aria-label={t.aggregateAria}>
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                </div>
                <span className="aggregate-count">{t.aggregateCount}</span>
              </div>
            </div>
          </div>

          {/* Testimonials grid */}
          <div className="testimonials-grid">
            {t.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  <div className="testimonial-image">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} - ${testimonial.role}`}
                      onError={(e) => {
                        e.target.src = '/images/default-avatar.png';
                      }}
                    />
                  </div>
                  <div className="testimonial-info">
                    <h2 className="testimonial-name">{testimonial.name}</h2>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
                <div className="testimonial-content">
                  <div className="quote-icon">
                    <i className="fas fa-quote-right" aria-hidden="true"></i>
                  </div>
                  <p className="testimonial-quote">{testimonial.quote}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="testimonials-page-cta">
            <h2 className="testimonials-cta-title">{t.ctaTitle}</h2>
            <p className="testimonials-cta-text">{t.ctaText}</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonials-cta-btn"
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              {t.ctaBtn}
            </a>
          </div>

        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default TestimonialsPage;
