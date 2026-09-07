import React, { useEffect, useRef } from 'react';
import { useLang } from '../i18n';
import './Modal.css';

const STR = {
  he: { closeAria: 'סגור חלון' },
  en: { closeAria: 'Close window' },
};

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Accessible dialog: role/aria, Escape closes, Tab stays inside, focus returns to the opener.
const Modal = ({ isOpen, onClose, title, children }) => {
  const { lang, dir } = useLang();
  const t = STR[lang];
  const panelRef = useRef(null);
  const titleId = `modal-title-${React.useId()}`;

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement;
    document.body.style.overflow = 'hidden';
    const panel = panelRef.current;
    (panel?.querySelector(FOCUSABLE) || panel)?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') return onClose();
      if (e.key !== 'Tab' || !panel) return;
      const items = panel.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
      if (opener && typeof opener.focus === 'function') opener.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal open" dir={dir} onClick={onClose}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title" id={titleId}>{title}</h2>
          <button type="button" className="modal-close" onClick={onClose} aria-label={t.closeAria}>
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
        </div>
        <div className="modal-content-text">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
