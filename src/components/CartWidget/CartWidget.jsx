import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export default function CartWidget() {
  const { cantidadTotal } = useCart();

  return (
    <Link to="/carrito" className="cart-widget" aria-label="Ir al carrito">
      <svg
        className="cart-widget__icono"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        aria-hidden="true"
      >
        <path
          d="M4 13a8 8 0 0 1 16 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <rect x="3.2" y="13" width="4.2" height="5.2" rx="1.2" fill="currentColor" />
        <rect x="16.6" y="13" width="4.2" height="5.2" rx="1.2" fill="currentColor" />
      </svg>
      {cantidadTotal > 0 && (
        <span className="cart-widget__contador">{cantidadTotal}</span>
      )}
    </Link>
  );
}
