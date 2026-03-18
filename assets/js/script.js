const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
}

window.onscroll = () => {
    navLinks.classList.remove('active');
}

// Typing Text Animation Code

const typed = new Typed('.multiple-text', {
    strings: ['Frontend Development', 'Backend Development', 'Full Stack Development', 'Wordpress Designer'],
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1000,
    loop: true,
  });