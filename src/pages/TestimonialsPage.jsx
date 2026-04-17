import React from 'react';
import { Link } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import './TestimonialsPage.css';

const WHATSAPP_NUMBER = '972547274750';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('היי, אני רוצה לשמוע עוד על השירות')}`;

const testimonials = [
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

const renderStars = (rating) =>
  Array.from({ length: 5 }, (_, i) => (
    <i
      key={i}
      className={`fas fa-star ${i < rating ? 'filled' : 'empty'}`}
      aria-hidden="true"
    ></i>
  ));

const TestimonialsPage = () => {
  return (
    <div dir="rtl" className="testimonials-page">
      <Navbar />

      <main className="testimonials-main">
        <div className="container">

          {/* Page header */}
          <div className="testimonials-page-header">
            <Link to="/" className="testimonials-back-link">
              <i className="fas fa-arrow-right" aria-hidden="true"></i>
              חזרה לעמוד הראשי
            </Link>
            <h1 className="testimonials-page-title">ביקורות לקוחות</h1>
            <p className="testimonials-page-subtitle">
              2,500+ לקוחות בחרו ב-IsraelTechForce לשחזור חשבונות הרשתות החברתיות שלהם.
              הנה מה שהם אומרים.
            </p>

            {/* Aggregate rating display */}
            <div className="testimonials-aggregate">
              <div className="aggregate-score">4.9</div>
              <div className="aggregate-details">
                <div className="aggregate-stars" aria-label="דירוג 4.9 מתוך 5">
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                  <i className="fas fa-star filled" aria-hidden="true"></i>
                </div>
                <span className="aggregate-count">מ-2,500+ לקוחות מרוצים</span>
              </div>
            </div>
          </div>

          {/* Testimonials grid */}
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
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
            <h2 className="testimonials-cta-title">רוצים להצטרף לאלפי הלקוחות המרוצים?</h2>
            <p className="testimonials-cta-text">
              תשלום רק אחרי הצלחה מוכחת. אבחון ראשוני חינמי. 95%+ הצלחה.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="testimonials-cta-btn"
            >
              <i className="fab fa-whatsapp" aria-hidden="true"></i>
              צרו קשר בוואטסאפ
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
