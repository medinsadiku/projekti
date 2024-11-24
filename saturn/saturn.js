document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 70, // Add some padding from the top for navbar
            behavior: 'smooth'
        });
    });
});

// Toggle Mobile Navigation Menu
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    navLinks.classList.toggle('active');
    menuIcon.classList.toggle('open');
});

// Lazy Loading of Images for Performance
const images = document.querySelectorAll('img[data-src]');
const loadImage = (img) => {
    img.src = img.getAttribute('data-src');
    img.removeAttribute('data-src');
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            loadImage(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

images.forEach(image => imageObserver.observe(image));

// Pricing Modal Details with Animation
function showDetails(packageType) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    
    let details = "";
    if (packageType === 'basic') {
        details = `
            <h3>Basic Package Details</h3>
            <ul>
                <li>1-week tour to Saturn’s rings</li>
                <li>Guided excursions on Titan</li>
                <li>Exclusive spacewalk experience</li>
                <li>Round trip to Saturn on the space shuttle</li>
            </ul>
            <button class="close-modal">Close</button>
        `;
    } else if (packageType === 'premium') {
        details = `
            <h3>Premium Package Details</h3>
            <ul>
                <li>2-week tour to Saturn and Titan</li>
                <li>Private space shuttle with VIP amenities</li>
                <li>Exclusive access to Titan Moon Base</li>
                <li>Private viewing of Saturn’s atmosphere and rings</li>
            </ul>
            <button class="close-modal">Close</button>
        `;
    }

    modalContent.innerHTML = details;
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const closeModalBtn = modal.querySelector('.close-modal');
    closeModalBtn.addEventListener('click', () => {
        modal.style.animation = 'fadeOut 0.5s forwards';
        setTimeout(() => modal.remove(), 500); // Remove modal after animation ends
    });
}

// Countdown Timer
const timerElement = document.getElementById('timer');

function updateCountdown() {
    const missionDate = new Date("2025-06-01T00:00:00Z"); // Set your mission date here
    const now = new Date();
    const timeRemaining = missionDate - now;

    if (timeRemaining <= 0) {
        timerElement.innerHTML = "The mission has started!";
        return;
    }

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

setInterval(updateCountdown, 1000);

// Active Navbar Link Highlighting
const sections = document.querySelectorAll('section');
const navLinksList = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - 100 && window.scrollY < sectionTop + sectionHeight - 100) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinksList.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
});

// Lazy Load Testimonials and Content
const testimonialContainers = document.querySelectorAll('.testimonial-container');

const testimonialObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

testimonialContainers.forEach(container => testimonialObserver.observe(container));

// Form Validation and Feedback
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    if (!name.value || !email.value || !message.value) {
        alert("Please fill in all fields.");
        return;
    }
    
    // Basic email validation (check if @ and . are present)
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.value)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Thank you for contacting us! We'll respond shortly.");
    this.reset();  // Clear the form after submission
});

// Responsive Pricing Cards
const priceCards = document.querySelectorAll('.price-card');

function adjustPricingCards() {
    if (window.innerWidth < 768) {
        priceCards.forEach(card => {
            card.style.width = '100%';
            card.style.marginBottom = '20px';
        });
    } else {
        priceCards.forEach(card => {
            card.style.width = '300px';
            card.style.marginBottom = '0';
        });
    }
}

window.addEventListener('resize', adjustPricingCards);
adjustPricingCards();  // Call once on load

// Pricing Hover Animation
priceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
        card.style.transition = 'transform 0.3s ease';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});