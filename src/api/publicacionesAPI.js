const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function obtenerPublicaciones() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}/publicaciones`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        ok: true,
        data: data.data
      };
    } else {
      return {
        ok: false,
        error: data.message || 'Error al obtener publicaciones'
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: 'Error de red o servidor no disponible'
    };
  }
}
