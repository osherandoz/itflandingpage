// MailerLite API Integration
// This utility handles newsletter subscriptions using MailerLite API

// MailerLite API configuration
const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjMzZWVhMzEzMWQ5NjBhYTk0ZmZjNjllZWEzYTM3NTM2NTllZWRkYTFhOTcyYjMwZjRhYTk0MDEyMDZlZTNiODUwZGQ1YTY3ZDA1ZmYyMGUiLCJpYXQiOjE3NTgwMDUxNTIuMDkyNjg3LCJuYmYiOjE3NTgwMDUxNTIuMDkyNjg5LCJleHAiOjQ5MTM2Nzg3NTIuMDg4NDIzLCJzdWIiOiIxNzY4MzM0Iiwic2NvcGVzIjpbXX0.DP2_y1Ib30f5dYJKVaejqRZYuaGkmJ8qFaI5bjMADNRMDkGsJCTcMnV8tGQ-tRDsOGEULDLvzj2bVymMjFdfow4ydSG0g0s7ldXbRrXk9aoxkrzJrSnx1poaryxYYcdPnWcHQybr1TK_8FAcg-7jxKIJ9mm5f7xDVz6u4RH_QCNppJUngqcqZ943HkiWxnfe9bv32X-r3iVZs-Bpg3QH4chIMRlv-xn1_d002qrKezgDcACf0gXC6gGa7AF9leDO3Fr3fQhrjWJvW_WcWLM9DADcC8kek2E-IW5cWs63sA0EJklq8n8jISL5emlEPR985bE_RftAUWcpfC4MMHcUcRrme6S-IMsP0-hmG_SKD5G101ydQ5QK8P_dxa74Ufp_TXgMyM3tXhs1NlWxmxvS1I--9XMvDpAQx_RghPrUirZbGmc1mro9yiyjizAO-XEK4qUSQ1xNrWZx3gcDCUn_nvk0KJVqB9Vbug409TROPjqv5kXt8DB4w2wdn3xRPdS6PBSem25UwQ_Lbh5oGwuRsOc1sAsbdD99BCzJ7iPKGyY0dWXLPUov8Oxc-Tp3MiBHKrZRU5R0KgAbtnZTjeq8ow7dQX0XhzbAaTpOZ59M-yTAwQ0OcNI-Cw-uijyyJdQD3Kc0fuCQaEyeUZaNV1WU5jmZDz0UPSRcQJIQgQd1ilk';
const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api';

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
 * @param {string} fullName - User's full name
 * @param {string} email - User's email address
 * @param {string} groupId - Optional MailerLite group ID
 * @returns {Promise<Object>} - Result object with success status and message
 */
export const subscribeToNewsletter = async (fullName, email, groupId = null) => {
  try {
    // Validate inputs
    if (!fullName || !fullName.trim()) {
      return {
        success: false,
        message: 'שם מלא הוא שדה חובה'
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

    // Prepare subscriber data with custom fields
    const subscriberData = {
      email: email.trim(),
      status: 'active',
      groups: groupId ? [groupId] : [],
      fields: {
        name: fullName.trim()
      }
    };

    // Make API request to MailerLite
    const response = await fetch(`${MAILERLITE_API_URL}/subscribers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
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
 * Gets all groups from MailerLite
 * @returns {Promise<Object>} - Result object with groups data
 */
export const getGroups = async () => {
  try {
    const response = await fetch(`${MAILERLITE_API_URL}/groups`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
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
        message: 'שגיאה בטעינת קבוצות'
      };
    }
  } catch (error) {
    console.error('Get groups error:', error);
    return {
      success: false,
      message: 'שגיאה בטעינת קבוצות'
    };
  }
};

export default {
  subscribeToNewsletter,
  getGroups,
  validateEmail
};
