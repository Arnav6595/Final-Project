// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // Create the mobile menu styling dynamically
            if (!document.getElementById('mobile-menu-style')) {
                const style = document.createElement('style');
                style.id = 'mobile-menu-style';
                style.textContent = `
                    .main-nav.active {
                        display: block;
                        position: absolute;
                        top: 70px;
                        left: 0;
                        width: 100%;
                        background-color: #fff;
                        box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                        padding: 20px;
                    }
                    
                    .main-nav.active ul {
                        flex-direction: column;
                    }
                    
                    .main-nav.active ul li {
                        margin: 15px 0;
                    }
                `;
                document.head.appendChild(style);
            }
        });
    }
    
    // Header scroll behavior
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.backgroundColor = '#fff';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Image slider for hero (if needed)
    const heroImages = [
        '/api/placeholder/1600/900',
        '/api/placeholder/1600/900?text=Slide2',
        '/api/placeholder/1600/900?text=Slide3'
    ];
    
    const heroBanner = document.querySelector('.hero-banner');
    let currentImageIndex = 0;
    
    if (heroBanner) {
        setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroBanner.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
        }, 5000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize any interactive components
    initializeModelViewers();
    setupNewsletterForm();
});

// Function to initialize model viewers
function initializeModelViewers() {
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Setup newsletter form with basic validation
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (!email) {
                alert('Please enter your email address.');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission success
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}