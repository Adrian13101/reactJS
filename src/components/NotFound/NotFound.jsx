import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mensaje-vacio">
      <h2>Página no encontrada</h2>
      <p>El enlace al que intentaste acceder no existe.</p>
      <Link to="/" className="boton boton--primario">
        Volver al catálogo
      </Link>
    </div>
  );
}
