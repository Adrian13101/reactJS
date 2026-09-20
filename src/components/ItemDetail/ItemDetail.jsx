import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "../ItemCount/ItemCount";
import { formatPrice } from "../../utils/formatPrice";

export default function ItemDetail({ producto, onAgregar }) {
  const [agregado, setAgregado] = useState(false);

  const manejarAgregar = (cantidad) => {
    onAgregar(cantidad);
    setAgregado(true);
  };

  return (
    <article className="detalle">
      <div className="detalle__foto">
        <img src={producto.imagen} alt={`Foto de la moto ${producto.nombre}`} />
      </div>

      <div className="detalle__info">
        <p className="detalle__categoria">{producto.categoria}</p>
        <h2>{producto.nombre}</h2>
        <p className="detalle__marca">{producto.marca} · {producto.anio}</p>

        <ul className="detalle__specs">
          <li>
            <span>Cilindrada</span>
            <strong>{producto.cilindrada}cc</strong>
          </li>
          <li>
            <span>Motor</span>
            <strong>{producto.motor}</strong>
          </li>
          <li>
            <span>Peso</span>
            <strong>{producto.peso} kg</strong>
          </li>
        </ul>

        <p className="detalle__descripcion">{producto.descripcion}</p>
        <p className="detalle__precio">{formatPrice(producto.precio)}</p>

        {!agregado ? (
          <ItemCount stock={producto.stock} onAgregar={manejarAgregar} />
        ) : (
          <div className="detalle__confirmacion" role="status">
            <p>Se agregó "{producto.nombre}" al carrito.</p>
            <div className="detalle__acciones">
              <Link to="/carrito" className="boton boton--primario">
                Ir al carrito
              </Link>
              <Link to="/" className="boton boton--secundario">
                Seguir comprando
              </Link>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
