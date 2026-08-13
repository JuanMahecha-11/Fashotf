// ============================================================
// 1. CARRITO DE COMPRAS
// ============================================================

// Recupera el carrito guardado en el navegador.
// Si no existe ningún carrito, se crea uno vacío.
let cart = JSON.parse(
  localStorage.getItem('fashotf_cart') || '[]'
);


// ============================================================
// 2. FORMATO DE PRECIOS
// ============================================================

// Convierte un número en formato de pesos colombianos.
// Ejemplo: 15000 → $15.000
function formatCOP(value) {

  // Convierte el valor recibido en número.
  const n = Number(value || 0);

  // Devuelve el número con formato de moneda colombiana.
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(n);
}


// ============================================================
// 3. CONTADOR DEL CARRITO
// ============================================================

// Actualiza el número que aparece en el icono del carrito.
function updateCartCount() {

  // Suma la cantidad de productos existentes en el carrito.
  const count = cart.reduce(
    (acc, i) => acc + i.qty,
    0
  );

  // Busca todos los elementos que tengan el ID cartCount.
  // Esto permite actualizar el contador aunque aparezca
  // en diferentes partes de la página.
  document
    .querySelectorAll('#cartCount')
    .forEach(el => {
      el.textContent = count;
    });
}


// ============================================================
// 4. AGREGAR PRODUCTOS AL CARRITO
// ============================================================

// Agrega un producto al carrito.
function addToCart(product) {

  // Comprueba si el producto ya existe en el carrito.
  const existing = cart.find(
    i => i.id === product.id
  );

  // Si el producto ya existe, aumenta su cantidad.
  if (existing) {

    existing.qty++;

  } else {

    // Si no existe, agrega el producto con cantidad 1.
    cart.push({
      ...product,
      qty: 1
    });
  }

  // Guarda el carrito actualizado en el navegador.
  localStorage.setItem(
    'fashotf_cart',
    JSON.stringify(cart)
  );

  // Actualiza el contador del carrito.
  updateCartCount();

  // Muestra una notificación al usuario.
  showToast(
    `${product.name} agregado al carrito`,
    'fa-cart-shopping'
  );
}


// ============================================================
// 5. EFECTO DEL NAVBAR AL HACER SCROLL
// ============================================================

// Detecta cuando el usuario hace scroll en la página.
window.addEventListener('scroll', () => {

  // Busca el elemento que tenga el ID navbar.
  const nav = document.getElementById('navbar');

  // Si existe el navbar, agrega o elimina la clase "scrolled".
  // La clase se activa después de desplazarse más de 20 píxeles.
  if (nav) {
    nav.classList.toggle(
      'scrolled',
      window.scrollY > 20
    );
  }
});


// ============================================================
// 6. NOTIFICACIONES TOAST
// ============================================================

// Muestra una pequeña notificación temporal.
function showToast(
  msg,
  icon = 'fa-circle-check'
) {

  // Busca si ya existe otra notificación.
  const existing = document.querySelector('.toast');

  // Si existe, la elimina antes de crear una nueva.
  if (existing) {
    existing.remove();
  }

  // Crea el elemento HTML de la notificación.
  const toast = document.createElement('div');

  // Le asigna la clase CSS correspondiente.
  toast.className = 'toast';

  // Inserta el icono y el mensaje.
  toast.innerHTML = `
    <i class="fa-solid ${icon} toast-icon"></i>
    <span>${msg}</span>
  `;

  // Agrega la notificación al body de la página.
  document.body.appendChild(toast);

  // Espera un momento para activar la animación.
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Después de 3 segundos comienza a desaparecer.
  setTimeout(() => {

    toast.classList.remove('show');

    // Después de la animación elimina el elemento.
    setTimeout(() => {
      toast.remove();
    }, 400);

  }, 3000);
}


// ============================================================
// 7. FILTRO DE CATEGORÍAS
// ============================================================

// Cambia la categoría seleccionada de productos.
function filterCat(el, cat) {

  // Quita la clase "active" de todas las categorías.
  document
    .querySelectorAll('.cat-chip')
    .forEach(c => {
      c.classList.remove('active');
    });

  // Activa la categoría seleccionada.
  el.classList.add('active');

  // Comprueba si existe la función renderProducts.
  if (typeof renderProducts === 'function') {

    // Muestra los productos correspondientes a la categoría.
    renderProducts(cat);
  }
}


// ============================================================
// 8. MENÚ PARA DISPOSITIVOS MÓVILES
// ============================================================

// Abre o cierra el menú de navegación en dispositivos móviles.
function toggleMobile() {

  // Busca el contenedor de los enlaces de navegación.
  const links = document.querySelector('.nav-links');

  // Si no existe, termina la función.
  if (!links) {
    return;
  }

  // Si el menú ya está abierto, lo oculta.
  if (links.style.display === 'flex') {

    links.style.display = 'none';

  } else {

    // Si está cerrado, muestra el menú.
    links.style.cssText = `
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: rgba(10,10,15,0.98);
      padding: 20px;
      gap: 8px;
      z-index: 999;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    `;
  }
}


