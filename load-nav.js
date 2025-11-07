// Load navigation component
document.addEventListener('DOMContentLoaded', function() {
    // Determine the correct path to nav.html based on current location
    const currentPath = window.location.pathname;
    const isSupportPage = currentPath.includes('/support');
    const navPath = isSupportPage ? '../nav.html' : 'nav.html';
    
    fetch(navPath)
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Update navigation links based on current page
            const isIndexPage = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/index.html');
            
            // Update logo link
            const logoLink = document.querySelector('.nav-logo-link');
            if (logoLink) {
                if (isSupportPage) {
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
                } else if (isSupportPage) {
                    // On support page, links should go to index.html with anchors
                    link.href = '../' + link.getAttribute('data-href-other');
                } else {
                    link.href = link.getAttribute('data-href-other');
                }
            });
            
            // Update Help link if on support page
            const helpLink = document.querySelector('.nav-link[href="/support/"]');
            if (helpLink && isSupportPage) {
                helpLink.href = '../support/';
            }
            
            // Re-initialize navigation functionality after loading
            initializeNav();
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
        });
});

function initializeNav() {
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

    // Demo video modal functionality (if on index page)
    // Note: Watch Demo button now links directly to YouTube, so modal functionality is handled in script.js
    const demoModal = document.getElementById('demoModal');
    const closeDemoModal = document.getElementById('closeDemoModal');
    const demoVideo = document.getElementById('demoVideo');

    // Only set up modal close handlers if modal exists (on index page)
    if (demoModal && closeDemoModal && demoVideo) {
        closeDemoModal.addEventListener('click', function() {
            demoModal.style.display = 'none';
            demoVideo.src = '';
            document.body.style.overflow = 'auto';
        });

        demoModal.addEventListener('click', function(e) {
            if (e.target === demoModal) {
                demoModal.style.display = 'none';
                demoVideo.src = '';
                document.body.style.overflow = 'auto';
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && demoModal.style.display === 'block') {
                demoModal.style.display = 'none';
                demoVideo.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

