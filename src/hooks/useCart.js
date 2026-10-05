import { useEffect, useState } from 'react';
import PRODUCTOS from '../data/products';

const CLAVE = 'tienda-palmira-carrito';

function leerCarritoGuardado() {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return [];
    const datos = JSON.parse(crudo);
    if (!Array.isArray(datos)) return [];
    return datos
      .filter((i) => PRODUCTOS.some((p) => p.id === i.id) && Number.isInteger(i.cantidad) && i.cantidad > 0)
      .map((i) => {
        const producto = PRODUCTOS.find((p) => p.id === i.id);
        return { id: i.id, cantidad: Math.min(i.cantidad, producto.stock) };
      });
  } catch {
    return [];
  }
}

export default function useCart() {
  const [carrito, setCarrito] = useState(leerCarritoGuardado);

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(carrito));
    } catch {
      // Si localStorage no está disponible, el carrito sigue funcionando en memoria.
    }
  }, [carrito]);

  const cantidadEnCarrito = (id) => {
    const item = carrito.find((i) => i.id === id);
    return item ? item.cantidad : 0;
  };

  return { carrito, setCarrito, cantidadEnCarrito };
}
