import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      newErrors.consent = 'עליכם להסכים לתנאים כדי לשלוח את הטופס';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Prepare data for Google Apps Script as URL-encoded form data
        const formDataToSend = new URLSearchParams();
        formDataToSend.append('name', formData.name.trim());
        formDataToSend.append('phone', formData.phone.trim());
        formDataToSend.append('consent', String(formData.consent));
        formDataToSend.append('source', 'Contact Form');
        formDataToSend.append('timestamp', new Date().toISOString());

        // POST to Google Apps Script webhook
        Promise.resolve(
          fetch('https://script.google.com/macros/s/AKfycbwr4FOqy9lWcGaj_PIl0Oc3wuUzhHPTEGUcIv0BDBk0knm5117ByAV6D5Qd8lXLIgUowQ/exec', {
            method: 'POST',
            mode: 'no-cors', // Google Apps Script requires no-cors for web apps
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formDataToSend.toString()
          })
        ).catch(() => {
          // Silently handle fetch errors - with no-cors we can't read responses anyway
        });

        // Track Lead event in Meta Pixel
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead');
        }

        // Show success message
        setIsSubmitted(true);
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          consent: false
        });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } catch (error) {
        console.error('Error submitting form:', error);
        // Even with no-cors, we show success as the request was sent
        setIsSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          consent: false
        });
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="contact-form-container" id="contact-form">
      <div className="contact-form-header">
        <h2>צור קשר</h2>
        <p>מלאו את הטופס למטה ונחזור אליכם בהקדם האפשרי</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <p>הפרטים התקבלו! נחזור אליך בהקדם</p>
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
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
            'שלח פנייה'
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
