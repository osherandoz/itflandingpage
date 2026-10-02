import React from 'react';
import { Link } from 'react-router';
import { Eyebrow, ArrowIcon } from './ui';
import Icon from './Icon';
import './Testimonials.css';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'מתנאל לייני',
    role: 'יוצר תוכן ומשפיען',
    image: '/images/matanel.jpg',
    quote: 'מתחילת המלחמה אושר מלווה אותי בכל צרה, הצליח להחזיר לי את החשבון מחסימות שלא ברא השטן, רק תנו לו את ההזדמנות והוא יסדר.',
    rating: 5,
  },
  {
    id: 2,
    name: 'חני אסור',
    role: 'יוצרת תוכן בתחום הקולינריה',
    image: '/images/hani.jpg',
    quote: 'פרצו לי לאינסטגרם ולפייסבוק, ראיתי את מפעל חיי קורס. דיברתי עם עוד כמה אנשים שהלחיצו אותי, אושר בא - הרגיע וסידר.',
    rating: 5,
  },
  {
    id: 3,
    name: 'גל נמני',
    role: 'מנכלית Go-Tech',
    image: '/images/gal.jpg',
    quote: 'לאחר שנעקצתי על ידי חברה אחרת, פניתי לאושר ובמסירות הוא החזיר לי את העסק לחיים. ממש ככה!',
    rating: 5,
  },
  {
    id: 4,
    name: 'אופירה יחיא',
    role: 'קונדיטורית ויוצרת תוכן',
    image: '/images/ofira.jpg',
    quote: 'פרצו לי אנשים מטורקיה, השביתו את החשבון והמצב היה כמעט בלתי הפיך - לאחר כשבועיים אושר החזיר לי את החשבון בנחת וברוגע לא אופייניים.',
    rating: 5,
  },
  {
    id: 5,
    name: 'יש עתיד',
    role: 'מפלגת יש עתיד - לקהילה הערבית',
    image: '/images/yeshatid.jpg',
    quote: 'ביום בהיר אחד ירד עלינו המסך מסיבה הזויה לחלוטין, אושר איבחן מהר את הבעיה ובפעילות יסודית החזיר אותנו לפעילות אחרי יומיים',
    rating: 5,
  },
  {
    id: 6,
    name: 'ליראק ישראל',
    role: 'הברנד הישראלי לחברת הטיפוח המובילה',
    image: '/images/lierac.jpg',
    quote: 'תמיכה מעולה בפתרון בעיות פרסום. אושר מקצועי, זמין ועוזר בכל בעיה. מאוד מרוצה מהשירות!',
    rating: 5,
  },
];

const Testimonials = () => (
  <div className="tst section">
    <div className="container">
      <header className="sec-head sec-head--split m-reveal">
        <div>
          <Eyebrow num="04">תוצאות</Eyebrow>
          <h2 className="h1">
            <span className="lt">הם כבר</span> <span className="mk m-in">חזרו לאוויר</span>
          </h2>
        </div>
        <div className="tst__head-side">
          <p className="lead">לקוחות אמיתיים, בשמות אמיתיים, שחזרו לנהל את העסק שלהם.</p>
          <Link to="/testimonials" className="link link--arrow">
            כל ההמלצות
            <ArrowIcon />
          </Link>
        </div>
      </header>

      {/* Mosaic: one lead quote, the rest in two sizes */}
      <div className="tst__mosaic m-stagger">
        {TESTIMONIALS.map((item) => (
          <figure key={item.id} className="tst-card">
            <div className="tst-card__stars" role="img" aria-label={`דירוג ${item.rating} מתוך 5`}>
              {Array.from({ length: item.rating }, (_, i) => <Icon key={i} name="star" />)}
            </div>
            <blockquote className="tst-card__quote">{item.quote}</blockquote>
            <figcaption className="tst-card__who">
              <img
                src={item.image}
                alt=""
                width="48"
                height="48"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.target.src = '/images/default-avatar.png'; }}
              />
              <span>
                <b>{item.name}</b>
                <span className="tst-card__role">{item.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </div>
);

export default Testimonials;
