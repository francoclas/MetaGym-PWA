import localforage from "localforage";

// configurar bd para usar
localforage.config({
  name: "MetaGymApp",       
  storeName: "almacenDatos" 
});

//guardar datos
export async function guardarDato(clave, valor) {
  try {
    await localforage.setItem(clave, valor);
  } catch (error) {
    console.error(`Error guardando ${clave}:`, error);
  }
}

//obtener datos
export async function obtenerDato(clave) {
  try {
    return await localforage.getItem(clave);
  } catch (error) {
    console.error(`Error obteniendo ${clave}:`, error);
    return null;
  }
}

//eliminar datos
export async function borrarDato(clave) {
  try {
    await localforage.removeItem(clave);
  } catch (error) {
    console.error(`Error borrando ${clave}:`, error);
  }
}

//limpiar todo el almacenamiento
export async function limpiarTodo() {
  try {
    await localforage.clear();
  } catch (error) {
    console.error("Error limpiando almacenamiento:", error);
  }
}

export default localforage;
