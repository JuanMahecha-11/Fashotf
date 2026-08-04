// ===== FASHOTF - PRODUCTS DATA WITH REAL IMAGES =====

const PRODUCTS = [
  { id: 1, name: 'Doble Bacon Burger', price: 14.50, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80', cat: 'burger', rating: 4.8, rest: 'Burger Palace', badge: 'TOP SELLER' },
  { id: 2, name: 'Pizza Napolitana', price: 16.00, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', cat: 'pizza', rating: 4.9, rest: 'Pizza Roma', badge: 'Popular' },
  { id: 3, name: 'Bowl de Salmón', price: 18.90, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80', cat: 'saludable', rating: 4.7, rest: 'Fresh Bowl', badge: 'Saludable' },
  { id: 4, name: 'Sushi Maki Roll x12', price: 22.00, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80', cat: 'sushi', rating: 4.9, rest: 'Tokyo House', badge: 'Nuevo' },
  { id: 5, name: 'Pollo BBQ Crujiente', price: 12.50, image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80', cat: 'pollo', rating: 4.6, rest: 'Chicken Bros', badge: null },
  { id: 6, name: 'Cheesecake Oreo', price: 8.90, image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80', cat: 'postres', rating: 5.0, rest: 'Sweet Corner', badge: '5.0' },
  { id: 7, name: 'Frappé Caramelo', price: 6.50, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', cat: 'bebidas', rating: 4.5, rest: 'Café Urbano', badge: null },
  { id: 8, name: 'Smash Burger Especial', price: 15.90, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80', cat: 'burger', rating: 4.7, rest: 'Smash House', badge: 'Oferta' }
];

const RESTAURANTS = [
  { name: 'Burger Palace', image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80', rating: 4.8, time: '15-25 min', delivery: 'Gratis', tags: ['Burgers', 'American'] },
  { name: 'Pizza Roma', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80', rating: 4.9, time: '20-30 min', delivery: '$2.000', tags: ['Pizza', 'Italiana'] },
  { name: 'Tokyo House', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=600&q=80', rating: 4.9, time: '25-35 min', delivery: 'Gratis', tags: ['Sushi', 'Japonesa'] },
  { name: 'Fresh Bowl', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80', rating: 4.7, time: '15-20 min', delivery: '$1.500', tags: ['Saludable', 'Vegano'] },
  { name: 'Chicken Bros', image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80', rating: 4.6, time: '18-28 min', delivery: 'Gratis', tags: ['Pollo', 'Fast Food'] },
  { name: 'Sweet Corner', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80', rating: 5.0, time: '10-15 min', delivery: '$1.000', tags: ['Postres', 'Café'] }
];

function renderProducts(filter = 'todos') {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  const filtered = filter === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  grid.innerHTML = filtered.map(p => `
    <div class="product-card" onclick="addToCart({id:${p.id}, name:'${p.name}', price:${p.price}, image:'${p.image}'})">
      <div class="product-img">
        ${p.badge ? `<div class="product-badge"><i class="fa-solid fa-bolt"></i> ${p.badge}</div>` : ''}
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-body">
        <div class="product-name">${p.name}</div>
        <div class="product-rest"><i class="fa-solid fa-store"></i> ${p.rest}</div>
        <div class="product-footer">
          <div>
            <div class="product-price">$${p.price.toFixed(2)}</div>
            <div class="product-rating"><i class="fa-solid fa-star"></i> ${p.rating} · 20-30 min</div>
          </div>
          <button class="btn-add" onclick="event.stopPropagation(); addToCart({id:${p.id}, name:'${p.name}', price:${p.price}, image:'${p.image}'})"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderRestaurants() {
  const grid = document.getElementById('restGrid');
  if (!grid) return;
  grid.innerHTML = RESTAURANTS.map(r => `
    <div class="rest-card" onclick="window.location.href='pages/menu.html'">
      <div class="rest-img"><img src="${r.image}" alt="${r.name}" loading="lazy" /></div>
      <div class="rest-body">
        <div class="rest-name">${r.name}</div>
        <div class="rest-meta">
          <span><i class="fa-solid fa-star"></i> ${r.rating}</span>
          <span><i class="fa-solid fa-clock"></i> ${r.time}</span>
          <span><i class="fa-solid fa-truck"></i> ${r.delivery}</span>
        </div>
        <div class="rest-tags">${r.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderRestaurants();
});
