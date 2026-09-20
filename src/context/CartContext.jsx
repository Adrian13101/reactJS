import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(undefined);

const STORAGE_KEY = "moto-racing-carrito";

function leerCarritoInicial() {
  try {
    const guardado = window.localStorage.getItem(STORAGE_KEY);
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    console.error("No se pudo leer el carrito guardado:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [carrito, setCarrito] = useState(leerCarritoInicial);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    } catch (error) {
      console.error("No se pudo guardar el carrito:", error);
    }
  }, [carrito]);

  // Agrega `cantidad` unidades de una moto. Si ya estaba en el carrito,
  // suma la cantidad respetando el stock disponible.
  const agregarAlCarrito = (producto, cantidad) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? {
                ...item,
                cantidad: Math.min(item.cantidad + cantidad, producto.stock),
              }
            : item
        );
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          marca: producto.marca,
          precio: producto.precio,
          imagen: producto.imagen,
          stock: producto.stock,
          cantidad,
        },
      ];
    });
  };

  const quitarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id, cantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, cantidad: Math.max(1, Math.min(cantidad, item.stock)) }
          : item
      )
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  const estaEnCarrito = (id) => carrito.some((item) => item.id === id);

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const totalCarrito = carrito.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );

  const valor = {
    carrito,
    agregarAlCarrito,
    quitarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    estaEnCarrito,
    cantidadTotal,
    totalCarrito,
  };

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

// Hook de acceso. Lanza un error claro si se usa fuera del CartProvider,
// en vez de fallar silenciosamente con `undefined`.
export function useCart() {
  const contexto = useContext(CartContext);
  if (contexto === undefined) {
    throw new Error("useCart debe usarse dentro de un <CartProvider>");
  }
  return contexto;
}
