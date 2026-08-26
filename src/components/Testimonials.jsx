import React from 'react';
import Icon from './Icon';
import { useLang } from '../i18n';
import './Testimonials.css';

const STR = {
  he: {
    title: 'הם כבר חזרו לאוויר',
    subtitle: 'לקוחות אמיתיים, בשמות אמיתיים, שחזרו לנהל את העסק שלהם.',
    testimonials: [
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
    ],
  },
  en: {
    title: "They're Already Back Online",
    subtitle: 'Real customers, with real names, who are back running their business.',
    testimonials: [
      {
        id: 1,
        name: 'Matanel Layani',
        role: 'Content creator and influencer',
        image: '/images/matanel.jpg',
        quote: "Since the start of the war, Osher has been there for me through every crisis. He managed to get my account back from bans you wouldn't believe. Just give him the chance and he'll sort it out.",
        rating: 5
      },
      {
        id: 2,
        name: 'Hani Asor',
        role: 'Culinary content creator',
        image: '/images/hani.jpg',
        quote: "My Instagram and Facebook were hacked, and I watched my life's work collapse. I spoke with a few other people who only stressed me out — then Osher came along, calmed everything down, and fixed it.",
        rating: 5
      },
      {
        id: 3,
        name: 'Gal Nimni',
        role: 'CEO of Go-Tech',
        image: '/images/gal.jpg',
        quote: 'After getting burned by another company, I turned to Osher, and with real dedication he brought my business back to life. Just like that!',
        rating: 5
      },
      {
        id: 4,
        name: 'Ofira Yahya',
        role: 'Pastry chef and content creator',
        image: '/images/ofira.jpg',
        quote: 'Hackers from Turkey broke in and disabled my account — the situation was almost irreversible. Within about two weeks, Osher got my account back with an unusual calm and composure.',
        rating: 5
      },
      {
        id: 5,
        name: 'Yesh Atid',
        role: 'The Yesh Atid party — Arab community outreach',
        image: '/images/yeshatid.jpg',
        quote: 'One bright day everything went dark on us for a completely absurd reason. Osher quickly diagnosed the problem and, with thorough work, had us back up and running within two days.',
        rating: 5
      },
      {
        id: 6,
        name: 'Lierac Israel',
        role: 'The Israeli branch of the leading skincare brand',
        image: '/images/lierac.jpg',
        quote: 'Excellent support in resolving advertising issues. Osher is professional, available, and helps with every problem. Very satisfied with the service!',
        rating: 5
      }
    ],
  },
};

const Testimonials = () => {
  const { lang } = useLang();
  const t = STR[lang];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="star"
        className={index < rating ? 'filled' : 'empty'}
      />
    ));
  };

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">{t.title}</h2>
        <p className="section-subtitle">{t.subtitle}</p>

        <div className="testimonials-grid">
          {t.testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-header">
                <div className="testimonial-image">
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name} - ${testimonial.role}`}
                    width="60"
                    height="60"
                    loading="lazy"
                    decoding="async"
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
                  <Icon name="quote" aria-hidden="true" />
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
