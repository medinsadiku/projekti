document.getElementById('menu-icon').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
    // Smooth transition for menu visibility
    if (navLinks.classList.contains('active')) {
        navLinks.style.transition = "transform 0.3s ease-in-out";
        navLinks.style.transform = "translateY(0)";
    } else {
        navLinks.style.transform = "translateY(-100%)";
    }
});

// Close the menu if the user clicks outside of it
document.addEventListener('click', function(event) {
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = document.getElementById('menu-icon');
    if (!navLinks.contains(event.target) && !menuIcon.contains(event.target)) {
        navLinks.classList.remove('active');
        navLinks.style.transform = "translateY(-100%)"; // Close the menu with a smooth transition
    }
});

// Dynamic active link highlighting on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", function() {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 50) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active-link");
        if (link.classList.contains(current)) {
            link.classList.add("active-link");
        }
    });
});

// Optional: Scroll to section smoothly when clicking a navigation link
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: 'smooth'
        });
    });
});