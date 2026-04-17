import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';
import { openWhatsApp } from '../utils/whatsapp';
import './ServicePage.css';

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

function Stars({ count }) {
  return (
    <div className="service-testimonial-stars">
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={`fas fa-star${i < count ? '' : ' empty'}`} aria-hidden="true"></i>
      ))}
    </div>
  );
}

function ServiceFAQ({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="service-faq-list">
      {faqs.map((faq, index) => (
        <div key={index} className="faq-item">
          <button
            className={`faq-question${openIndex === index ? ' active' : ''}`}
            onClick={() => toggle(index)}
            aria-expanded={openIndex === index}
          >
            <span>{faq.question}</span>
            <i
              className={`fas fa-chevron-down${openIndex === index ? ' rotated' : ''}`}
              aria-hidden="true"
            ></i>
          </button>
          <div className={`faq-answer${openIndex === index ? ' open' : ''}`}>
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const ServicePage = ({ pageData }) => {
  const visibleTestimonials = pageData.testimonialIds
    .map((id) => ALL_TESTIMONIALS.find((t) => t.id === id))
    .filter(Boolean);

  const handleCTA = () => {
    openWhatsApp(`היי, אני מעוניין/ת בשירות: ${pageData.keyword}`);
  };

  return (
    <div dir="rtl" className="service-page">
      <Navbar />

      <main>
        {/* ---- HERO ---- */}
        <section className="service-hero">
          <div className="service-container">
            <h1>{pageData.title}</h1>
            <p className="service-hero-subtitle">
              שירות מקצועי ומהיר לשחזור חשבונות — תשלום רק אחרי הצלחה מוכחת
            </p>
            <button className="service-cta-btn" onClick={handleCTA}>
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              שלחו הודעה עכשיו — חינם
            </button>
          </div>
        </section>

        {/* ---- STATS STRIP ---- */}
        <section className="service-stats" aria-label="נתוני שירות">
          <div className="service-container">
            <div className="service-stats-inner">
              <div className="service-stat">
                <span className="service-stat-value">2,500+</span>
                <span className="service-stat-label">חשבונות שוחזרו</span>
              </div>
              <div className="service-stat">
                <span className="service-stat-value">95%+</span>
                <span className="service-stat-label">אחוז הצלחה</span>
              </div>
              <div className="service-stat">
                <span className="service-stat-value">24-48</span>
                <span className="service-stat-label">שעות בממוצע</span>
              </div>
              <div className="service-stat">
                <span className="service-stat-value">4.9★</span>
                <span className="service-stat-label">דירוג לקוחות</span>
              </div>
            </div>
          </div>
        </section>

        {/* ---- ABOUT ---- */}
        <section className="service-about">
          <div className="service-container">
            <h2>מה זה ולמה זה קורה?</h2>
            <div
              className="service-about-text"
              dangerouslySetInnerHTML={{ __html: pageData.whatIsIt }}
            />
          </div>
        </section>

        {/* ---- STEPS ---- */}
        <section className="service-steps">
          <div className="service-container">
            <h2>הפתרון שלנו — 3 שלבים פשוטים</h2>
            <div className="service-steps-grid">
              {pageData.steps.map((step, index) => (
                <div key={index} className="service-step-card">
                  <div className="service-step-icon">
                    <i className={step.icon} aria-hidden="true"></i>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- TESTIMONIALS ---- */}
        <section className="service-testimonials">
          <div className="service-container">
            <h2>מה הלקוחות שלנו אומרים</h2>
            <div className="service-testimonials-grid">
              {visibleTestimonials.map((t) => (
                <div key={t.id} className="service-testimonial-card">
                  <div className="service-testimonial-header">
                    <img
                      src={t.image}
                      alt={`${t.name} — ${t.role}`}
                      className="service-testimonial-img"
                      onError={(e) => {
                        e.target.src = '/images/default-avatar.png';
                      }}
                    />
                    <div>
                      <p className="service-testimonial-name">{t.name}</p>
                      <p className="service-testimonial-role">{t.role}</p>
                      <Stars count={t.rating} />
                    </div>
                  </div>
                  <p className="service-testimonial-quote">"{t.quote}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <section className="service-faq">
          <div className="service-container">
            <h2>שאלות נפוצות על {pageData.keyword}</h2>
            <p className="service-faq-subtitle">
              תשובות לשאלות שלקוחות שואלים אותנו הכי הרבה
            </p>
            <ServiceFAQ faqs={pageData.faqs} />
          </div>
        </section>

        {/* ---- FINAL CTA ---- */}
        <section className="service-cta-final">
          <div className="service-container">
            <h2>מוכנים לפתור את הבעיה?</h2>
            <p>
              שלחו הודעת וואטסאפ עכשיו — אבחון ראשוני חינם, ותשלום רק אחרי שהחשבון
              חזר לידיכם.
            </p>
            <button className="service-cta-btn" onClick={handleCTA}>
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              שלחו הודעה עכשיו
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ServicePage;
