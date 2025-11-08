// Support form handling
document.addEventListener('DOMContentLoaded', function() {
    const supportForm = document.getElementById('supportForm');
    const formMessage = document.getElementById('form-message');

    if (supportForm) {
        supportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Disable submit button to prevent double submission
            const submitButton = supportForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            
            // Get form data
            const formData = new FormData(supportForm);
            
            // Show loading message
            formMessage.innerHTML = `
                <div style="color: var(--primary-blue); padding: 1rem;">
                    <i class="fas fa-spinner fa-spin"></i> Submitting your ticket...
                </div>
            `;
            formMessage.style.display = 'block';
            
            // Submit form via AJAX
            fetch('../support-ticket.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Show success message
                    formMessage.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle"></i>
                            <p>${data.message}</p>
                        </div>
                    `;
                    formMessage.style.display = 'block';
                    
                    // Reset form
                    supportForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                } else {
                    // Show error message
                    formMessage.innerHTML = `
                        <div class="form-error">
                            <i class="fas fa-exclamation-circle"></i>
                            <p>${data.message}</p>
                        </div>
                    `;
                    formMessage.style.display = 'block';
                }
            })
            .catch(error => {
                // Show error message
                formMessage.innerHTML = `
                    <div class="form-error">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Sorry, there was an error sending your ticket. Please try again or email us directly at <a href="mailto:support@biobuddy.com">support@biobuddy.com</a></p>
                    </div>
                `;
                formMessage.style.display = 'block';
            })
            .finally(() => {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });
    }

    // Auto-update copyright year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});

