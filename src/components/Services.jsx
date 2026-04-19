import React from 'react';
import { Link } from 'react-router';
import { openWhatsApp } from '../utils/whatsapp';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: 'fab fa-whatsapp',
      title: 'שחזור חשבון וואטסאפ חסום או פרוץ',
      description: 'שירותי שחזור מקצועיים עבור חשבונות WhatsApp שנחסמו או נפרצו. שחזור גישה מהיר ואמין עם אחוזי הצלחה גבוהים.',
      features: ['שחזור חשבון וואטסאפ חסום', 'הסרת חסימה מיידית', 'שחזור הודעות ותמונות', 'אבטחה מחדש של החשבון'],
      servicePath: '/שחזור-חשבון-וואטסאפ',
    },
    {
      icon: 'fab fa-instagram',
      title: 'שחזור חשבון אינסטגרם חסום או פרוץ',
      description: 'פתרון בעיות מקצועי עבור חשבונות Instagram שנחסמו או נפרצו. שחזור גישה מלאה לחשבון עם כל הפיצ\'רים.',
      features: ['הסרת חסימת אינסטגרם', 'שחזור סיסמה ופרטי התחברות', 'הגנה על החשבון מפני פריצות עתידיות', 'תמיכה 24/6'],
      servicePath: '/שחזור-חשבון-אינסטגרם',
    },
    {
      icon: 'fab fa-facebook',
      title: 'שחזור חשבון פייסבוק חסום או פרוץ',
      description: 'שירותי שחזור מתקדמים עבור חשבונות Facebook שנחסמו או נפרצו. החזרת גישה מלאה לחשבון ולכל הפיצ\'רים.',
      features: ['שחזור חשבון פייסבוק', 'הסרת הגבלות וחסימות', 'אבטחה מתקדמת לחשבון', 'מעקב אחר פעילות חשודה'],
      servicePath: '/שחזור-חשבון-פייסבוק',
    },
    {
      icon: 'fas fa-sign-in-alt',
      title: 'פתרון בעיות התחברות לכל הפלטפורמות',
      description: 'פתרון בעיות התחברות מקצועי לכל רשתות החברתיות. שחזור גישה מהיר לחשבונות שלך.',
      features: ['שחזור סיסמה לכל הפלטפורמות', 'הגדרת אימות דו-שלבי', 'בטיחות חשבון מתקדמת', 'תמיכה מיידית 24/6'],
      servicePath: null,
    },
    {
      icon: 'fas fa-briefcase',
      title: 'תמיכה ב-Facebook Business Manager',
      description: 'שירותי תמיכה מלאים עבור Facebook Business Manager. ניהול ופתרון בעיות מקצועי.',
      features: ['הגדרת חשבון Business Manager', 'ניהול הרשאות ומנהלי חשבון', 'פתרון בעיות טכניות', 'הקמת תשתית פרסום נכונה'],
      servicePath: '/שחזור-מנהל-מודעות',
    },
    {
      icon: 'fas fa-ad',
      title: 'פתרון בעיות פרסום וקמפיינים',
      description: 'תמיכה ופתרון בעיות מקצועי עבור קמפיינים פרסומיים. אופטימיזציה ושיפור ביצועים.',
      features: ['אישור מודעות וקמפיינים', 'פתרון בעיות חוב וחשבון', 'הקמת תשתית פרסום מקצועית', 'תמיכה טכנית מתקדמת'],
      servicePath: '/שחזור-מנהל-מודעות',
    },
  ];

  const trackClick = (serviceTitle) => {
    if (typeof gtag !== 'undefined') {
      gtag('event', 'click', {
        event_category: 'Service',
        event_label: serviceTitle,
        value: 1,
      });
    }
  };

  return (
    <section className="services">
      <div className="container">
        <h2 className="section-title">שירותי שחזור חשבונות רשתות חברתיות</h2>
        <p className="section-subtitle">
          פתרונות מקצועיים ומתקדמים לכל בעיות החשבונות והפרסום שלך - עם אחוזי הצלחה של 95%+
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={service.icon} aria-hidden="true"></i>
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <i className="fas fa-check" aria-hidden="true"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              {service.servicePath ? (
                <Link
                  to={service.servicePath}
                  className="service-cta"
                  onClick={() => trackClick(service.title)}
                >
                  <span>פרטים נוספים</span>
                  <i className="fas fa-arrow-left" aria-hidden="true"></i>
                </Link>
              ) : (
                <button
                  className="service-cta"
                  onClick={() => {
                    trackClick(service.title);
                    openWhatsApp(`היי, הגעתי דרך האתר שלך אשמח לקבל פרטים על ${service.title}`);
                  }}
                >
                  <span>קבל עזרה מקצועית עכשיו</span>
                  <i className="fas fa-arrow-left" aria-hidden="true"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
