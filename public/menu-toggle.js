// Universal Menu Toggle Script
// This script handles menu toggle functionality and click-outside-to-close behavior

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (menuToggle && navMenu) {
    // Toggle menu when clicking the hamburger icon
    menuToggle.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent event from bubbling
      navMenu.classList.toggle('show');
    });
    
    // Close menu when clicking anywhere else on the page
    document.addEventListener('click', function(event) {
      // Check if the click is outside the menu and toggle button
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('show');
      }
    });
    
    // Close menu when clicking on menu links (optional - good UX)
    const menuLinks = navMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('show');
      });
    });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
      }
    });
  }
});
