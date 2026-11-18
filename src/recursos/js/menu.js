import { obtenerProductos } from './api.js';
import { agregarAlCarrito } from './storage.js';
import {
  actualizarContadorHeader,
  mostrarAviso,
  renderizarGrillaProductos
} from './ui.js';

const grillaProductos = document.querySelector('.grilla-productos');
const contenedorFiltros = document.querySelector('.filtros-lista');

let catalogoProductos = [];

const aplicarFiltro = (categoria) => {
  const categoriasValidas = ['todos', 'cafe', 'combos', 'pasteleria'];
  const categoriaFinal = categoriasValidas.includes(categoria) ? categoria : 'todos';

  if (contenedorFiltros) {
    contenedorFiltros.querySelectorAll('.filtro-btn').forEach((btn) => {
      const btnCat = btn.getAttribute('href').replace('#', '');
      btn.classList.toggle('activo', btnCat === categoriaFinal);
    });
  }

  const filtrados =
    categoriaFinal === 'todos'
      ? catalogoProductos
      : catalogoProductos.filter((p) => p.categoria === categoriaFinal);

  renderizarGrillaProductos(grillaProductos, filtrados);
};

document.addEventListener('DOMContentLoaded', async () => {
  actualizarContadorHeader();

  try {
    catalogoProductos = await obtenerProductos();
    const hashInicial = window.location.hash.replace('#', '');
    aplicarFiltro(hashInicial || 'todos');
  } catch (error) {
    if (grillaProductos) {
      grillaProductos.innerHTML =
        '<p class="mensaje-vacio">No pudimos cargar el menú en este momento. Por favor, intentá nuevamente.</p>';
    }
    mostrarAviso('Error al cargar los productos');
  }

  if (contenedorFiltros) {
    contenedorFiltros.addEventListener('click', (e) => {
      const boton = e.target.closest('.filtro-btn');
      if (!boton) return;
      e.preventDefault();

      const categoriaElegida = boton.getAttribute('href').replace('#', '');
      aplicarFiltro(categoriaElegida);
    });
  }

  if (grillaProductos) {
    grillaProductos.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-agregar')) {
        const id = Number(e.target.dataset.id);
        const productoEncontrado = catalogoProductos.find((p) => p.id === id);

        if (productoEncontrado) {
          agregarAlCarrito(productoEncontrado);
          actualizarContadorHeader();
          mostrarAviso(`${productoEncontrado.nombre} se agregó al carrito`);
        }
      }
    });
  }
});