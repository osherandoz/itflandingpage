import React from 'react';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="container">
        <h2 className="section-title">מומחה שחזור חשבונות רשתות חברתיות</h2>
        <p className="section-subtitle">
          מומחה מוכר ומוערך בתחום שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ עם ניסיון של שנים
        </p>
        
        <div className="about-content">
          <div className="about-text">
            <h3>שלום, אני אושר - מומחה שחזור חשבונות</h3>
            <p>
              מומחה מוביל בישראל לשחזור חשבונות רשתות חברתיות ואחד מחלוצי התחום בארץ. מתמחה בפתרון בעיות מורכבות של חשבונות פייסבוק, אינסטגרם ווואטסאפ שנחסמו או נפרצו.
            </p>
            <p>
              עם למעלה מ-2,500 חשבונות ששוחזרו בהצלחה ו-95% אחוזי הצלחה, אני מביא איתי ניסיון עשיר, כלים מתקדמים וטכניקות ייחודיות שפותחו לאורך שנים. מתמחה בפתרון בעיות גם במקרים שמטא (Meta) טוענים שאין סיכוי.
            </p>
            
            <div className="about-stats">
              <div className="stat">
                <span className="stat-number">2,500+</span>
                <span className="stat-label">חשבונות שוחזרו</span>
              </div>
              <div className="stat">
                <span className="stat-number">95%</span>
                <span className="stat-label">אחוזי הצלחה</span>
              </div>
              <div className="stat">
                <span className="stat-number">24/6</span>
                <span className="stat-label">זמינות</span>
              </div>
              <div className="stat">
                <span className="stat-number">5+</span>
                <span className="stat-label">שנות ניסיון</span>
              </div>
            </div>
            
            <div className="about-features">
              <div className="feature">
                <i className="fas fa-shield-alt"></i>
                <span>מומחיות באבטחה מתקדמת</span>
              </div>
              <div className="feature">
                <i className="fas fa-clock"></i>
                <span>זמינות 24/6 - תמיכה מיידית</span>
              </div>
              <div className="feature">
                <i className="fas fa-users"></i>
                <span>אלפי לקוחות מרוצים בישראל</span>
              </div>
              <div className="feature">
                <i className="fas fa-certificate"></i>
                <span>הוכחות מקצועיות ורפרנסים</span>
              </div>
            </div>
          </div>
          
          <div className="about-images">
            <div className="image-grid">
              <div className="image-item main-image">
                <img src="/images/צילום אור לוי -8380.jpg" alt="אושר - מומחה שחזור חשבונות פייסבוק, אינסטגרם ווואטסאפ" />
              </div>
              <div className="image-item">
                <img src="/images/צילום אור לוי -8092.jpg" alt="IsraelTechForce - מומחים לשחזור חשבונות רשתות חברתיות" />
              </div>
              <div className="image-item">
                <img src="/images/צילום אור לוי -8391.jpg" alt="שחזור חשבונות - שירות מקצועי ואמין" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
