// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scroll
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scroll
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scroll
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('hidden');
    } else {
        backToTopBtn.classList.add('hidden');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Handler
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;
    
    // Add loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('form-loading');
    submitBtn.textContent = 'Sending...';
    
    // Simulate form submission (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    formMessage.className = 'mt-4 p-4 bg-green-100 text-green-700 rounded-lg animate-fade-in-up';
    formMessage.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle mr-2"></i>
            <span>Thank you, ${name}! Your message has been sent successfully. We'll contact you within 24 hours.</span>
        </div>
    `;
    formMessage.classList.remove('hidden');
    
    // Remove loading state
    submitBtn.classList.remove('form-loading');
    submitBtn.textContent = originalText;
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.classList.add('hidden');
    }, 5000);
    
    // Log form data (for demonstration)
    console.log('Form submitted:', { name, email, phone, service, message });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target); // Stop observing after animation
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

document.querySelectorAll('.service-card, .project-card').forEach(card => {
    observer.observe(card);
});

// Active navigation link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Project gallery lightbox (optional enhancement)
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('click', function() {
        const img = this.querySelector('img');
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4';
        overlay.innerHTML = `
            <div class="relative max-w-4xl max-h-full">
                <img src="${img.src}" alt="${img.alt}" class="max-w-full max-h-full rounded-lg">
                <button class="absolute top-4 right-4 text-white text-3xl hover:text-gray-300">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay || e.target.closest('button')) {
                overlay.remove();
            }
        });
        
        document.body.appendChild(overlay);
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-bg');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form validation enhancement
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return phone === '' || re.test(phone);
}

// Add real-time validation
document.getElementById('email').addEventListener('blur', function() {
    if (!validateEmail(this.value)) {
        this.classList.add('border-red-500');
        this.classList.remove('border-gray-300');
    } else {
        this.classList.remove('border-red-500');
        this.classList.add('border-gray-300');
    }
});

document.getElementById('phone').addEventListener('blur', function() {
    if (!validatePhone(this.value)) {
        this.classList.add('border-red-500');
        this.classList.remove('border-gray-300');
    } else {
        this.classList.remove('border-red-500');
        this.classList.add('border-gray-300');
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('BuildRight Construction website loaded successfully!');
    
    // Add entrance animation to hero content
    const heroContent = document.querySelector('#home .container');
    if (heroContent) {
        heroContent.classList.add('animate-fade-in-up');
    }
});
// --- Supabase setup ---
const SUPABASE_URL = 'https://pnuhuhtcwljyjjkzekyi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudWh1aHRjd2xqeWpqa3pla3lpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MDUyMjUsImV4cCI6MjA3NzI4MTIyNX0.OmhqpOVj8X4Mo1G8SQ_X2aoJpH_-dMQSRbVbEPis7q0';

async function insertMessage(name, email, message) {
  const { data, error } = await fetch(`${SUPABASE_URL}/rest/v1/messages`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal"
    },
    body: JSON.stringify({ name, email, message })
  }).then(res => res.json()).catch(err => ({ error: err }));

  if (error) console.error("Insert error:", error);
  return data;
}

// --- Form handler ---
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  document.getElementById("status").textContent = "Sending...";

  await insertMessage(name, email, message);

  document.getElementById("status").textContent = "✅ Message Sent!";
  e.target.reset();
});
