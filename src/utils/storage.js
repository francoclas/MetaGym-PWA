import localforage from "localforage";

// Configuración base de IndexedDB/localStorage (automático por localforage)
localforage.config({
  name: "MetaGymApp",       // Nombre de la base de datos
  storeName: "almacenDatos" // Nombre del almacén
});

// Función para guardar datos
export async function guardarDato(clave, valor) {
  try {
    await localforage.setItem(clave, valor);
  } catch (error) {
    console.error(`Error guardando ${clave}:`, error);
  }
}

// Función para obtener datos
export async function obtenerDato(clave) {
  try {
    return await localforage.getItem(clave);
  } catch (error) {
    console.error(`Error obteniendo ${clave}:`, error);
    return null;
  }
}

// Función para eliminar datos
export async function borrarDato(clave) {
  try {
    await localforage.removeItem(clave);
  } catch (error) {
    console.error(`Error borrando ${clave}:`, error);
  }
}

// Función para limpiar todo el almacenamiento
export async function limpiarTodo() {
  try {
    await localforage.clear();
  } catch (error) {
    console.error("Error limpiando almacenamiento:", error);
  }
}

export default localforage;
