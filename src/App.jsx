import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Toast from './components/Toast';
import useCart from './hooks/useCart';

const MSG_MAX = 'Este es el máximo de producto disponible en stock';
const MSG_MIN = 'Esta es la cantidad mínima. ¿Desea eliminar el producto?';
const MSG_INVALIDO = 'Solo se permiten números enteros positivos.';

export default function App() {
  const { carrito, setCarrito } = useCart();
  const [toasts, setToasts] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const toastId = useRef(0);

  const cerrarToast = (id) => setToasts((ts) => ts.filter((t) => t.id !== id));

  const mostrarToast = (mensaje, { tipo = 'advertencia', accion = null } = {}) => {
    const id = ++toastId.current;
    setToasts((ts) => [
      ...ts,
      {
        id,
        mensaje,
        tipo,
        accion: accion
          ? { label: accion.label, onClick: () => { accion.onClick(); cerrarToast(id); } }
          : null,
      },
    ]);
  };

  const alAvisar = (tipo, producto) => {
    if (tipo === 'max') mostrarToast(MSG_MAX, { tipo: 'error' });
    else if (tipo === 'invalido') mostrarToast(MSG_INVALIDO, { tipo: 'error' });
    else if (tipo === 'min') {
      if (producto) {
        mostrarToast(MSG_MIN, { tipo: 'advertencia', accion: { label: 'Eliminar producto', onClick: () => eliminar(producto.id) } });
      } else {
        mostrarToast('La cantidad mínima es 1.', { tipo: 'advertencia' });
      }
    }
  };

  const agregar = (producto, cantidad) => {
    const existente = carrito.find((i) => i.id === producto.id);
    const enCarrito = existente ? existente.cantidad : 0;
    const nuevoTotal = Math.min(enCarrito + cantidad, producto.stock);
    if (nuevoTotal < enCarrito + cantidad) {
      mostrarToast(MSG_MAX, { tipo: 'error' });
    } else {
      mostrarToast(`${producto.nombre} agregado al carrito.`, { tipo: 'exito' });
    }
    if (existente) {
      setCarrito(carrito.map((i) => (i.id === producto.id ? { ...i, cantidad: nuevoTotal } : i)));
    } else {
      setCarrito([...carrito, { id: producto.id, cantidad: nuevoTotal }]);
    }
  };

  const aumentar = (producto) => {
    const item = carrito.find((i) => i.id === producto.id);
    if (item.cantidad >= producto.stock) {
      mostrarToast(MSG_MAX, { tipo: 'error' });
      return;
    }
    setCarrito(carrito.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i)));
  };

  const disminuir = (producto) => {
    const item = carrito.find((i) => i.id === producto.id);
    if (item.cantidad === 1) {
      mostrarToast(MSG_MIN, { tipo: 'advertencia', accion: { label: 'Eliminar producto', onClick: () => eliminar(producto.id) } });
      return;
    }
    setCarrito(carrito.map((i) => (i.id === producto.id ? { ...i, cantidad: i.cantidad - 1 } : i)));
  };

  const cambiarCantidad = (producto, texto) => {
    if (texto === '') return;
    let numero = parseInt(texto, 10);
    if (numero === 0) {
      mostrarToast(MSG_MIN, { tipo: 'advertencia', accion: { label: 'Eliminar producto', onClick: () => eliminar(producto.id) } });
      return;
    }
    if (numero > producto.stock) {
      numero = producto.stock;
      mostrarToast(MSG_MAX, { tipo: 'error' });
    }
    setCarrito(carrito.map((i) => (i.id === producto.id ? { ...i, cantidad: numero } : i)));
  };

  const eliminar = (id) => {
    setCarrito(carrito.filter((i) => i.id !== id));
    mostrarToast('Producto eliminado del carrito.', { tipo: 'exito' });
  };

  const cantidadesEnCarrito = carrito.reduce((acc, i) => ({ ...acc, [i.id]: i.cantidad }), {});
  const totalUnidades = carrito.reduce((s, i) => s + i.cantidad, 0);

  return (
    <>
      <Navbar totalUnidades={totalUnidades} alAbrirCarrito={() => setCarritoAbierto(true)} />
      <Hero />
      <main className="contenido" id="catalogo">
        <h2 className="titulo-seccion">Catálogo de productos</h2>
        <ProductList
          cantidadesEnCarrito={cantidadesEnCarrito}
          alAgregar={agregar}
          alAvisar={alAvisar}
        />
      </main>
      <Cart
        carrito={carrito}
        abierto={carritoAbierto}
        alCerrar={() => setCarritoAbierto(false)}
        alAumentar={aumentar}
        alDisminuir={disminuir}
        alCambiarCantidad={cambiarCantidad}
        alEliminar={eliminar}
        alAvisar={alAvisar}
      />
      <Toast toasts={toasts} onClose={cerrarToast} />
    </>
  );
}
