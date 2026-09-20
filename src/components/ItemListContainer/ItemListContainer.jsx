import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { categories, mockProducts } from "../../data/mockProducts";
import ItemList from "../ItemList/ItemList";
import Loader from "../Loader/Loader";

export default function ItemListContainer() {
  const { categoriaId } = useParams();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCargando(true);
    setError(null);

    const productosRef = collection(db, "productos");
    const consulta = categoriaId
      ? query(productosRef, where("categoria", "==", categoriaId))
      : productosRef;

    getDocs(consulta)
      .then((snapshot) => {
        // Firestore respondió: sea que tenga documentos o no, ese es el
        // estado real de la base (una categoría sin stock cargado es un
        // resultado válido, no un error). No usamos catálogo local acá.
        const datos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProductos(datos);
      })
      .catch((err) => {
        // Acá sí es un error real de conexión (sin red, reglas de
        // Firestore, credenciales mal configuradas, etc.): ahí tiene
        // sentido mostrar el catálogo local como respaldo.
        console.error("Error al leer motos de Firestore:", err);
        setError(
          "No pudimos conectar con la base de datos. Mostrando catálogo de ejemplo."
        );
        const respaldo = categoriaId
          ? mockProducts.filter((p) => p.categoria === categoriaId)
          : mockProducts;
        setProductos(respaldo);
      })
      .finally(() => setCargando(false));
  }, [categoriaId]);

  const categoriaActual = categories.find((c) => c.id === categoriaId);

  if (cargando) {
    return <Loader texto="Buscando motos..." />;
  }

  return (
    <section className="catalogo">
      <h2 className="catalogo__titulo">
        {categoriaActual ? categoriaActual.nombre : "Todo el catálogo"}
      </h2>
      {error && <p className="mensaje-error">{error}</p>}
      <ItemList productos={productos} />
    </section>
  );
}
