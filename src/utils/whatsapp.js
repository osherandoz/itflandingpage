// WhatsApp utility functions
export const openWhatsApp = (message = "היי, הגעתי דרך האתר שלך אשמח לקבל פרטים") => {
  const phoneNumber = "972509823235";
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  // Google Analytics event tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'click', {
      event_category: 'WhatsApp',
      event_label: 'whatsapp_redirect',
      value: 1
    });
  }
  
  // Open WhatsApp in new tab
  window.open(whatsappUrl, '_blank');
};

export const getWhatsAppUrl = (message = "היי, הגעתי דרך האתר שלך אשמח לקבל פרטים") => {
  const phoneNumber = "972509823235";
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};










