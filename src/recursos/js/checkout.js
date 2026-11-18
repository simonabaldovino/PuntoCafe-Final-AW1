import {
  obtenerCarrito,
  cambiarCantidadItem,
  eliminarItemCarrito,
  vaciarCarrito,
  calcularTotalMonto
} from './storage.js';
import {
  actualizarContadorHeader,
  mostrarAviso,
  renderizarResumenCheckout
} from './ui.js';

const listaResumen = document.querySelector('#lista-resumen');
const subtotalCheckout = document.querySelector('#subtotal-checkout');
const totalCheckout = document.querySelector('#total-checkout');
const formularioRetiro = document.querySelector('.formulario-retiro');

// Número de WhatsApp del local (formato internacional sin + ni espacios, ej: 5493510000000)
const TELEFONO_PUNTO_CAFE = '5493463441872';

const refrescarVistaCheckout = () => {
  const carrito = obtenerCarrito();
  renderizarResumenCheckout(listaResumen, subtotalCheckout, totalCheckout, carrito);
  actualizarContadorHeader();
};

const construirUrlWhatsApp = ({ nombre, horario, modalidad, carrito, total }) => {
  const textoModalidad =
    modalidad === 'mesa' ? 'Consumo en Mesa' : 'Retiro en Local';

  const lineasProductos = carrito
    .map((item) => `• ${item.cantidad}x ${item.nombre} ($${item.precio * item.cantidad})`)
    .join('\n');

  const mensaje = [
    `Hola *Punto Café*! Quiero confirmar el siguiente pedido:`,
    ``,
    `*Cliente:* ${nombre}`,
    `*Modalidad:* ${textoModalidad}`,
    `*Horario estimado:* ${horario} hs`,
    ``,
    `*Detalle del pedido:*`,
    lineasProductos,
    ``,
    `*Total a abonar:* $${total}`
  ].join('\n');

  return `https://wa.me/${TELEFONO_PUNTO_CAFE}?text=${encodeURIComponent(mensaje)}`;
};

document.addEventListener('DOMContentLoaded', () => {
  refrescarVistaCheckout();

  if (listaResumen) {
    listaResumen.addEventListener('click', (e) => {
      const id = Number(e.target.dataset.id);
      if (!id) return;

      if (e.target.classList.contains('btn-cant')) {
        const accion = e.target.dataset.accion;
        cambiarCantidadItem(id, accion === 'sumar' ? 1 : -1);
        refrescarVistaCheckout();
      }

      if (e.target.classList.contains('btn-eliminar')) {
        eliminarItemCarrito(id);
        refrescarVistaCheckout();
        mostrarAviso('Producto eliminado del pedido');
      }
    });
  }

  if (formularioRetiro) {
    formularioRetiro.addEventListener('submit', (e) => {
      e.preventDefault();

      const carrito = obtenerCarrito();
      if (carrito.length === 0) {
        mostrarAviso('Agregá al menos un producto antes de confirmar el pedido');
        return;
      }

      const nombre = formularioRetiro.nombre.value.trim();
      const horario = formularioRetiro.horario.value;
      const modalidad = formularioRetiro.modalidad.value;

      if (!nombre || !horario) {
        mostrarAviso('Completá tu nombre y horario de retiro');
        return;
      }

      const total = calcularTotalMonto();
      const urlWhatsApp = construirUrlWhatsApp({
        nombre,
        horario,
        modalidad,
        carrito,
        total
      });

      mostrarAviso(`¡Pedido confirmado, ${nombre}! Abriendo WhatsApp...`);
      vaciarCarrito();
      formularioRetiro.reset();
      refrescarVistaCheckout();

      window.open(urlWhatsApp, '_blank', 'noopener,noreferrer');
    });
  }
});