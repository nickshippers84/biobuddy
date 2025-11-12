# Bluehost Support Request - 409 Error on Contact Form

## Issue
Contact form at `contact.php` is returning HTTP 409 Conflict error when submitting POST requests.

## Details to Provide to Bluehost Support:

1. **File Location**: `/contact.php` in the root directory
2. **Error**: HTTP 409 Conflict when submitting form via AJAX POST request
3. **Request**: The form sends POST data with fields: name, email, reason, message
4. **What you need**: 
   - Whitelist `contact.php` in mod_security
   - Check if any security rules are blocking POST requests to this file
   - Disable mod_security for this specific file, OR
   - Provide the specific mod_security rule ID causing the 409 so we can add it to .htaccess

## Information to Share:

**Script Purpose**: Contact form handler that sends emails to support@biobuddy.com

**Current .htaccess rules attempted** (may not work if mod_security is server-level):
```
<IfModule mod_security.c>
    SecRuleRemoveById 300013
    SecRuleRemoveById 300015
    SecRuleRemoveById 300016
    SecRuleRemoveById 300017
</IfModule>
```

**Request Headers** (what the form sends):
- Content-Type: application/x-www-form-urlencoded (via FormData)
- Method: POST
- File: contact.php

## Alternative Solution
If mod_security cannot be adjusted, we can switch to a third-party form service (Formspree, FormSubmit) that handles email sending externally.


