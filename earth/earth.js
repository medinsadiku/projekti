// Countdown Timers
const countdownElements = {
    paris: 'countdown-paris',
    tokyo: 'countdown-tokyo',
    nyc: 'countdown-nyc',
    sydney: 'countdown-sydney'
};

// Function to update countdowns
function updateCountdown(id, date) {
    const countdownElement = document.getElementById(id);
    const targetDate = new Date(date).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(interval);
            countdownElement.innerHTML = "Departed";
        } else {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }, 1000);
}

// Initialize countdowns for destinations
updateCountdown(countdownElements.paris, '2024-12-25T10:00:00');
updateCountdown(countdownElements.tokyo, '2024-12-26T10:00:00');
updateCountdown(countdownElements.nyc, '2024-12-27T10:00:00');
updateCountdown(countdownElements.sydney, '2024-12-28T10:00:00');

// Smooth Scroll for Navigation Links
document.querySelectorAll('.navbar .nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1); // Remove "#" from href
        const targetElement = document.getElementById(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 60, // Adjust for navbar height
            behavior: 'smooth'
        });
    });
});

// Mobile Navigation Menu Toggle
const menuIcon = document.querySelector('.menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('active');
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const responseMessage = document.getElementById('response-message');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate input fields
    if (name === '' || email === '' || message === '') {
        showMessage('Please fill in all fields!', 'error');
        return;
    }

    if (!validateEmail(email)) {
        showMessage('Please enter a valid email address!', 'error');
        return;
    }

    // Simulate successful form submission
    setTimeout(() => {
        showMessage('Message sent successfully!', 'success');
        contactForm.reset();
    }, 1000);
});

function showMessage(message, type) {
    responseMessage.innerHTML = message;
    responseMessage.classList.remove('success', 'error');
    responseMessage.classList.add(type);
    responseMessage.style.display = 'block';
}

// Validate Email Format
function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

// Scroll Animations (Elements fade in when they are scrolled into view)
const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');

function handleScrollAnimations() {
    animateOnScrollElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
            element.classList.add('fade-in');
        } else {
            element.classList.remove('fade-in');
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);

// Theme Toggle (Dark/Light Mode)
const themeToggleButton = document.getElementById('theme-toggle');

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme preference from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

// Apply smooth scroll behavior to the page
document.documentElement.style.scrollBehavior = 'smooth';