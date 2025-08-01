const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function obtenerNoLeidas() {
  const token = localStorage.getItem('token');
  const usuarioId = localStorage.getItem('usuarioId');
  const rol = localStorage.getItem('rol');

  try {
    const response = await fetch(`${BASE_URL}/notificaciones/no-leidas?usuarioId=${usuarioId}&rol=${rol}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { ok: true, data: data.data };
    } else {
      return { ok: false, error: data.message || 'Error al obtener notificaciones' };
    }
  } catch (err) {
    return { ok: false, error: 'Error de red' };
  }
}
