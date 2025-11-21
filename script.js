/**
 * Portfolio Website JavaScript
 * Enhanced with new animations and interactions
 * 
 * This file handles:
 * - Mobile navigation menu toggle
 * - Smooth scrolling for anchor links
 * - Scroll-triggered animations
 * - Active section highlighting
 * - Skill bar animations
 * - Counter animations for statistics
 * - Parallax effects
 */

// ============================================
// Mobile Navigation Menu
// Handles hamburger menu toggle and mobile navigation
// ============================================

// Get DOM elements for mobile menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu when hamburger icon is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // Toggle hamburger animation
    navMenu.classList.toggle('active'); // Toggle menu visibility
    // Prevent body scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a navigation link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active'); // Reset hamburger icon
        navMenu.classList.remove('active'); // Hide menu
        document.body.style.overflow = ''; // Re-enable body scrolling
    });
});

// Close mobile menu when clicking outside the menu area
document.addEventListener('click', (e) => {
    // Check if click is outside both hamburger and menu
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Smooth Scrolling for Navigation Links
// Implements smooth scroll behavior when clicking nav links
// ============================================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor jump
        const targetId = link.getAttribute('href'); // Get target section ID
        const targetSection = document.querySelector(targetId); // Find target element
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight; // Get navbar height
            // Calculate position accounting for fixed navbar
            const targetPosition = targetSection.offsetTop - navHeight;
            
            // Smooth scroll to target position
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth' // Smooth scrolling animation
            });
        }
    });
});

// ============================================
// Navbar Background on Scroll
// Enhances navbar appearance when user scrolls down
// ============================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    // Add enhanced shadow and border when scrolled past 50px
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)'; // Stronger shadow
        navbar.style.borderBottomColor = 'rgba(107, 163, 216, 0.2)'; // Colored border
    } else {
        // Reset to default appearance at top of page
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        navbar.style.borderBottomColor = '#e0e0e0';
    }
});

// ============================================
// Enhanced Fade-in Animation on Scroll
// Uses Intersection Observer API for performance
// ============================================

// Configuration for Intersection Observer
const observerOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: '0px 0px -80px 0px' // Trigger 80px before element enters viewport
};

// Create Intersection Observer instance
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Staggered delay for project cards (creates cascading effect)
            if (entry.target.classList.contains('project-card')) {
                setTimeout(() => {
                    entry.target.classList.add('visible'); // Trigger fade-in
                }, index * 150); // 150ms delay between each card
            } 
            // Staggered delay for skills columns
            else if (entry.target.classList.contains('skills-column')) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100); // 100ms delay between each column
            } 
            // Immediate animation for other elements
            else {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

// Observe all elements with fade-in class when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element); // Start observing each element
    });
});

// ============================================
// Active Navigation Link Highlighting
// Highlights the current section in navigation while scrolling
// ============================================

const sections = document.querySelectorAll('section[id]'); // Get all sections with IDs

function highlightActiveSection() {
    const scrollY = window.pageYOffset; // Current scroll position
    const navHeight = navbar.offsetHeight; // Navbar height for offset calculation

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight; // Section height
        const sectionTop = section.offsetTop - navHeight - 150; // Section top position (with offset)
        const sectionId = section.getAttribute('id'); // Section ID

        // Check if current scroll position is within this section
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => {
                link.classList.remove('active');
                // Add active class to matching nav link
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Update active section on scroll
window.addEventListener('scroll', highlightActiveSection);

// ============================================
// Animate Skill Bars on Scroll
// Triggers progress bar fill animation when skills section is visible
// ============================================

const skillBars = document.querySelectorAll('.skill-progress'); // Get all progress bars

// Create observer specifically for skill bars
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width; // Save original width
            progressBar.style.width = '0'; // Reset to 0
            // Animate to original width after brief delay
            setTimeout(() => {
                progressBar.style.width = width; // CSS transition handles animation
            }, 100);
            skillObserver.unobserve(progressBar); // Stop observing after animation
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of element is visible
});

// Start observing all skill bars
skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// Parallax Effect for Hero Background
// Creates depth by moving background shapes at different speeds
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset; // Current scroll position
    const hero = document.querySelector('.hero');
    const shapes = document.querySelectorAll('.geometric-shape'); // Background shapes
    
    // Only apply parallax while in hero section
    if (hero && scrolled < window.innerHeight) {
        shapes.forEach((shape, index) => {
            // Each shape moves at different speed (creates parallax effect)
            const speed = (index + 1) * 0.1; // Speed increases for each shape
            shape.style.transform = `translateY(${scrolled * speed}px)`; // Move shape
        });
    }
});

