// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards for animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Cell model interaction
    const cellModel = document.querySelector('.cell-model');
    if (cellModel) {
        cellModel.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });

        cellModel.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // Add click interaction for cell structures
        const cellStructures = document.querySelectorAll('.nucleus, .mitochondria, .ribosome, .endoplasmic-reticulum');
        cellStructures.forEach(structure => {
            structure.addEventListener('click', function() {
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
            });
        });
    }

    // AI Animation particles interaction
    const aiParticles = document.querySelectorAll('.ai-particle');
    aiParticles.forEach(particle => {
        particle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
            this.style.transition = 'transform 0.3s ease';
        });

        particle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        
        if (heroVisual) {
            const rate = scrolled * -0.5;
            heroVisual.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title .highlight');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add counter animation for features
    const animateCounters = () => {
        const counters = document.querySelectorAll('[data-count]');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counter animation when in view
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                counterObserver.unobserve(entry.target);
            }
        });
    });

    const counterSection = document.querySelector('.features');
    if (counterSection) {
        counterObserver.observe(counterSection);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // Mobile menu toggle (if needed in future)
    const createMobileMenu = () => {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        if (window.innerWidth <= 768) {
            // Create mobile menu button
            const mobileMenuBtn = document.createElement('button');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.className = 'mobile-menu-btn';
            mobileMenuBtn.style.cssText = `
                display: block;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: var(--primary-blue);
                cursor: pointer;
            `;
            
            navContainer.appendChild(mobileMenuBtn);
            
            // Toggle mobile menu
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            });
        }
    };

    // Initialize mobile menu
    createMobileMenu();
    
    // Recreate mobile menu on resize
    window.addEventListener('resize', createMobileMenu);

    // Toggle functionality for user type selection
    const toggleButtons = document.querySelectorAll('.toggle-btn-large');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // You can add logic here to show different content based on selection
            const target = this.getAttribute('data-target');
            console.log('Selected:', target);
        });
    });

    // Demo button functionality
    const demoButton = document.querySelector('.demo-button');
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            // Open YouTube video in new tab
            window.open('https://www.youtube.com/watch?v=F0vJIVMEZmg', '_blank');
        });
    }

    // Back to top button functionality
    const backToTopButton = document.getElementById('backToTop');
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Smooth scroll to top when clicked
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // No custom initialization needed

    // Auto-update copyright year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Demo video modal functionality
    // Note: Watch Demo button now links directly to YouTube, so we only handle modal close functionality
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    const demoModal = document.getElementById('demoModal');
    const closeDemoModal = document.getElementById('closeDemoModal');
    const demoVideo = document.getElementById('demoVideo');

    // Only set up modal close handlers if modal exists (modal can still be opened via other means if needed)
    if (demoModal && closeDemoModal && demoVideo) {

        // Close modal
        closeDemoModal.addEventListener('click', function() {
            demoModal.style.display = 'none';
            demoVideo.src = ''; // Stop video when modal closes
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        // Close modal when clicking outside
        demoModal.addEventListener('click', function(e) {
            if (e.target === demoModal) {
                demoModal.style.display = 'none';
                demoVideo.src = ''; // Stop video when modal closes
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });

        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && demoModal.style.display === 'block') {
                demoModal.style.display = 'none';
                demoVideo.src = ''; // Stop video when modal closes
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const contactFormMessage = document.getElementById('contact-form-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                reason: document.getElementById('contact-reason').value,
                message: document.getElementById('contact-message').value
            };

            // Create mailto link
            const mailtoLink = `mailto:support@biobuddy.com?subject=${encodeURIComponent('Contact: ' + formData.reason)}&body=${encodeURIComponent(
                `Name: ${formData.name}\nEmail: ${formData.email}\nReason: ${formData.reason}\n\nMessage:\n${formData.message}`
            )}`;

            // Show success message
            contactFormMessage.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <p>Thank you for your message! Opening your email client...</p>
                    <p class="form-note">If your email client doesn't open, please email us directly at <a href="mailto:support@biobuddy.com">support@biobuddy.com</a></p>
                </div>
            `;
            contactFormMessage.style.display = 'block';

            // Open email client
            window.location.href = mailtoLink;

            // Reset form after a delay
            setTimeout(() => {
                contactForm.reset();
                contactFormMessage.style.display = 'none';
            }, 5000);
        });
    }

});
