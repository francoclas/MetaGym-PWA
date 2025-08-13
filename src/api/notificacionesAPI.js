const BASE_URL = import.meta.env.VITE_API_BASE_URL;
function authParams() {
  return {
    token: localStorage.getItem('token'),
    usuarioId: localStorage.getItem('usuarioId'),
    rol: localStorage.getItem('rol')
  };
}

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
export async function obtenerLeidas() {
  const { token, usuarioId, rol } = authParams();
  try {
    const r = await fetch(
      `${BASE_URL}/notificaciones/leidas?usuarioId=${usuarioId}&rol=${rol}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await r.json();
    return r.ok && data.success
      ? { ok: true, data: data.data }
      : { ok: false, error: data.message || "Error al obtener leídas" };
  } catch {
    return { ok: false, error: "Error de red" };
  }
}

export async function marcarNotificacionLeida(id) {
  const { token, usuarioId, rol } = authParams();
  try {
    const r = await fetch(
      `${BASE_URL}/notificaciones/${id}/leer?usuarioId=${usuarioId}&rol=${rol}`,
      { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
    );
    // 204 No Content esperado
    return r.ok ? { ok: true } : { ok: false, error: "No se pudo marcar como leída" };
  } catch {
    return { ok: false, error: "Error de red" };
  }
}

export async function marcarTodasLeidas() {
  const { token, usuarioId, rol } = authParams();
  try {
    const r = await fetch(
      `${BASE_URL}/notificaciones/leer-todas?usuarioId=${usuarioId}&rol=${rol}`,
      { method: "PATCH", headers: { Authorization: `Bearer ${token}` } }
    );
    return r.ok ? { ok: true } : { ok: false, error: "No se pudieron marcar todas" };
  } catch {
    return { ok: false, error: "Error de red" };
  }
}

export async function contarNoLeidas() {
  const { token, usuarioId, rol } = authParams();
  try {
    const r = await fetch(
      `${BASE_URL}/notificaciones/no-leidas/contar?usuarioId=${usuarioId}&rol=${rol}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await r.json();
    return r.ok && data.success
      ? { ok: true, data: data.data } // número
      : { ok: false, error: data.message || "Error al contar no leídas" };
  } catch {
    return { ok: false, error: "Error de red" };
  }
}