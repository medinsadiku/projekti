document.getElementById("learnMoreBtn").addEventListener("click", function() {
    alert("Thank you for your interest in learning more about Jupiter! Explore the available tours and book your trip today!");
});

// Dynamic Pricing and Tour Selection
const pricingCards = document.querySelectorAll(".pricing-card");
const bookingMessages = {
    "Jupiter Orbit Tour": "You've booked the Jupiter Orbit Tour. Get ready for a great view of the Great Red Spot!",
    "Europa Exploration": "You've booked the Europa Exploration Tour. Prepare to explore the icy moon of Europa!",
    "Io Volcano Expedition": "You've booked the Io Volcano Expedition. Witness fiery eruptions and explore a volcanic moon!"
};

// Function to handle booking the tour
function bookTour(tourName) {
    // Show the tour message
    alert(bookingMessages[tourName]);

    // Store the selected tour in local storage (for persistence)
    localStorage.setItem("selectedTour", tourName);

    // Update UI to reflect the booking
    updateBookingStatus();
}

// Function to update the UI with the booking status (based on localStorage)
function updateBookingStatus() {
    const selectedTour = localStorage.getItem("selectedTour");
    if (selectedTour) {
        const statusMessage = document.getElementById("bookingStatus");
        statusMessage.textContent = `You have already booked the ${selectedTour}! Enjoy your journey!`;
    }
}

// Function to toggle the visibility of the pricing section on small screens
const togglePricingButton = document.getElementById("togglePricing");
togglePricingButton.addEventListener("click", function() {
    const pricingSection = document.getElementById("pricing");
    pricingSection.classList.toggle("hidden");

    // Toggle the button text based on visibility
    if (pricingSection.classList.contains("hidden")) {
        togglePricingButton.textContent = "Show Pricing";
    } else {
        togglePricingButton.textContent = "Hide Pricing";
    }
});

// Smooth scroll to sections (for a better mobile experience)
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Initialize booking status on page load
window.addEventListener("load", updateBookingStatus);