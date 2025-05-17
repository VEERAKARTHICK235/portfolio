// Initialize EmailJS once globally
emailjs.init("tiIRJTREEq28NySBF"); // Your EmailJS Public Key

// SHOW MENU
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};

// Certificates Lightbox images array
const certImages = [
  "assets/img/Oracle.jpg",
  "assets/img/IOT.jpg",
  "assets/img/certificate2.jpg",
  "assets/img/certificate6.jpg",
  "assets/img/certificate4.jpg",
  "assets/img/certificate3.jpg",
  "assets/img/certificate1.jpg",
  "assets/img/certificate5.jpg"
];


// Open lightbox and show image at index
function openLightbox(index) {
  currentIndex = index;
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  lightboxImage.src = certImages[currentIndex];
  lightbox.classList.add('show');
}

// Close lightbox (only if clicked outside image or on close button)
function closeLightbox(event) {
  const lightbox = document.getElementById('lightbox');
  if (
    event.target.id === 'lightboxImage' ||
    event.target.classList.contains('nav-btn')
  ) {
    return; // Don't close when clicking image or nav buttons
  }
  lightbox.classList.remove('show');
}

// Navigate next/prev image
function changeSlide(direction) {
  const lightboxImage = document.getElementById('lightboxImage');

  // Add rotation class based on direction
  const rotateClass = direction === 1 ? 'rotate-cube-right' : 'rotate-cube-left';
  lightboxImage.classList.add(rotateClass);

  // Wait for half the animation before changing the image
  setTimeout(() => {
    currentIndex = (currentIndex + direction + certImages.length) % certImages.length;
    lightboxImage.src = certImages[currentIndex];

    // Remove the animation class after complete
    setTimeout(() => {
      lightboxImage.classList.remove(rotateClass);
    }, 600);
  }, 300); // Halfway through the cube rotation
}


// Keyboard navigation for lightbox (Esc to close, arrows to navigate)
document.addEventListener('keydown', (e) => {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('show')) return;

  if (e.key === "Escape") {
    lightbox.classList.remove('show');
  }
  if (e.key === "ArrowRight") {
    changeSlide(1);
  }
  if (e.key === "ArrowLeft") {
    changeSlide(-1);
  }
});

// Add event listeners to nav toggle and nav links
showMenu('nav_toggle', 'nav_menu');

const navLink = document.querySelectorAll('.nav_link');
function linkAction() {
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
  localStorage.setItem("activeLink", this.getAttribute("href"));
  document.getElementById('nav_menu').classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

// Restore active nav link on page load
window.addEventListener("load", () => {
  const activeLink = localStorage.getItem("activeLink");
  if (activeLink) {
    navLink.forEach(n => n.classList.remove("active"));
    const activeNav = document.querySelector(`.nav_link[href="${activeLink}"]`);
    if (activeNav) activeNav.classList.add("active");
  }

  // Home icons fade-in fix
  document.querySelectorAll('.home_social-icon').forEach(icon => {
    icon.style.opacity = "1";
    icon.style.transition = "none";
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form submit with EmailJS
const contactForm = document.querySelector('.contact_form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Better selectors using name attributes (update your HTML accordingly if needed)
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert("Please fill in all fields.");
      return;
    }

    emailjs.send("service_jjpmzfm", "template_7xlmfs8", {
  from_name: name,
  from_email: email, // This must match what you use in EmailJS as {{from_email}}
  message: message

    }).then((response) => {
      console.log('EmailJS success:', response.status, response.text);
      alert("Message Sent Successfully!");
      contactForm.reset();
    }).catch((error) => {
      console.error('EmailJS error:', error);
      alert("Failed to send message. Please try again.");
    });
  });
}

// Scroll section link highlight in nav

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const navMenuLink = document.querySelector(`.nav_link[href="#${sectionId}"]`);

    if (navMenuLink) {
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navMenuLink.classList.add('active');
      } else {
        navMenuLink.classList.remove('active');
      }
    }
  });
});

// Prevent lightbox closing when clicking on image or nav buttons
document.getElementById("lightboxImage").addEventListener("click", e => e.stopPropagation());

// Close lightbox when clicking outside image or on close button
document.getElementById("lightbox").addEventListener("click", closeLightbox);

// Add guards for these elements before adding event listeners
const closeBtn = document.querySelector(".close");
if (closeBtn) closeBtn.addEventListener("click", closeLightbox);

const prevBtn = document.querySelector(".prev");
if (prevBtn) prevBtn.addEventListener("click", () => changeSlide(-1));

const nextBtn = document.querySelector(".next");
if (nextBtn) nextBtn.addEventListener("click", () => changeSlide(1));
