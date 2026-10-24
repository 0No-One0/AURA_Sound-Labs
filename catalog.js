/* ==========================================================================
   AURA Sound Labs — Catalog Page Logic
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderCatalog('all');
    document.addEventListener('currency-changed', () => {
      const active = document.querySelector('.filter-btn.active');
      renderCatalog(active ? active.getAttribute('data-filter') : 'all');
    });
  });
  
  function renderFilters() {
    const container = document.getElementById('catalog-filters');
    if (!container) return;
    container.innerHTML = Object.entries(CATEGORIES).map(([key, label], idx) => `
      <button type="button" class="filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${key}">${label}</button>
    `).join('');
  
    container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderCatalog(btn.getAttribute('data-filter'));
      });
    });
  }
  
  function renderCatalog(filter = 'all') {
    const container = document.getElementById('catalog-products-container');
    if (!container) return;
  
    const filtered = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);
  
    if (filtered.length === 0) {
      container.innerHTML = `<div class="catalog-empty">No speakers found in this category.</div>`;
      return;
    }
  
    container.innerHTML = filtered.map(p => `
      <article class="product-card" onclick="window.location.href='product.html?id=${p.id}'">
        <div class="product-card-thumb">
          <img src="${p.finishes[0].img}" alt="${escapeHTML(p.name)}">
          <span class="product-card-badge">${escapeHTML(p.badge)}</span>
        </div>
        <div class="product-card-body">
          <h3 class="card-title">${escapeHTML(p.name)}</h3>
          <p class="card-tagline">${escapeHTML(p.tagline)}</p>
          <div class="card-rating">★★★★★ <span>${p.rating} (${p.reviews})</span></div>
          <div class="card-price-row">
            <div class="card-price">${formatMoney(p.priceINR)}</div>
            <button type="button" class="btn btn-secondary" onclick="event.stopPropagation();window.location.href='product.html?id=${p.id}'">Configure</button>
          </div>
        </div>
      </article>
    `).join('');
  }