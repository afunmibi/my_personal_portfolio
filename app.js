document.addEventListener("DOMContentLoaded", function() {
    // --- Typing text effect ---
    const typingTextElement = document.getElementById('typing-text');
    // Ensure this element exists before trying to manipulate it
    if (typingTextElement) {
        const roles = ['Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'Freelancer'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 150; // Milliseconds per character for typing
        const deletingSpeed = 100; // Milliseconds per character for deleting
        const delayBetweenRoles = 2000; // Milliseconds before typing the next role

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            let currentTypingSpeed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentRole.length) {
                currentTypingSpeed = delayBetweenRoles;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length; // Cycle through roles
                currentTypingSpeed = typingSpeed;
            }

            setTimeout(type, currentTypingSpeed);
        }

        type(); // Start the typing effect
    } else {
        console.warn("Element with ID 'typing-text' not found. Typing effect will not run.");
    }


    // --- Hamburger Menu Functionality ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close the nav menu when a link is clicked (optional but good UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    } else {
        console.warn("Hamburger menu or navigation links not found. Mobile menu functionality will not work.");
    }
});