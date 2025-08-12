// src/utils/gestionEntrenamiento.js
import { obtenerDato, guardarDato, borrarDato } from "./storage";
import { registrarSesionEntrenamiento } from "../api/rutinasAPI";

/**
 * Carga la sesión de entrenamiento desde storage
 */
export async function cargarSesionEntrenamiento(navigate) {
  const s = await obtenerDato("entrenamientoActivo");
  if (!s) {
    navigate("/");
    return null;
  }
  return s;
}

/**
 * Inicializa el contador de segundos desde duracionMin
 */
export function inicializarSegundos(sesion) {
  return (sesion?.duracionMin || 0) * 60;
}

/**
 * Guarda la duración actualizada en minutos
 */
export async function actualizarDuracion(sesion, segundos) {
  const minutos = Math.floor(segundos / 60);
  const sesionActualizada = { ...sesion, duracionMin: minutos };
  await guardarDato("entrenamientoActivo", sesionActualizada);
  return sesionActualizada;
}

/**
 * Finaliza el entrenamiento y lo envía al API
 */
export async function finalizarEntrenamiento() {
  const sesion = await obtenerDato("entrenamientoActivo");
  if (!sesion) {
    return { ok: false, error: "No hay entrenamiento activo para finalizar" };
  }

  const payload = {
    rutinaId: sesion.rutinaId,
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

  const res = await registrarSesionEntrenamiento(payload);

  if (res.ok) {
    await borrarDato("entrenamientoActivo");
  }

  return res;
}

/**
 * Descarta el entrenamiento
 */
export async function descartarEntrenamiento() {
  await borrarDato("entrenamientoActivo");
}
