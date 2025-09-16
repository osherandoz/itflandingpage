# MailerLite API Integration

This document explains how the MailerLite API is integrated into the newsletter subscription functionality.

## Overview

The integration allows users to subscribe to your newsletter directly from the footer of your landing page. When a user enters their email and clicks subscribe, it will be added to your MailerLite subscriber list.

## Files Modified

1. **`src/utils/mailerlite.js`** - New utility file containing the MailerLite API functions
2. **`src/components/Footer.jsx`** - Updated to include newsletter subscription functionality
3. **`src/components/Footer.css`** - Added styles for newsletter status messages

## API Configuration

The MailerLite API key is configured in `src/utils/mailerlite.js`:

```javascript
const MAILERLITE_API_KEY = 'your-api-key-here';
const MAILERLITE_API_URL = 'https://connect.mailerlite.com/api';
```

## Features

### Newsletter Subscription
- Email validation before submission
- Real-time status messages (success/error)
- Loading states during API calls
- Error handling for various API responses
- Hebrew language support for user messages

### Error Handling
- Invalid email format
- Already subscribed emails
- API authentication errors
- Network/connection issues

## API Functions

### `subscribeToNewsletter(email, groupId)`
Subscribes a user to the newsletter.

**Parameters:**
- `email` (string): User's email address
- `groupId` (string, optional): MailerLite group ID to add subscriber to

**Returns:**
- Success: `{ success: true, data: {...}, message: '...' }`
- Error: `{ success: false, message: '...' }`

### `getGroups()`
Retrieves all groups from MailerLite (for admin purposes).

### `validateEmail(email)`
Validates email format using regex.

## Usage

The newsletter subscription form is automatically available in the footer. Users can:

1. Enter their email address
2. Click the subscribe button
3. See real-time feedback on their subscription status

## Customization

### Adding Custom Fields
To collect additional information (like name, company), modify the `subscriberData` object in `subscribeToNewsletter`:

```javascript
const subscriberData = {
  email: email,
  status: 'active',
  groups: groupId ? [groupId] : [],
  fields: {
    name: 'User Name',
    company: 'Company Name'
  }
};
```

### Changing Groups
To add subscribers to specific MailerLite groups, pass the group ID:

```javascript
const result = await subscribeToNewsletter(email, 'your-group-id');
```

### Modifying Messages
Update the Hebrew messages in the `subscribeToNewsletter` function to match your brand voice.

## Security Notes

- The API key is currently stored in the frontend code
- For production, consider moving the API key to environment variables
- The API key has limited scope and can only manage subscribers

## Troubleshooting

### Common Issues

1. **401 Unauthorized**: Check if the API key is valid and not expired
2. **409 Conflict**: User is already subscribed (this is handled gracefully)
3. **400 Bad Request**: Invalid email format or missing required fields

### Testing

1. Run `npm run dev` to start the development server
2. Navigate to the footer section
3. Try subscribing with valid and invalid email addresses
4. Check the browser console for any API errors

## Dependencies

- `axios`: For making HTTP requests to the MailerLite API
- React hooks: For managing component state

## Future Enhancements

- Add unsubscribe functionality
- Implement double opt-in
- Add analytics tracking
- Create admin panel for managing subscribers
- Add email templates customization


