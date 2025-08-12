const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 1. Agregar comentario o respuesta
export async function agregarComentario({ publicacionId, contenido, comentarioPadreId = null }) {
  const token = localStorage.getItem('token');
  const autorId = localStorage.getItem('usuarioId');
  const rolAutor = localStorage.getItem('rol');

  try {
    const response = await fetch(`${BASE_URL}/comentarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        publicacionId,
        contenido,
        comentarioPadreId, // ahora null si no es respuesta
        autorId: parseInt(autorId),
        rolAutor
      })
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return { ok: true, data: data.data };
    } else {
      return { ok: false, error: data.message || 'Error al agregar comentario' };
    }
  } catch (err) {
    return { ok: false, error: 'Error de red o servidor no disponible' };
  }
}

// 2. Editar un comentario propio
export async function editarComentario(comentarioId, nuevoContenido) {
  const token = localStorage.getItem('token');
  const usuarioId = localStorage.getItem('usuarioId');

  try {
    const response = await fetch(
      `${BASE_URL}/comentarios/${comentarioId}?nuevoContenido=${encodeURIComponent(
        nuevoContenido
      )}&usuarioId=${usuarioId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return { ok: true, data: data.data };
    } else {
      return { ok: false, error: data.message || 'Error al editar comentario' };
    }
  } catch (err) {
    return { ok: false, error: 'Error de red o servidor no disponible' };
  }
}

// 3. Alternar like en comentario
export async function alternarLikeComentario(comentarioId) {
  const token = localStorage.getItem('token');
  const usuarioId = localStorage.getItem('usuarioId');
  const rol = localStorage.getItem('rol');

  try {
    const response = await fetch(
      `${BASE_URL}/comentarios/${comentarioId}/like?usuarioId=${usuarioId}&rol=${rol}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      return { ok: true, data: data.data };
    } else {
      return { ok: false, error: data.message || 'Error al alternar like del comentario' };
    }
  } catch (err) {
    return { ok: false, error: 'Error de red o servidor no disponible' };
  }
}
