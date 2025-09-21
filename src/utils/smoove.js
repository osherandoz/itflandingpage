// Smoove API Integration
// This utility handles newsletter subscriptions using Smoove API

// Smoove API configuration
const SMOOVE_API_KEY = '84bc9a64-a6c8-4777-af10-94d24a811ec5';
// Use proxy in development, direct API in production
const SMOOVE_API_URL = import.meta.env.DEV ? '/api/smoove' : 'https://rest.smoove.io/v1';

/**
 * Validates email format
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Subscribes a user to the newsletter
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} email - User's email address
 * @param {string} listId - Optional Smoove list ID
 * @returns {Promise<Object>} - Result object with success status and message
 */
export const subscribeToNewsletter = async (firstName, lastName, email, listId = null) => {
  try {
    // Validate inputs
    if (!firstName || !firstName.trim()) {
      return {
        success: false,
        message: 'שם פרטי הוא שדה חובה'
      };
    }

    if (!lastName || !lastName.trim()) {
      return {
        success: false,
        message: 'שם משפחה הוא שדה חובה'
      };
    }

    if (!email || !email.trim()) {
      return {
        success: false,
        message: 'כתובת דוא"ל היא שדה חובה'
      };
    }

    if (!validateEmail(email)) {
      return {
        success: false,
        message: 'כתובת דוא"ל לא תקינה'
      };
    }

    // Prepare subscriber data for Smoove API
    const subscriberData = {
      email: email.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      status: 'active',
      list_id: listId || 'default'
    };

    // Make API request to Smoove
    const response = await fetch(`${SMOOVE_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SMOOVE_API_KEY}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(subscriberData)
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        message: 'הרשמה לניוזלטר בוצעה בהצלחה! תודה על ההרשמה.',
        data: data
      };
    } else if (response.status === 409) {
      return {
        success: false,
        message: 'כתובת הדוא"ל כבר רשומה במערכת'
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: 'שגיאה בהרשמה לניוזלטר. אנא נסו שוב מאוחר יותר.'
      };
    }

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'שגיאה בהרשמה לניוזלטר. אנא נסו שוב מאוחר יותר.'
    };
  }
};

/**
 * Gets all lists from Smoove
 * @returns {Promise<Object>} - Result object with lists data
 */
export const getLists = async () => {
  try {
    const response = await fetch(`${SMOOVE_API_URL}/lists`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${SMOOVE_API_KEY}`,
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      return {
        success: true,
        data: data
      };
    } else {
      return {
        success: false,
        message: 'שגיאה בטעינת רשימות'
      };
    }
  } catch (error) {
    console.error('Get lists error:', error);
    return {
      success: false,
      message: 'שגיאה בטעינת רשימות'
    };
  }
};

export default {
  subscribeToNewsletter,
  getLists,
  validateEmail
};
