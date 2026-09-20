import { Link } from "react-router-dom";
import { formatPrice } from "../../utils/formatPrice";

export default function Item({ producto }) {
  const { id, nombre, marca, cilindrada, precio, imagen, stock } = producto;
  const sinStock = stock <= 0;

  return (
    <article className={`plate ${sinStock ? "plate--agotado" : ""}`}>
      <Link to={`/producto/${id}`} className="plate__enlace">
        <div className="plate__foto">
          <img src={imagen} alt={`Foto de la moto ${nombre}`} loading="lazy" />
          <span className="plate__cc">{cilindrada}cc</span>
          {sinStock && <span className="plate__etiqueta">Sin stock</span>}
        </div>
        <div className="plate__info">
          <p className="plate__marca">{marca}</p>
          <h3>{nombre}</h3>
          <p className="plate__precio">{formatPrice(precio)}</p>
        </div>
      </Link>
    </article>
  );
}
