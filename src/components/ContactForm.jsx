import React, { useState } from 'react';
import { getWhatsAppUrl, trackWhatsAppClick, WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import { trackSiteEvent } from '../utils/track';
import { useLang } from '../i18n';
import Icon from './Icon';
import './ContactForm.css';

const STR = {
  he: {
    header: 'צור קשר',
    subheader: 'מלא/י את הטופס למטה ואחזור אליך בהקדם האפשרי',
    success: 'תודה! הפרטים התקבלו',
    submitErrorText: 'משהו השתבש בשליחה. נסה/י שוב או',
    whatsappDirect: 'דבר/י איתי ישירות בוואטסאפ',
    nameLabel: 'שם מלא *',
    namePlaceholder: 'הכנס את שמך המלא',
    nameRequired: 'שם מלא הוא שדה חובה',
    phoneLabel: 'מספר טלפון *',
    phonePlaceholder: 'הכנס את מספר הטלפון שלך',
    phoneRequired: 'מספר טלפון הוא שדה חובה',
    phoneInvalid: 'מספר טלפון לא תקין',
    consentLabel: 'אני מאשר/ת ליצור איתי קשר',
    consentRequired: 'עליך להסכים ליצירת קשר כדי לשלוח את הטופס',
    sending: 'שולח...',
    submit: 'שלח/י הודעה, אחזור אליך תוך שעה',
    whatsappNote: 'רוצה מענה מיידי?',
    whatsappMessage: 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים',
  },
  en: {
    header: 'Contact Me',
    subheader: 'Fill in the form below and I will get back to you as soon as possible',
    success: 'Thank you! Your details were received',
    submitErrorText: 'Something went wrong. Try again or',
    whatsappDirect: 'chat with me directly on WhatsApp',
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
    submit: 'Send a message, I will get back to you within an hour',
    whatsappNote: 'Want an immediate answer?',
    whatsappMessage: WHATSAPP_DEFAULT_MSG.en,
  },
};

const ContactForm = () => {
  const { lang } = useLang();
  const t = STR[lang];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    consent: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear field error and submit error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (submitError) setSubmitError(false);
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

        // Track form submission in GA4
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'generate_lead', {
            event_category: 'Contact',
            event_label: 'Contact Form',
            value: 1,
          });
        }

        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 10000);
        try {
          const r = await fetch('/api/lead', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              name: formData.name.trim(),
              phone: formData.phone.trim(),
              consent: formData.consent,
              source: 'contact',
              lang,
            }),
          });
          if (!r.ok) throw new Error('bad status');
          // Apps Script only stores name/phone — the CRM event carries the page
          // path and UTMs, so a lead is attributable to the page it came from.
          trackSiteEvent('lead_form_submit');
          setIsSubmitting(false);
          setIsSubmitted(true);
          setSubmitError(false);
          setFormData({ name: '', phone: '', consent: false });
          setTimeout(() => setIsSubmitted(false), 5000);
        } finally {
          clearTimeout(timer);
        }
      } catch {
        setIsSubmitting(false);
        setSubmitError(true);
      }
    }
  };

  return (
    <div className="contact-form-container" id="contact-form">
      <div className="contact-form-header">
        <h2>{t.header}</h2>
        <p>{t.subheader}</p>
      </div>

      {isSubmitted && (
        <div className="success-message" role="alert">
          <p>{t.success}</p>
        </div>
      )}

      {submitError && (
        <div className="submit-error-message" role="alert">
          <p>{t.submitErrorText}{' '}
            <a className="form-whatsapp-link" href={getWhatsAppUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={trackWhatsAppClick}>
              <Icon name="whatsapp" aria-hidden="true" />
              {t.whatsappDirect}
            </a>
          </p>
        </div>
      )}

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{t.nameLabel}</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="name"
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
            autoComplete="tel"
            inputMode="tel"
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
              <Icon name="spinner" spin aria-hidden="true" />
              {t.sending}
            </>
          ) : (
            t.submit
          )}
        </button>

        <p className="form-whatsapp-note">
          {t.whatsappNote}{' '}
          <a
            className="form-whatsapp-link"
            href={getWhatsAppUrl(t.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsAppClick}
          >
            <Icon name="whatsapp" aria-hidden="true" />
            {t.whatsappDirect}
          </a>
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
