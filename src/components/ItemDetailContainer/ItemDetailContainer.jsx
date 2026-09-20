import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { mockProducts } from "../../data/mockProducts";
import { useCart } from "../../context/CartContext";
import ItemDetail from "../ItemDetail/ItemDetail";
import Loader from "../Loader/Loader";

export default function ItemDetailContainer() {
  const { id } = useParams();
  const { agregarAlCarrito } = useCart();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [noEncontrado, setNoEncontrado] = useState(false);

  useEffect(() => {
    setCargando(true);
    setNoEncontrado(false);

    const referencia = doc(db, "productos", id);

    getDoc(referencia)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProducto({ id: snapshot.id, ...snapshot.data() });
        } else {
          // Firestore respondió pero no existe ese documento: es un
          // "no encontrado" real (id inválido o borrado), no un caso
          // para el catálogo local.
          setNoEncontrado(true);
        }
      })
      .catch((err) => {
        // Acá sí es un error real de conexión: ahí tiene sentido el
        // respaldo local para no dejar la vista rota.
        console.error("Error al leer la moto de Firestore:", err);
        const local = mockProducts.find((p) => p.id === id);
        if (local) {
          setProducto(local);
        } else {
          setNoEncontrado(true);
        }
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return <Loader texto="Buscando la moto..." />;
  }

  if (noEncontrado || !producto) {
    return (
      <div className="mensaje-vacio">
        <p>No encontramos esta moto.</p>
        <Link to="/" className="boton boton--secundario">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <ItemDetail
      producto={producto}
      onAgregar={(cantidad) => agregarAlCarrito(producto, cantidad)}
    />
  );
}
