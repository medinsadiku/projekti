document.addEventListener("DOMContentLoaded", () => {
    // --- Dynamic Navigation Highlight ---
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll("section");

    // Function to highlight the active navigation link
    const updateActiveLink = () => {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });
    };

    // Call the function on scroll to update active link
    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();  // Initial call to highlight the active link

    // --- Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // --- Lazy Loading of Images ---
    const lazyImages = document.querySelectorAll('img.lazy');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;  // Load the image
                img.classList.remove("lazy");
                observer.unobserve(img);
            }
        });
    }, { threshold: 0.1 });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // --- Mobile Navigation (Hamburger Menu) ---
    const menuButton = document.querySelector('.menu-button');
    const mobileNav = document.querySelector('nav ul');

    menuButton.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
        menuButton.classList.toggle('open');
    });

    // Close the menu when a navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (mobileNav.classList.contains("open")) {
                mobileNav.classList.remove("open");
                menuButton.classList.remove("open");
            }
        });
    });

    // --- Scroll Animations ---
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });
});