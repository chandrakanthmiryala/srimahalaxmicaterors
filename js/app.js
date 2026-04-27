/* ============================================
   SRI MAHALAXMI CATERERS - App Core JS
   ============================================ */

// ── Get current page name ──
function getCurrentPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop().replace('.html', '') || 'index';
    return page;
}

// ── Load Header ──
function loadHeader() {
    const data = getData();
    const currentPage = getCurrentPage();

    const navLinks = [
        { href: 'index.html', label: 'Home', id: 'index' },
        { href: 'about.html', label: 'About', id: 'about' },
        { href: 'services.html', label: 'Services', id: 'services' },
        { href: 'menu.html', label: 'Menu', id: 'menu' },
        { href: 'gallery.html', label: 'Gallery', id: 'gallery' },
        { href: 'reviews.html', label: 'Reviews', id: 'reviews' },
        { href: 'contact.html', label: 'Contact', id: 'contact' }
    ];

    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    headerEl.innerHTML = `
    <div class="container">
      <a href="index.html" class="logo">
        <div class="logo__icon">
          <img src="images/goddess_lakshmi.png" alt="Goddess Lakshmi" style="width:100%;height:100%;object-fit:cover;border-radius:var(--radius-md);">
        </div>
        <div class="logo__text">
          <span class="logo__name">${data.siteInfo.name}</span>
          <span class="logo__tagline">Premium Catering</span>
        </div>
      </a>
      <nav class="nav" id="desktop-nav">
        ${navLinks.map(link => `
          <a href="${link.href}" class="nav__link ${currentPage === link.id ? 'active' : ''}">${link.label}</a>
        `).join('')}
        <a href="contact.html" class="btn btn--primary btn--sm nav__cta">Book Now</a>
      </nav>
      <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
        <span class="menu-toggle__bar"></span>
        <span class="menu-toggle__bar"></span>
        <span class="menu-toggle__bar"></span>
      </button>
    </div>
    <nav class="mobile-nav" id="mobile-nav">
      ${navLinks.map(link => `
        <a href="${link.href}" class="mobile-nav__link ${currentPage === link.id ? 'active' : ''}">${link.label}</a>
      `).join('')}
      <a href="contact.html" class="btn btn--primary mt-2">Book Now</a>
    </nav>
  `;

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            headerEl.classList.add('scrolled');
        } else {
            headerEl.classList.remove('scrolled');
        }
    });

    // Trigger once on load
    if (window.scrollY > 50) {
        headerEl.classList.add('scrolled');
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ── Load Footer ──
function loadFooter() {
    const data = getData();
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    footerEl.innerHTML = `
    <div class="container">
      <div class="footer__grid">
        <div>
          <div class="footer__brand">
            <div class="footer__brand-name"><img src="images/goddess_lakshmi.png" alt="Goddess Lakshmi" style="width:28px;height:28px;object-fit:cover;border-radius:50%;vertical-align:middle;margin-right:8px;"> ${data.siteInfo.name}</div>
            <p class="footer__brand-desc">
              Creating unforgettable culinary experiences for weddings, corporate events, and celebrations since 2005. Your event, our passion.
            </p>
          </div>
          <div class="footer__social">
            <a href="${data.siteInfo.socialLinks.facebook}" class="footer__social-link" aria-label="Facebook">📘</a>
            <a href="${data.siteInfo.socialLinks.instagram}" class="footer__social-link" aria-label="Instagram">📸</a>
            <a href="${data.siteInfo.socialLinks.youtube}" class="footer__social-link" aria-label="YouTube">▶️</a>
            <a href="${data.siteInfo.socialLinks.twitter}" class="footer__social-link" aria-label="Twitter">🐦</a>
          </div>
        </div>
        <div>
          <h4 class="footer__heading">Quick Links</h4>
          <div class="footer__links">
            <a href="index.html" class="footer__link">Home</a>
            <a href="about.html" class="footer__link">About Us</a>
            <a href="services.html" class="footer__link">Services</a>
            <a href="menu.html" class="footer__link">Menu</a>
            <a href="gallery.html" class="footer__link">Gallery</a>
            <a href="reviews.html" class="footer__link">Reviews</a>
          </div>
        </div>
        <div>
          <h4 class="footer__heading">Services</h4>
          <div class="footer__links">
            <a href="services.html" class="footer__link">Wedding Catering</a>
            <a href="services.html" class="footer__link">Birthday Parties</a>
            <a href="services.html" class="footer__link">Corporate Events</a>
            <a href="services.html" class="footer__link">Outdoor Catering</a>
            <a href="services.html" class="footer__link">Custom Packages</a>
          </div>
        </div>
        <div>
          <h4 class="footer__heading">Contact Info</h4>
          <div class="footer__contact-item">
            <span class="footer__contact-icon">📍</span>
            <span>${data.siteInfo.address}</span>
          </div>
          <div class="footer__contact-item">
            <span class="footer__contact-icon">📞</span>
            <span>${data.siteInfo.phone}<br>${data.siteInfo.altPhone}</span>
          </div>
          <div class="footer__contact-item">
            <span class="footer__contact-icon">✉️</span>
            <span>${data.siteInfo.email}</span>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <span>&copy; ${new Date().getFullYear()} ${data.siteInfo.name}. All rights reserved.</span>
        <span>Crafted with ❤️ for great food</span>
      </div>
    </div>
  `;
}

// ── WhatsApp Button ──
function loadWhatsAppButton() {
    const data = getData();
    const existing = document.querySelector('.whatsapp-float');
    if (existing) return;

    const btn = document.createElement('a');
    btn.href = `https://wa.me/${data.siteInfo.whatsapp}?text=Hi! I'm interested in your catering services.`;
    btn.target = '_blank';
    btn.className = 'whatsapp-float';
    btn.setAttribute('aria-label', 'Chat on WhatsApp');
    btn.innerHTML = '💬';
    document.body.appendChild(btn);
}

// ── Back to Top ──
function loadBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Scroll Animations ──
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
}

// ── Animated Counter ──
function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = el.getAttribute('data-counter');
                const numericTarget = parseInt(target.replace(/\D/g, ''));
                const suffix = target.replace(/[0-9]/g, '');
                let current = 0;
                const increment = Math.ceil(numericTarget / 60);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericTarget) {
                        current = numericTarget;
                        clearInterval(timer);
                    }
                    el.textContent = current + suffix;
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

// ── Hero Slider ──
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero__slide');
    if (slides.length < 2) return;

    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
}

// ── Lightbox ──
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const closeBtn = lightbox.querySelector('.lightbox__close');

    document.querySelectorAll('[data-lightbox]').forEach(item => {
        item.addEventListener('click', () => {
            const src = item.getAttribute('data-lightbox');
            lightboxImg.src = src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ── Toast Notification ──
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ── Generate Star Rating HTML ──
function getStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += i <= rating ? '★' : '☆';
    }
    return stars;
}

// ── Preloader ──
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 600);
    }
}

// ── Initialize App ──
document.addEventListener('DOMContentLoaded', () => {
    // Initialize data on first visit
    getData();

    // Load common components
    loadHeader();
    loadFooter();
    loadWhatsAppButton();
    loadBackToTop();

    // Initialize animations
    initScrollAnimations();
    animateCounters();

    // Initialize hero slider if present
    initHeroSlider();

    // Initialize lightbox if present
    initLightbox();

    // Hide preloader
    hidePreloader();
});
