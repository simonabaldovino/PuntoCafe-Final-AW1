import { obtenerTotalUnidades } from './storage.js';

let temporizadorAviso;

export const actualizarContadorHeader = () => {
  const contador = document.querySelector('#contador-carrito');
  if (!contador) return;

  const total = obtenerTotalUnidades();
  contador.textContent = total;
  contador.hidden = total === 0;
};

export const mostrarAviso = (texto) => {
  const aviso = document.querySelector('#aviso');
  if (!aviso) return;

  aviso.textContent = texto;
  aviso.classList.add('visible');
  clearTimeout(temporizadorAviso);
  temporizadorAviso = setTimeout(() => aviso.classList.remove('visible'), 2500);
};

export const renderizarGrillaProductos = (contenedor, lista) => {
  if (!contenedor) return;

  if (lista.length === 0) {
    contenedor.innerHTML =
      '<p class="mensaje-vacio">No hay productos disponibles en esta categoría.</p>';
    return;
  }

  let htmlAcumulado = '';

  lista.forEach((producto) => {
    htmlAcumulado += `
      <article class="tarjeta-producto">
        <img src="${producto.imagen}" alt="${producto.nombre}" width="300" />
        <div class="info-card">
          <h3>${producto.nombre}</h3>
          <p class="precio">$${producto.precio}</p>
          <p class="descripcion">${producto.descripcion}</p>
          <button type="button" class="btn-agregar" data-id="${producto.id}">Agregar</button>
        </div>
      </article>
    `;
  });

  contenedor.innerHTML = htmlAcumulado;
};

export const renderizarResumenCheckout = (listaEl, subtotalEl, totalEl, carrito) => {
  if (!listaEl) return;

  if (carrito.length === 0) {
    listaEl.innerHTML =
      '<li class="resumen-vacio">Tu carrito está vacío. <a href="./menu.html">Ir al menú</a></li>';
    if (subtotalEl) subtotalEl.textContent = '$0';
    if (totalEl) totalEl.textContent = '$0';
    return;
  }

  let html = '';
  let totalGeneral = 0;

  carrito.forEach((item) => {
    const subtotalItem = item.precio * item.cantidad;
    totalGeneral += subtotalItem;

    html += `
      <li class="item-resumen">
        <div class="item-info">
          <span class="item-nombre">${item.nombre}</span>
          <div class="controles-cantidad">
            <button type="button" class="btn-cantidad btn-cant" data-accion="restar" data-id="${item.id}" aria-label="Restar unidad">-</button>
            <span class="cantidad-valor">${item.cantidad}</span>
            <button type="button" class="btn-cantidad btn-cant" data-accion="sumar" data-id="${item.id}" aria-label="Sumar unidad">+</button>
          </div>
        </div>
        <div class="item-acciones">
          <span class="item-precio">$${subtotalItem}</span>
          <button type="button" class="btn-eliminar" data-id="${item.id}" aria-label="Eliminar producto">✕</button>
        </div>
      </li>
    `;
  });

  listaEl.innerHTML = html;
  if (subtotalEl) subtotalEl.textContent = `$${totalGeneral}`;
  if (totalEl) totalEl.textContent = `$${totalGeneral}`;
};