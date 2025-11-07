// Support form handling
document.addEventListener('DOMContentLoaded', function() {
    const supportForm = document.getElementById('supportForm');
    const formMessage = document.getElementById('form-message');

    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                category: document.getElementById('category').value,
                message: document.getElementById('message').value
            };

            // Create mailto link (fallback method)
            const mailtoLink = `mailto:support@biobuddy.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\nCategory: ${formData.category}\n\nMessage:\n${formData.message}`
            )}`;

            // Show success message
            formMessage.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your submission! Opening your email client...</p>
                    <p class="form-note">If your email client doesn't open, please email us directly at <a href="mailto:support@biobuddy.com">support@biobuddy.com</a></p>
                </div>
            `;
            formMessage.style.display = 'block';

            // Open email client
            window.location.href = mailtoLink;

            // Reset form after a delay
            setTimeout(() => {
                supportForm.reset();
                formMessage.style.display = 'none';
            }, 5000);
        });
    }

    // Auto-update copyright year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

