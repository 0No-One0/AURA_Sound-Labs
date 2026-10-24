/* ==========================================================================
   AURA Sound Labs — Checkout Page Logic
   ========================================================================== */

   document.addEventListener('DOMContentLoaded', () => {
    if (AppState.data.cart.length === 0) {
      showToast('Your bag is empty. Redirecting to catalog...', 'error');
      setTimeout(() => window.location.href = 'catalog.html', 1500);
      return;
    }
    renderCheckoutSummary();
    bindDeliveryRadios();
    bindOrderForm();
    updateDeliveryPrices();
    document.addEventListener('currency-changed', () => {
      renderCheckoutSummary();
      updateDeliveryPrices();
    });
  });
  
  /* ---------- Delivery pricing ---------- */
  function updateDeliveryPrices() {
    const cur = AppState.data.currency;
    document.querySelectorAll('input[name="delivery-speed"]').forEach(radio => {
      const key = radio.value;
      const rate = DELIVERY_RATES[key];
      const el = document.getElementById(`delivery-price-${key}`);
      if (!el) return;
      const fee = cur === 'USD' ? rate.feeUSD : rate.feeINR;
      el.textContent = fee === 0 ? 'Free' : formatMoney(rate.feeINR);
    });
  }
  
  /* ---------- Delivery selection ---------- */
  function bindDeliveryRadios() {
    document.querySelectorAll('input[name="delivery-speed"]').forEach(radio => {
      radio.addEventListener('change', () => {
        AppState.data.selectedDeliverySpeed = radio.value;
        AppState.save();
        renderCheckoutSummary();
      });
    });
  }
  
  /* ---------- Order summary ---------- */
  function renderCheckoutSummary() {
    const itemsEl = document.getElementById('checkout-summary-items');
    if (!itemsEl) return;
  
    if (AppState.data.cart.length === 0) {
      itemsEl.innerHTML = '<p style="color:var(--text-muted)">Your bag is empty.</p>';
      return;
    }
  
    itemsEl.innerHTML = AppState.data.cart.map(item => `
      <div class="summary-item-row">
        <img src="${item.img}" alt="${escapeHTML(item.name)}" class="summary-item-img">
        <div class="summary-item-info">
          <div class="summary-item-title">${escapeHTML(item.name)}</div>
          <div class="summary-item-meta">${escapeHTML(item.finish)} × ${item.quantity}</div>
        </div>
        <div style="font-weight:700">${formatMoney(item.priceINR * item.quantity)}</div>
      </div>
    `).join('');
  
    const subtotal = cartSubtotalINR();
    const totalQty = cartCount();
    const discountINR = totalQty >= 2 ? Math.round(subtotal * 0.10) : 0;
    const afterDiscount = subtotal - discountINR;
  
    const deliveryKey = AppState.data.selectedDeliverySpeed || 'standard';
    const deliveryRate = DELIVERY_RATES[deliveryKey];
    const deliveryFee = deliveryRate.feeINR;
  
    const taxINR = Math.round(afterDiscount * 0.18);
    const grandTotal = afterDiscount + deliveryFee + taxINR;
  
    document.getElementById('checkout-subtotal').textContent = formatMoney(subtotal);
  
    const discountRow = document.getElementById('checkout-discount-row');
    if (discountINR > 0) {
      discountRow.style.display = 'flex';
      document.getElementById('checkout-discount').textContent = '-' + formatMoney(discountINR);
    } else {
      discountRow.style.display = 'none';
    }
  
    document.getElementById('checkout-delivery').textContent =
      deliveryFee === 0 ? 'FREE' : formatMoney(deliveryFee);
    document.getElementById('checkout-tax').textContent = formatMoney(taxINR);
    document.getElementById('checkout-total').textContent = formatMoney(grandTotal);
  }
  
  /* ---------- Validation ---------- */
  function validateField(id, validator, errorId) {
    const input = document.getElementById(id);
    const error = document.getElementById(errorId);
    if (!input || !error) return true;
    const result = validator(input.value.trim());
    if (result !== true) {
      error.textContent = result;
      input.classList.add('input-error');
      return false;
    }
    error.textContent = '';
    input.classList.remove('input-error');
    return true;
  }
  
  function validateOrderForm() {
    const checks = [
      validateField('ord-first-name', v => v.length >= 2 || 'Enter your first name.', 'err-first-name'),
      validateField('ord-last-name', v => v.length >= 2 || 'Enter your last name.', 'err-last-name'),
      validateField('ord-email', v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email.', 'err-email'),
      validateField('ord-phone', v => /^[\d\s\-()]{7,15}$/.test(v) || 'Enter a valid phone number.', 'err-phone'),
      validateField('ord-street', v => v.length >= 5 || 'Enter a valid street address.', 'err-street'),
      validateField('ord-pincode', v => /^\d{4,10}$/.test(v) || 'Enter a valid PIN / postal code.', 'err-pincode'),
      validateField('ord-city', v => v.length >= 2 || 'Enter your city.', 'err-city'),
      validateField('ord-state', v => v.length >= 2 || 'Enter your state / province.', 'err-state')
    ];
    return checks.every(Boolean);
  }
  
  /* ---------- Submit ---------- */
  function bindOrderForm() {
    const form = document.getElementById('order-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!validateOrderForm()) {
        showToast('Please correct the highlighted fields.', 'error');
        const firstError = form.querySelector('.input-error');
        if (firstError) firstError.focus();
        return;
      }
  
      // Build order object
      const order = {
        id: 'AURA-' + Date.now().toString().slice(-8),
        date: new Date().toISOString(),
        customer: {
          firstName: document.getElementById('ord-first-name').value.trim(),
          lastName: document.getElementById('ord-last-name').value.trim(),
          email: document.getElementById('ord-email').value.trim(),
          phone: document.getElementById('ord-country-code').value + ' ' + document.getElementById('ord-phone').value.trim(),
          street: document.getElementById('ord-street').value.trim(),
          landmark: document.getElementById('ord-landmark').value.trim(),
          city: document.getElementById('ord-city').value.trim(),
          state: document.getElementById('ord-state').value.trim(),
          pincode: document.getElementById('ord-pincode').value.trim()
        },
        items: AppState.data.cart.map(i => ({ ...i })),
        deliverySpeed: AppState.data.selectedDeliverySpeed,
        paymentMethod: document.querySelector('input[name="payment-method"]:checked').value,
        subtotalINR: cartSubtotalINR(),
        currency: AppState.data.currency
      };
  
      AppState.data.lastOrder = order;
      AppState.data.cart = [];
      AppState.save();
  
      window.location.href = 'success.html';
    });
  }