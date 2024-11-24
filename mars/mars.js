document.addEventListener("DOMContentLoaded", function () {
    // Set specific departure times for each location (in UTC)
    const olympusDeparture = new Date("2025-07-01T12:00:00Z");
    const vallesDeparture = new Date("2025-08-15T12:00:00Z");
    const polarDeparture = new Date("2025-10-01T12:00:00Z");

    // Initialize countdowns for each location
    updateCountdown("countdown-olympus", olympusDeparture);
    updateCountdown("countdown-valles", vallesDeparture);
    updateCountdown("countdown-polar", polarDeparture);

    // Add smooth scrolling for anchor links
    addSmoothScroll();

    // Make navbar responsive
    initNavbarResponsive();

    // Modal functionality for bookings
    initModal();
});

// Countdown Timer for Mars Trips
function updateCountdown(placeId, departureDate) {
    const countdownElement = document.getElementById(placeId);
    countdownElement.innerHTML = "Loading...";

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = departureDate - now;

        // Calculate days, hours, minutes, seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (distance < 0) {
            clearInterval(timer);
            countdownElement.innerHTML = "The trip has departed!";
            countdownElement.style.color = "#ff6b6b";
        } else {
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            countdownElement.style.color = "#ffcc00";
        }
    }, 1000);
}

// Smooth scrolling for anchor links
function addSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                behavior: "smooth"
            });
        });
    });
}

// Navbar toggle for mobile responsiveness
function initNavbarResponsive() {
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    // Toggle navbar visibility on smaller screens
    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    // Close the menu when a link is clicked
    navLinks.addEventListener("click", (e) => {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });
}

// Modal functionality for booking tours
function initModal() {
    const bookButtons = document.querySelectorAll(".price-card button");
    const modal = document.createElement("div");
    const modalContent = document.createElement("div");
    const closeButton = document.createElement("button");
    const modalText = document.createElement("p");

    // Setup modal structure
    modal.classList.add("modal");
    modalContent.classList.add("modal-content");
    closeButton.classList.add("close-btn");
    closeButton.textContent = "Close";
    modalText.textContent = "Thank you for booking! A representative will contact you shortly.";

    modalContent.appendChild(modalText);
    modalContent.appendChild(closeButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Show modal when a booking button is clicked
    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            modal.style.display = "block";
        });
    });

    // Close modal when the close button is clicked
    closeButton.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicked outside of it
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Responsive image handling
function responsiveImages() {
    const images = document.querySelectorAll("img");
    images.forEach(image => {
        if (window.innerWidth <= 768) {
            image.src = image.dataset.small;
        } else {
            image.src = image.dataset.large;
        }
    });
}

// On window resize, adjust images for responsiveness
window.addEventListener("resize", responsiveImages);