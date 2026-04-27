/* ============================================
   SRI MAHALAXMI CATERERS - Admin Panel JS
   ============================================ */

// Auth check
if (localStorage.getItem('smcAdminLoggedIn') !== 'true') {
  window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', () => {
  initAdmin();
});

function initAdmin() {
  const navLinks = document.querySelectorAll('.admin-nav__link[data-section]');
  const pageTitle = document.getElementById('page-title');
  const content = document.getElementById('admin-content');

  // Logout
  document.getElementById('logout-btn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('smcAdminLoggedIn');
    window.location.href = 'login.html';
  });

  // Modal handlers
  const modal = document.getElementById('admin-modal');
  document.getElementById('modal-close').addEventListener('click', () => closeModal());
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  // Nav click handlers
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      const section = link.dataset.section;
      loadSection(section);
    });
  });

  // Load default section
  loadSection('dashboard');

  function loadSection(section) {
    const titles = {
      'dashboard': 'Dashboard',
      'landing': 'Landing Page',
      'menu': 'Menu Items',
      'gallery': 'Gallery Management',
      'services': 'Services',
      'reviews': 'Customer Reviews',
      'inquiries': 'Customer Inquiries',
      'contact-settings': 'Contact Settings'
    };
    pageTitle.textContent = titles[section] || 'Dashboard';

    switch (section) {
      case 'dashboard': renderDashboard(); break;
      case 'landing': renderLandingEditor(); break;
      case 'menu': renderMenuManager(); break;
      case 'gallery': renderGalleryManager(); break;
      case 'services': renderServicesManager(); break;
      case 'reviews': renderReviewsManager(); break;
      case 'inquiries': renderInquiriesManager(); break;
      case 'contact-settings': renderContactSettings(); break;
    }
  }

  // ── Dashboard ──
  function renderDashboard() {
    const data = getData();
    const totalMenu = data.menuCategories.reduce((sum, c) => sum + c.items.length, 0);
    const totalReviews = data.reviews.length;
    const pendingReviews = data.reviews.filter(r => r.status === 'pending').length;
    const totalInquiries = data.inquiries.length;
    const totalGallery = data.gallery.length;

    content.innerHTML = `
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--blue">📩</div>
          <div class="stat-card__info">
            <h3>${totalInquiries}</h3>
            <p>Total Inquiries</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--orange">🖼️</div>
          <div class="stat-card__info">
            <h3>${totalGallery}</h3>
            <p>Gallery Images</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--green">⭐</div>
          <div class="stat-card__info">
            <h3>${totalReviews}</h3>
            <p>Total Reviews</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-card__icon stat-card__icon--yellow">🍽️</div>
          <div class="stat-card__info">
            <h3>${totalMenu}</h3>
            <p>Menu Items</p>
          </div>
        </div>
      </div>

      <!-- Recent Inquiries -->
      <div class="admin-table-wrap" style="margin-bottom:var(--space-2xl);">
        <div class="admin-table-header">
          <h3>Recent Inquiries</h3>
        </div>
        ${data.inquiries.length > 0 ? `
          <table class="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Event</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${data.inquiries.slice(-5).reverse().map(inq => `
                <tr>
                  <td>${inq.name}</td>
                  <td>${inq.phone}</td>
                  <td>${inq.event || 'N/A'}</td>
                  <td>${inq.date || 'N/A'}</td>
                  <td><span class="admin-table__badge admin-table__badge--${inq.status === 'new' ? 'pending' : 'active'}">${inq.status}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p style="padding:var(--space-xl);text-align:center;color:var(--color-dark-gray);">No inquiries yet.</p>'}
      </div>

      <!-- Pending Reviews -->
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          <h3>Pending Reviews (${pendingReviews})</h3>
        </div>
        ${pendingReviews > 0 ? `
          <table class="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Rating</th>
                <th>Event</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${data.reviews.filter(r => r.status === 'pending').map(review => `
                <tr>
                  <td>${review.name}</td>
                  <td>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</td>
                  <td>${review.event}</td>
                  <td class="admin-table__actions">
                    <button class="admin-table__btn admin-table__btn--edit" title="Approve" onclick="approveReview(${review.id})">✓</button>
                    <button class="admin-table__btn admin-table__btn--delete" title="Reject" onclick="rejectReview(${review.id})">✕</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p style="padding:var(--space-xl);text-align:center;color:var(--color-dark-gray);">No pending reviews.</p>'}
      </div>
    `;
  }

  // ── Landing Page Editor ──
  function renderLandingEditor() {
    const data = getData();
    content.innerHTML = `
      <!-- ====== HERO SECTION ====== -->
      <div class="admin-form">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
          <h3>🎬 Hero Section</h3>
          <span class="admin-table__badge admin-table__badge--active">Landing Page</span>
        </div>
        <div class="admin-form__grid">
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">Hero Heading <small style="color:var(--color-dark-gray);">(HTML supported — wrap text in &lt;span&gt; for accent color)</small></label>
            <textarea class="admin-form__textarea" id="edit-hero-heading" rows="2">${data.hero.heading}</textarea>
          </div>
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">Hero Subheading</label>
            <textarea class="admin-form__textarea" id="edit-hero-subheading">${data.hero.subheading}</textarea>
          </div>
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">Hero Label Text <small style="color:var(--color-dark-gray);">(small text above heading)</small></label>
            <input type="text" class="admin-form__input" id="edit-hero-label" value="${data.hero.label || '✨ Welcome to Sri Mahalaxmi Caterers'}">
          </div>
          <div class="admin-form__actions">
            <button class="btn btn--primary" onclick="saveLandingContent()">💾 Save Hero Content</button>
          </div>
        </div>
      </div>

      <!-- ====== HERO SLIDES / IMAGES ====== -->
      <div class="admin-form" style="margin-top:var(--space-xl);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
          <h3>🖼️ Hero Slideshow Images</h3>
          <span style="font-size:var(--fs-sm);color:var(--color-dark-gray);">${data.hero.slides.length} slides</span>
        </div>
        <p style="font-size:var(--fs-sm);color:var(--color-dark-gray);margin-bottom:var(--space-lg);">
          These images rotate automatically on the homepage hero banner. Use high-quality landscape images (min 1600px wide recommended).
        </p>
        <div id="hero-slides-list">
          ${data.hero.slides.map((slide, i) => `
            <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);padding:var(--space-md);background:var(--color-off-white);border-radius:var(--radius-md);">
              <span style="font-weight:var(--fw-semibold);color:var(--color-dark-gray);min-width:24px;">#${i + 1}</span>
              <img src="${slide.image}" alt="" style="width:140px;height:80px;object-fit:cover;border-radius:var(--radius-sm);border:2px solid var(--color-light-gray);" onerror="this.style.background='var(--color-light-gray)';this.alt='⚠️ Image not found'">
              <input type="text" class="admin-form__input hero-slide-url" value="${slide.image}" style="flex:1;" placeholder="Paste image URL here...">
              <input type="text" class="admin-form__input hero-slide-alt" value="${slide.alt || ''}" style="width:150px;" placeholder="Alt text (optional)">
              <button class="admin-table__btn admin-table__btn--delete" onclick="removeHeroSlide(${i})" title="Remove slide">✕</button>
            </div>
          `).join('')}
        </div>
        <div style="display:flex;gap:var(--space-md);margin-top:var(--space-lg);padding:var(--space-lg);border:2px dashed var(--color-gray);border-radius:var(--radius-md);background:var(--color-off-white);">
          <input type="text" class="admin-form__input" id="new-slide-url" placeholder="Paste new image URL here..." style="flex:1;">
          <input type="text" class="admin-form__input" id="new-slide-alt" placeholder="Alt text" style="width:150px;">
          <button class="btn btn--outline btn--sm" onclick="addHeroSlide()">➕ Add Slide</button>
        </div>
        <div class="admin-form__actions" style="margin-top:var(--space-lg);">
          <button class="btn btn--primary" onclick="saveHeroSlides()">💾 Save All Slides</button>
        </div>
      </div>

      <!-- ====== HIGHLIGHTS / COUNTERS ====== -->
      <div class="admin-form" style="margin-top:var(--space-xl);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
          <h3>📊 Highlights / Counters</h3>
          <button class="btn btn--outline btn--sm" onclick="addHighlightCounter()">➕ Add Counter</button>
        </div>
        <p style="font-size:var(--fs-sm);color:var(--color-dark-gray);margin-bottom:var(--space-lg);">
          These animated counters appear below the hero section. They auto-count on scroll.
        </p>
        <div id="highlights-list">
          ${data.highlights.map((h, i) => `
            <div style="display:flex;align-items:center;gap:var(--space-md);margin-bottom:var(--space-md);padding:var(--space-md);background:var(--color-off-white);border-radius:var(--radius-md);">
              <input type="text" class="admin-form__input highlight-icon" value="${h.icon}" style="width:60px;text-align:center;font-size:24px;" title="Emoji icon">
              <input type="text" class="admin-form__input highlight-number" value="${h.number}" style="width:100px;" placeholder="e.g. 5000+">
              <input type="text" class="admin-form__input highlight-text" value="${h.text}" style="flex:1;" placeholder="Label text">
              <button class="admin-table__btn admin-table__btn--delete" onclick="removeHighlight(${i})" title="Remove">✕</button>
            </div>
          `).join('')}
        </div>
        <div class="admin-form__actions">
          <button class="btn btn--primary" onclick="saveHighlights()">💾 Save Counters</button>
        </div>
      </div>

      <!-- ====== ABOUT SECTION ====== -->
      <div class="admin-form" style="margin-top:var(--space-xl);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
          <h3>ℹ️ About Section</h3>
        </div>
        <div class="admin-form__grid">
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">About Story / Description</label>
            <textarea class="admin-form__textarea" id="edit-about-story" rows="4">${data.about.story}</textarea>
          </div>
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">Mission Statement</label>
            <textarea class="admin-form__textarea" id="edit-about-mission" rows="3">${data.about.mission}</textarea>
          </div>
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">Vision Statement</label>
            <textarea class="admin-form__textarea" id="edit-about-vision" rows="3">${data.about.vision}</textarea>
          </div>
          <div class="admin-form__group">
            <label class="admin-form__label">About Image URL</label>
            <input type="text" class="admin-form__input" id="edit-about-image" value="${data.about.image}">
            <img src="${data.about.image}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:var(--radius-sm);margin-top:var(--space-sm);border:2px solid var(--color-light-gray);" onerror="this.style.display='none'">
          </div>
          <div class="admin-form__group">
            <label class="admin-form__label">Years of Experience</label>
            <input type="number" class="admin-form__input" id="edit-about-years" value="${data.about.yearsExperience}">
          </div>
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">Service Areas</label>
            <input type="text" class="admin-form__input" id="edit-about-areas" value="${data.about.serviceAreas}">
          </div>
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">Specialties <small style="color:var(--color-dark-gray);">(shown as feature list on About page)</small></label>
            <div id="specialties-list">
              ${data.about.specialties.map((s, i) => `
                <div style="display:flex;gap:var(--space-sm);margin-bottom:var(--space-sm);">
                  <input type="text" class="admin-form__input specialty-input" value="${s}" style="flex:1;">
                  <button class="admin-table__btn admin-table__btn--delete" onclick="removeSpecialty(${i})" title="Remove">✕</button>
                </div>
              `).join('')}
            </div>
            <div style="display:flex;gap:var(--space-sm);margin-top:var(--space-sm);">
              <input type="text" class="admin-form__input" id="new-specialty" placeholder="Add new specialty..." style="flex:1;">
              <button class="btn btn--outline btn--sm" onclick="addSpecialty()">Add</button>
            </div>
          </div>
          <div class="admin-form__actions">
            <button class="btn btn--primary" onclick="saveAboutContent()">💾 Save About Section</button>
          </div>
        </div>
      </div>

      <!-- ====== SITE IMAGES LIBRARY ====== -->
      <div class="admin-form" style="margin-top:var(--space-xl);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
          <h3>📁 Site Images Library</h3>
          <button class="btn btn--outline btn--sm" onclick="openAddSiteImage()">➕ Add Image</button>
        </div>
        <p style="font-size:var(--fs-sm);color:var(--color-dark-gray);margin-bottom:var(--space-lg);">
          Store image URLs here for future use across the site. Click any URL to copy it to clipboard.
        </p>
        <div id="site-images-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:var(--space-md);">
          ${(data.siteImages || []).map((img, i) => `
            <div style="position:relative;border-radius:var(--radius-md);overflow:hidden;box-shadow:var(--shadow-sm);background:white;">
              <img src="${img.url}" alt="${img.label || ''}" style="width:100%;height:120px;object-fit:cover;" onerror="this.style.background='var(--color-light-gray)';this.style.height='120px'">
              <div style="padding:var(--space-sm);">
                <small style="color:var(--color-dark-gray);display:block;margin-bottom:4px;">${img.label || 'Untitled'}</small>
                <button class="btn btn--outline btn--sm" style="width:100%;font-size:11px;padding:4px 8px;" onclick="copySiteImageUrl(${i})">📋 Copy URL</button>
              </div>
              <button class="admin-table__btn admin-table__btn--delete" style="position:absolute;top:6px;right:6px;" onclick="removeSiteImage(${i})">✕</button>
            </div>
          `).join('')}
          ${(data.siteImages || []).length === 0 ? '<p style="grid-column:1/-1;text-align:center;color:var(--color-dark-gray);padding:var(--space-xl);">No images saved yet. Add images to build your library for future use.</p>' : ''}
        </div>
      </div>

      <!-- ====== SITE NAME & BRANDING ====== -->
      <div class="admin-form" style="margin-top:var(--space-xl);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
          <h3>🏷️ Site Name & Branding</h3>
        </div>
        <div class="admin-form__grid">
          <div class="admin-form__group">
            <label class="admin-form__label">Business Name</label>
            <input type="text" class="admin-form__input" id="edit-site-name" value="${data.siteInfo.name}">
          </div>
          <div class="admin-form__group">
            <label class="admin-form__label">Tagline</label>
            <input type="text" class="admin-form__input" id="edit-site-tagline" value="${data.siteInfo.tagline}">
          </div>
          <div class="admin-form__actions">
            <button class="btn btn--primary" onclick="saveSiteBranding()">💾 Save Branding</button>
          </div>
        </div>
      </div>

      <!-- ====== DANGER ZONE ====== -->
      <div class="admin-form" style="margin-top:var(--space-xl);border:2px solid #e74c3c;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
          <h3 style="color:#e74c3c;">⚠️ Danger Zone</h3>
        </div>
        <p style="font-size:var(--fs-sm);color:var(--color-dark-gray);margin-bottom:var(--space-lg);">
          Reset all site content to the original defaults. This will erase all your changes, inquiries, and reviews. <strong>This cannot be undone.</strong>
        </p>
        <button class="btn btn--sm" style="background:#e74c3c;color:white;" onclick="resetAllData()">🗑️ Reset All Data to Defaults</button>
      </div>
    `;
  }

  // ── Menu Manager ──
  function renderMenuManager() {
    const data = getData();
    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
        <div>
          <select class="admin-form__select" id="menu-category-select" style="padding:10px 16px;border:2px solid var(--color-light-gray);border-radius:var(--radius-md);">
            ${data.menuCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
          </select>
        </div>
        <button class="btn btn--primary btn--sm" onclick="openAddMenuItem()">+ Add Item</button>
      </div>
      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Special</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody id="menu-items-tbody"></tbody>
        </table>
      </div>
    `;

    const select = document.getElementById('menu-category-select');
    function updateMenuTable() {
      const catId = select.value;
      const cat = data.menuCategories.find(c => c.id === catId);
      const tbody = document.getElementById('menu-items-tbody');
      tbody.innerHTML = cat.items.map(item => `
        <tr>
          <td><img src="${item.image}" alt="" class="admin-table__img"></td>
          <td><strong>${item.name}</strong><br><small style="color:var(--color-dark-gray);">${item.description.substring(0, 50)}...</small></td>
          <td>${item.price}</td>
          <td><span class="admin-table__badge admin-table__badge--${item.tag === 'veg' ? 'active' : 'pending'}">${item.tag === 'veg' ? '🟢 Veg' : '🔴 Non-Veg'}</span></td>
          <td>${item.special ? '⭐' : '-'}</td>
          <td class="admin-table__actions">
            <button class="admin-table__btn admin-table__btn--edit" onclick="editMenuItem('${catId}', ${item.id})">✏️</button>
            <button class="admin-table__btn admin-table__btn--delete" onclick="deleteMenuItem('${catId}', ${item.id})">🗑️</button>
          </td>
        </tr>
      `).join('');
    }

    select.addEventListener('change', updateMenuTable);
    updateMenuTable();
  }

  // ── Gallery Manager ──
  function renderGalleryManager() {
    const data = getData();
    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
        <p style="margin:0;">${data.gallery.length} images</p>
        <button class="btn btn--primary btn--sm" onclick="openAddGalleryItem()">+ Add Image</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:var(--space-md);">
        ${data.gallery.map(item => `
          <div style="position:relative;border-radius:var(--radius-md);overflow:hidden;box-shadow:var(--shadow-sm);">
            <img src="${item.image}" alt="${item.caption}" style="width:100%;height:150px;object-fit:cover;">
            <div style="padding:var(--space-sm);background:white;">
              <small style="color:var(--color-dark-gray);">${item.caption}</small>
              <span class="admin-table__badge admin-table__badge--active" style="float:right;">${item.category}</span>
            </div>
            <button class="admin-table__btn admin-table__btn--delete" style="position:absolute;top:8px;right:8px;" onclick="deleteGalleryItem(${item.id})">✕</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ── Services Manager ──
  function renderServicesManager() {
    const data = getData();
    content.innerHTML = `
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          <h3>All Services</h3>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${data.services.map(s => `
              <tr>
                <td style="font-size:28px;">${s.icon}</td>
                <td><strong>${s.title}</strong><br><small style="color:var(--color-dark-gray);">${s.description.substring(0, 60)}...</small></td>
                <td>${s.features.length} features</td>
                <td class="admin-table__actions">
                  <button class="admin-table__btn admin-table__btn--edit" onclick="editService(${s.id})">✏️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // ── Reviews Manager ──
  function renderReviewsManager() {
    const data = getData();
    content.innerHTML = `
      <div class="admin-table-wrap">
        <div class="admin-table-header">
          <h3>All Reviews (${data.reviews.length})</h3>
        </div>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Event</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${data.reviews.map(r => `
              <tr>
                <td>${r.name}</td>
                <td style="color:var(--color-warm);letter-spacing:2px;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</td>
                <td>${r.event}</td>
                <td>${new Date(r.date).toLocaleDateString('en-IN')}</td>
                <td><span class="admin-table__badge admin-table__badge--${r.status === 'approved' ? 'active' : r.status === 'pending' ? 'pending' : 'rejected'}">${r.status}</span></td>
                <td class="admin-table__actions">
                  ${r.status !== 'approved' ? `<button class="admin-table__btn admin-table__btn--edit" title="Approve" onclick="approveReview(${r.id})">✓</button>` : ''}
                  ${r.status !== 'rejected' ? `<button class="admin-table__btn admin-table__btn--delete" title="Reject" onclick="rejectReview(${r.id})">✕</button>` : ''}
                  <button class="admin-table__btn admin-table__btn--delete" title="Delete" onclick="deleteReview(${r.id})">🗑️</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  // ── Inquiries Manager ──
  function renderInquiriesManager() {
    const data = getData();
    content.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-xl);">
        <p style="margin:0;">${data.inquiries.length} total inquiries</p>
        ${data.inquiries.length > 0 ? '<button class="btn btn--outline btn--sm" onclick="exportInquiries()">📥 Export CSV</button>' : ''}
      </div>
      <div class="admin-table-wrap">
        ${data.inquiries.length > 0 ? `
          <table class="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Event</th>
                <th>Guests</th>
                <th>Date</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${data.inquiries.slice().reverse().map(inq => `
                <tr>
                  <td>${inq.name}</td>
                  <td>${inq.phone}</td>
                  <td>${inq.email || '-'}</td>
                  <td>${inq.event || '-'}</td>
                  <td>${inq.guests || '-'}</td>
                  <td>${inq.date || '-'}</td>
                  <td title="${inq.message}">${inq.message.substring(0, 30)}...</td>
                  <td class="admin-table__actions">
                    <button class="admin-table__btn admin-table__btn--edit" title="View" onclick="viewInquiry(${inq.id})">👁️</button>
                    <button class="admin-table__btn admin-table__btn--delete" title="Delete" onclick="deleteInquiry(${inq.id})">🗑️</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : '<p style="padding:var(--space-xl);text-align:center;color:var(--color-dark-gray);">No inquiries received yet.</p>'}
      </div>
    `;
  }

  // ── Contact Settings ──
  function renderContactSettings() {
    const data = getData();
    content.innerHTML = `
      <div class="admin-form">
        <h3 style="margin-bottom:var(--space-xl);">Contact Information</h3>
        <div class="admin-form__grid">
          <div class="admin-form__group">
            <label class="admin-form__label">Phone Number</label>
            <input type="text" class="admin-form__input" id="edit-phone" value="${data.siteInfo.phone}">
          </div>
          <div class="admin-form__group">
            <label class="admin-form__label">Alt Phone Number</label>
            <input type="text" class="admin-form__input" id="edit-alt-phone" value="${data.siteInfo.altPhone}">
          </div>
          <div class="admin-form__group">
            <label class="admin-form__label">Email</label>
            <input type="email" class="admin-form__input" id="edit-email" value="${data.siteInfo.email}">
          </div>
          <div class="admin-form__group">
            <label class="admin-form__label">WhatsApp Number (with country code, no +)</label>
            <input type="text" class="admin-form__input" id="edit-whatsapp" value="${data.siteInfo.whatsapp}">
          </div>
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">Address</label>
            <textarea class="admin-form__textarea" id="edit-address">${data.siteInfo.address}</textarea>
          </div>
          <div class="admin-form__group admin-form__group--full">
            <label class="admin-form__label">Google Map Embed URL</label>
            <input type="text" class="admin-form__input" id="edit-map" value="${data.siteInfo.mapEmbed}">
          </div>
          <div class="admin-form__actions">
            <button class="btn btn--primary" onclick="saveContactSettings()">Save Settings</button>
          </div>
        </div>
      </div>

      <div class="admin-form" style="margin-top:var(--space-xl);">
        <h3 style="margin-bottom:var(--space-xl);">Social Media Links</h3>
        <div class="admin-form__grid">
          <div class="admin-form__group">
            <label class="admin-form__label">Facebook URL</label>
            <input type="text" class="admin-form__input" id="edit-facebook" value="${data.siteInfo.socialLinks.facebook}">
          </div>
          <div class="admin-form__group">
            <label class="admin-form__label">Instagram URL</label>
            <input type="text" class="admin-form__input" id="edit-instagram" value="${data.siteInfo.socialLinks.instagram}">
          </div>
          <div class="admin-form__group">
            <label class="admin-form__label">YouTube URL</label>
            <input type="text" class="admin-form__input" id="edit-youtube" value="${data.siteInfo.socialLinks.youtube}">
          </div>
          <div class="admin-form__group">
            <label class="admin-form__label">Twitter URL</label>
            <input type="text" class="admin-form__input" id="edit-twitter" value="${data.siteInfo.socialLinks.twitter}">
          </div>
          <div class="admin-form__actions">
            <button class="btn btn--primary" onclick="saveSocialLinks()">Save Social Links</button>
          </div>
        </div>
      </div>
    `;
  }

  // Make render functions globally accessible
  window.renderDashboard = renderDashboard;
  window.renderMenuManager = renderMenuManager;
  window.renderGalleryManager = renderGalleryManager;
  window.renderReviewsManager = renderReviewsManager;
  window.renderInquiriesManager = renderInquiriesManager;
}

// ── Global Action Functions ──

function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
}

function openModal(title, bodyHTML) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = bodyHTML;
  document.getElementById('admin-modal').classList.add('active');
}

function closeModal() {
  document.getElementById('admin-modal').classList.remove('active');
}

// ── Landing Page Actions ──
function saveLandingContent() {
  const data = getData();
  data.hero.heading = document.getElementById('edit-hero-heading').value;
  data.hero.subheading = document.getElementById('edit-hero-subheading').value;
  data.hero.label = document.getElementById('edit-hero-label').value;
  saveData(data);
  showToast('Hero content saved!');
}

function saveHeroSlides() {
  const data = getData();
  const urls = document.querySelectorAll('.hero-slide-url');
  const alts = document.querySelectorAll('.hero-slide-alt');
  data.hero.slides = Array.from(urls).map((input, i) => ({
    image: input.value,
    alt: alts[i] ? alts[i].value : 'Hero slide'
  }));
  saveData(data);
  showToast('Hero slides saved!');
}

function addHeroSlide() {
  const url = document.getElementById('new-slide-url').value;
  const alt = document.getElementById('new-slide-alt') ? document.getElementById('new-slide-alt').value : '';
  if (!url) { showToast('Please enter an image URL', 'error'); return; }
  const data = getData();
  data.hero.slides.push({ image: url, alt: alt || 'Hero slide' });
  saveData(data);
  showToast('Slide added!');
  document.querySelector('.admin-nav__link[data-section="landing"]').click();
}

function removeHeroSlide(index) {
  if (!confirm('Remove this slide?')) return;
  const data = getData();
  data.hero.slides.splice(index, 1);
  saveData(data);
  showToast('Slide removed');
  document.querySelector('.admin-nav__link[data-section="landing"]').click();
}

// ── Highlights / Counters ──
function saveHighlights() {
  const data = getData();
  const icons = document.querySelectorAll('.highlight-icon');
  const numbers = document.querySelectorAll('.highlight-number');
  const texts = document.querySelectorAll('.highlight-text');
  data.highlights = Array.from(icons).map((icon, i) => ({
    icon: icon.value,
    number: numbers[i].value,
    text: texts[i].value
  }));
  saveData(data);
  showToast('Counters saved!');
}

function addHighlightCounter() {
  const data = getData();
  data.highlights.push({ icon: '⭐', number: '0+', text: 'New Counter' });
  saveData(data);
  document.querySelector('.admin-nav__link[data-section="landing"]').click();
  showToast('Counter added — edit it below');
}

function removeHighlight(index) {
  if (!confirm('Remove this counter?')) return;
  const data = getData();
  data.highlights.splice(index, 1);
  saveData(data);
  showToast('Counter removed');
  document.querySelector('.admin-nav__link[data-section="landing"]').click();
}

// ── About Section ──
function saveAboutContent() {
  const data = getData();
  data.about.story = document.getElementById('edit-about-story').value;
  data.about.mission = document.getElementById('edit-about-mission').value;
  data.about.vision = document.getElementById('edit-about-vision').value;
  data.about.image = document.getElementById('edit-about-image').value;
  data.about.yearsExperience = parseInt(document.getElementById('edit-about-years').value);
  data.about.serviceAreas = document.getElementById('edit-about-areas').value;
  // Save specialties
  const specInputs = document.querySelectorAll('.specialty-input');
  data.about.specialties = Array.from(specInputs).map(inp => inp.value).filter(v => v.trim());
  saveData(data);
  showToast('About section saved!');
}

function addSpecialty() {
  const input = document.getElementById('new-specialty');
  if (!input.value.trim()) return;
  const data = getData();
  data.about.specialties.push(input.value.trim());
  saveData(data);
  document.querySelector('.admin-nav__link[data-section="landing"]').click();
  showToast('Specialty added!');
}

function removeSpecialty(index) {
  const data = getData();
  data.about.specialties.splice(index, 1);
  saveData(data);
  document.querySelector('.admin-nav__link[data-section="landing"]').click();
}

// ── Site Images Library ──
function openAddSiteImage() {
  openModal('Add Image to Library', `
    <div class="admin-form__grid">
      <div class="admin-form__group admin-form__group--full">
        <label class="admin-form__label">Image URL</label>
        <input type="text" class="admin-form__input" id="new-site-image-url" placeholder="Paste image URL here..." required>
      </div>
      <div class="admin-form__group admin-form__group--full">
        <label class="admin-form__label">Label / Description</label>
        <input type="text" class="admin-form__input" id="new-site-image-label" placeholder="e.g. Wedding Setup Photo">
      </div>
      <div class="admin-form__group admin-form__group--full" id="site-image-preview-wrap" style="display:none;">
        <label class="admin-form__label">Preview</label>
        <img id="site-image-preview" src="" alt="" style="width:100%;max-height:200px;object-fit:cover;border-radius:var(--radius-md);border:2px solid var(--color-light-gray);">
      </div>
      <div class="admin-form__actions">
        <button class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn--primary" onclick="saveSiteImage()">💾 Save Image</button>
      </div>
    </div>
  `);
  document.getElementById('new-site-image-url').addEventListener('input', (e) => {
    const wrap = document.getElementById('site-image-preview-wrap');
    const img = document.getElementById('site-image-preview');
    if (e.target.value) { img.src = e.target.value; wrap.style.display = 'block'; }
    else { wrap.style.display = 'none'; }
  });
}

function saveSiteImage() {
  const url = document.getElementById('new-site-image-url').value;
  if (!url) { showToast('Please enter a URL', 'error'); return; }
  const data = getData();
  if (!data.siteImages) data.siteImages = [];
  data.siteImages.push({
    url: url,
    label: document.getElementById('new-site-image-label').value || 'Untitled',
    addedAt: new Date().toISOString()
  });
  saveData(data);
  closeModal();
  showToast('Image saved to library!');
  document.querySelector('.admin-nav__link[data-section="landing"]').click();
}

function removeSiteImage(index) {
  if (!confirm('Remove this image from library?')) return;
  const data = getData();
  data.siteImages.splice(index, 1);
  saveData(data);
  showToast('Image removed');
  document.querySelector('.admin-nav__link[data-section="landing"]').click();
}

function copySiteImageUrl(index) {
  const data = getData();
  const url = data.siteImages[index].url;
  navigator.clipboard.writeText(url).then(() => {
    showToast('URL copied to clipboard!');
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = url;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('URL copied to clipboard!');
  });
}

// ── Site Branding ──
function saveSiteBranding() {
  const data = getData();
  data.siteInfo.name = document.getElementById('edit-site-name').value;
  data.siteInfo.tagline = document.getElementById('edit-site-tagline').value;
  saveData(data);
  showToast('Branding saved!');
}

// ── Reset All Data ──
function resetAllData() {
  if (!confirm('⚠️ This will erase ALL your changes and restore original defaults.\n\nAre you sure?')) return;
  if (!confirm('This is your LAST chance. All inquiries, reviews, and custom content will be lost. Continue?')) return;
  resetData();
  showToast('All data reset to defaults!');
  document.querySelector('.admin-nav__link[data-section="dashboard"]').click();
}

// ── Menu Actions ──
function openAddMenuItem() {
  const data = getData();
  const catId = document.getElementById('menu-category-select').value;
  openModal('Add Menu Item', `
    <div class="admin-form__grid">
      <div class="admin-form__group">
        <label class="admin-form__label">Item Name</label>
        <input type="text" class="admin-form__input" id="new-item-name" required>
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">Price</label>
        <input type="text" class="admin-form__input" id="new-item-price" placeholder="₹200">
      </div>
      <div class="admin-form__group admin-form__group--full">
        <label class="admin-form__label">Description</label>
        <textarea class="admin-form__textarea" id="new-item-desc"></textarea>
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">Image URL</label>
        <input type="text" class="admin-form__input" id="new-item-image">
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">Type</label>
        <select class="admin-form__select" id="new-item-tag">
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">
          <input type="checkbox" id="new-item-special"> Chef's Special
        </label>
      </div>
      <div class="admin-form__actions">
        <button class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn--primary" onclick="saveNewMenuItem('${catId}')">Add Item</button>
      </div>
    </div>
  `);
}

function saveNewMenuItem(catId) {
  const data = getData();
  const cat = data.menuCategories.find(c => c.id === catId);
  cat.items.push({
    id: Date.now(),
    name: document.getElementById('new-item-name').value,
    description: document.getElementById('new-item-desc').value,
    price: document.getElementById('new-item-price').value,
    image: document.getElementById('new-item-image').value || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80',
    tag: document.getElementById('new-item-tag').value,
    special: document.getElementById('new-item-special').checked
  });
  saveData(data);
  closeModal();
  showToast('Menu item added!');
  window.renderMenuManager();
}

function editMenuItem(catId, itemId) {
  const data = getData();
  const cat = data.menuCategories.find(c => c.id === catId);
  const item = cat.items.find(i => i.id === itemId);

  openModal('Edit Menu Item', `
    <div class="admin-form__grid">
      <div class="admin-form__group">
        <label class="admin-form__label">Item Name</label>
        <input type="text" class="admin-form__input" id="edit-item-name" value="${item.name}">
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">Price</label>
        <input type="text" class="admin-form__input" id="edit-item-price" value="${item.price}">
      </div>
      <div class="admin-form__group admin-form__group--full">
        <label class="admin-form__label">Description</label>
        <textarea class="admin-form__textarea" id="edit-item-desc">${item.description}</textarea>
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">Image URL</label>
        <input type="text" class="admin-form__input" id="edit-item-image" value="${item.image}">
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">Type</label>
        <select class="admin-form__select" id="edit-item-tag">
          <option value="veg" ${item.tag === 'veg' ? 'selected' : ''}>Veg</option>
          <option value="non-veg" ${item.tag === 'non-veg' ? 'selected' : ''}>Non-Veg</option>
        </select>
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">
          <input type="checkbox" id="edit-item-special" ${item.special ? 'checked' : ''}> Chef's Special
        </label>
      </div>
      <div class="admin-form__actions">
        <button class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn--primary" onclick="saveEditMenuItem('${catId}', ${itemId})">Save</button>
      </div>
    </div>
  `);
}

function saveEditMenuItem(catId, itemId) {
  const data = getData();
  const cat = data.menuCategories.find(c => c.id === catId);
  const item = cat.items.find(i => i.id === itemId);

  item.name = document.getElementById('edit-item-name').value;
  item.description = document.getElementById('edit-item-desc').value;
  item.price = document.getElementById('edit-item-price').value;
  item.image = document.getElementById('edit-item-image').value;
  item.tag = document.getElementById('edit-item-tag').value;
  item.special = document.getElementById('edit-item-special').checked;

  saveData(data);
  closeModal();
  showToast('Menu item updated!');
  window.renderMenuManager();
}

function deleteMenuItem(catId, itemId) {
  if (!confirm('Delete this menu item?')) return;
  const data = getData();
  const cat = data.menuCategories.find(c => c.id === catId);
  cat.items = cat.items.filter(i => i.id !== itemId);
  saveData(data);
  showToast('Menu item deleted');
  window.renderMenuManager();
}

// ── Gallery Actions ──
function openAddGalleryItem() {
  openModal('Add Gallery Image', `
    <div class="admin-form__grid">
      <div class="admin-form__group admin-form__group--full">
        <label class="admin-form__label">Image URL</label>
        <input type="text" class="admin-form__input" id="new-gallery-image" required>
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">Caption</label>
        <input type="text" class="admin-form__input" id="new-gallery-caption">
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">Category</label>
        <select class="admin-form__select" id="new-gallery-category">
          <option value="food">Food</option>
          <option value="weddings">Weddings</option>
          <option value="events">Events</option>
          <option value="decor">Decorations</option>
        </select>
      </div>
      <div class="admin-form__actions">
        <button class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn--primary" onclick="saveNewGalleryItem()">Add Image</button>
      </div>
    </div>
  `);
}

function saveNewGalleryItem() {
  const data = getData();
  data.gallery.push({
    id: Date.now(),
    image: document.getElementById('new-gallery-image').value,
    caption: document.getElementById('new-gallery-caption').value || 'Gallery Image',
    category: document.getElementById('new-gallery-category').value
  });
  saveData(data);
  closeModal();
  showToast('Gallery image added!');
  window.renderGalleryManager();
}

function deleteGalleryItem(id) {
  if (!confirm('Delete this gallery image?')) return;
  const data = getData();
  data.gallery = data.gallery.filter(g => g.id !== id);
  saveData(data);
  showToast('Gallery image deleted');
  window.renderGalleryManager();
}

// ── Review Actions ──
function approveReview(id) {
  const data = getData();
  const review = data.reviews.find(r => r.id === id);
  if (review) {
    review.status = 'approved';
    saveData(data);
    showToast('Review approved!');
    if (typeof window.renderReviewsManager === 'function') window.renderReviewsManager();
    else if (typeof window.renderDashboard === 'function') window.renderDashboard();
  }
}

function rejectReview(id) {
  const data = getData();
  const review = data.reviews.find(r => r.id === id);
  if (review) {
    review.status = 'rejected';
    saveData(data);
    showToast('Review rejected');
    if (typeof window.renderReviewsManager === 'function') window.renderReviewsManager();
    else if (typeof window.renderDashboard === 'function') window.renderDashboard();
  }
}

function deleteReview(id) {
  if (!confirm('Permanently delete this review?')) return;
  const data = getData();
  data.reviews = data.reviews.filter(r => r.id !== id);
  saveData(data);
  showToast('Review deleted');
  window.renderReviewsManager();
}

// ── Inquiry Actions ──
function viewInquiry(id) {
  const data = getData();
  const inq = data.inquiries.find(i => i.id === id);
  if (!inq) return;

  openModal('Inquiry Details', `
    <div style="display:flex;flex-direction:column;gap:var(--space-md);">
      <div><strong>Name:</strong> ${inq.name}</div>
      <div><strong>Phone:</strong> ${inq.phone}</div>
      <div><strong>Email:</strong> ${inq.email || 'N/A'}</div>
      <div><strong>Event:</strong> ${inq.event || 'N/A'}</div>
      <div><strong>Guests:</strong> ${inq.guests || 'N/A'}</div>
      <div><strong>Date:</strong> ${inq.date || 'N/A'}</div>
      <div><strong>Submitted:</strong> ${new Date(inq.submittedAt).toLocaleString('en-IN')}</div>
      <div><strong>Message:</strong></div>
      <div style="padding:var(--space-md);background:var(--color-off-white);border-radius:var(--radius-md);">${inq.message}</div>
    </div>
  `);
}

function deleteInquiry(id) {
  if (!confirm('Delete this inquiry?')) return;
  const data = getData();
  data.inquiries = data.inquiries.filter(i => i.id !== id);
  saveData(data);
  showToast('Inquiry deleted');
  window.renderInquiriesManager();
}

function exportInquiries() {
  const data = getData();
  if (data.inquiries.length === 0) return;

  const headers = ['Name', 'Phone', 'Email', 'Event', 'Guests', 'Date', 'Message', 'Submitted'];
  const rows = data.inquiries.map(inq => [
    inq.name, inq.phone, inq.email, inq.event, inq.guests, inq.date, `"${inq.message}"`, inq.submittedAt
  ]);

  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `inquiries_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Inquiries exported!');
}

// ── Contact Settings ──
function saveContactSettings() {
  const data = getData();
  data.siteInfo.phone = document.getElementById('edit-phone').value;
  data.siteInfo.altPhone = document.getElementById('edit-alt-phone').value;
  data.siteInfo.email = document.getElementById('edit-email').value;
  data.siteInfo.whatsapp = document.getElementById('edit-whatsapp').value;
  data.siteInfo.address = document.getElementById('edit-address').value;
  data.siteInfo.mapEmbed = document.getElementById('edit-map').value;
  saveData(data);
  showToast('Contact settings saved!');
}

function saveSocialLinks() {
  const data = getData();
  data.siteInfo.socialLinks.facebook = document.getElementById('edit-facebook').value;
  data.siteInfo.socialLinks.instagram = document.getElementById('edit-instagram').value;
  data.siteInfo.socialLinks.youtube = document.getElementById('edit-youtube').value;
  data.siteInfo.socialLinks.twitter = document.getElementById('edit-twitter').value;
  saveData(data);
  showToast('Social links saved!');
}

// ── Service Editor ──
function editService(id) {
  const data = getData();
  const service = data.services.find(s => s.id === id);
  if (!service) return;

  openModal('Edit Service', `
    <div class="admin-form__grid">
      <div class="admin-form__group">
        <label class="admin-form__label">Title</label>
        <input type="text" class="admin-form__input" id="edit-service-title" value="${service.title}">
      </div>
      <div class="admin-form__group">
        <label class="admin-form__label">Icon (emoji)</label>
        <input type="text" class="admin-form__input" id="edit-service-icon" value="${service.icon}">
      </div>
      <div class="admin-form__group admin-form__group--full">
        <label class="admin-form__label">Description</label>
        <textarea class="admin-form__textarea" id="edit-service-desc">${service.description}</textarea>
      </div>
      <div class="admin-form__group admin-form__group--full">
        <label class="admin-form__label">Image URL</label>
        <input type="text" class="admin-form__input" id="edit-service-image" value="${service.image}">
      </div>
      <div class="admin-form__actions">
        <button class="btn btn--outline" onclick="closeModal()">Cancel</button>
        <button class="btn btn--primary" onclick="saveEditService(${id})">Save</button>
      </div>
    </div>
  `);
}

function saveEditService(id) {
  const data = getData();
  const service = data.services.find(s => s.id === id);
  service.title = document.getElementById('edit-service-title').value;
  service.icon = document.getElementById('edit-service-icon').value;
  service.description = document.getElementById('edit-service-desc').value;
  service.image = document.getElementById('edit-service-image').value;
  saveData(data);
  closeModal();
  showToast('Service updated!');
  document.querySelector('.admin-nav__link[data-section="services"]').click();
}
