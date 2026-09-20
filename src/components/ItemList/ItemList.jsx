import Item from "../Item/Item";

export default function ItemList({ productos }) {
  if (productos.length === 0) {
    return (
      <p className="mensaje-vacio">
        No encontramos motos en esta categoría por ahora.
      </p>
    );
  }

  return (
    <div className="item-list">
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
