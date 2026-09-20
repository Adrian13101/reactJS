import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useCart } from "../../context/CartContext";
import { formatPrice } from "../../utils/formatPrice";

const FORMULARIO_VACIO = { nombre: "", email: "", telefono: "" };

export default function Checkout() {
  const { carrito, totalCarrito, vaciarCarrito } = useCart();
  const [datosComprador, setDatosComprador] = useState(FORMULARIO_VACIO);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [ordenId, setOrdenId] = useState(null);
  const [errorEnvio, setErrorEnvio] = useState(null);

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;
    setDatosComprador((prev) => ({ ...prev, [name]: value }));
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!datosComprador.nombre.trim()) {
      nuevosErrores.nombre = "Ingresá tu nombre y apellido.";
    }
    if (!/^\S+@\S+\.\S+$/.test(datosComprador.email)) {
      nuevosErrores.email = "Ingresá un email válido.";
    }
    if (!datosComprador.telefono.trim()) {
      nuevosErrores.telefono = "Ingresá un teléfono de contacto.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    if (!validar()) return;

    setEnviando(true);
    setErrorEnvio(null);

    const orden = {
      comprador: datosComprador,
      items: carrito.map((item) => ({
        id: item.id,
        nombre: item.nombre,
        precio: item.precio,
        cantidad: item.cantidad,
      })),
      total: totalCarrito,
      fecha: serverTimestamp(),
    };

    try {
      const referencia = await addDoc(collection(db, "ordenes"), orden);
      setOrdenId(referencia.id);
      vaciarCarrito();
    } catch (error) {
      console.error("Error al generar la orden en Firestore:", error);
      setErrorEnvio(
        "No pudimos registrar tu compra en este momento. Probá nuevamente en unos minutos."
      );
    } finally {
      setEnviando(false);
    }
  };

  if (ordenId) {
    return (
      <div className="checkout__exito" role="status">
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu orden se generó con éxito.</p>
        <p className="checkout__orden-id">
          Número de orden: <strong>{ordenId}</strong>
        </p>
        <Link to="/" className="boton boton--primario">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  if (carrito.length === 0) {
    return (
      <div className="mensaje-vacio">
        <h2>No hay nada para pagar</h2>
        <p>Tu carrito está vacío, agregá motos antes de finalizar la compra.</p>
        <Link to="/" className="boton boton--primario">
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <section className="checkout">
      <h2>Finalizar compra</h2>

      <div className="checkout__resumen">
        <h3>Resumen del pedido</h3>
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              {item.cantidad} × {item.nombre} —{" "}
              {formatPrice(item.precio * item.cantidad)}
            </li>
          ))}
        </ul>
        <p className="checkout__total">Total: {formatPrice(totalCarrito)}</p>
      </div>

      <form className="checkout__formulario" onSubmit={manejarEnvio} noValidate>
        <label>
          Nombre y apellido
          <input
            type="text"
            name="nombre"
            value={datosComprador.nombre}
            onChange={manejarCambio}
          />
          {errores.nombre && <span className="campo-error">{errores.nombre}</span>}
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={datosComprador.email}
            onChange={manejarCambio}
          />
          {errores.email && <span className="campo-error">{errores.email}</span>}
        </label>

        <label>
          Teléfono
          <input
            type="tel"
            name="telefono"
            value={datosComprador.telefono}
            onChange={manejarCambio}
          />
          {errores.telefono && (
            <span className="campo-error">{errores.telefono}</span>
          )}
        </label>

        {errorEnvio && <p className="mensaje-error">{errorEnvio}</p>}

        <button type="submit" className="boton boton--primario" disabled={enviando}>
          {enviando ? "Generando orden..." : "Confirmar compra"}
        </button>
      </form>
    </section>
  );
}
