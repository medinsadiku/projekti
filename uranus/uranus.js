function updateCountdown(id, targetDate) {
    const countdownElement = document.getElementById(id);

    // Update countdown every second
    setInterval(() => {
        const currentTime = new Date().getTime();
        const timeRemaining = targetDate - currentTime;

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // If the countdown ends, show 'Departed'
        if (timeRemaining < 0) {
            countdownElement.innerHTML = "Departed";
        }
    }, 1000);
}

// Set target dates for each trip (adjustable for demonstration)
const ringsDeparture = new Date("December 25, 2024 00:00:00").getTime();
const moonsDeparture = new Date("January 15, 2025 00:00:00").getTime();
const atmosphereDeparture = new Date("February 10, 2025 00:00:00").getTime();

// Initialize countdown timers
updateCountdown("countdown-rings", ringsDeparture);
updateCountdown("countdown-moons", moonsDeparture);
updateCountdown("countdown-atmosphere", atmosphereDeparture);

// --- Mobile Navigation Toggle ---
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

// Toggle navigation links on mobile
menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked (for better UX)
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// --- Smooth Scrolling Effect ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80, // Offset for fixed navbar
            behavior: 'smooth'
        });
    });
});

// --- Resize Event for Mobile Responsiveness ---
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        // Close the menu if it's open on desktop
        navLinks.classList.remove('active');
    }
});

// --- Dynamic Content Adjustments (Interactive) ---
const bookingButtons = document.querySelectorAll('.place-card button');

// Display dynamic booking form
bookingButtons.forEach(button => {
    button.addEventListener('click', function () {
        const destination = this.parentElement.querySelector('h3').innerText;
        alert(`Booking your trip to ${destination}...`);
    });
});

// --- Scroll to Top Button (For Better UX) ---
const scrollToTopButton = document.createElement('button');
scrollToTopButton.textContent = '↑';
scrollToTopButton.classList.add('scroll-to-top');
document.body.appendChild(scrollToTopButton);

// Show the button after scrolling 100px
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Scroll to top functionality
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
