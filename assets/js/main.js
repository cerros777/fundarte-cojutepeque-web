// Main JavaScript for FundArte Cojutepeque Landing Page - Sophisticated Color Palette Edition

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initHeroSlider();
    initSmoothScrolling();
    initScrollAnimations();
    initContactForm();
    initScrollEffects();
    initParticleEffects();
    initInteractiveElements();
    initParallaxEffects();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle with bounce effect
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Add bounce effect to menu items
            if (navMenu.classList.contains('active')) {
                navLinks.forEach((link, index) => {
                    link.style.animationDelay = `${index * 0.1}s`;
                    link.classList.add('slide-in');
                });
            }
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect with color transition
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Hero Slider functionality
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    // Function to show slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prev = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prev);
    }

    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            resetInterval();
        });
    });

    // Auto-advance slides
    function startInterval() {
        if (slides.length > 1) { // Only auto-advance if there are multiple slides
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Pause auto-advance on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });

        heroSlider.addEventListener('mouseleave', () => {
            startInterval();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetInterval();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetInterval();
        }
    });

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (heroSlider) {
        heroSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        heroSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            resetInterval();
        }
    }

    // Initialize the slider
    if (slides.length > 0) {
        // Don't call showSlide(0) immediately to avoid interference
        // The first slide is already active in HTML and CSS
        
        // Start auto-advance after a delay
        setTimeout(() => {
            startInterval();
        }, 3000); // Wait 3 seconds before starting auto-advance
    }

    // Add slide transition effects
    slides.forEach((slide, index) => {
        slide.addEventListener('transitionend', () => {
            if (slide.classList.contains('active')) {
                // Add entrance animation for active slide content
                slide.style.animation = 'slideIn 0.8s ease-out';
            }
        });
    });
}

// Smooth scrolling for anchor links with easing
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                // Smooth scroll with easing
                smoothScrollTo(offsetTop, 1000);
            }
        });
    });
}

// Custom smooth scroll function with easing
function smoothScrollTo(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Enhanced scroll animations with staggered effects
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Add staggered animation for cards
                if (entry.target.classList.contains('program-card')) {
                    const cards = document.querySelectorAll('.program-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('fade-in-up');
                        }, index * 200);
                    });
                }
                
                // Add bounce effect for gallery items
                if (entry.target.classList.contains('gallery-item')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                    entry.target.classList.add('bounce-in');
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.program-card, .gallery-item, .about-content, .contact-content, .hero-badge, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced contact form with playful interactions
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add floating label effect
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
                addFloatingParticles(this);
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Enhanced validation with playful messages
            if (!name || !email || !subject || !message) {
                showNotification('✨ ¡Ups! Parece que te faltan algunos detalles mágicos...', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('🌈 ¡Ese email necesita un poco más de magia!', 'error');
                return;
            }
            
            // Success animation
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span>¡Enviando Amor! ✨</span><i class="fas fa-heart"></i>';
            submitBtn.style.background = 'linear-gradient(135deg, #6DA528, #5a9a35)';
            
            setTimeout(() => {
                showNotification('🎉 ¡Mensaje enviado con éxito! Te contactaremos pronto con mucha creatividad.', 'success');
                this.reset();
                submitBtn.innerHTML = '<span>¡Enviar Mensaje de Amor!</span><i class="fas fa-paper-plane"></i>';
                submitBtn.style.background = '';
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced notification system with new color palette
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Set colors based on new palette
    const colors = {
        success: '#6DA528', // Kelly green
        error: '#D27A07',   // Ochre
        info: '#3D6DA6',    // True blue
        warning: '#96A4B7'  // Cadet gray
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 25px;
        border-radius: 15px;
        color: white;
        font-weight: 600;
        z-index: 10000;
        transform: translateX(100%);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        max-width: 350px;
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        background: ${colors[type] || colors.info};
        font-family: 'Quicksand', sans-serif;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.1);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.2rem;">${getNotificationIcon(type)}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: '🎉',
        error: '✨',
        info: '💫',
        warning: '🌟'
    };
    return icons[type] || icons.info;
}

// Enhanced scroll effects with new colors
function initScrollEffects() {
    // Animated counters for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(stat, 0, target, 2000);
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(stat);
    });

    // Parallax effect for hero elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Enhanced counter animation with bounce effect
function animateCounter(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Bounce easing function
        const easeOutBounce = function(t) {
            if (t < 1/2.75) {
                return 7.5625*t*t;
            } else if (t < 2/2.75) {
                return 7.5625*(t-=1.5/2.75)*t + 0.75;
            } else if (t < 2.5/2.75) {
                return 7.5625*(t-=2.25/2.75)*t + 0.9375;
            } else {
                return 7.5625*(t-=2.625/2.75)*t + 0.984375;
            }
        };
        
        const easedProgress = easeOutBounce(progress);
        const current = Math.floor(start + (end - start) * easedProgress);
        
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = end;
            // Add celebration effect
            addCelebrationEffect(element);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Enhanced particle effects with new color palette
function initParticleEffects() {
    const colors = ['#D27A07', '#96A4B7', '#6DA528', '#D8D9DD', '#3D6DA6'];
    const hero = document.querySelector('.hero');
    
    if (hero) {
        // Create floating particles
        for (let i = 0; i < 15; i++) {
            createFloatingParticle(hero, colors);
        }
        
        // Mouse interaction particles
        let mouseX = 0, mouseY = 0;
        hero.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            if (Math.random() < 0.1) {
                createMouseParticle(hero, mouseX, mouseY, colors);
            }
        });
    }
}

