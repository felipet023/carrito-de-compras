import { useEffect, useRef, useState } from 'react';
import { ShoppingCart } from 'lucide-react';

export default function Navbar({ totalUnidades, alAbrirCarrito }) {
  const [animar, setAnimar] = useState(false);
  const anterior = useRef(totalUnidades);

  useEffect(() => {
    if (totalUnidades !== anterior.current && totalUnidades > 0) {
      setAnimar(true);
      const t = setTimeout(() => setAnimar(false), 300);
      anterior.current = totalUnidades;
      return () => clearTimeout(t);
    }
    anterior.current = totalUnidades;
  }, [totalUnidades]);

  return (
    <header className="navbar">
      <span className="navbar-marca">TIENDA PALMIRA</span>
      <button
        className="navbar-carrito"
        aria-label="Abrir carrito de compras"
        onClick={alAbrirCarrito}
      >
        <ShoppingCart size={26} aria-hidden="true" />
        {totalUnidades > 0 && (
          <span
            className={`navbar-contador ${animar ? 'pulso' : ''}`}
            aria-label={`${totalUnidades} unidades en el carrito`}
          >
            {totalUnidades}
          </span>
        )}
      </button>
    </header>
  );
}
