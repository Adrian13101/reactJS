import { NavLink } from "react-router-dom";
import { categories } from "../../data/mockProducts";
import CartWidget from "../CartWidget/CartWidget";

export default function NavBar() {
  return (
    <header className="navbar">
      <div className="navbar__fila">
        <NavLink to="/" className="navbar__marca">
          <span className="navbar__rueda" aria-hidden="true" />
          Moto Racing
        </NavLink>
        <CartWidget />
      </div>
      <nav className="navbar__categorias" aria-label="Categorías">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `navbar__enlace ${isActive ? "navbar__enlace--activo" : ""}`
          }
        >
          Todo
        </NavLink>
        {categories.map((categoria) => (
          <NavLink
            key={categoria.id}
            to={`/categoria/${categoria.id}`}
            className={({ isActive }) =>
              `navbar__enlace ${isActive ? "navbar__enlace--activo" : ""}`
            }
          >
            {categoria.nombre}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
