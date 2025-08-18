import { solicitudAPI } from "./manejoAPI";

// 1. Agregar comentario o respuesta
export async function agregarComentario({ publicacionId, contenido, comentarioPadreId = null }) {
  const autorId = localStorage.getItem("usuarioId");
  const rolAutor = localStorage.getItem("rol");

  return solicitudAPI("/comentarios", {
    method: "POST",
    body: {
      publicacionId,
      contenido,
      comentarioPadreId,
      autorId: parseInt(autorId),
      rolAutor
    }
  });
}

// 2. Editar un comentario propio
export async function editarComentario(comentarioId, nuevoContenido) {
  const usuarioId = localStorage.getItem("usuarioId");

  return solicitudAPI(`/comentarios/${comentarioId}`, {
    method: "PUT",
    params: {
      nuevoContenido,
      usuarioId
    }
  });
}

// 3. Alternar like en comentario
export async function alternarLikeComentario(comentarioId) {
  const usuarioId = localStorage.getItem("usuarioId");
  const rol = localStorage.getItem("rol");

  return solicitudAPI(`/comentarios/${comentarioId}/like`, {
    method: "PATCH",
    params: {
      usuarioId,
      rol
    }
  });
}
