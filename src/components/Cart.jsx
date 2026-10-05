import CartItem from './CartItem';
import PRODUCTOS from '../data/products';
import { formatCOP } from '../utils/format';

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
          <h2>Carrito de compras</h2>
          <button aria-label="Cerrar carrito" onClick={alCerrar}>×</button>
        </div>

        {carrito.length === 0 ? (
          <p className="carrito-vacio">Tu carrito está vacío.</p>
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
          <p>TOTAL DE COMPRA: <strong>{formatCOP(totalCompra)}</strong></p>
        </div>
      </aside>
    </div>
  );
}
