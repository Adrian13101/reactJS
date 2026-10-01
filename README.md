<div align="center">

# 🏍️ Moto Racing

**E-commerce de motos de motocross y enduro**

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-6-CA4245?logo=reactrouter&logoColor=white)
![Firebase](https://img.shields.io/badge/Firestore-Firebase%2010-FFCA28?logo=firebase&logoColor=black)

</div>

| | |
| --- | --- |
| **Proyecto** | Moto Racing — tienda online de motos (SPA con React) |
| **Autor** | Adrián Márquez | 
| **Repositorio** | https://github.com/Adrian13101/reactJS |
| **Stack** | React 18 · React Router 6 · Vite 5 · Cloud Firestore |
| **Catálogo** | 6 motos: 3 de motocross y 3 de enduro |

E-commerce de motos de **motocross** y **enduro** hecho con React. El usuario puede recorrer el catálogo, ver el detalle de cada moto, armar un carrito de compras y finalizar la compra: la orden queda registrada en **Cloud Firestore** y se le muestra un número de orden.

---

## Índice

1. [Funcionalidades](#1-funcionalidades)
2. [Tecnologías](#2-tecnologías)
3. [Instalación y ejecución](#3-instalación-y-ejecución)
   - [Verificación de instalación desde cero](#verificación-de-instalación-desde-cero)
4. [Estructura de componentes](#4-estructura-de-componentes)
5. [Rutas](#5-rutas)
6. [Context del carrito](#6-context-del-carrito)
7. [Colección de productos en Firestore](#7-colección-de-productos-en-firestore)
8. [Ejemplo de orden en Firestore](#8-ejemplo-de-orden-en-firestore)
9. [Flujos de uso](#9-flujos-de-uso)
10. [Decisiones de diseño](#10-decisiones-de-diseño)
11. [Dificultades encontradas y soluciones](#11-dificultades-encontradas-y-soluciones)
12. [Seguridad y credenciales](#12-seguridad-y-credenciales)
13. [Limitaciones actuales](#13-limitaciones-actuales)

---

## 1. Funcionalidades

Lo que puede hacer el usuario en la aplicación:

- **Explorar el catálogo completo** de motos, con foto, marca, nombre, cilindrada y precio.
- **Filtrar por categoría** desde la barra de navegación: *Todo*, *Motocross* y *Enduro*.
- **Ver el detalle de una moto**: año, cilindrada, tipo de motor, peso, descripción, precio y stock disponible.
- **Elegir la cantidad** a comprar con un selector que respeta el mínimo (1) y el stock disponible. Si no hay stock, el selector se reemplaza por un aviso.
- **Agregar motos al carrito** desde el detalle, con confirmación y accesos directos a "Ir al carrito" y "Seguir comprando".
- **Ver el contador del carrito** en la barra de navegación, siempre actualizado.
- **Gestionar el carrito**: sumar o restar unidades (sin superar el stock), quitar una moto o vaciar todo el carrito. Se muestran subtotales y el total.
- **Conservar el carrito al recargar la página** (se guarda en `localStorage`).
- **Finalizar la compra** completando nombre, email y teléfono, con validación de los campos.
- **Recibir un número de orden** generado por Firestore al confirmar la compra.
- **Ver pantallas de estado**: indicador de carga, carrito vacío, categoría sin motos, moto no encontrada y página 404.

---

## 2. Tecnologías

| Tecnología | Versión | Uso |
| --- | --- | --- |
| [React](https://react.dev/) | 18 | Interfaz de usuario basada en componentes |
| [React Router DOM](https://reactrouter.com/) | 6 | Navegación entre vistas sin recargar la página |
| [Vite](https://vitejs.dev/) | 5 | Servidor de desarrollo y build |
| [Firebase (SDK web)](https://firebase.google.com/docs/web/setup) | 10 | Conexión con Cloud Firestore |
| Cloud Firestore | — | Base de datos: colecciones `productos` y `ordenes` |
| Firebase Admin SDK | 12 (solo desarrollo) | Script `seed` para cargar el catálogo en Firestore |
| CSS propio | — | Estilos en `src/styles/global.css` |
| Context API de React | — | Estado global del carrito |

---

## 3. Instalación y ejecución

### Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- Un proyecto de Firebase con **Cloud Firestore** habilitado

### Pasos

**1. Clonar el repositorio e instalar dependencias**

```bash
git clone https://github.com/Adrian13101/reactJS.git
cd reactJS
npm install
```

**2. Configurar las variables de entorno**

Copiá el archivo de ejemplo y completalo con los datos de tu proyecto de Firebase
(Firebase Console → Configuración del proyecto → Tus apps → Configuración del SDK):

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

> El archivo `.env` está en `.gitignore`: no se sube al repositorio.

**3. Cargar el catálogo en Firestore (una sola vez)**

El script `seed` copia las 6 motos de `src/data/mockProducts.js` a la colección `productos`. Necesita una clave de cuenta de servicio, que es **distinta** de las credenciales del `.env`:

1. Firebase Console → Configuración del proyecto → **Cuentas de servicio**.
2. **Generar nueva clave privada** y guardar el archivo como `serviceAccountKey.json` en la raíz del proyecto (también está en `.gitignore`).
3. Ejecutar:

```bash
npm run seed
```

**4. Levantar la aplicación**

```bash
npm run dev
```

Abrí la URL que muestra la terminal (por defecto `http://localhost:5173`).

### Verificación de instalación desde cero

Se comprobó el procedimiento partiendo de una copia limpia del repositorio (solo los archivos versionados en Git, sin `node_modules`, sin `.env` y sin `serviceAccountKey.json`), con Node.js 22 y npm 10:

| Paso | Resultado |
| --- | --- |
| `npm install` | ✅ Instala las dependencias sin errores |
| `cp .env.example .env` | ✅ El archivo de ejemplo existe y lista las 6 variables `VITE_FIREBASE_*` |
| `npm run build` | ✅ Compila correctamente (62 módulos transformados, `dist/` generado) |
| `npm run dev` | ✅ El servidor arranca en `http://localhost:5173` y responde HTTP 200 |
| `npm run seed` sin `serviceAccountKey.json` | ✅ Falla con un mensaje claro que indica cómo generar la clave |

> **Alcance de la verificación:** la compilación y el arranque se probaron con valores de prueba en el `.env`. La lectura de `productos` y la escritura de `ordenes` requieren un proyecto de Firebase propio con el `.env` completo y las reglas de la sección 12. Si la conexión falla, la tienda muestra el catálogo local con un aviso.

### Scripts disponibles

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente la versión de producción |
| `npm run seed` | Carga el catálogo inicial en Firestore |

---

## 4. Estructura de componentes

```text
moto-racing/
├── public/motos/               # Fotos de las motos
├── scripts/
│   └── seedFirestore.mjs       # Carga el catálogo en Firestore
└── src/
    ├── main.jsx                # BrowserRouter + CartProvider + App
    ├── App.jsx                 # NavBar, rutas y Footer
    ├── components/
    │   ├── NavBar/             # Marca, categorías y CartWidget
    │   ├── CartWidget/         # Ícono del carrito + contador
    │   ├── ItemListContainer/  # Lee productos de Firestore (todos o por categoría)
    │   ├── ItemList/           # Grilla de tarjetas
    │   ├── Item/               # Tarjeta de una moto
    │   ├── ItemDetailContainer/# Lee una moto de Firestore por id
    │   ├── ItemDetail/         # Ficha completa de la moto
    │   ├── ItemCount/          # Selector de cantidad con control de stock
    │   ├── Cart/               # Vista del carrito
    │   ├── Checkout/           # Formulario y creación de la orden
    │   ├── Loader/             # Indicador de carga
    │   ├── NotFound/           # Página 404
    │   └── Footer/
    ├── context/
    │   └── CartContext.jsx     # Estado global del carrito (CartProvider + useCart)
    ├── data/
    │   └── mockProducts.js     # Categorías y catálogo local (origen del seed y respaldo)
    ├── firebase/
    │   └── config.js           # Inicialización de Firebase y exportación de `db`
    ├── utils/
    │   └── formatPrice.js      # Formato de precios en pesos argentinos
    └── styles/global.css
```

### Responsabilidad de cada componente

Se separan los **contenedores** (buscan datos) de los componentes de **presentación** (solo muestran).

| Componente | Tipo | Qué hace |
| --- | --- | --- |
| `ItemListContainer` | Contenedor | Consulta la colección `productos`. Si la ruta trae `:categoriaId`, filtra con `where("categoria", "==", categoriaId)`. Maneja carga y error. |
| `ItemList` | Presentación | Recibe el array de productos y renderiza un `Item` por cada uno. Si está vacío, muestra un mensaje. |
| `Item` | Presentación | Tarjeta con foto, cilindrada, marca, nombre y precio. Marca "Sin stock" si corresponde. Enlaza al detalle. |
| `ItemDetailContainer` | Contenedor | Busca el documento por id con `getDoc`. Maneja carga y "no encontrada" y le pasa a `ItemDetail` la función para agregar al carrito. |
| `ItemDetail` | Presentación | Muestra ficha técnica, precio y el `ItemCount`. Tras agregar, reemplaza el selector por la confirmación. |
| `ItemCount` | Presentación | Selector de cantidad: mínimo 1, máximo el stock. |
| `Cart` | Presentación + Context | Lista de ítems, cambio de cantidades, quitar, vaciar, total y enlace al checkout. |
| `Checkout` | Contenedor | Valida el formulario, crea la orden en Firestore con `addDoc` y muestra el número de orden. |
| `CartWidget` | Presentación + Context | Muestra la cantidad total de unidades del carrito. |
| `NavBar` | Presentación | Marca y enlaces de categorías (se generan desde `categories` de `mockProducts.js`). |

---

## 5. Rutas

| Ruta | Componente | Descripción |
| --- | --- | --- |
| `/` | `ItemListContainer` | Catálogo completo |
| `/categoria/:categoriaId` | `ItemListContainer` | Catálogo filtrado (`motocross` o `enduro`) |
| `/producto/:id` | `ItemDetailContainer` | Detalle de una moto (por ejemplo `/producto/mx-002`) |
| `/carrito` | `Cart` | Carrito de compras |
| `/checkout` | `Checkout` | Finalización de la compra |
| `*` | `NotFound` | Cualquier ruta inexistente |

---

## 6. Context del carrito

El estado del carrito vive en `src/context/CartContext.jsx` y se comparte con toda la app. En `main.jsx`, el `CartProvider` envuelve a `<App />`, por lo que cualquier componente puede usar el hook `useCart()`.

### Estado

`carrito` es un array de ítems. Cada ítem guarda solo lo necesario para mostrarse y calcular totales:

```js
{
  id: "mx-002",
  nombre: "450 SX-F",
  marca: "KTM",
  precio: 17000,
  imagen: "/motos/ktm-450-sxf.jpg",
  stock: 3,
  cantidad: 2
}
```

### Valor que expone `useCart()`

| Propiedad | Tipo | Descripción |
| --- | --- | --- |
| `carrito` | `Array` | Ítems actuales |
| `agregarAlCarrito(producto, cantidad)` | Función | Agrega la moto. Si ya estaba, suma la cantidad **sin superar el stock** |
| `quitarDelCarrito(id)` | Función | Elimina un ítem |
| `actualizarCantidad(id, cantidad)` | Función | Cambia la cantidad, limitada entre 1 y el stock |
| `vaciarCarrito()` | Función | Deja el carrito vacío |
| `estaEnCarrito(id)` | Función | `true` si la moto ya está en el carrito |
| `cantidadTotal` | Número | Suma de unidades (la usa el `CartWidget`) |
| `totalCarrito` | Número | Suma de `cantidad × precio` |

### Detalles de implementación

- **Persistencia:** el carrito se lee de `localStorage` al iniciar (clave `moto-racing-carrito`) y se guarda cada vez que cambia. Ambas operaciones están dentro de `try/catch`, así que si el almacenamiento no está disponible la app sigue funcionando.
- **Actualizaciones inmutables:** todas las funciones usan `setCarrito((prev) => ...)`, sin modificar el estado directamente.
- **Uso seguro del hook:** `useCart()` lanza un error claro si se usa fuera de un `<CartProvider>`.

---

## 7. Colección de productos en Firestore

Colección: **`productos`**. El **id del documento** es un código legible (`mx-001`, `end-001`) y los campos son los siguientes:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `nombre` | string | Modelo (ej. `"450 SX-F"`) |
| `marca` | string | Fabricante (ej. `"KTM"`) |
| `categoria` | string | `"motocross"` o `"enduro"` (se usa para filtrar) |
| `cilindrada` | number | En cc |
| `motor` | string | `"4 tiempos"` o `"2 tiempos"` |
| `peso` | number | En kg |
| `precio` | number | En pesos argentinos |
| `stock` | number | Unidades disponibles |
| `anio` | number | Año del modelo |
| `descripcion` | string | Texto de la ficha |
| `imagen` | string | Ruta dentro de `public/` |

### Ejemplo de documento (`productos/mx-002`)

```json
{
  "nombre": "450 SX-F",
  "marca": "KTM",
  "categoria": "motocross",
  "cilindrada": 450,
  "motor": "4 tiempos",
  "peso": 102,
  "precio": 17000,
  "stock": 3,
  "anio": 2024,
  "descripcion": "Motor liviano con mapa de encendido seleccionable y chasis de cromo-molibdeno.",
  "imagen": "/motos/ktm-450-sxf.jpg"
}
```

### Catálogo inicial

| Id | Moto | Categoría | Precio | Stock |
| --- | --- | --- | --- | --- |
| `mx-001` | Yamaha YZ450F | motocross | 15.600 | 4 |
| `mx-002` | KTM 450 SX-F | motocross | 17.000 | 3 |
| `mx-003` | Husqvarna FC 450 | motocross | 16.800 | 2 |
| `end-001` | Gas Gas EC 300 | enduro | 15.800 | 5 |
| `end-002` | KTM 300 EXC | enduro | 16.700 | 4 |
| `end-003` | Husqvarna TE 300 | enduro | 16.500 | 3 |

---

## 8. Ejemplo de orden en Firestore

Cada compra confirmada crea un documento en la colección **`ordenes`** (id generado automáticamente por Firestore). Los datos de los ítems se guardan **copiados** en el momento de la compra.

```json
{
  "comprador": {
    "nombre": "Juan Pérez",
    "email": "juan.perez@example.com",
    "telefono": "1100000000"
  },
  "items": [
    { "id": "mx-002",  "nombre": "450 SX-F", "precio": 17000, "cantidad": 1 },
    { "id": "end-001", "nombre": "EC 300",   "precio": 15800, "cantidad": 2 }
  ],
  "total": 48600,
  "fecha": "<Timestamp asignado por el servidor de Firestore>"
}
```

Cuentas del ejemplo: `17000 × 1 + 15800 × 2 = 48600`.

El código que la genera (`Checkout.jsx`):

```js
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

const referencia = await addDoc(collection(db, "ordenes"), orden);
// referencia.id es el número de orden que se le muestra al usuario
```

> Los datos del comprador de este ejemplo son ficticios.

---

## 9. Flujos de uso

### Compra completa

1. En `/` el usuario ve las 6 motos y puede filtrar con **Motocross** o **Enduro**.
2. Entra a una moto (por ejemplo `/producto/mx-002`) y elige la cantidad con `ItemCount`.
3. Presiona **Agregar al carrito**: el contador de la barra de navegación se actualiza.
4. En `/carrito` revisa cantidades y total, y presiona **Finalizar compra**.
5. En `/checkout` completa nombre, email y teléfono y presiona **Confirmar compra**.
6. Se crea el documento en `ordenes`, el carrito se vacía y aparece el mensaje con el **número de orden**.

### Control de stock

La KTM 450 SX-F tiene stock 3:

- Agregás 2 unidades → el carrito tiene 2.
- Volvés al detalle y agregás 2 más → el carrito queda en **3** (no en 4), porque `agregarAlCarrito` limita a `stock`.
- En `/carrito` el botón **+** queda deshabilitado al llegar a 3.

### Validaciones del checkout

| Campo | Regla | Mensaje de error |
| --- | --- | --- |
| Nombre | No puede estar vacío | "Ingresá tu nombre y apellido." |
| Email | Formato `algo@dominio.ext` | "Ingresá un email válido." |
| Teléfono | No puede estar vacío | "Ingresá un teléfono de contacto." |

---

## 10. Decisiones de diseño

- **Context API en lugar de librerías de estado.** El estado global es solo el carrito, así que `useState` + Context alcanza y no suma dependencias.
- **Contenedores y componentes de presentación separados.** Los contenedores buscan datos y manejan carga/error; los demás solo reciben props. Eso hace a cada componente más simple de entender y reutilizar.
- **Ids legibles como id de documento** (`mx-002`). Facilitan las URLs (`/producto/mx-002`), el seed repetible (`set` sobre el mismo id no duplica) y la lectura directa con `getDoc`.
- **Filtrado por categoría en la consulta** (`where`), en vez de traer todo y filtrar en el cliente.
- **Catálogo local como fuente única del seed y como respaldo.** `mockProducts.js` alimenta a Firestore y, si la conexión falla, evita que la tienda quede vacía.
- **La orden guarda una copia de nombre y precio de cada ítem.** Así el registro de la compra no cambia si después se modifica el catálogo.
- **Persistencia del carrito en `localStorage`.** Recargar la página no hace perder la compra en curso.
- **Precios con `Intl.NumberFormat("es-AR")`.** Un único helper (`formatPrice`) da formato de pesos consistente en toda la app.
- **Accesibilidad básica:** textos alternativos en las fotos, `aria-label` en botones de ícono y `role="status"` en los mensajes de confirmación.

---

## 11. Dificultades encontradas y soluciones

| Dificultad | Solución aplicada |
| --- | --- |
| Distinguir una **categoría sin motos** de un **error de conexión**: mostrar el catálogo local en ambos casos ocultaba el estado real de la base. | Si Firestore responde (aunque sin documentos), se muestra ese resultado. Solo si la consulta **falla** (`catch`) se usa el catálogo local, con un aviso visible. Lo mismo en el detalle: documento inexistente = "no encontrada"; error de conexión = respaldo local. |
| **Credenciales de Firebase** no deben publicarse en un repositorio público. | La configuración se lee de variables `VITE_*` (`import.meta.env`). `.env` y `serviceAccountKey.json` están en `.gitignore` y se incluye un `.env.example` sin valores. |
| El script `seed` **falla en Windows** al importar dinámicamente `mockProducts.js` con una ruta como `C:\...`. | Se convierte la ruta con `pathToFileURL`, porque `import()` necesita una URL `file://`. |
| El **carrito se perdía** al recargar la página. | Se persiste en `localStorage` con lectura inicial perezosa y `try/catch` por si el almacenamiento no está disponible. |
| El usuario podía **superar el stock** desde distintos lugares (selector, carrito, agregar dos veces). | El límite se aplica en `ItemCount`, en `agregarAlCarrito` (`Math.min`) y en `actualizarCantidad`. |
| Errores poco claros al usar el Context fuera del provider. | `useCart()` lanza un mensaje explícito si no hay `CartProvider`. |

---

## 12. Seguridad y credenciales

- **Nunca** subas `.env` ni `serviceAccountKey.json`. La clave de servicio da acceso administrador a tu proyecto de Firebase; si se filtra, generá una nueva y revocá la anterior desde la consola.
- Las variables `VITE_*` terminan incluidas en el código del navegador, por lo que la protección real de los datos depende de las **reglas de Firestore**. Reglas sugeridas para este proyecto (lectura pública del catálogo, y las órdenes solo se pueden crear):

```text
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{id} {
      allow read: if true;
      allow write: if false;
    }
    match /ordenes/{id} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

El script `seed` usa el Admin SDK, que no está sujeto a estas reglas.

---

## 13. Limitaciones actuales

- Al confirmar una compra **no se descuenta el stock** en Firestore: el control de stock es de visualización y del carrito.
- No hay autenticación de usuarios: la orden guarda los datos que el comprador escribe en el formulario.
- No hay pasarela de pago.
