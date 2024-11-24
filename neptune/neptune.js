// Improved Countdown Timer for Neptune Trips
document.addEventListener("DOMContentLoaded", function () {
    // Helper function to update countdown timers
    function updateCountdown(placeId, departureDate) {
        const countdownElement = document.getElementById(placeId);

        // Initial state - Loading message while the countdown is initialized
        countdownElement.innerHTML = "Calculating Time...";

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = departureDate - now;

            // Calculate time remaining
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(timer);
                countdownElement.innerHTML = "The trip has departed!";
                countdownElement.style.color = "#ff6b6b";
                countdownElement.style.fontSize = "18px";
            } else {
                // Dynamically update countdown every second
                countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                countdownElement.style.color = "#ffcc00";
                countdownElement.style.fontSize = "22px";
            }
        }, 1000);
    }

    // Set specific departure times for each destination (example: UTC date)
    const tritonDeparture = new Date("2025-06-01T12:00:00Z");
    const ringsDeparture = new Date("2025-08-01T12:00:00Z");
    const spotDeparture = new Date("2025-10-01T12:00:00Z");

    // Initialize countdowns for each location with some transition delay
    updateCountdown("countdown-triton", tritonDeparture);
    updateCountdown("countdown-rings", ringsDeparture);
    updateCountdown("countdown-spot", spotDeparture);

    // Ensure smooth transitions and additional interactivity
    addSmoothScroll();
    initNavbarResponsive();
    setupBookingButtons();
});

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

// Toggle the Navbar on small screens (responsive)
function initNavbarResponsive() {
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".nav-links");

    menuIcon.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });
}

// Activate booking button functionality (for demonstration)
function setupBookingButtons() {
    const bookButtons = document.querySelectorAll(".price-card button");
    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            alert("Booking functionality is coming soon!");
        });
    });
}