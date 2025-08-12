const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const FOTOS_BASE_URL = import.meta.env.VITE_FOTOS_BASE_URL;

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
      // Mapeamos para concatenar la URL base a cada media
      const publicacionesConUrls = data.data.map(pub => ({
        ...pub,
        imagenAutorURL: pub.imagenAutorURL
          ? pub.imagenAutorURL.startsWith('/')
            ? `${FOTOS_BASE_URL}${pub.imagenAutorURL.replace(/^\//, '')}`
            : pub.imagenAutorURL
          : null,
        urlsMedia: pub.urlsMedia?.map(url =>
          url.startsWith('/') ? `${FOTOS_BASE_URL}${url.replace(/^\//, '')}` : url
        )
      }));

      return {
        ok: true,
        data: publicacionesConUrls
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

export async function alternarLikePublicacion(idPublicacion) {
  const token = localStorage.getItem('token');
  const usuarioId = localStorage.getItem('usuarioId');
  const rol = localStorage.getItem('rol');

  try {
    const response = await fetch(
      `${BASE_URL}/publicaciones/${idPublicacion}/like?usuarioId=${usuarioId}&rol=${rol}`,
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
      return { ok: false, error: data.message || 'Error al alternar like' };
    }
  } catch (err) {
    return { ok: false, error: 'Error de red o servidor no disponible' };
  }
}