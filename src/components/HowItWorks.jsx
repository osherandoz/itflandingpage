import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      icon: 'fas fa-comments',
      title: 'שולחים הודעה',
      description: 'שולחים הודעה בוואטסאפ או במייל, נציג מטעמנו יענה לכם בהקדם בהתאם לשעות הפעילות.'
    },
    {
      icon: 'fas fa-search',
      title: 'מאבחנים את הבעיה',
      description: 'נאבחן את הבעיה בצורה מדויקת ויעילה ללא בזבוז זמן מיותר בעזרת כמה שאלות קצרות.'
    },
    {
      icon: 'fas fa-calculator',
      title: 'מקבלים הצעת מחיר',
      description: 'לאחר אבחון הבעיה נוכל לשלוח לכם הצעת מחיר מדויקת על המקום וסיכוי ההצלחה של כל אחת מהאופציות.'
    },
    {
      icon: 'fas fa-rocket',
      title: 'יוצאים לדרך',
      description: 'מיד לאחר קבלת הצעת המחיר וחתימה על הסכמי העבודה, נצא לדרך ונשתדל לעשות את זה בצורה הכי מהירה שיש.'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2 className="section-title">איך זה עובד?</h2>
        <p className="section-subtitle">
          תהליך פשוט ויעיל לקבלת שירות מקצועי ואמין
        </p>
        
        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-icon">
                <i className={step.icon}></i>
              </div>
              <div className="step-number">{index + 1}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

