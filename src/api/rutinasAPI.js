import { solicitudAPI } from "./manejoAPI";
const FOTOS_BASE_URL = import.meta.env.VITE_FOTOS_BASE_URL;

export async function obtenerRutinasAsignadas(clienteId) {
  return solicitudAPI("/rutinas/asignadas", {
    params: { clienteId }
  });
}

export async function obtenerInformacionRutina(rutinaId) {
  const res = await solicitudAPI("/rutinas/informacionRutina", {
    params: { rutinaId }
  });

  if (res.ok) {
    const rutinaConUrls = {
      ...res.data,
      ejercicios: res.data.ejercicios.map(ej => ({
        ...ej,
        imagenBaseUrl: ej.imagenBaseUrl
          ? `${FOTOS_BASE_URL}${ej.imagenBaseUrl.replace(/^\//, "")}`
          : null,
        mediasURL: ej.mediasURL?.map(url =>
          url.startsWith("/")
            ? `${FOTOS_BASE_URL}${url.replace(/^\//, "")}`
            : url
        )
      }))
    };
    return { ok: true, data: rutinaConUrls };
  }
  return res;
}

export async function obtenerInformacionEjercicio(ejercicioId) {
  return solicitudAPI(`/rutinas/ejercicio/${ejercicioId}`);
}

export async function registrarSesionEntrenamiento(sesionData) {
  return solicitudAPI("/rutinas/sesion", {
    method: "POST",
    body: sesionData
  });
}

export async function obtenerHistorialSesiones(clienteId) {
  return solicitudAPI("/rutinas/historial", {
    params: { clienteId }
  });
}

export async function obtenerSesionEntrenamiento(sesionId) {
  return solicitudAPI("/rutinas/sesionEntrenamiento", {
    params: { sesionId }
  });
}