// ============================================
// Counter Animation for Stats
// Animates numbers counting up from 0 to target value
// ============================================

/**
 * Animates a counter from 0 to target value
 * @param {HTMLElement} element - The element containing the number
 * @param {number} target - Target number to count to
 * @param {number} duration - Animation duration in milliseconds (default: 2000)
 */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // Calculate increment per frame (60fps = 16ms)
    const timer = setInterval(() => {
        start += increment;
        // Check if we've reached the target
        if (start >= target) {
            element.textContent = target + (target === 100 ? '%' : '+'); // Final value with suffix
            clearInterval(timer); // Stop animation
        } else {
            element.textContent = Math.floor(start) + (target === 100 ? '%' : '+'); // Update display
        }
    }, 16); // Update every 16ms (~60fps)
}

// Observer for stat items: triggers counter animation when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent; // Get current text (e.g., "50+")
            const number = parseInt(text.replace(/\D/g, '')); // Extract number (50)
            if (number) {
                statNumber.textContent = '0'; // Reset to 0
                animateCounter(statNumber, number, 2000); // Animate to target
                statObserver.unobserve(entry.target); // Stop observing after animation
            }
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% visible
});

// Start observing all stat items
document.querySelectorAll('.stat-item').forEach(stat => {
    statObserver.observe(stat);
});

// ============================================
// Prevent Default for Empty Demo Links
// Handles placeholder demo links that don't have URLs yet
// ============================================

document.querySelectorAll('.project-link[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        console.log('Demo link clicked - add your demo URL'); // Log for debugging
        // TODO: Replace with actual demo URL or remove this handler
    });
});

// ============================================
// Smooth Scroll for CTA Buttons
// Enables smooth scrolling for call-to-action buttons in hero section
// ============================================

document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        const href = button.getAttribute('href');
        // Only handle internal anchor links
        if (href && href.startsWith('#')) {
            e.preventDefault(); // Prevent default jump
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                // Smooth scroll to target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Add Hover Effect to Project Cards
// Removes transition delay on hover for instant response
// ============================================

document.querySelectorAll('.project-card').forEach((card, index) => {
    // Remove delay when hovering (instant response)
    card.addEventListener('mouseenter', () => {
        card.style.transitionDelay = '0s';
    });
    
    // Restore staggered delay when leaving (cascading effect)
    card.addEventListener('mouseleave', () => {
        card.style.transitionDelay = `${index * 0.05}s`; // Small delay based on card index
    });
});

// ============================================
// Scroll Indicator Hide on Scroll
// Hides the scroll indicator after user starts scrolling
// ============================================

const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        // Hide indicator after scrolling past 100px
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0'; // Fade out
            scrollIndicator.style.pointerEvents = 'none'; // Disable interaction
        } else {
            scrollIndicator.style.opacity = '1'; // Show
            scrollIndicator.style.pointerEvents = 'auto'; // Enable interaction
        }
    });
}

// ============================================
// Add Ripple Effect to Contact Cards
// Creates Material Design-style ripple effect on click
// ============================================

/**
 * Creates a ripple effect at the click position
 * @param {MouseEvent} event - The click event
 */
function createRipple(event) {
    const card = event.currentTarget;
    const ripple = document.createElement('span'); // Create ripple element
    const rect = card.getBoundingClientRect(); // Get card position and size
    const size = Math.max(rect.width, rect.height); // Ripple size = largest dimension
    // Calculate position relative to card (centered on click point)
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Set ripple size and position
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Remove any existing ripple
    const existingRipple = card.querySelector('.ripple');
    if (existingRipple) {
        existingRipple.remove();
    }
    
    card.appendChild(ripple); // Add ripple to card
    
    // Remove ripple after animation completes
    setTimeout(() => {
        ripple.remove();
    }, 600); // Match animation duration
}

// Add ripple effect to all contact cards
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', createRipple);
});

// Dynamically add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    .contact-card {
        position: relative;
        overflow: hidden; /* Clip ripple to card bounds */
    }
    .ripple {
        position: absolute;
        border-radius: 50%; /* Circular ripple */
        background: rgba(107, 163, 216, 0.3); /* Semi-transparent blue */
        transform: scale(0); /* Start at 0 size */
        animation: ripple-animation 0.6s ease-out; /* Expand animation */
        pointer-events: none; /* Don't interfere with clicks */
    }
    @keyframes ripple-animation {
        to {
            transform: scale(2); /* Expand to 2x size */
            opacity: 0; /* Fade out */
        }
    }
`;
document.head.appendChild(style); // Add styles to document

