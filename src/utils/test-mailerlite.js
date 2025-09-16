// Test utility for MailerLite API integration
// This file can be used to test the API functionality in the browser console

import { subscribeToNewsletter, getGroups, validateEmail } from './mailerlite.js';

// Test function that can be called from browser console
export const testMailerLite = async () => {
  console.log('🧪 Testing MailerLite API Integration...');
  
  try {
    // Test 1: Email validation
    console.log('\n📧 Testing email validation:');
    console.log('Valid email:', validateEmail('test@example.com'));
    console.log('Invalid email:', validateEmail('invalid-email'));
    
    // Test 2: Get groups (if API key is valid)
    console.log('\n📋 Testing groups API:');
    const groupsResult = await getGroups();
    console.log('Groups result:', groupsResult);
    
    // Test 3: Subscribe test email (commented out to avoid spam)
    console.log('\n⚠️  Subscribe test is commented out to avoid spam');
    console.log('To test subscription, use: testSubscribe("Your Name", "your-test-email@example.com")');
    
    console.log('\n✅ MailerLite API test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Test subscription function (use with caution)
export const testSubscribe = async (fullName, email) => {
  if (!fullName || !email) {
    console.error('❌ Please provide both full name and email address');
    return;
  }
  
  console.log(`🧪 Testing subscription for: ${fullName} (${email})`);
  
  try {
    const result = await subscribeToNewsletter(fullName, email);
    console.log('📬 Subscription result:', result);
    
    if (result.success) {
      console.log('✅ Subscription successful!');
    } else {
      console.log('❌ Subscription failed:', result.message);
    }
    
  } catch (error) {
    console.error('❌ Test subscription error:', error);
  }
};


