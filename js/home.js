/* ============================================
   Home Page - Dynamic Content Loading
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  const data = getData();
  loadHeroSection(data);
  loadHighlights(data);
  loadAboutPreview(data);
  loadShowcaseGallery(data);
  loadServicesPreview(data);
  loadTestimonials(data);
});

function loadHeroSection(data) {
  const slider = document.getElementById('hero-slider');
  const title = document.getElementById('hero-title');
  const desc = document.getElementById('hero-description');
  const label = document.querySelector('.hero__label');

  if (!slider) return;

  slider.innerHTML = data.hero.slides.map((slide, i) => `
    <div class="hero__slide ${i === 0 ? 'active' : ''}">
      <img src="${slide.image}" alt="${slide.alt}" loading="${i === 0 ? 'eager' : 'lazy'}">
    </div>
  `).join('');

  title.innerHTML = data.hero.heading;
  desc.textContent = data.hero.subheading;
  if (label && data.hero.label) label.textContent = data.hero.label;
}

function loadHighlights(data) {
  const grid = document.getElementById('highlights-section');
  if (!grid) return;

  grid.innerHTML = data.highlights.map(h => `
    <div class="highlight-card">
      <div class="highlight-card__icon">${h.icon}</div>
      <div class="highlight-card__number" data-counter="${h.number}">0</div>
      <div class="highlight-card__text">${h.text}</div>
    </div>
  `).join('');

  // Re-init counters after dynamic content
  animateCounters();
}

function loadAboutPreview(data) {
  const container = document.getElementById('about-preview');
  if (!container) return;

  container.innerHTML = `
    <div class="about-preview__image-wrap">
      <img src="${data.about.image}" alt="About Sri Mahalaxmi Caterers" class="about-preview__image">
      <div class="about-preview__experience">
        <div class="about-preview__experience-number">${data.about.yearsExperience}+</div>
        <div class="about-preview__experience-text">Years of<br>Excellence</div>
      </div>
    </div>
    <div class="about-preview__content">
      <span class="section-header__label" style="text-align:left;">About Us</span>
      <h2>We Make Every Event <span class="text-accent">Special</span></h2>
      <p>${data.about.story}</p>
      <div class="about-preview__features">
        ${data.about.specialties.slice(0, 4).map(s => `
          <div class="about-preview__feature">
            <span class="about-preview__feature-icon">✅</span>
            <span>${s}</span>
          </div>
        `).join('')}
      </div>
      <a href="about.html" class="btn btn--outline" style="align-self:flex-start;">Learn More</a>
    </div>
  `;
}

function loadShowcaseGallery(data) {
  const grid = document.getElementById('showcase-gallery-grid');
  if (!grid) return;

  const images = data.showcaseImages || [];

  grid.innerHTML = images.map((item, i) => `
    <div class="showcase-item animate-on-scroll" style="animation-delay: ${i * 0.1}s">
      <img src="${item.image}" alt="${item.caption}" class="showcase-item__image" loading="lazy">
      <div class="showcase-item__overlay">
        <span class="showcase-item__caption">${item.caption}</span>
      </div>
    </div>
  `).join('');

  // Re-init scroll animations
  initScrollAnimations();
}

function loadServicesPreview(data) {
  const grid = document.getElementById('services-preview-grid');
  if (!grid) return;

  grid.innerHTML = data.services.slice(0, 3).map(service => `
    <div class="card animate-on-scroll">
      <img src="${service.image}" alt="${service.title}" class="card__image" loading="lazy">
      <div class="card__body">
        <span class="card__badge card__badge--accent">${service.icon} ${service.title}</span>
        <p class="card__text">${service.description.substring(0, 100)}...</p>
        <a href="services.html" class="btn btn--outline btn--sm" style="margin-top:var(--space-md);">Learn More</a>
      </div>
    </div>
  `).join('');

  initScrollAnimations();
}

function loadTestimonials(data) {
  const grid = document.getElementById('testimonials-grid');
  if (!grid) return;

  const approved = data.reviews.filter(r => r.status === 'approved');

  grid.innerHTML = approved.slice(0, 3).map(review => `
    <div class="testimonial-card animate-on-scroll">
      <div class="testimonial-card__stars">${getStarRating(review.rating)}</div>
      <p class="testimonial-card__text">${review.text}</p>
      <div class="testimonial-card__author">
        <div style="width:50px;height:50px;border-radius:50%;background:var(--gradient-accent);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:18px;">
          ${review.name.charAt(0)}
        </div>
        <div>
          <div class="testimonial-card__name">${review.name}</div>
          <div class="testimonial-card__event">${review.event}</div>
        </div>
      </div>
    </div>
  `).join('');

  initScrollAnimations();
}
