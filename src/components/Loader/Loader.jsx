// Loader temático: una rueda de cross girando. Se usa mientras se
// resuelven las lecturas a Firestore (renderizado condicional de carga).
export default function Loader({ texto = "Cargando..." }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__rueda" aria-hidden="true" />
      <p className="loader__texto">{texto}</p>
    </div>
  );
}
