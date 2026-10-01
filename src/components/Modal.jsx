import React, { useEffect, useRef } from 'react';
import './Modal.css';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Accessible dialog: role/aria, Escape closes, Tab stays inside, focus returns to the opener.
const Modal = ({ isOpen, onClose, title, children }) => {
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
      document.body.style.overflow = '';
      if (opener && typeof opener.focus === 'function') opener.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal theme-paper" dir="rtl" onClick={onClose}>
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__head">
          <h2 className="h3" id={titleId}>{title}</h2>
          <button type="button" className="modal__close" onClick={onClose} aria-label="סגור חלון">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
        <div className="modal__body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
