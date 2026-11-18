const CLAVE_CARRITO = 'carrito';

export const obtenerCarrito = () => {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  return guardado ? JSON.parse(guardado) : [];
};

export const guardarCarrito = (carrito) => {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
};

export const agregarAlCarrito = (producto) => {
  const carrito = obtenerCarrito();
  const existente = carrito.find((item) => item.id === producto.id);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    });
  }

  guardarCarrito(carrito);
};

export const cambiarCantidadItem = (id, delta) => {
  let carrito = obtenerCarrito();
  const item = carrito.find((p) => p.id === id);
  if (!item) return;

  item.cantidad += delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter((p) => p.id !== id);
  }

  guardarCarrito(carrito);
};

export const eliminarItemCarrito = (id) => {
  const carrito = obtenerCarrito().filter((item) => item.id !== id);
  guardarCarrito(carrito);
};

export const vaciarCarrito = () => {
  localStorage.removeItem(CLAVE_CARRITO);
};

export const obtenerTotalUnidades = () => {
  return obtenerCarrito().reduce((suma, item) => suma + item.cantidad, 0);
};

export const calcularTotalMonto = () => {
  return obtenerCarrito().reduce((suma, item) => suma + item.precio * item.cantidad, 0);
};