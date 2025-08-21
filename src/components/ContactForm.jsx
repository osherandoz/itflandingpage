import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    issueDescription: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'שם מלא הוא שדה חובה';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'כתובת דוא"ל היא שדה חובה';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'כתובת דוא"ל לא תקינה';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'מספר טלפון הוא שדה חובה';
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'מספר טלפון לא תקין';
    }

    if (!formData.issueDescription.trim()) {
      newErrors.issueDescription = 'תיאור הבעיה הוא שדה חובה';
    }

    if (!formData.consent) {
      newErrors.consent = 'עליכם להסכים לתנאים כדי לשלוח את הטופס';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      // Show success message
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        issueDescription: '',
        consent: false
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-form-header">
        <h2>צור קשר</h2>
        <p>מלאו את הטופס למטה ונחזור אליכם בהקדם האפשרי</p>
      </div>

      {isSubmitted && (
        <div className="success-message">
          <p>תודה! פנייתכם נשלחה בהצלחה. נחזור אליכם בהקדם האפשרי.</p>
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">שם מלא *</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={errors.fullName ? 'error' : ''}
            placeholder="הכנס את שמך המלא"
          />
          {errors.fullName && <span className="error-message">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">כתובת דוא"ל *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            placeholder="הכנס את כתובת הדואל שלך"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
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
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="issueDescription">תיאור הבעיה *</label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={handleInputChange}
            className={errors.issueDescription ? 'error' : ''}
            placeholder="תאר את הבעיה או השאלה שלך"
            rows="5"
          />
          {errors.issueDescription && <span className="error-message">{errors.issueDescription}</span>}
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              className={errors.consent ? 'error' : ''}
            />
            <span className="checkmark"></span>
            אני מסכים שאתם תוכלו ליצור איתי קשר כדי לפתור את הבעיה ואני מאשר זאת
          </label>
          {errors.consent && <span className="error-message">{errors.consent}</span>}
        </div>

        <button type="submit" className="submit-btn">
          שלח פנייה
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
