/**
 * Newsletter subscription via the secure /api/subscribe serverless function.
 * The Smoove API key is NEVER in this file — it lives in Vercel env vars.
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

const MESSAGES = {
  he: {
    success: 'הרשמה לניוזלטר בוצעה בהצלחה! תודה על ההרשמה.',
    error: 'שגיאה בהרשמה לניוזלטר. אנא נסו שוב מאוחר יותר.',
  },
  en: {
    success: 'You\'re subscribed! Thanks for signing up.',
    error: 'Something went wrong subscribing you. Please try again shortly.',
  },
};

/**
 * Subscribe a user to the newsletter.
 * Sends to /api/subscribe which proxies to Smoove server-side.
 */
export const subscribeToNewsletter = async (firstName, lastName, email, website = '', lang = 'he') => {
  const m = MESSAGES[lang] || MESSAGES.he;
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, website, lang }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      return { success: true, message: m.success };
    }
    return {
      success: false,
      message: data.error || m.error,
    };
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return { success: false, message: m.error };
  }
};

export default { subscribeToNewsletter, validateEmail };
