import React, { useEffect } from 'react';
import { useLang } from '../i18n';
import './Modal.css';

const STR = {
  he: { closeAria: 'סגור חלון' },
  en: { closeAria: 'Close window' },
};

const Modal = ({ isOpen, onClose, title, children }) => {
  const { lang, dir } = useLang();
  const t = STR[lang];
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`} dir={dir}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label={t.closeAria}>
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
