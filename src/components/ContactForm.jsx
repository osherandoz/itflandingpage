import React, { useState } from 'react';
import { getWhatsAppUrl, onWhatsAppClick, WHATSAPP_DEFAULT_MSG } from '../utils/whatsapp';
import { getUtmSource, trackSiteEvent } from '../utils/track';
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
    noteLabel: 'מה ההודעה שאתם רואים? (לא חובה)',
    noteNone: 'לא בטוח/ה',
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
    noteLabel: 'What message do you see? (optional)',
    noteNone: 'Not sure',
    consentLabel: 'I agree to be contacted',
    consentRequired: 'You must agree to be contacted to send the form',
    sending: 'Sending...',
    submit: 'Send a message, I will get back to you within an hour',
    whatsappNote: 'Want an immediate answer?',
    whatsappMessage: WHATSAPP_DEFAULT_MSG.en,
  },
};

/**
 * Props (all optional):
 *  heading / subheading / submitLabel — override copy (e.g. the WhatsApp callback hero)
 *  noteOptions — array of strings; renders an optional "what do you see" select sent as `note`
 *  location — CTA location name for analytics (default 'contact-form')
 *  hideWhatsApp — omit the WhatsApp fallback line under the button
 */
const ContactForm = ({ heading, subheading, submitLabel, noteOptions, location = 'contact-form', hideWhatsApp = false }) => {
  const { lang } = useLang();
  const t = STR[lang];

  const [formData, setFormData] = useState({ name: '', phone: '', note: '', consent: false });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (submitError) setSubmitError(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t.nameRequired;
    if (!formData.phone.trim()) newErrors.phone = t.phoneRequired;
    else if (!/^[\d\s\-+()]+$/.test(formData.phone) || formData.phone.replace(/\D/g, '').length < 8) {
      newErrors.phone = t.phoneInvalid;
    }
    if (!formData.consent) newErrors.consent = t.consentRequired;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    trackSiteEvent('lead_form_submit', { cta_location: location });

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
          note: formData.note || '',
          source: location,
          src: getUtmSource(),
          path: typeof window !== 'undefined' ? window.location.pathname : '',
          lang,
        }),
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok || !data.success) throw new Error('bad status');

      // Conversion events fire only after the server confirmed receipt.
      // leadId lets the CRM join this click trail to the row in Sheets.
      trackSiteEvent('lead_received', { leadId: data.leadId || null, cta_location: location });
      if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead', { content_name: location });
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'generate_lead', { event_category: 'Contact', event_label: location, value: 1 });
      }

      setIsSubmitted(true);
      setSubmitError(false);
      setFormData({ name: '', phone: '', note: '', consent: false });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch {
      trackSiteEvent('lead_form_error', { cta_location: location });
      setSubmitError(true);
    } finally {
      clearTimeout(timer);
      setIsSubmitting(false);
    }
  };

  const noteId = `note-${location}`;

  return (
    <div className="contact-form-container" id={location === 'contact-form' ? 'contact-form' : undefined}>
      <div className="contact-form-header">
        <h2>{heading || t.header}</h2>
        <p>{subheading || t.subheader}</p>
      </div>

      {isSubmitted && (
        <div className="success-message" role="alert">
          <p>{t.success}</p>
        </div>
      )}

      {submitError && (
        <div className="submit-error-message" role="alert">
          <p>
            {t.submitErrorText}{' '}
            <a className="form-whatsapp-link" href={getWhatsAppUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={onWhatsAppClick(`${location}-error`)}>
              <Icon name="whatsapp" aria-hidden="true" />
              {t.whatsappDirect}
            </a>
          </p>
        </div>
      )}

      {/* data-clarity-mask: session replay never records what is typed here */}
      <form className="contact-form" onSubmit={handleSubmit} data-clarity-mask="true">
        <div className="form-group">
          <label htmlFor={`name-${location}`}>{t.nameLabel}</label>
          <input
            type="text"
            id={`name-${location}`}
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
          <label htmlFor={`phone-${location}`}>{t.phoneLabel}</label>
          <input
            type="tel"
            id={`phone-${location}`}
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

        {noteOptions && (
          <div className="form-group">
            <label htmlFor={noteId}>{t.noteLabel}</label>
            <select id={noteId} name="note" value={formData.note} onChange={handleInputChange} disabled={isSubmitting}>
              <option value="">{t.noteNone}</option>
              {noteOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

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
            submitLabel || t.submit
          )}
        </button>

        {!hideWhatsApp && (
          <p className="form-whatsapp-note">
            {t.whatsappNote}{' '}
            <a
              className="form-whatsapp-link"
              href={getWhatsAppUrl(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick(`${location}-note`)}
            >
              <Icon name="whatsapp" aria-hidden="true" />
              {t.whatsappDirect}
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
