import React, { useState } from 'react';
import { subscribeToNewsletter, validateEmail } from '../utils/smoove';
import './NewsletterPopup.css';

const NewsletterPopup = ({ isOpen, onClose, onSubscribe }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear status when user starts typing
    if (status.message) {
      setStatus({ message: '', type: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName.trim()) {
      setStatus({ message: 'אנא הכניסו שם פרטי', type: 'error' });
      return;
    }

    if (!formData.lastName.trim()) {
      setStatus({ message: 'אנא הכניסו שם משפחה', type: 'error' });
      return;
    }

    if (!formData.email.trim()) {
      setStatus({ message: 'אנא הכניסו כתובת אימייל', type: 'error' });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus({ message: 'כתובת האימייל אינה תקינה', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ message: '', type: '' });

    try {
      const result = await subscribeToNewsletter(
        formData.firstName, 
        formData.lastName, 
        formData.email
      );
      
      if (result.success) {
        setStatus({ message: '🎉 תודה! המרדריך בדרך אליך!', type: 'success' });
        
        // Track successful subscription
        localStorage.setItem('newsletterSubscribed', 'true');
        localStorage.setItem('newsletterPopupShown', 'true');
        
        // Call parent callback
        if (onSubscribe) {
          onSubscribe(formData);
        }
        
        // Close popup after 2 seconds
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setStatus({ message: result.message, type: 'error' });
      }
    } catch (error) {
      setStatus({ 
        message: 'שגיאה בהרשמה. אנא נסו שוב מאוחר יותר.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    // Track that popup was closed without subscribing
    localStorage.setItem('newsletterPopupShown', 'true');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="newsletter-popup-overlay">
      <div className="newsletter-popup">
        <button className="popup-close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </button>
        
        <div className="popup-content">
          <div className="popup-header">
            <div className="gift-icon">🎁</div>
            <h2>הירשם עכשיו, קבל מרדריך לשחזור אינסטגרם מתנה!</h2>
            <p>הצטרף לרשימת התפוצה שלנו וקבל מיד את המדריך המלא לשחזור חשבון אינסטגרם שנחסם</p>
          </div>

          <div className="popup-benefits">
            <div className="benefit-item">
              <i className="fas fa-check-circle"></i>
              <span>מדריך מפורט שלב אחר שלב</span>
            </div>
            <div className="benefit-item">
              <i className="fas fa-check-circle"></i>
              <span>טיפים מקצועיים שלא תמצא בשום מקום</span>
            </div>
            <div className="benefit-item">
              <i className="fas fa-check-circle"></i>
              <span>תמיכה אישית מצוות המומחים</span>
            </div>
          </div>

          <form className="popup-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="שם פרטי"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="שם משפחה"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="כתובת האימייל שלך"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                required
              />
            </div>

            {status.message && (
              <div className={`status-message ${status.type}`}>
                {status.message}
              </div>
            )}

            <button 
              type="submit" 
              className="subscribe-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  שולח...
                </>
              ) : (
                <>
                  <i className="fas fa-gift"></i>
                  קבל את המדריך עכשיו - חינם!
                </>
              )}
            </button>
          </form>

          <div className="popup-footer">
            <p>🔒 הפרטיות שלך חשובה לנו. לא נשתף את הפרטים שלך עם איש</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
