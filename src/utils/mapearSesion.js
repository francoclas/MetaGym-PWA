import storage from "./storage";
import { obtenerDato, borrarDato } from "./storage";
import { registrarSesionEntrenamiento } from "../api/rutinasAPI";

/**
 * Inicia una sesión de entrenamiento guardando la info en IndexedDB/localforage.
 * @param {object} rutinaApiData Datos de la rutina, incluyendo asignacionId
 */
export async function iniciarSesionEntrenamiento(rutinaApiData) {
  const clienteId = parseInt(localStorage.getItem("usuarioId"), 10);
  const ahora = new Date().toISOString();

  // Mapeo la sesión, usando asignacionId como rutinaId
  const sesion = {
    rutinaId: rutinaApiData.asignacionId, // 🔹 Usamos el id de la relación cliente-rutina
    sesionRutinaId: 0, // lo genera el API
    clienteId: clienteId,
    nombreRutina: rutinaApiData.nombreRutina,
    fecha: ahora,
    duracionMin: 0,
    ejercicios: rutinaApiData.ejercicios.map(ej => ({
      ejercicioId: ej.id,
      nombreEjercicio: ej.nombre,
      imagenBaseUrl: ej.imagenBaseUrl || null,
      mediasURL: ej.mediasURL || [],
      seRealizo: false,
      observaciones: "",
      series: [],
      mediciones: (ej.medicionesDTO || []).map(m => ({
        ejercicioRealizadoId: 0,
        medicionId: m.medicionId,
        nombreMedicion: m.nombre,
        unidad: m.unidad,
        descripcion: m.desc,
        valor: null
      }))
    }))
  };

  // Guardar en localforage
  await storage.setItem("entrenamientoActivo", sesion);
}

/**
 * Finaliza la sesión activa enviando los datos al API.
 */
export async function finalizarEntrenamiento() {
  // Cargar sesión activa desde IndexedDB/localforage
  const sesion = await obtenerDato("entrenamientoActivo");
  if (!sesion) {
    return { ok: false, error: "No hay entrenamiento activo para finalizar" };
  }

  // Construir payload según API
  const payload = {
    rutinaId: sesion.rutinaId, // 🔹 Este ya es el asignacionId
    sesionRutinaId: sesion.sesionRutinaId || 0,
    clienteId: sesion.clienteId,
    nombreRutina: sesion.nombreRutina,
    fecha: new Date().toISOString(),
    duracionMin: sesion.duracionMin || 0,
    ejercicios: sesion.ejercicios.map(ej => ({
      ejercicioId: ej.ejercicioId,
      nombreEjercicio: ej.nombreEjercicio,
      seRealizo: ej.seRealizo,
      observaciones: ej.observaciones || "",
      series: ej.series.map(s => ({
        repeticiones: s.repeticiones || 0,
        pesoUtilizado: s.pesoUtilizado || 0
      })),
      mediciones: ej.mediciones.map(m => ({
        ejercicioRealizadoId: m.ejercicioRealizadoId || 0,
        medicionId: m.medicionId || 0,
        nombreMedicion: m.nombreMedicion,
        unidad: m.unidad,
        descripcion: m.descripcion,
        valor: m.valor || ""
      }))
    }))
  };

  // Llamar al API
  const res = await registrarSesionEntrenamiento(payload);

  // Si se envió correctamente, eliminar sesión local
  if (res.ok) {
    await borrarDato("entrenamientoActivo");
  }

  return res;
}