// ============================================================
// 9. SISTEMA LEGAL
// TÉRMINOS - PRIVACIDAD - COOKIES
// ============================================================

// Abre el modal correspondiente dependiendo de la opción
// que haya seleccionado el usuario.
function mostrarLegal(tipo) {

  // Busca el contenedor principal del modal.
  const modal = document.getElementById('modalLegal');

  // Busca el título del modal.
  const titulo = document.getElementById('tituloLegal');

  // Busca el espacio donde aparecerá el contenido.
  const texto = document.getElementById('textoLegal');


  // ----------------------------------------------------------
  // Verificación de seguridad
  // ----------------------------------------------------------

  // Si alguno de los elementos no existe, no continúa.
  if (!modal || !titulo || !texto) {
    console.error(
      'No se encontró el modal legal en el HTML.'
    );
    return;
  }


  // ==========================================================
  // TÉRMINOS Y CONDICIONES
  // ==========================================================

  if (tipo === 'terminos') {

    titulo.textContent = 'Términos y condiciones';

    texto.innerHTML = `
      <p>
        Bienvenido a Fashotf, una plataforma digital destinada
        a facilitar la solicitud y gestión de pedidos de comida.
      </p>

      <p>
        Fashotf permite a los usuarios consultar restaurantes,
        visualizar productos, seleccionar alimentos y realizar
        pedidos de comida rápida y otros productos disponibles
        dentro de la plataforma.
      </p>

      <p>
        El usuario debe proporcionar información correcta y
        actualizada al momento de registrarse y realizar un pedido.
      </p>

      <p>
        Antes de confirmar una compra, el usuario debe verificar
        los productos seleccionados, cantidades, dirección de
        entrega y valor total del pedido.
      </p>

      <p>
        Los tiempos de entrega pueden variar dependiendo de la
        disponibilidad del restaurante, ubicación del usuario,
        tráfico y disponibilidad de repartidores.
      </p>

      <p>
        Fashotf podrá actualizar las condiciones del servicio
        cuando sea necesario para mejorar el funcionamiento
        de la plataforma.
      </p>
    `;


  // ==========================================================
  // POLÍTICA DE PRIVACIDAD
  // ==========================================================

  } else if (tipo === 'privacidad') {

    titulo.textContent = 'Política de privacidad';

    texto.innerHTML = `
      <p>
        En Fashotf valoramos la privacidad y seguridad de
        nuestros usuarios.
      </p>

      <p>
        Para utilizar determinadas funciones de la plataforma
        se puede solicitar información como nombre, correo
        electrónico, número de teléfono y dirección de entrega.
      </p>

      <p>
        Esta información puede utilizarse para gestionar las
        cuentas de usuario, procesar pedidos, facilitar las
        entregas y mejorar la experiencia dentro de Fashotf.
      </p>

      <p>
        Los datos proporcionados por el usuario deben ser
        correctos y mantenerse actualizados para garantizar
        el correcto funcionamiento del servicio.
      </p>

      <p>
        Fashotf busca proteger la información proporcionada
        por sus usuarios y utilizarla de acuerdo con las
        finalidades relacionadas con el funcionamiento
        de la plataforma.
      </p>
    `;


  // ==========================================================
  // POLÍTICA DE COOKIES
  // ==========================================================

  } else if (tipo === 'cookies') {

    titulo.textContent = 'Política de cookies';

    texto.innerHTML = `
      <p>
        Fashotf puede utilizar cookies y tecnologías similares
        para mejorar la experiencia de navegación del usuario.
      </p>

      <p>
        Las cookies pueden permitir que la plataforma recuerde
        determinadas preferencias y facilite el funcionamiento
        de algunas características.
      </p>

      <p>
        También pueden utilizarse para mejorar el rendimiento,
        funcionamiento y experiencia general de navegación
        dentro de Fashotf.
      </p>

      <p>
        El usuario puede configurar las opciones relacionadas
        con las cookies desde las herramientas disponibles
        en su navegador.
      </p>
    `;
  }


  // ==========================================================
  // MOSTRAR EL MODAL
  // ==========================================================

  // Cambia el modal de "oculto" a "visible".
  modal.style.display = 'flex';
}


// ============================================================
// 10. CERRAR EL MODAL LEGAL
// ============================================================

// Cierra la ventana legal.
function cerrarLegal() {

  // Busca el modal.
  const modal = document.getElementById('modalLegal');

  // Si existe, lo oculta.
  if (modal) {
    modal.style.display = 'none';
  }
}


// ============================================================
// 11. CERRAR EL MODAL AL HACER CLIC FUERA
// ============================================================

// Detecta los clics realizados en la página.
window.addEventListener('click', (event) => {

  // Busca el modal legal.
  const modal = document.getElementById('modalLegal');

  // Si el usuario hizo clic exactamente sobre el fondo
  // del modal, se cierra.
  if (modal && event.target === modal) {
    modal.style.display = 'none';
  }
});


// ============================================================
// 12. INICIALIZACIÓN
// ============================================================

// Actualiza el contador del carrito cuando se carga la página.
updateCartCount();