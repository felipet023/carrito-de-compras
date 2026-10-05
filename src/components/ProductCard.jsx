import { useState } from 'react';
import QuantityInput from './QuantityInput';
import { formatCOP } from '../utils/format';

export default function ProductCard({ producto, cantidadEnCarrito, alAgregar, alAvisar }) {
  const [cantidad, setCantidad] = useState('1');
  const restante = producto.stock - cantidadEnCarrito;
  const sinStock = restante <= 0;
  const stockBajo = !sinStock && restante <= 3;

  const manejarCambio = (texto) => {
    if (texto === '') {
      setCantidad('');
      return;
    }
    let numero = parseInt(texto, 10);
    if (numero === 0) {
      alAvisar('min');
      if (cantidad === '') setCantidad('1');
      return;
    }
    if (numero > producto.stock) {
      numero = producto.stock;
      alAvisar('max');
    }
    setCantidad(String(numero));
  };

  const agregar = () => {
    const numero = parseInt(cantidad, 10);
    if (!numero || numero < 1) {
      alAvisar('min');
      if (cantidad === '') setCantidad('1');
      return;
    }
    alAgregar(producto, numero);
    setCantidad('1');
  };

  return (
    <article className="tarjeta">
      <h3>{producto.nombre}</h3>
      <p className="tarjeta-precio">{formatCOP(producto.precio)}</p>
      {sinStock ? (
        <span className="badge badge-agotado">Agotado</span>
      ) : stockBajo ? (
        <span className="badge badge-bajo">¡Últimas unidades! Quedan {restante}</span>
      ) : (
        <span className="badge badge-disponible">Disponible · {restante} en stock</span>
      )}
      <div className="tarjeta-cantidad">
        <label htmlFor={`cantidad-${producto.id}`}>Cantidad:</label>
        <QuantityInput
          id={`cantidad-${producto.id}`}
          value={cantidad}
          ariaLabel={`Cantidad de ${producto.nombre}`}
          onChange={manejarCambio}
          onInvalid={() => alAvisar('invalido')}
        />
      </div>
      <button className="boton-agregar" onClick={agregar} disabled={sinStock}>
        {'Agregar'}
      </button>
    </article>
  );
}
