// Carga el catálogo de src/data/mockProducts.js dentro de la colección
// "productos" de Firestore. Se ejecuta una sola vez (o cada vez que se
// quiera resetear el catálogo de prueba) con: npm run seed
//
// Requiere una clave de cuenta de servicio de Firebase (NO se comparte
// con nadie: es distinta de las credenciales del cliente en .env).
// Pasos:
//   1. Firebase Console > Configuración del proyecto > Cuentas de servicio.
//   2. "Generar nueva clave privada" y guardarla como serviceAccountKey.json
//      en la raíz del proyecto (ya está en .gitignore).
//   3. Ejecutar: npm run seed

import { readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(__dirname, "..");

let serviceAccount;
try {
  serviceAccount = JSON.parse(
    readFileSync(path.join(raiz, "serviceAccountKey.json"), "utf-8")
  );
} catch (error) {
  console.error(
    "No se encontró serviceAccountKey.json en la raíz del proyecto.\n" +
      "Generalo desde Firebase Console > Configuración del proyecto > Cuentas de servicio.\n"
  );
  process.exit(1);
}

// pathToFileURL es necesario para que funcione en Windows: import()
// dinámico requiere una URL (file://...), no una ruta cruda tipo "C:\...".
const rutaMockProducts = pathToFileURL(
  path.join(raiz, "src", "data", "mockProducts.js")
);
const { mockProducts } = await import(rutaMockProducts);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function seed() {
  const coleccion = db.collection("productos");
  let cargados = 0;

  for (const producto of mockProducts) {
    const { id, ...datos } = producto;
    await coleccion.doc(id).set(datos);
    cargados += 1;
    console.log(`✓ ${datos.nombre}`);
  }

  console.log(`\nListo: ${cargados} motos cargadas en Firestore.`);
  process.exit(0);
}

seed().catch((error) => {
  console.error("Error al cargar el catálogo:", error);
  process.exit(1);
});
