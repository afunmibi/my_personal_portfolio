document.addEventListener('DOMContentLoaded', () => {
    const typingTextElement = document.getElementById('typing-text');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const siteHeader = document.querySelector('.site-header');
    const scrollUpButton = document.querySelector('.scroll-up');

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
            hamburgerMenu.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('menu-open');
        };

        hamburgerMenu.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('active');
            hamburgerMenu.setAttribute('aria-expanded', String(isOpen));
            hamburgerMenu.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
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

    const syncHeaderState = () => {
        if (!siteHeader) return;
        siteHeader.classList.toggle('scrolled', window.scrollY > 10);
    };

    const syncScrollUpState = () => {
        if (!scrollUpButton) return;
        scrollUpButton.classList.toggle('is-visible', window.scrollY > 420);
    };

    syncHeaderState();
    syncScrollUpState();
    window.addEventListener('scroll', syncHeaderState, { passive: true });
    window.addEventListener('scroll', syncScrollUpState, { passive: true });

    if (scrollUpButton) {
        scrollUpButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: reducedMotion ? 'auto' : 'smooth'
            });
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

    const revealElements = document.querySelectorAll('.reveal');

    if (reducedMotion) {
        revealElements.forEach((element) => {
            element.classList.add('is-visible');
        });
    } else if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, {
            threshold: 0.18,
            rootMargin: '0px 0px -30px 0px'
        });

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add('is-visible');
        });
    }

    const mentoringImages = document.querySelectorAll('.mentoring-card img[data-fallback-src]');
    mentoringImages.forEach((image) => {
        image.addEventListener('error', () => {
            if (image.dataset.fallbackApplied === 'true') return;

            image.dataset.fallbackApplied = 'true';
            image.src = image.dataset.fallbackSrc;
        });
    });
});