function createFloatingParticle(container, colors) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 6 + 3;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 20 + 15;
    const delay = Math.random() * 5;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: 0.4;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: floatParticle ${duration}s ease-in-out infinite;
        animation-delay: ${delay}s;
        box-shadow: 0 0 10px ${color}40;
    `;

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, (duration + delay) * 1000);
}

function createMouseParticle(container, x, y, colors) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 4;

    particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        opacity: 0.8;
        left: ${x}px;
        top: ${y}px;
        pointer-events: none;
        animation: mouseParticle 1.5s ease-out forwards;
        box-shadow: 0 0 15px ${color}60;
    `;

    container.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 1500);
}

// Enhanced celebration effect with new colors
function addCelebrationEffect(element) {
    const colors = ['#D27A07', '#96A4B7', '#6DA528', '#D8D9DD', '#3D6DA6'];
    
    for (let i = 0; i < 8; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (i / 8) * 360;
        const velocity = 100 + Math.random() * 50;
        
        confetti.style.cssText = `
            position: absolute;
            width: 8px;
            height: 8px;
            background: ${color};
            border-radius: 2px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: confetti 2s ease-out forwards;
            animation-delay: ${i * 0.1}s;
        `;
        
        element.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, 2000 + i * 100);
    }
}

// Enhanced interactive elements with new color palette
function initInteractiveElements() {
    // Button ripple effects with new colors
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });

    // Program card interactions
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            addHoverParticles(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Gallery interactions
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            addClickEffect(this);
        });
    });

    // Form input focus effects
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.borderColor = '#3D6DA6';
            this.style.boxShadow = '0 0 0 3px rgba(61, 109, 166, 0.1)';
        });
        
        input.addEventListener('blur', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
}

function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

    button.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

function addHoverParticles(element) {
    const colors = ['#D27A07', '#96A4B7', '#6DA528', '#D8D9DD', '#3D6DA6'];
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: hoverParticle 1s ease-out forwards;
            pointer-events: none;
        `;
        
        element.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

function addClickEffect(element) {
    const colors = ['#D27A07', '#96A4B7', '#6DA528', '#D8D9DD', '#3D6DA6'];
    
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        sparkle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: ${color};
            border-radius: 50%;
            left: 50%;
            top: 50%;
            animation: sparkle 1s ease-out forwards;
            pointer-events: none;
        `;
        
        element.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Floating particles for form inputs
function addFloatingParticles(input) {
    const colors = ['#D27A07', '#96A4B7', '#6DA528', '#D8D9DD', '#3D6DA6'];
    const container = input.parentElement;
    
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: ${color};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: 0;
            animation: inputParticle 2s ease-out forwards;
            pointer-events: none;
        `;
        
        container.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 2000);
    }
}

// Gallery lightbox functionality
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Create lightbox overlay
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(27, 32, 39, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            document.body.appendChild(lightbox);
            
            setTimeout(() => {
                lightbox.style.opacity = '1';
            }, 10);
            
            lightbox.addEventListener('click', function() {
                this.style.opacity = '0';
                setTimeout(() => {
                    if (this.parentNode) {
                        this.parentNode.removeChild(this);
                    }
                }, 300);
            });
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScrollHandler = debounce(() => {
    // Handle scroll-based animations
}, 16);

window.addEventListener('scroll', debouncedScrollHandler);

// Add CSS animations with new color palette
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatParticle {
            0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
            25% { transform: translateY(-30px) translateX(15px); opacity: 0.6; }
            50% { transform: translateY(-60px) translateX(-10px); opacity: 0.2; }
            75% { transform: translateY(-30px) translateX(-20px); opacity: 0.4; }
        }
        
        @keyframes mouseParticle {
            0% { transform: scale(0); opacity: 0.8; }
            50% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes ripple {
            to { transform: scale(4); opacity: 0; }
        }
        
        @keyframes confetti {
            0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1; }
            100% { transform: translate(-50%, -50%) rotate(360deg) translateY(-200px); opacity: 0; }
        }
        
        @keyframes hoverParticle {
            0% { transform: scale(0); opacity: 0.8; }
            50% { transform: scale(1); opacity: 0.6; }
            100% { transform: scale(0); opacity: 0; }
        }
        
        @keyframes sparkle {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            50% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
            100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
        }
        
        @keyframes inputParticle {
            0% { transform: translateY(0); opacity: 0.8; }
            100% { transform: translateY(-50px); opacity: 0; }
        }
        
        .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .bounce-in {
            animation: bounceIn 0.8s ease-out forwards;
        }
        
        @keyframes bounceIn {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.05); opacity: 0.8; }
            70% { transform: scale(0.9); opacity: 0.9; }
            100% { transform: scale(1); opacity: 1; }
        }
        
        .slide-in {
            animation: slideIn 0.5s ease-out forwards;
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize CSS animations
addCSSAnimations();

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Service Worker registration for PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking
function trackEvent(eventName, eventData = {}) {
    // Implement your analytics tracking here
    console.log('Event tracked:', eventName, eventData);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn')) {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_type: e.target.classList.contains('btn-primary') ? 'primary' : 'secondary'
        });
    }
    
    if (e.target.closest('.program-card')) {
        trackEvent('program_card_interaction', {
            program_name: e.target.closest('.program-card').querySelector('h3')?.textContent
        });
    }
});

// Export functions for potential external use
window.FundArte = {
    trackEvent,
    showNotification,
    initNavigation,
    initParticleEffects
}; 