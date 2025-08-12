const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const FOTOS_BASE_URL = import.meta.env.VITE_FOTOS_BASE_URL;
export async function obtenerRutinasAsignadas(clienteId) {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch(
      `${BASE_URL}/rutinas/asignadas?clienteId=${clienteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return { ok: true, data: data.data };
    } else {
      return { ok: false, error: data.message || 'Error al obtener rutinas asignadas' };
    }
  } catch (error) {
    return { ok: false, error: 'Error de red o servidor no disponible' };
  }
}
export async function obtenerInformacionRutina(rutinaId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/rutinas/informacionRutina?rutinaId=${rutinaId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      // Ajustamos las URLs de las imágenes
      const rutinaConUrls = {
        ...data.data,
        ejercicios: data.data.ejercicios.map(ej => ({
          ...ej,
          imagenBaseUrl: ej.imagenBaseUrl
            ? `${FOTOS_BASE_URL}${ej.imagenBaseUrl.replace(/^\//, "")}`
            : null,
          mediasURL: ej.mediasURL?.map(url =>
            url.startsWith("/") ? `${FOTOS_BASE_URL}${url.replace(/^\//, "")}` : url
          )
        }))
      };

      return { ok: true, data: rutinaConUrls };
    } else {
      return { ok: false, error: data.message || "Error al obtener información de rutina" };
    }
  } catch (error) {
    return { ok: false, error: "Error de red o servidor no disponible" };
  }
}
export async function obtenerInformacionEjercicio(ejercicioId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/rutinas/ejercicio/${ejercicioId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return { ok: true, data: data.data };
    } else {
      return {
        ok: false,
        error: data.message || "Error al obtener información del ejercicio",
      };
    }
  } catch (error) {
    return { ok: false, error: "Error de red o servidor no disponible" };
  }
}
export async function registrarSesionEntrenamiento(sesionData) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}/rutinas/sesion`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sesionData)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { ok: true, data: data.data };
    } else {
      return {
        ok: false,
        error: data.message || "Error al registrar la sesión de entrenamiento"
      };
    }
  } catch (error) {
    return { ok: false, error: "Error de red o servidor no disponible" };
  }
}
export async function obtenerHistorialSesiones(clienteId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/rutinas/historial?clienteId=${clienteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return { ok: true, data: data.data };
    } else {
      return { ok: false, error: data.message || "Error al obtener historial de sesiones" };
    }
  } catch (error) {
    return { ok: false, error: "Error de red o servidor no disponible" };
  }
}
export async function obtenerSesionEntrenamiento(sesionId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/rutinas/sesionEntrenamiento?sesionId=${sesionId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        }
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return { ok: true, data: data.data };
    } else {
      return { ok: false, error: data.message || "Error al obtener sesión" };
    }
  } catch (error) {
    return { ok: false, error: "Error de red o servidor no disponible" };
  }
}
