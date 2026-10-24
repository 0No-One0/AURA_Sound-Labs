/* ==========================================================================
   AURA Sound Labs — Global State, Storage & Formatting Helpers
   ========================================================================== */

   const STORAGE_KEY = 'aura_state_v1';

   const DEFAULT_STATE = {
     currency: 'INR',
     cart: [],
     selectedDeliverySpeed: 'standard',
     lastOrder: null
   };
   
   function loadState() {
     try {
       const saved = localStorage.getItem(STORAGE_KEY);
       if (saved) return Object.assign({}, DEFAULT_STATE, JSON.parse(saved));
     } catch (e) { /* ignore */ }
     return Object.assign({}, DEFAULT_STATE);
   }
   
   const AppState = {
     data: loadState(),
     save() {
       try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data)); } catch (e) {}
     }
   };
   
   /* ---------- Currency helpers ---------- */
   function formatMoney(amountINR) {
     if (AppState.data.currency === 'USD') {
       const usd = Math.round(amountINR / USD_BENCHMARK);
       return `$${usd.toLocaleString('en-US')}`;
     }
     return `₹${amountINR.toLocaleString('en-IN')}`;
   }
   
   function formatDeliveryFee(amountINR) {
     if (amountINR === 0) return AppState.data.currency === 'USD' ? '$0' : '₹0';
     return formatMoney(amountINR);
   }
   
   function escapeHTML(str) {
     return String(str)
       .replace(/&/g, '&amp;')
       .replace(/</g, '&lt;')
       .replace(/>/g, '&gt;')
       .replace(/"/g, '&quot;')
       .replace(/'/g, '&#039;');
   }
   
   /* ---------- Cart helpers ---------- */
   function cartCount() {
     return AppState.data.cart.reduce((n, i) => n + i.quantity, 0);
   }
   
   function cartSubtotalINR() {
     return AppState.data.cart.reduce((sum, i) => sum + i.priceINR * i.quantity, 0);
   }
   
   function findProduct(id) {
     return PRODUCTS.find(p => p.id === id);
   }
   
   function addToCart(productId, finishName, quantity = 1) {
     const product = findProduct(productId);
     if (!product) return;
     const finish = product.finishes.find(f => f.name === finishName) || product.finishes[0];
   
     const existing = AppState.data.cart.find(
       i => i.productId === productId && i.finish === finish.name
     );
   
     if (existing) {
       existing.quantity = Math.min(existing.quantity + quantity, 10);
     } else {
       AppState.data.cart.push({
         productId,
         name: product.name,
         finish: finish.name,
         img: finish.img,
         priceINR: product.priceINR,
         quantity
       });
     }
     AppState.save();
     updateCartBadge();
     renderCartDrawer();
   }
   
   function removeCartItem(index) {
     AppState.data.cart.splice(index, 1);
     AppState.save();
     updateCartBadge();
     renderCartDrawer();
     if (typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
   }
   
   function setCartQuantity(index, qty) {
     if (qty < 1 || qty > 10) return;
     AppState.data.cart[index].quantity = qty;
     AppState.save();
     updateCartBadge();
     renderCartDrawer();
     if (typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
   }
   
   /* ---------- Routing helpers ---------- */
   function goTo(pagePath, params = {}) {
     const qs = new URLSearchParams(params).toString();
     window.location.href = pagePath + (qs ? '?' + qs : '');
   }
   
   function currentPage() {
     return window.location.pathname.split('/').pop() || 'index.html';
   }
   
   // Expose to window
   window.AppState = AppState;
   window.formatMoney = formatMoney;
   window.formatDeliveryFee = formatDeliveryFee;
   window.escapeHTML = escapeHTML;
   window.cartCount = cartCount;
   window.cartSubtotalINR = cartSubtotalINR;
   window.findProduct = findProduct;
   window.addToCart = addToCart;
   window.removeCartItem = removeCartItem;
   window.setCartQuantity = setCartQuantity;
   window.goTo = goTo;
   window.currentPage = currentPage;