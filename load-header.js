// Load header component (CSS, fonts, analytics, etc.)
(function() {
    // Determine the correct path to header.html based on current location
    const currentPath = window.location.pathname;
    const isSupportPage = currentPath.includes('/support');
    const headerPath = isSupportPage ? '../header.html' : 'header.html';
    
    fetch(headerPath)
        .then(response => response.text())
        .then(data => {
            // Update paths in header content if on support page before inserting
            if (isSupportPage) {
                // Replace relative paths with parent directory paths
                data = data.replace(/href="(img\/|styles\.css)/g, 'href="../$1');
                data = data.replace(/href='(img\/|styles\.css)/g, "href='../$1");
            }
            
            // Insert header content into <head>
            document.head.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => {
            console.error('Error loading header:', error);
        });
})();

