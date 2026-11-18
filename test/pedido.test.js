import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// Funciones puras de lógica de negocio del carrito y pedido
const calcularTotalPedido = (carrito) => {
  return carrito.reduce((acum, item) => acum + item.precio * item.cantidad, 0);
};

const validarDatosPedido = ({ nombre, horario, carrito }) => {
  if (!Array.isArray(carrito) || carrito.length === 0) return false;
  if (!nombre || nombre.trim().length < 2) return false;
  if (!horario) return false;
  return true;
};

describe('Pruebas unitarias - Lógica de Pedido Punto Café', () => {
  it('debe calcular correctamente el monto total sumando subtotales de los productos', () => {
    const carritoPrueba = [
      { id: 1, nombre: 'Flat White', precio: 450, cantidad: 2 },
      { id: 5, nombre: 'Combo Desayuno', precio: 1100, cantidad: 1 }
    ];

    const total = calcularTotalPedido(carritoPrueba);
    assert.equal(total, 2000);
  });

  it('debe rechazar un pedido si el carrito está vacío o faltan datos del cliente', () => {
    const pedidoSinProductos = validarDatosPedido({
      nombre: 'Simona',
      horario: '10:30',
      carrito: []
    });

    const pedidoSinNombre = validarDatosPedido({
      nombre: '   ',
      horario: '10:30',
      carrito: [{ id: 1, nombre: 'Flat White', precio: 450, cantidad: 1 }]
    });

    assert.equal(pedidoSinProductos, false);
    assert.equal(pedidoSinNombre, false);
  });
});