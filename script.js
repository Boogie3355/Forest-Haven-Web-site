// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('active');
        }
    });
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = {
            name: this.querySelector('input[type="text"]').value,
            email: this.querySelector('input[type="email"]').value,
            message: this.querySelector('textarea').value
        };

        try {
            const response = await fetch('http://localhost:5000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Something went wrong');
            }
        } catch (error) {
            alert('Sorry, there was an error sending your message. Please try again.');
            console.error('Error:', error);
        }
    });
}

// Add animation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Improved scroll animation
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add parallax effect to background images
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    document.querySelectorAll('.about, .gallery, .contact').forEach(section => {
        const speed = 0.5;
        const offset = section.offsetTop;
        const yPos = -(scrolled - offset) * speed;
        
        if (window.innerWidth > 768) { // Only on desktop
            section.style.backgroundPosition = `center ${yPos}px`;
        }
    });
}); 