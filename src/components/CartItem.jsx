import QuantityInput from './QuantityInput';
import { formatCOP } from '../utils/format';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItem({ item, producto, alAumentar, alDisminuir, alCambiarCantidad, alEliminar, alAvisar }) {
  return (
    <li className="carrito-item">
      <div className="carrito-item-info">
        <h4>{producto.nombre}</h4>
        <p>{formatCOP(producto.precio)}</p>
      </div>
      <div className="carrito-item-controles">
        <button aria-label={`Disminuir cantidad de ${producto.nombre}`} onClick={() => alDisminuir(producto)}><Minus size={16} /></button>
        <QuantityInput
          value={item.cantidad}
          ariaLabel={`Cantidad de ${producto.nombre} en el carrito`}
          onChange={(texto) => alCambiarCantidad(producto, texto)}
          onInvalid={() => alAvisar('invalido')}
        />
        <button aria-label={`Aumentar cantidad de ${producto.nombre}`} onClick={() => alAumentar(producto)}><Plus size={16} /></button>
        <button
          className="boton-eliminar"
          aria-label={`Eliminar ${producto.nombre} del carrito`}
          onClick={() => alEliminar(producto.id)}
        >
          <Trash2 size={14} aria-hidden="true" /> Eliminar
        </button>
      </div>
      <p className="carrito-item-subtotal">Subtotal: {formatCOP(producto.precio * item.cantidad)}</p>
    </li>
  );
}
