const RUTA_PRODUCTOS = './recursos/datos/productos.json';

export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(RUTA_PRODUCTOS);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP al cargar productos: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.error('Error al obtener el catálogo desde JSON:', error);
    throw error;
  }
};