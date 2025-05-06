// SHOW MENU FUNCTION
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};
showMenu('nav_toggle', 'nav_menu');

// ACTIVE & REMOVE ACTIVE CLASS ON NAV LINKS
const navLink = document.querySelectorAll('.nav_link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    // Store active link in localStorage
    localStorage.setItem("activeLink", this.getAttribute("href"));

    // Close mobile menu after clicking a link
    document.getElementById('nav_menu').classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// Restore active link after page reload
window.addEventListener("load", () => {
    const activeLink = localStorage.getItem("activeLink");
    if (activeLink) {
        navLink.forEach(n => n.classList.remove("active"));
        const activeNav = document.querySelector(`.nav_link[href="${activeLink}"]`);
        if (activeNav) activeNav.classList.add("active");
    }

    // SOCIAL MEDIA ICONS - KEEP VISIBLE ON LOAD
    document.querySelectorAll('.home_social-icon').forEach(icon => {
        icon.style.opacity = "1";
        icon.style.transition = "none";
    });
});

// SMOOTH SCROLLING EFFECT
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// CONTACT FORM WITH EMAILJS
document.querySelector('.contact_form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('input[placeholder="Name"]').value.trim();
    const email = document.querySelector('input[placeholder="Email"]').value.trim();
    const message = document.querySelector('textarea').value.trim();

    if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Use EmailJS to send email
    emailjs.init("tiIRJTREEq28NySBF");
    emailjs.send("service_jjpmzfm", "template_7xlmfs8", {
        from_name: name,
        from_email: email,
        message: message
    }).then(response => {
        alert("Message Sent Successfully!");
        document.querySelector('.contact_form').reset();
    }).catch(error => {
        alert("Failed to send message. Please try again.");
        console.error("EmailJS Error:", error);
    });
});

// SCROLL SECTIONS ACTIVE LINK
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        const navMenuLink = document.querySelector('.nav_link[href="#' + sectionId + '"]');

        if (navMenuLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navMenuLink.classList.add('active');
            } else {
                navMenuLink.classList.remove('active');
            }
        }
    });
});
