# Tienda Palmira - Carrito de Compras

Nombre del aprendiz:
[DEJAR ESPACIO PARA QUE YO LO ESCRIBA]

Ficha:
[DEJAR ESPACIO]

Tecnología:
React + Vite

## Descripción del proyecto

Aplicación web de tienda virtual llamada **TIENDA PALMIRA**. Muestra un catálogo de
productos con su precio y stock disponible, y permite agregarlos a un carrito de
compras. El sistema valida estrictamente las cantidades ingresadas y nunca permite
comprar más unidades de las disponibles en stock. Todas las acciones inválidas
muestran mensajes emergentes (toasts), sin usar `alert()`.

## Funcionalidades

- Catálogo de 6 productos (array `PRODUCTOS`, sin API ni base de datos).
- Carrito de compras (panel lateral) con contador de unidades en la navbar.
- Validación de cantidades: no permite letras, `e`, `E`, `+`, `-`, `.`, `,`, cero, negativos ni decimales.
- Validación al pegar texto: solo se aceptan números enteros positivos.
- El campo de cantidad es `type="text"` con `inputMode="numeric"` (mayor control que `type="number"`).
- La rueda del mouse no modifica los campos de cantidad.
- Control estricto de stock (al escribir, al pulsar `+` y al volver a agregar).
- Cantidad mínima 1, con toast de confirmación para eliminar el producto.
- Los productos agregados dos veces suman cantidad en una sola línea (no se duplican).
- Subtotales por producto, total de unidades y total de compra en formato COP.
- Toasts que se cierran solos o manualmente, con botón de acción cuando aplica.
- Botón "Agregar" deshabilitado cuando ya no quedan unidades en stock.
- Diseño responsive y accesible (labels, aria-labels, foco visible).

## Instalación

```bash
npm install
```

## Ejecución

```bash
npm run dev
```

Luego abre en el navegador la URL que muestra la terminal (normalmente
`http://localhost:5173`).

## Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd carrito-de-compras
npm install
npm run dev
```

## Evidencias

[Insertar aquí las capturas de pantalla]
