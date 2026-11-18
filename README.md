# Punto Café - Aplicación Web (IEFI)

Aplicación web responsiva para **Punto Café**, desarrollada con HTML5, CSS3 y JavaScript modular (ES6+), con catálogo dinámico desde JSON, persistencia en `localStorage`, confirmación de pedidos por WhatsApp y pruebas unitarias automatizadas con CI/CD.

## Tecnologías y Arquitectura
- **HTML5 & CSS3:** Estructura semántica y diseño responsivo (`global.css`, `index.css`, `menu.css`, `checkout.css`).
- **JavaScript Modular (ES6):**
  - `api.js`: Consumo asíncrono de `productos.json` con `fetch()`, `async/await` y manejo de errores `try/catch`.
  - `storage.js`: Gestión del carrito de compras y persistencia en `localStorage`.
  - `ui.js`: Renderizado dinámico del catálogo, resumen de compra, contador y notificaciones.
  - `index.js`, `menu.js`, `checkout.js`: Controladores de vista, validación de formulario y envío de pedido por WhatsApp.
- **Testing & CI/CD:** Pruebas unitarias nativas con `node:test` (`test/pedido.test.js`) automatizadas mediante GitHub Actions (`.github/workflows/ci.yml`).