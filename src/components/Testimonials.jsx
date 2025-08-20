import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'מתנאל לייני',
      role: 'יוצר תוכן ומשפיען',
      image: '/images/matanel.jpg',
      quote: 'מתחילת המלחמה אושר מלווה אותי בכל צרה, הצליח להחזיר לי את החשבון מחסימות שלא ברא השטן, רק תנו לו את ההזדמנות והוא יסדר.',
      rating: 5
    },
    {
      id: 2,
      name: 'חני אסור',
      role: 'יוצרת תוכן בתחום הקולינריה',
      image: '/images/hani.jpg',
      quote: 'פרצו לי לאינסטגרם ולפייסבוק, ראיתי את מפעל חיי קורס. דיברתי עם עוד כמה אנשים שהלחיצו אותי, אושר בא - הרגיע וסידר.',
      rating: 5
    },
    {
      id: 3,
      name: 'גל נמני',
      role: 'מנכלית Go-Tech',
      image: '/images/gal.jpg',
      quote: 'לאחר שנעקצתי על ידי חברה אחרת, פניתי לאושר ובמסירות הוא החזיר לי את העסק לחיים. ממש ככה!',
      rating: 5
    },
    {
      id: 4,
      name: 'אופירה יחיא',
      role: 'קונדיטורית ויוצרת תוכן',
      image: '/images/ofira.jpg',
      quote: 'פרצו לי אנשים מטורקיה, השביתו את החשבון והמצב היה כמעט בלתי הפיך - לאחר כשבועיים אושר החזיר לי את החשבון בנחת וברוגע לא אופייניים.',
      rating: 5
    },
    {
      id: 5,
      name: 'יש עתיד',
      role: 'מפלגת יש עתיד - לקהילה הערבית',
      image: '/images/yeshatid.jpg',
      quote: 'ביום בהיר אחד ירד עלינו המסך מסיבה הזויה לחלוטין, אושר איבחן מהר את הבעיה ובפעילות יסודית החזיר אותנו לפעילות אחרי יומיים',
      rating: 5
    },
    {
      id: 6,
      name: 'ליראק ישראל',
      role: 'הברנד הישראלי לחברת הטיפוח המובילה',
      image: '/images/lierac.jpg',
      quote: 'תמיכה מעולה בפתרון בעיות פרסום. אושר מקצועי, זמין ועוזר בכל בעיה. מאוד מרוצה מהשירות!',
      rating: 5
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i 
        key={index} 
        className={`fas fa-star ${index < rating ? 'filled' : 'empty'}`}
      ></i>
    ));
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">מה הלקוחות אומרים</h2>
        <p className="section-subtitle">
          מאות לקוחות מרוצים שסומכים עלינו לפתרון בעיות החשבונות שלהם
        </p>
        
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
                  <h3 className="testimonial-name">{testimonial.name}</h3>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
              
              <div className="testimonial-content">
                <div className="quote-icon">
                  <i className="fas fa-quote-right"></i>
                </div>
                <p className="testimonial-quote">{testimonial.quote}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
