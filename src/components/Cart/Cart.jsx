import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

export default function Cart() {
  const {
    carrito,
    quitarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    totalCarrito,
  } = useCart();

  if (carrito.length === 0) {
    return (
      <div className="mensaje-vacio">
        <h2>Tu carrito está vacío</h2>
        <p>Todavía no agregaste motos. Explorá el catálogo para encontrar la tuya.</p>
        <Link to="/" className="boton boton--primario">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="carrito">
      <h2>Tu carrito</h2>

      <ul className="carrito__lista">
        {carrito.map((item) => (
          <li key={item.id} className="carrito__item">
            <img src={item.imagen} alt={`Foto de la moto ${item.nombre}`} />
            <div className="carrito__item-info">
              <p className="carrito__item-nombre">{item.nombre}</p>
              <p className="carrito__item-marca">{item.marca}</p>
              <p className="carrito__item-precio">{formatPrice(item.precio)} c/u</p>
            </div>

            <div className="carrito__item-cantidad">
              <button
                type="button"
                onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                disabled={item.cantidad <= 1}
                aria-label={`Restar unidad de ${item.nombre}`}
              >
                −
              </button>
              <span>{item.cantidad}</span>
              <button
                type="button"
                onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}
                disabled={item.cantidad >= item.stock}
                aria-label={`Sumar unidad de ${item.nombre}`}
              >
                +
              </button>
            </div>

            <p className="carrito__item-subtotal">
              {formatPrice(item.precio * item.cantidad)}
            </p>

            <button
              type="button"
              className="carrito__quitar"
              onClick={() => quitarDelCarrito(item.id)}
              aria-label={`Quitar ${item.nombre} del carrito`}
            >
              Quitar
            </button>
          </li>
        ))}
      </ul>

      <div className="carrito__resumen">
        <button
          type="button"
          className="boton boton--secundario"
          onClick={vaciarCarrito}
        >
          Vaciar carrito
        </button>
        <p className="carrito__total">Total: {formatPrice(totalCarrito)}</p>
        <Link to="/checkout" className="boton boton--primario">
          Finalizar compra
        </Link>
      </div>
    </section>
  );
}
