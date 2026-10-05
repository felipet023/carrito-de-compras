import PRODUCTOS from '../data/products';
import ProductCard from './ProductCard';

export default function ProductList({ cantidadesEnCarrito, alAgregar, alAvisar }) {
  return (
    <section className="catalogo" aria-label="Catálogo de productos">
      {PRODUCTOS.map((producto) => (
        <ProductCard
          key={producto.id}
          producto={producto}
          cantidadEnCarrito={cantidadesEnCarrito[producto.id] || 0}
          alAgregar={alAgregar}
          alAvisar={alAvisar}
        />
      ))}
    </section>
  );
}
