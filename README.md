# 🏍️ Moto Racing – E-commerce de motos off-road

Aplicación web de comercio electrónico desarrollada con **React JS** y **Firebase Firestore**. Permite explorar un catálogo de motos de motocross y enduro, ver el detalle de cada una, armar un carrito y generar una orden de compra con un ID único de seguimiento.

---

## 📌 1. Funcionalidades principales

- **Catálogo interactivo:** los productos se leen en tiempo real desde Firestore, con *loader* mientras se cargan los datos.
- **Filtrado por categorías:** `motocross`, `enduro` y `todo`, con rutas dinámicas (`/category/:id`).
- **Detalle de producto:** información de la moto, control de stock y selector de cantidad (`/item/:id`).
- **Carrito de compras:** agregar, quitar y actualizar cantidades, con subtotales y total calculados automáticamente.
- **Checkout y confirmación:** formulario con validación de datos del comprador, registro de la orden en Firestore y pantalla final con el ID de la orden.

---

## 🧭 2. Recorrido del usuario

1. **Inicio:** el usuario llega al catálogo general de motos.
2. **Navegación:** filtra por motocross o enduro desde el menú superior.
3. **Selección:** entra al detalle de una moto, elige la cantidad y la agrega al carrito.
4. **Revisión:** en `/cart` verifica los productos y el total.
5. **Compra:** completa sus datos en el checkout y recibe el comprobante con el ID de la orden.

---

## 🧰 3. Tecnologías

- React JS
- React Router DOM
- Firebase (Firestore)
- CSS
- Node.js y npm

---

## ⚙️ 4. Instalación y ejecución local

### Requisitos previos
- Node.js 18 o superior
- npm

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/TU-REPOSITORIO.git
   cd TU-REPOSITORIO
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear un archivo `.env` en la raíz tomando como referencia `.env.example` y completarlo con los datos de tu proyecto de Firebase (los nombres de las variables dependen de si usás Vite o Create React App; copialos de tu `.env.example`):
   ```env
   VITE_FIREBASE_API_KEY=tu_api_key
   VITE_FIREBASE_AUTH_DOMAIN=tu_auth_domain
   VITE_FIREBASE_PROJECT_ID=tu_project_id
   VITE_FIREBASE_STORAGE_BUCKET=tu_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
   VITE_FIREBASE_APP_ID=tu_app_id
   ```
   > El archivo `.env` está en `.gitignore`: **nunca** se sube al repositorio.

4. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   (o `npm start`, según el bundler del proyecto)

---

## 🏗️ 5. Estructura y arquitectura

```
src/
├── components/   # Presentación: NavBar, ItemListContainer, ItemDetail, Cart, Checkout...
├── context/      # CartContext (estado global del carrito)
├── services/     # Acceso a Firestore (productos y órdenes)
└── firebase/     # Inicialización de Firebase con variables de entorno
public/
└── motos/        # Fotos de las motos del catálogo
```

### Context del carrito
`CartContext` usa `useContext` y `useState` para compartir el carrito en toda la app sin *prop drilling*. Expone funciones para agregar, quitar y vaciar el carrito, además del total de unidades y el total a pagar.

### Ruteo
`react-router-dom` maneja las rutas `/`, `/category/:id`, `/item/:id`, `/cart` y `/checkout`, leyendo los parámetros con `useParams`.

---

## 🗄️ 6. Base de datos (Firestore)

### Colección `products`

Cada documento representa una moto del catálogo (Yamaha YZ450F, KTM 450, Husqvarna 450, Gas Gas 300, KTM 300, Husqvarna 300).

```json
{
  "name": "Yamaha YZ450F",
  "category": "motocross",
  "price": 0,
  "stock": 0,
  "description": "Descripción de la moto",
  "image": "/motos/yamaha-450.jpg"
}
```
> Reemplazá los valores por los reales de tu colección.

### Colección `orders`

Ejemplo de orden generada al confirmar la compra:

```json
{
  "buyer": {
    "name": "Juan Pérez",
    "phone": "2600000000",
    "email": "juan@correo.com"
  },
  "items": [
    { "id": "abc123", "name": "KTM 300", "price": 0, "quantity": 1 }
  ],
  "total": 0,
  "date": "2026-09-30T12:00:00Z"
}
```

El ID del documento creado es el que se muestra al usuario como comprobante.

---

## 🧠 7. Decisiones de diseño

- **Estructura modular:** carpetas separadas para componentes, contexto y servicios, para dividir presentación, lógica y acceso a datos.
- **Servicios desacoplados:** las consultas a Firestore viven en `services/`, no dentro de los componentes.
- **Estado global del carrito:** un solo Context evita pasar props entre componentes lejanos.
- **Credenciales fuera del código:** la configuración de Firebase se lee desde variables de entorno.

---

## 🛠️ 8. Dificultades y soluciones

- **Stock vs. carrito:** se valida en el detalle y en el contexto que no se agreguen más unidades que el stock disponible.
- **Cargas asíncronas:** se manejan estados de `loading` y error para no renderizar datos incompletos antes de que responda Firestore.
- **Seguridad:** se eliminaron las claves y configuraciones sensibles del repositorio y se documentó un `.env.example` sin valores reales.

---

## 👤 Autor

Desarrollado por **Adrián Márquez** – Proyecto Final del curso de React JS.
