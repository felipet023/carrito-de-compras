import CartItem from './CartItem';
import PRODUCTOS from '../data/products';
import { formatCOP } from '../utils/format';
import { ShoppingBag, X } from 'lucide-react';

export default function Cart({ carrito, abierto, alCerrar, alAumentar, alDisminuir, alCambiarCantidad, alEliminar, alAvisar }) {
  if (!abierto) return null;

  const totalUnidades = carrito.reduce((s, i) => s + i.cantidad, 0);
  const totalCompra = carrito.reduce((s, i) => {
    const p = PRODUCTOS.find((x) => x.id === i.id);
    return s + p.precio * i.cantidad;
  }, 0);

  return (
    <div className="carrito-overlay" onClick={alCerrar}>
      <aside
        className="carrito-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="carrito-encabezado">
          <h2>Tu carrito</h2>
          <button aria-label="Cerrar carrito" onClick={alCerrar}><X size={20} /></button>
        </div>

        {carrito.length === 0 ? (
          <div className="carrito-vacio">
            <ShoppingBag size={48} aria-hidden="true" />
            <p className="carrito-vacio-titulo">Tu carrito está vacío</p>
            <p>Agrega algunos productos para comenzar tu compra.</p>
          </div>
        ) : (
          <ul className="carrito-lista">
            {carrito.map((item) => {
              const producto = PRODUCTOS.find((p) => p.id === item.id);
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  producto={producto}
                  alAumentar={alAumentar}
                  alDisminuir={alDisminuir}
                  alCambiarCantidad={alCambiarCantidad}
                  alEliminar={alEliminar}
                  alAvisar={alAvisar}
                />
              );
            })}
          </ul>
        )}

        <div className="carrito-totales">
          <p>TOTAL DE UNIDADES: <strong>{totalUnidades}</strong></p>
          <p className="carrito-total">TOTAL DE COMPRA: <strong>{formatCOP(totalCompra)}</strong></p>
        </div>
      </aside>
    </div>
  );
}
