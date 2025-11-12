// Load footer component
document.addEventListener('DOMContentLoaded', function() {
    // Determine the correct path to footer.html based on current location
    const currentPath = window.location.pathname;
    const isSupportPage = currentPath.includes('/support');
    const footerPath = isSupportPage ? '../footer.html' : 'footer.html';
    
    fetch(footerPath)
        .then(response => response.text())
        .then(data => {
            // Find where to insert footer (before closing body tag or before scripts)
            const scripts = document.querySelectorAll('script[src*="load-"], script[src*="script.js"]');
            const insertPoint = scripts.length > 0 ? scripts[scripts.length - 1] : document.body;
            
            // Insert footer before the last script or at end of body
            insertPoint.insertAdjacentHTML('beforebegin', data);
            
            // Update footer links based on current page
            const isIndexPage = currentPath === '/' || currentPath === '/index.html' || currentPath.endsWith('/index.html');
            
            // Update footer links with data-href attributes
            const footerLinks = document.querySelectorAll('.footer a[data-href-index]');
            footerLinks.forEach(link => {
                if (isIndexPage) {
                    link.href = link.getAttribute('data-href-index');
                } else if (isSupportPage) {
                    const href = link.getAttribute('data-href-other');
                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                        link.href = '../' + href;
                    } else {
                        link.href = href;
                    }
                } else {
                    link.href = link.getAttribute('data-href-other');
                }
            });
            
            // Update current year
            const yearSpan = document.getElementById('currentYear');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
});


