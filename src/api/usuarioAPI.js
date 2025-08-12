const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function obtenerPerfilUsuario(usuarioId, rol = "Cliente") {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${BASE_URL}/usuario/perfil?usuarioId=${usuarioId}&rol=${rol}`,
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
        error: data.message || "Error al obtener el perfil del usuario",
      };
    }
  } catch (error) {
    return { ok: false, error: "Error de red o servidor no disponible" };
  }
}
