// Load navigation component
document.addEventListener('DOMContentLoaded', function() {
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Update navigation links based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const isIndexPage = currentPage === 'index.html' || currentPage === '' || currentPage === '/';
            
            // Update logo link
            const logoLink = document.querySelector('.nav-logo-link');
            if (logoLink) {
                logoLink.href = isIndexPage ? '/' : 'index.html';
            }
            
            // Update navigation links
            const navLinks = document.querySelectorAll('.nav-link[data-href-index]');
            navLinks.forEach(link => {
                if (isIndexPage) {
                    link.href = link.getAttribute('data-href-index');
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
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    const demoModal = document.getElementById('demoModal');
    const closeDemoModal = document.getElementById('closeDemoModal');
    const demoVideo = document.getElementById('demoVideo');

    if (watchDemoBtn && demoModal && closeDemoModal && demoVideo) {
        watchDemoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            demoModal.style.display = 'block';
            demoVideo.src = 'https://www.youtube.com/embed/F0vJIVMEZmg?autoplay=1';
            document.body.style.overflow = 'hidden';
        });

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

