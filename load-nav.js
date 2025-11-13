// Load navigation component
document.addEventListener('DOMContentLoaded', function() {
    // Determine the correct path to nav.html based on current location
    const currentPath = window.location.pathname;
    const isSubPage = currentPath.includes('/support') || currentPath.includes('/about') || currentPath.includes('/testimonials');
    const navPath = isSubPage ? '../nav.html' : 'nav.html';
    
    fetch(navPath)
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Update navigation links based on current page
            const isIndexPage = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/index.html');
            
            // Update logo link
            const logoLink = document.querySelector('.nav-logo-link');
            if (logoLink) {
                if (isSubPage) {
                    logoLink.href = '../';
                } else {
                    logoLink.href = isIndexPage ? '/' : 'index.html';
                }
            }
            
            // Update navigation links
            const navLinks = document.querySelectorAll('.nav-link[data-href-index]');
            navLinks.forEach(link => {
                if (isIndexPage) {
                    link.href = link.getAttribute('data-href-index');
                } else if (isSubPage) {
                    // On sub pages, links should go to index.html with anchors
                    link.href = '../' + link.getAttribute('data-href-other');
                } else {
                    link.href = link.getAttribute('data-href-other');
                }
            });
            
            // Update Help link if on sub page
            const helpLink = document.querySelector('.nav-link[href="support/"]');
            if (helpLink && isSubPage) {
                helpLink.href = 'support/';
            }
            
            // Update mobile navigation links
            const mobileNavLinks = document.querySelectorAll('.mobile-nav-link[data-href-index]');
            mobileNavLinks.forEach(link => {
                if (isIndexPage) {
                    link.href = link.getAttribute('data-href-index');
                } else if (isSubPage) {
                    link.href = '../' + link.getAttribute('data-href-other');
                } else {
                    link.href = link.getAttribute('data-href-other');
                }
            });
            
            // Re-initialize navigation functionality after loading
            initializeNav();
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
});

function initializeNav() {
    // Mobile menu toggle - simpler approach
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenuToggle.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-open');
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuToggle.classList.remove('is-active');
                mobileMenu.classList.remove('is-open');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (mobileMenu.classList.contains('is-open')) {
                if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    mobileMenuToggle.classList.remove('is-active');
                    mobileMenu.classList.remove('is-open');
                }
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.includes('#')) {
                e.preventDefault();
                const hash = targetId.split('#')[1];
                const targetSection = document.querySelector('#' + hash);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.background = '#ffffff';
                navbar.style.backdropFilter = 'none';
            }
        });
    }

    // Demo video modal functionality
    // Create modal if it doesn't exist (for pages other than index)
    let demoModal = document.getElementById('demoModal');
    if (!demoModal) {
        const modalHTML = `
            <div id="demoModal" class="demo-modal">
                <div class="demo-modal-content">
                    <div class="demo-modal-header">
                        <h3>Watch Our Quick Tour</h3>
                        <button class="demo-modal-close" id="closeDemoModal">&times;</button>
                    </div>
                    <div class="demo-modal-body">
                        <div class="demo-video-wrapper">
                            <iframe 
                                id="demoVideo" 
                                src="" 
                                title="BioBuddy Demo Video" 
                                frameborder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowfullscreen>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        demoModal = document.getElementById('demoModal');
    }

    const closeDemoModal = document.getElementById('closeDemoModal');
    const demoVideo = document.getElementById('demoVideo');
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    const watchDemoBtnMobile = document.getElementById('watchDemoBtnMobile');

    // Open modal when "Watch a Demo" button is clicked
    function openDemoModal() {
        if (demoModal && demoVideo) {
            // Set the YouTube embed URL
            demoVideo.src = 'https://www.youtube.com/embed/F0vJIVMEZmg?autoplay=1';
            demoModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }

    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openDemoModal();
        });
    }

    if (watchDemoBtnMobile) {
        watchDemoBtnMobile.addEventListener('click', function(e) {
            e.preventDefault();
            openDemoModal();
            // Close mobile menu if open
            const mobileMenu = document.querySelector('.mobile-menu');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            if (mobileMenu && mobileMenu.classList.contains('is-open')) {
                if (mobileMenuToggle) mobileMenuToggle.classList.remove('is-active');
                mobileMenu.classList.remove('is-open');
            }
        });
    }

    // Close modal handlers
    if (demoModal && closeDemoModal && demoVideo) {
        closeDemoModal.addEventListener('click', function() {
            demoModal.style.display = 'none';
            demoVideo.src = ''; // Stop video when modal closes
            document.body.style.overflow = 'auto'; // Restore scrolling
        });

        demoModal.addEventListener('click', function(e) {
            if (e.target === demoModal) {
                demoModal.style.display = 'none';
                demoVideo.src = ''; // Stop video when modal closes
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && demoModal.style.display === 'block') {
                demoModal.style.display = 'none';
                demoVideo.src = ''; // Stop video when modal closes
                document.body.style.overflow = 'auto'; // Restore scrolling
            }
        });
    }
}

