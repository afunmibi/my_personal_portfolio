document.addEventListener('DOMContentLoaded', () => {
    const typingTextElement = document.getElementById('typing-text');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typingTextElement) {
        const roles = [
            'scalable Laravel backends',
            'clean React interfaces',
            'API-first business systems',
            'reliable full-stack products'
        ];

        if (reducedMotion) {
            typingTextElement.textContent = roles[0];
        } else {
            let roleIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            const typeSpeed = 70;
            const deleteSpeed = 45;
            const pauseAtEnd = 1200;

            const type = () => {
                const currentRole = roles[roleIndex];
                typingTextElement.textContent = currentRole.slice(0, charIndex);

                if (!isDeleting) {
                    charIndex += 1;

                    if (charIndex > currentRole.length) {
                        isDeleting = true;
                        setTimeout(type, pauseAtEnd);
                        return;
                    }

                    setTimeout(type, typeSpeed);
                    return;
                }

                charIndex -= 1;

                if (charIndex < 0) {
                    isDeleting = false;
                    roleIndex = (roleIndex + 1) % roles.length;
                    charIndex = 0;
                    setTimeout(type, 250);
                    return;
                }

                setTimeout(type, deleteSpeed);
            };

            type();
        }
    }

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navAnchors = document.querySelectorAll('.nav-links a');

    if (hamburgerMenu && navLinks) {
        const closeMenu = () => {
            navLinks.classList.remove('active');
            hamburgerMenu.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        };

        hamburgerMenu.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburgerMenu.setAttribute('aria-expanded', String(isOpen));
            document.body.classList.toggle('menu-open', isOpen);
        });

        navAnchors.forEach((link) => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        document.addEventListener('click', (event) => {
            const clickedOutside =
                !navLinks.contains(event.target) &&
                !hamburgerMenu.contains(event.target);

            if (clickedOutside) {
                closeMenu();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 840) {
                closeMenu();
            }
        });
    }

    const sections = document.querySelectorAll('section[id]');

    const setActiveNav = () => {
        const scrollPosition = window.scrollY + 130;

        sections.forEach((section) => {
            const id = section.getAttribute('id');
            const targetLink = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (!targetLink) return;

            const isInSection =
                scrollPosition >= section.offsetTop &&
                scrollPosition < section.offsetTop + section.offsetHeight;

            targetLink.classList.toggle('active', isInSection);
        });
    };

    setActiveNav();
    window.addEventListener('scroll', setActiveNav, { passive: true });

    const year = document.getElementById('year');
    if (year) {
        year.textContent = new Date().getFullYear();
    }
});
