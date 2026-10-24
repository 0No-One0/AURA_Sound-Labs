/* ==========================================================================
   AURA Sound Labs — Product Detail Page Logic
   ========================================================================== */

   const pdp = {
    product: null,
    finish: null,
    quantity: 1
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id') || 'pulse-360';
    const product = PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
    pdp.product = product;
    pdp.finish = product.finishes[0];
    pdp.quantity = 1;
  
    renderPDP();
    bindPDPEvents();
  
    document.addEventListener('currency-changed', renderPDP);
  });
  
  function renderPDP() {
    const p = pdp.product;
    const f = pdp.finish;
  
    document.title = `${p.name} — AURA Sound Labs`;
  
    document.getElementById('pdp-title').textContent = p.name;
    document.getElementById('pdp-tagline').textContent = p.tagline;
    document.getElementById('pdp-rating').textContent = p.rating;
    document.getElementById('pdp-review-count').textContent = `(${p.reviews} customer reviews)`;
    document.getElementById('pdp-description').textContent = p.description;
    document.getElementById('pdp-price').textContent = formatMoney(p.priceINR);
    document.getElementById('pdp-original-price').textContent = formatMoney(p.regularINR);
    document.getElementById('pdp-discount-tag').textContent = `Save ${formatMoney(p.regularINR - p.priceINR)}`;
    document.getElementById('pdp-main-image').src = f.img;
    document.getElementById('pdp-selected-color-name').textContent = f.name;
    document.getElementById('pdp-qty-val').value = pdp.quantity;
  
    const catLabel = CATEGORIES[p.category] || 'Speaker';
    document.getElementById('pdp-category-pill').textContent = catLabel;
  
    // Swatches
    const swatchContainer = document.getElementById('pdp-swatches-container');
    swatchContainer.innerHTML = p.finishes.map(fin => `
      <button type="button"
        class="swatch-btn ${fin.name === f.name ? 'active' : ''}"
        style="background:${fin.color}"
        data-finish="${escapeHTML(fin.name)}"
        title="${escapeHTML(fin.name)}"
        aria-label="${escapeHTML(fin.name)}"></button>
    `).join('');
  
    swatchContainer.querySelectorAll('.swatch-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-finish');
        pdp.finish = p.finishes.find(x => x.name === name);
        renderPDP();
      });
    });
  
    // Specs
    const specsList = document.getElementById('pdp-specs-list');
    specsList.innerHTML = Object.entries(p.specs).map(([k, v]) => `
      <dt>${escapeHTML(k)}</dt><dd>${escapeHTML(v)}</dd>
    `).join('');
  }
  
  function bindPDPEvents() {
    document.getElementById('pdp-qty-minus').addEventListener('click', () => {
      if (pdp.quantity > 1) { pdp.quantity--; document.getElementById('pdp-qty-val').value = pdp.quantity; }
    });
    document.getElementById('pdp-qty-plus').addEventListener('click', () => {
      if (pdp.quantity < 10) { pdp.quantity++; document.getElementById('pdp-qty-val').value = pdp.quantity; }
    });
    document.getElementById('pdp-add-to-bag').addEventListener('click', () => {
      addToCart(pdp.product.id, pdp.finish.name, pdp.quantity);
      showToast(`${pdp.product.name} added to bag`, 'success');
      openCartDrawer();
    });
  }