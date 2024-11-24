document.addEventListener("DOMContentLoaded", function () {
    // Define departure dates for each destination
    const departureDates = {
        highlands: new Date("2025-06-01T12:00:00Z"),
        volcanoes: new Date("2025-07-15T12:00:00Z"),
        cloudCity: new Date("2025-09-01T12:00:00Z")
    };

    // Initialize countdowns for each destination
    Object.keys(departureDates).forEach(destination => {
        const countdownElement = document.getElementById(`countdown-${destination}`);
        startCountdown(countdownElement, departureDates[destination]);
    });

    // Initialize Smooth Scroll for navigation
    enableSmoothScroll();

    // Initialize Navbar responsiveness
    initNavbarResponsive();

    // Change navbar style on scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
});

// Countdown timer function
function startCountdown(countdownElement, departureDate) {
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = departureDate - now;

        if (distance < 0) {
            clearInterval(timer);
            countdownElement.textContent = "The trip has departed!";
            countdownElement.style.color = "#ff6b6b";
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            countdownElement.style.color = "#ffcc00";
        }
    }, 1000);
}

// Smooth scroll function for anchor links
function enableSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetID = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetID);
            window.scrollTo({
                top: targetElement.offsetTop - 80,  // Account for fixed navbar
                behavior: 'smooth'
            });
        });
    });
}

// Navbar responsive toggle
function initNavbarResponsive() {
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle("active");
    });

    // Close navbar if clicked outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuIcon.contains(e.target)) {
            navLinks.classList.remove("active");
        }
    });
}