import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { getWhatsAppUrl, onWhatsAppClick } from '../utils/whatsapp';
import { getUtmSource, trackSiteEvent } from '../utils/track';
import Icon from './Icon';
import { ArrowIcon } from './ui';
import './ContactForm.css';

const PLATFORM_OPTIONS = [
  { value: 'facebook', label: 'פייסבוק' },
  { value: 'instagram', label: 'אינסטגרם' },
  { value: 'whatsapp', label: 'וואטסאפ' },
  { value: 'ads_manager', label: 'מנהל מודעות' },
];

const t = {
  header: 'צור קשר',
  subheader: 'מלא/י את הטופס למטה ואחזור אליך בהקדם האפשרי',
  platformLabel: 'באיזו פלטפורמה הבעיה?',
  platformNone: 'לא בטוח/ה',
  submitErrorText: 'משהו השתבש בשליחה. נסה/י שוב או',
  whatsappDirect: 'דבר/י איתי ישירות בוואטסאפ',
  nameLabel: 'שם מלא',
  namePlaceholder: 'הכנס את שמך המלא',
  nameRequired: 'שם מלא הוא שדה חובה',
  phoneLabel: 'מספר טלפון',
  phonePlaceholder: 'הכנס את מספר הטלפון שלך',
  phoneRequired: 'מספר טלפון הוא שדה חובה',
  phoneInvalid: 'מספר טלפון לא תקין',
  noteLabel: 'מה ההודעה שאתם רואים?',
  noteNone: 'לא בטוח/ה',
  messageLabel: 'ספר/י לי בקצרה מה קרה',
  messagePlaceholder: 'למשל: החשבון נחסם לפני יומיים, ניסיתי לערער ולא קיבלתי תשובה',
  altPhoneLabel: 'מספר טלפון נוסף עם וואטסאפ',
  altPhonePlaceholder: 'מספר שכן ליצור איתו קשר בוואטסאפ',
  optional: '(לא חובה)',
  consentLabel: 'אני מאשר/ת ליצור איתי קשר',
  consentRequired: 'עליך להסכים ליצירת קשר כדי לשלוח את הטופס',
  sending: 'שולח...',
  submit: 'שלח/י הודעה, אחזור אליך תוך שעה',
  whatsappNote: 'רוצה מענה מיידי?',
  whatsappMessage: 'היי, הגעתי דרך האתר שלך אשמח לקבל פרטים',
};

/**
 * Props (all optional):
 *  heading / subheading / submitLabel — override copy (e.g. the WhatsApp callback hero)
 *  noteOptions — array of strings; renders an optional "what do you see" select sent as `note`
 *  location — CTA location name for analytics (default 'contact-form')
 *  hideWhatsApp — omit the WhatsApp fallback line under the button
 *  altPhoneField — renders an optional "another WhatsApp-reachable number" input,
 *    for forms where the visitor's own number can't receive a WhatsApp reply
 *    (the WhatsApp-recovery callback form)
 */
const ContactForm = ({ heading, subheading, submitLabel, noteOptions, location = 'contact-form', hideWhatsApp = false, altPhoneField = false }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', platform: '', altPhone: '', note: '', message: '', consent: false });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const navigate = useNavigate();

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
    if (isSubmitting || !validateForm()) return;
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
          platform: formData.platform || '',
          altPhone: formData.altPhone.trim(),
          note: formData.note || '',
          message: formData.message.trim(),
          source: location,
          src: getUtmSource(),
          path: typeof window !== 'undefined' ? window.location.pathname : '',
          lang: 'he',
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

      // A real page for the success state: clean URL-based conversion + next steps
      navigate('/תודה');
    } catch {
      trackSiteEvent('lead_form_error', { cta_location: location });
      setSubmitError(true);
    } finally {
      clearTimeout(timer);
      setIsSubmitting(false);
    }
  };

  const noteId = `note-${location}`;
  const optional = <span className="field__hint"> {t.optional}</span>;

  return (
    <div className="cform" id={location === 'contact-form' ? 'contact-form' : undefined}>
      <div className="cform__head">
        <h2 className="h3">{heading || t.header}</h2>
        <p className="muted">{subheading || t.subheader}</p>
      </div>

      {submitError && (
        <div className="cform__msg cform__msg--err" role="alert">
          <p>
            {t.submitErrorText}{' '}
            <a className="link" href={getWhatsAppUrl(t.whatsappMessage)} target="_blank" rel="noopener noreferrer" onClick={onWhatsAppClick(`${location}-error`)}>
              {t.whatsappDirect}
            </a>
          </p>
        </div>
      )}

      {/* data-clarity-mask: session replay never records what is typed here */}
      <form className="cform__form" onSubmit={handleSubmit} data-clarity-mask="true" noValidate>
        <div className="field">
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
            aria-invalid={!!errors.name}
            required
          />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </div>

        <div className="field">
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
            aria-invalid={!!errors.phone}
            required
          />
          {errors.phone && <span className="field__error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor={`platform-${location}`}>{t.platformLabel}{optional}</label>
          <select
            id={`platform-${location}`}
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
            disabled={isSubmitting}
          >
            <option value="">{t.platformNone}</option>
            {PLATFORM_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {altPhoneField && (
          <div className="field">
            <label htmlFor={`alt-phone-${location}`}>{t.altPhoneLabel}{optional}</label>
            <input
              type="tel"
              id={`alt-phone-${location}`}
              name="altPhone"
              autoComplete="tel"
              inputMode="tel"
              value={formData.altPhone}
              onChange={handleInputChange}
              placeholder={t.altPhonePlaceholder}
              disabled={isSubmitting}
            />
          </div>
        )}

        {noteOptions && (
          <div className="field">
            <label htmlFor={noteId}>{t.noteLabel}{optional}</label>
            <select id={noteId} name="note" value={formData.note} onChange={handleInputChange} disabled={isSubmitting}>
              <option value="">{t.noteNone}</option>
              {noteOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        )}

        <div className="field cform__wide">
          <label htmlFor={`message-${location}`}>{t.messageLabel}{optional}</label>
          <textarea
            id={`message-${location}`}
            name="message"
            rows={3}
            maxLength={500}
            value={formData.message}
            onChange={handleInputChange}
            placeholder={t.messagePlaceholder}
            disabled={isSubmitting}
          />
        </div>

        <div className="cform__wide">
          <label className="check">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleInputChange}
              disabled={isSubmitting}
              aria-invalid={!!errors.consent}
              required
            />
            {t.consentLabel}
          </label>
          {errors.consent && <span className="field__error">{errors.consent}</span>}
        </div>

        <button type="submit" className="btn btn--signal btn--block cform__wide" disabled={isSubmitting}>
          <span>{isSubmitting ? t.sending : submitLabel || t.submit}</span>
          <span className="btn__arrow" aria-hidden="true">
            {isSubmitting ? <Icon name="spinner" spin /> : <ArrowIcon />}
          </span>
        </button>

        {!hideWhatsApp && (
          <p className="cform__alt small cform__wide">
            {t.whatsappNote}{' '}
            <a
              className="link"
              href={getWhatsAppUrl(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onWhatsAppClick(`${location}-note`)}
            >
              {t.whatsappDirect}
            </a>
          </p>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
