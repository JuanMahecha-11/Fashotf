// ===== FASHOTF - MAIN JS =====

let cart = JSON.parse(localStorage.getItem('fashotf_cart') || '[]');

function updateCartCount() {
  const count = cart.reduce((acc, i) => acc + i.qty, 0);
  document.querySelectorAll('#cartCount').forEach(el => el.textContent = count);
}

function addToCart(product) {
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem('fashotf_cart', JSON.stringify(cart));
  updateCartCount();
  showToast(`${product.name} agregado al carrito`, 'fa-cart-shopping');
}

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

function showToast(msg, icon = 'fa-circle-check') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid ${icon} toast-icon"></i> <span>${msg}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => { toast.classList.add('show'); });
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

function filterCat(el, cat) {
  document.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  if (typeof renderProducts === 'function') renderProducts(cat);
}

function toggleMobile() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  if (links.style.display === 'flex') {
    links.style.display = 'none';
  } else {
    links.style.cssText = 'display:flex; flex-direction:column; position:fixed; top:70px; left:0; right:0; background:rgba(10,10,15,0.98); padding:20px; gap:8px; z-index:999; border-bottom:1px solid rgba(255,255,255,0.08);';
  }
}

updateCartCount();
