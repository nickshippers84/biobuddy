# Freshworks/Freshdesk API Setup Instructions

## Domain Already Configured:
- Domain: `biobuddy-org.myfreshworks.com` ✅

## What You Need to Provide:

**API Key**: Your Freshworks **TICKETING** API key
- Log into Freshworks (https://biobuddy-org.myfreshworks.com)
- Click your profile picture (top right)
- Go to **Profile Settings** or **Admin Settings**
- Find **API Keys** section
- You'll see three API keys:
  - ✅ **TICKETING** - Use this one (for creating support tickets)
  - ❌ CRM - Don't use this
  - ❌ Conversations - Don't use this
- Copy the **TICKETING API key**

## How to Update contact.php:

Update line 52 in `contact.php`:

```php
$freshdesk_api_key = 'YOUR_TICKETING_API_KEY'; // Replace with your TICKETING API key
```

## Example:

If your Ticketing API key is `abc123xyz`, update to:

```php
$freshdesk_api_key = 'abc123xyz';
```

## Security Note:

For better security, you could also:
1. Store the API key in a separate config file (not in git)
2. Use environment variables
3. Add the config file to `.gitignore`

## Testing:

After updating, test the contact form. If successful, you should see:
- Success message with ticket number
- Ticket created in your Freshdesk dashboard

## Benefits:

- ✅ No mod_security issues (uses HTTPS API)
- ✅ No email server configuration needed
- ✅ Tickets automatically organized in Freshdesk
- ✅ Better support workflow
- ✅ Ticket tracking and management

