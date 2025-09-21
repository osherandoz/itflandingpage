// Test utility for Smoove API integration
// This file can be used to test the API functionality in the browser console

import { subscribeToNewsletter, getLists, validateEmail } from './smoove.js';

// Test function that can be called from browser console
export const testSmoove = async () => {
  console.log('🧪 Testing Smoove API Integration...');
  
  try {
    // Test 1: Email validation
    console.log('\n📧 Testing email validation:');
    console.log('Valid email:', validateEmail('test@example.com'));
    console.log('Invalid email:', validateEmail('invalid-email'));
    
    // Test 2: Get lists (if API key is valid)
    console.log('\n📋 Testing lists API:');
    const listsResult = await getLists();
    console.log('Lists result:', listsResult);
    
    // Test 3: Subscribe test email (commented out to avoid spam)
    console.log('\n⚠️  Subscribe test is commented out to avoid spam');
    console.log('To test subscription, use: testSubscribe("Your Name", "your-test-email@example.com")');
    
    console.log('\n✅ Smoove API test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
};

// Test subscription function (use with caution)
export const testSubscribe = async (firstName, lastName, email) => {
  if (!firstName || !lastName || !email) {
    console.error('❌ Please provide first name, last name, and email address');
    return;
  }
  
  console.log(`🧪 Testing subscription for: ${firstName} ${lastName} (${email})`);
  
  try {
    const result = await subscribeToNewsletter(firstName, lastName, email);
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
