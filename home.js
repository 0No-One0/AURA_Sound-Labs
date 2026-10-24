/* ==========================================================================
   AURA Sound Labs — Home Page Logic
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', () => {
    renderFeaturedProducts();
  
    // Re-render when currency changes
    document.addEventListener('currency-changed', renderFeaturedProducts);
  });
  
  function renderFeaturedProducts() {
    const grid = document.getElementById('home-featured-grid');
    if (!grid) return;
  
    // Show top 3 featured (Pulse 360, Sphere, Stage Max)
    const featuredIds = ['pulse-360', 'aura-sphere', 'stage-max'];
    const featured = featuredIds.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean);
  
    grid.innerHTML = featured.map(p => `
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