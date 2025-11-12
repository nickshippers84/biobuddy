// Alternative contact form handler using Formspree (no PHP required)
// To use this, replace the fetch call in script.js with this code
// And sign up at https://formspree.io to get your form endpoint

/*
// In script.js, replace the fetch section with:

fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        reason: formData.get('reason'),
        message: formData.get('message'),
        _subject: 'Contact Form: ' + formData.get('reason'),
        _replyto: formData.get('email')
    })
})
.then(response => {
    if (response.ok) {
        return response.json();
    } else {
        return response.json().then(data => {
            throw new Error(data.error || 'Form submission failed');
        });
    }
})
.then(data => {
    // Show success message
    contactFormMessage.innerHTML = `
        <div class="form-success">
            <i class="fas fa-check-circle"></i>
            <p>Thank you for your message! We'll get back to you soon.</p>
        </div>
    `;
    contactFormMessage.style.display = 'block';
    contactForm.reset();
    
    setTimeout(() => {
        contactFormMessage.style.display = 'none';
    }, 5000);
})
.catch(error => {
    console.error('Contact form error:', error);
    contactFormMessage.innerHTML = `
        <div class="form-error">
            <i class="fas fa-exclamation-circle"></i>
            <p>Sorry, there was an error sending your message. Please try again or email us directly at <a href="mailto:support@biobuddy.com">support@biobuddy.com</a></p>
        </div>
    `;
    contactFormMessage.style.display = 'block';
})
.finally(() => {
    submitButton.disabled = false;
    submitButton.innerHTML = originalButtonText;
});
*/


