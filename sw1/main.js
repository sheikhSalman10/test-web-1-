// Toggle Menu for Small Screens
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('show');
}

// Close the Menu when clicking outside
document.addEventListener('click', function(event) {
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = document.querySelector('.menu-icon');

    if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
        navMenu.classList.remove('show');
    }
});

// Initialize the Announcement Carousel
let currentAnnouncement = 0;
const announcements = document.querySelectorAll('.announcement'); // Only one declaration of `announcements`
const announcementInterval = 10000; // 10 seconds

function showAnnouncement(index) {
    announcements.forEach((announcement, i) => {
        announcement.classList.toggle('active', i === index);
    });
}

function nextAnnouncement() {
    currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
    showAnnouncement(currentAnnouncement);
}

// Start automatic rotation of announcements
setInterval(nextAnnouncement, announcementInterval);

// Initial display when page loads
document.addEventListener('DOMContentLoaded', () => showAnnouncement(currentAnnouncement));


// Start automatic rotation of announcements
setInterval(nextAnnouncement, announcementInterval);

function startCarousel() {
    showAnnouncement(currentAnnouncement);
    setInterval(() => {
        currentAnnouncement = (currentAnnouncement + 1) % announcements.length;
        showAnnouncement(currentAnnouncement);
    }, 5000); // Image switch interval
}

document.addEventListener('DOMContentLoaded', startCarousel);

// Event listeners for announcement navigation buttons
document.querySelector('.carousel-nav.left')?.addEventListener('click', prevAnnouncement);
document.querySelector('.carousel-nav.right')?.addEventListener('click', nextAnnouncement);

// Smooth Scroll for "Why Choose Us" cards
document.querySelectorAll('.why-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const targetSection = document.getElementById(`about-detail-${index + 1}`);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Open Google Maps with Pre-set Location
function openMap() {
    const latitude = 31.5497;
    const longitude = 74.3436;
    window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
}

// Add animations on scroll for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.cards-section, .why-choose-us, .contact-section');
    
    function revealOnScroll() {
        const windowHeight = window.innerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < windowHeight - 100) {
                section.classList.add('reveal');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});
