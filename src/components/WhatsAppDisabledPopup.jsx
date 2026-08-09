import React, { useState } from 'react';
import Modal from './Modal';
import './WhatsAppDisabledPopup.css';

const WhatsAppDisabledPopup = ({ isOpen, onClose }) => {
  const [hasDisabledAccount, setHasDisabledAccount] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consent: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'שם מלא הוא שדה חובה';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'מספר טלפון הוא שדה חובה';
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }

    if (!formData.consent) {
      newErrors.consent = 'עליכם להסכים ליצירת קשר כדי לשלוח את הטופס';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Track Lead event in Meta Pixel immediately
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead');
        }

        const r = await fetch('/api/lead', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            consent: formData.consent,
            source: 'whatsapp-popup',
          }),
        });
        if (!r.ok) throw new Error('bad status');

        setIsSubmitted(true);
        setFormData({ name: '', phone: '', consent: false });
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 3000);
      } catch (error) {
        console.error('Error submitting form:', error?.message);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          onClose();
        }, 3000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleAnswer = (answer) => {
    setHasDisabledAccount(answer);
    if (!answer) {
      // User said no, close popup after a short delay
      setTimeout(() => {
        onClose();
      }, 500);
    }
  };

  const handleClose = () => {
    // Track that popup was shown
    localStorage.setItem('whatsappDisabledPopupShown', 'true');
    onClose();
  };

  if (!isOpen) return null;

  // Show initial question
  if (hasDisabledAccount === null) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="שאלה קצרה">
        <div className="whatsapp-disabled-question">
          <div className="question-icon">
            <i className="fab fa-whatsapp"></i>
          </div>
          <h3>האם חשבון הוואטסאפ שלך נחסם או הושבת?</h3>
          <p className="question-subtitle">אנחנו כאן כדי לעזור לך לשחזר את החשבון במהירות</p>
          
          <div className="question-buttons">
            <button 
              className="answer-btn yes-btn"
              onClick={() => handleAnswer(true)}
            >
              <i className="fas fa-check-circle"></i>
              כן, החשבון שלי נחסם
            </button>
            <button 
              className="answer-btn no-btn"
              onClick={() => handleAnswer(false)}
            >
              <i className="fas fa-times-circle"></i>
              לא, החשבון שלי פעיל
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // Show form if user answered yes
  if (hasDisabledAccount) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title="שחזור חשבון וואטסאפ">
        <div className="whatsapp-disabled-form">
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>תודה! הפרטים התקבלו</h3>
              <p>נחזור אליך בהקדם האפשרי כדי לעזור לשחזר את החשבון שלך.</p>
            </div>
          ) : (
            <>
              <div className="form-header">
                <div className="form-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <p className="form-description">
                  מלא את הפרטים למטה ונחזור אליך בהקדם האפשרי כדי לעזור לשחזר את החשבון שלך
                </p>
              </div>

              <form onSubmit={handleSubmit} className="whatsapp-form">
                <div className="form-group">
                  <label htmlFor="name">שם מלא *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder="הכנס את שמך המלא"
                    disabled={isSubmitting}
                    required
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">מספר טלפון *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder="הכנס את מספר הטלפון שלך"
                    disabled={isSubmitting}
                    required
                  />
                  {errors.phone && <span className="error-message">{errors.phone}</span>}
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleInputChange}
                      className={errors.consent ? 'error' : ''}
                      disabled={isSubmitting}
                      required
                    />
                    <span className="checkmark"></span>
                    מאשר ליצור קשר?
                  </label>
                  {errors.consent && <span className="error-message">{errors.consent}</span>}
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      שולח...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      שלח פנייה
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </Modal>
    );
  }

  return null;
};

export default WhatsAppDisabledPopup;
