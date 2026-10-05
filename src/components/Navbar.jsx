export default function Navbar({ totalUnidades, alAbrirCarrito }) {
  return (
    <header className="navbar">
      <span className="navbar-marca">TIENDA PALMIRA</span>
      <button
        className="navbar-carrito"
        aria-label="Abrir carrito de compras"
        onClick={alAbrirCarrito}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        {totalUnidades > 0 && (
          <span className="navbar-contador" aria-label={`${totalUnidades} unidades en el carrito`}>
            {totalUnidades}
          </span>
        )}
      </button>
    </header>
  );
}
