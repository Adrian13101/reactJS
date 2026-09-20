import { useState } from "react";

const CANTIDAD_MINIMA = 1;

/**
 * Selector de cantidad de unidades a comprar.
 * - Respeta un mínimo de 1 unidad.
 * - No permite superar el stock disponible.
 * - Queda deshabilitado y avisa cuando no hay stock.
 */
export default function ItemCount({ stock, inicial = 1, onAgregar }) {
  const [cantidad, setCantidad] = useState(
    Math.min(inicial, Math.max(stock, 0)) || CANTIDAD_MINIMA
  );

  const sinStock = stock <= 0;

  const restar = () => {
    setCantidad((actual) => Math.max(CANTIDAD_MINIMA, actual - 1));
  };

  const sumar = () => {
    setCantidad((actual) => Math.min(stock, actual + 1));
  };

  const manejarCambioManual = (evento) => {
    const valor = Number(evento.target.value);
    if (Number.isNaN(valor)) return;
    const limitado = Math.min(Math.max(valor, CANTIDAD_MINIMA), stock);
    setCantidad(limitado);
  };

  if (sinStock) {
    return <p className="item-count__sin-stock">Sin stock disponible</p>;
  }

  return (
    <div className="item-count">
      <div className="item-count__controles">
        <button
          type="button"
          onClick={restar}
          disabled={cantidad <= CANTIDAD_MINIMA}
          aria-label="Restar unidad"
        >
          −
        </button>
        <input
          type="number"
          min={CANTIDAD_MINIMA}
          max={stock}
          value={cantidad}
          onChange={manejarCambioManual}
          aria-label="Cantidad"
        />
        <button
          type="button"
          onClick={sumar}
          disabled={cantidad >= stock}
          aria-label="Sumar unidad"
        >
          +
        </button>
      </div>
      <p className="item-count__stock-info">{stock} unidades disponibles</p>
      <button
        type="button"
        className="boton boton--primario"
        onClick={() => onAgregar(cantidad)}
      >
        Agregar al carrito
      </button>
    </div>
  );
}
