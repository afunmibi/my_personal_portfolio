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
    strings: ['Frontend Developer (HTML,CSS,JS & React.JS)', 'Backend Developer (PHP & MYSQL)', 'Full Stack Developer', 'Wordpress Designer'],
    typeSpeed: 60,
    backSpeed: 60,
    backDelay: 1000,
    loop: true,
  });