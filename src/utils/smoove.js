/**
 * Newsletter subscription via the secure /api/subscribe serverless function.
 * The Smoove API key is NEVER in this file — it lives in Vercel env vars.
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Subscribe a user to the newsletter.
 * Sends to /api/subscribe which proxies to Smoove server-side.
 */
export const subscribeToNewsletter = async (firstName, lastName, email, website = '') => {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, website }),
    });

    const data = await response.json().catch(() => ({}));

    if (response.ok && data.success) {
      return { success: true, message: 'הרשמה לניוזלטר בוצעה בהצלחה! תודה על ההרשמה.' };
    }
    return {
      success: false,
      message: data.error || 'שגיאה בהרשמה לניוזלטר. אנא נסו שוב מאוחר יותר.',
    };
  } catch (err) {
    console.error('Newsletter subscription error:', err);
    return { success: false, message: 'שגיאה בהרשמה לניוזלטר. אנא נסו שוב מאוחר יותר.' };
  }
};

export default { subscribeToNewsletter, validateEmail };
