import React, { useState } from 'react';
import Modal from './Modal';
import { useLang } from '../i18n';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './WhatsAppDisabledPopup.css';

const STR = {
  he: {
    questionTitle: 'שאלה קצרה',
    question: 'האם חשבון הוואטסאפ שלך נחסם או הושבת?',
    questionSubtitle: 'אנחנו כאן כדי לעזור לך לשחזר את החשבון במהירות',
    yesBtn: 'כן, החשבון שלי נחסם',
    noBtn: 'לא, החשבון שלי פעיל',
    formTitle: 'שחזור חשבון וואטסאפ',
    successTitle: 'תודה! הפרטים התקבלו',
    successText: 'נחזור אליך בהקדם האפשרי כדי לעזור לשחזר את החשבון שלך.',
    formDescription: 'מלא את הפרטים למטה ונחזור אליך בהקדם האפשרי כדי לעזור לשחזר את החשבון שלך',
    nameLabel: 'שם מלא *',
    namePlaceholder: 'הכנס את שמך המלא',
    nameRequired: 'שם מלא הוא שדה חובה',
    phoneLabel: 'מספר טלפון *',
    phonePlaceholder: 'הכנס את מספר הטלפון שלך',
    phoneRequired: 'מספר טלפון הוא שדה חובה',
    phoneInvalid: 'מספר טלפון לא תקין',
    consentLabel: 'מאשר ליצור קשר?',
    consentRequired: 'עליכם להסכים ליצירת קשר כדי לשלוח את הטופס',
    sending: 'שולח...',
    submit: 'שלח פנייה',
  },
  en: {
    questionTitle: 'Quick Question',
    question: 'Has your WhatsApp account been blocked or disabled?',
    questionSubtitle: 'We are here to help you recover your account fast',
    yesBtn: 'Yes, my account is blocked',
    noBtn: 'No, my account is active',
    formTitle: 'WhatsApp Account Recovery',
    successTitle: 'Thank you! Your details were received',
    successText: 'We will get back to you as soon as possible to help recover your account.',
    formDescription: 'Fill in the details below and we will get back to you as soon as possible to help recover your account',
    nameLabel: 'Full name *',
    namePlaceholder: 'Enter your full name',
    nameRequired: 'Full name is required',
    phoneLabel: 'Phone number *',
    phonePlaceholder: 'Enter your phone number',
    phoneRequired: 'Phone number is required',
    phoneInvalid: 'Invalid phone number',
    consentLabel: 'I agree to be contacted',
    consentRequired: 'You must agree to be contacted to send the form',
    sending: 'Sending...',
    submit: 'Send Request',
  },
};

const WhatsAppDisabledPopup = ({ isOpen, onClose }) => {
  const { lang, dir } = useLang();
  const t = STR[lang];
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
      newErrors.name = t.nameRequired;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t.phoneRequired;
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      newErrors.phone = t.phoneInvalid;
    }

    if (!formData.consent) {
      newErrors.consent = t.consentRequired;
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
            lang,
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
      <Modal isOpen={isOpen} onClose={handleClose} title={t.questionTitle}>
        <div className="whatsapp-disabled-question" dir={dir}>
          <div className="question-icon">
            <i className="fab fa-whatsapp"></i>
          </div>
          <h3>{t.question}</h3>
          <p className="question-subtitle">{t.questionSubtitle}</p>

          <div className="question-buttons">
            <button
              className="answer-btn yes-btn"
              onClick={() => handleAnswer(true)}
            >
              <i className="fas fa-check-circle"></i>
              {t.yesBtn}
            </button>
            <button
              className="answer-btn no-btn"
              onClick={() => handleAnswer(false)}
            >
              <i className="fas fa-times-circle"></i>
              {t.noBtn}
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  // Show form if user answered yes
  if (hasDisabledAccount) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} title={t.formTitle}>
        <div className="whatsapp-disabled-form" dir={dir}>
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>{t.successTitle}</h3>
              <p>{t.successText}</p>
            </div>
          ) : (
            <>
              <div className="form-header">
                <div className="form-icon">
                  <i className="fab fa-whatsapp"></i>
                </div>
                <p className="form-description">
                  {t.formDescription}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="whatsapp-form">
                <div className="form-group">
                  <label htmlFor="name">{t.nameLabel}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'error' : ''}
                    placeholder={t.namePlaceholder}
                    disabled={isSubmitting}
                    required
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t.phoneLabel}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'error' : ''}
                    placeholder={t.phonePlaceholder}
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
                    {t.consentLabel}
                  </label>
                  {errors.consent && <span className="error-message">{errors.consent}</span>}
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      {t.sending}
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      {t.submit}
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
