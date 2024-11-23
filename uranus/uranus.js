const menuIcon = document.getElementById('menu-icon');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// Function to toggle the menu visibility
function toggleMenu() {
    navLinks.classList.toggle('active');
    // Add animation for mobile menu
    if (navLinks.classList.contains('active')) {
        navLinks.style.animation = 'slideIn 0.3s forwards';
    } else {
        navLinks.style.animation = 'slideOut 0.3s forwards';
    }
}

// Event listener for menu icon click to toggle menu
menuIcon.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents click event from propagating to body
    toggleMenu();
});

// Close the menu if clicked outside
body.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
        toggleMenu(); // Close the menu if clicking outside
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: 'smooth',
        });
    });
});

// Pricing Card Hover Effects
const pricingCards = document.querySelectorAll('.pricing-card');
pricingCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)'; // Slightly scale up the card
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    });
});

// Handle resizing events for responsiveness
let resizeTimeout;
window.addEventListener('resize', () => {
    // Debounce resize event to improve performance
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        handleResize();
    }, 200); // Wait 200ms after resize stops before executing function
});

// Function to handle resizing of the page (responsive adjustments)
function handleResize() {
    const width = window.innerWidth;
    if (width <= 768) {
        // Mobile-specific adjustments if needed
        navLinks.style.animation = ''; // Reset animation if resizing back to mobile
    } else {
        // Desktop-specific adjustments
        navLinks.style.animation = ''; // Ensure animation reset for desktop
    }
}

// Call the function on initial load
handleResize();

// Show a scroll-to-top button when scrolled down
const scrollTopButton = document.createElement('button');
scrollTopButton.textContent = '↑';
scrollTopButton.style.position = 'fixed';
scrollTopButton.style.bottom = '20px';
scrollTopButton.style.right = '20px';
scrollTopButton.style.padding = '1rem';
scrollTopButton.style.borderRadius = '50%';
scrollTopButton.style.border = 'none';
scrollTopButton.style.backgroundColor = '#e67e22';
scrollTopButton.style.color = 'white';
scrollTopButton.style.display = 'none';
scrollTopButton.style.cursor = 'pointer';
scrollTopButton.style.zIndex = '1000';

document.body.appendChild(scrollTopButton);

// Show or hide the scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollTopButton.style.display = 'block';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

// Scroll to the top when the button is clicked
scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});