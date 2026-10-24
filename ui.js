/* ==========================================================================
   AURA Sound Labs — Shared UI: Navigation, Cart Drawer, Toasts
   Runs on every page after DOM ready.
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', () => {
    initNav();
    initCurrency();
    initCartDrawer();
    updateCartBadge();
    renderCartDrawer();
  });
  
  /* ---------- Navigation ---------- */
  function initNav() {
    const page = currentPage();
    document.querySelectorAll('.nav-link[data-route], .mobile-nav a[data-route]').forEach(link => {
      const route = link.getAttribute('data-route');
      if (
        (route === 'home' && (page === 'index.html' || page === '')) ||
        (route === 'catalog' && page === 'catalog.html') ||
        (route === 'technology' && page === 'technology.html') ||
        (route === 'support' && page === 'support.html')
      ) {
        link.classList.add('active');
      }
    });
  
    const menuBtn = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener('click', () => mobileNav.classList.toggle('open'));
    }
  }
  
  /* ---------- Currency ---------- */
  function initCurrency() {
    const sel = document.getElementById('currency-toggle');
    if (!sel) return;
    sel.value = AppState.data.currency;
    sel.addEventListener('change', () => {
      AppState.data.currency = sel.value;
      AppState.save();
      document.dispatchEvent(new CustomEvent('currency-changed'));
      if (typeof renderCartDrawer === 'function') renderCartDrawer();
    });
  }
  
  /* ---------- Cart Drawer ---------- */
  function initCartDrawer() {
    const openBtn = document.getElementById('open-cart-btn');
    const closeBtn = document.getElementById('close-cart-btn');
    const overlay = document.getElementById('cart-overlay');
    const checkoutBtn = document.getElementById('drawer-checkout-btn');
  
    openBtn?.addEventListener('click', openCartDrawer);
    closeBtn?.addEventListener('click', closeCartDrawer);
    overlay?.addEventListener('click', closeCartDrawer);
  
    checkoutBtn?.addEventListener('click', () => {
      if (AppState.data.cart.length === 0) {
        showToast('Your bag is empty.', 'error');
        return;
      }
      window.location.href = 'checkout.html';
    });
  }
  
  function openCartDrawer() {
    document.getElementById('cart-overlay')?.classList.add('active');
    document.getElementById('cart-drawer')?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeCartDrawer() {
    document.getElementById('cart-overlay')?.classList.remove('active');
    document.getElementById('cart-drawer')?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function updateCartBadge() {
    const badge = document.getElementById('cart-counter');
    if (badge) badge.textContent = cartCount();
  }
  
  function renderCartDrawer() {
    const container = document.getElementById('cart-drawer-items');
    const subtotalEl = document.getElementById('drawer-subtotal-val');
    if (!container) return;
  
    if (AppState.data.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🛍</div>
          <p>Your shopping bag is empty.</p>
          <p style="font-size:0.85rem;margin-top:0.5rem;color:var(--text-dim)">Discover our acoustic lineup.</p>
        </div>`;
      if (subtotalEl) subtotalEl.textContent = formatMoney(0);
      return;
    }
  
    container.innerHTML = AppState.data.cart.map((item, idx) => `
      <div class="cart-item-row">
        <img src="${item.img}" alt="${escapeHTML(item.name)}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${escapeHTML(item.name)}</div>
          <div class="cart-item-sub">${escapeHTML(item.finish)}</div>
          <div class="cart-item-price">${formatMoney(item.priceINR * item.quantity)}</div>
        </div>
        <div class="cart-item-actions">
          <div class="cart-qty-ctrl">
            <button class="cart-qty-btn" onclick="changeQty(${idx}, -1)">−</button>
            <span class="cart-qty-val">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="changeQty(${idx}, 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="removeCartItem(${idx})" title="Remove">✕</button>
        </div>
      </div>
    `).join('');
  
    if (subtotalEl) subtotalEl.textContent = formatMoney(cartSubtotalINR());
  }
  
  function changeQty(index, delta) {
    const item = AppState.data.cart[index];
    if (!item) return;
    setCartQuantity(index, item.quantity + delta);
  }
  
  /* ---------- Toasts ---------- */
  function showToast(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
  
  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;
  window.updateCartBadge = updateCartBadge;
  window.renderCartDrawer = renderCartDrawer;
  window.changeQty = changeQty;
  window.showToast = showToast;