// publicacionesAPI.js
import { solicitudAPI } from "./manejoAPI";

const FOTOS_BASE_URL = import.meta.env.VITE_FOTOS_BASE_URL;

function mapearURLs(publicaciones) {
  return (publicaciones || []).map(pub => ({
    ...pub,
    imagenAutorURL: pub.imagenAutorURL
      ? pub.imagenAutorURL.startsWith("/")
        ? `${FOTOS_BASE_URL}${pub.imagenAutorURL.replace(/^\//, "")}`
        : pub.imagenAutorURL
      : null,
    urlsMedia: pub.urlsMedia?.map(url =>
      url.startsWith("/") ? `${FOTOS_BASE_URL}${url.replace(/^\//, "")}` : url
    ) || []
  }));
}

export async function obtenerPublicaciones() {
  const res = await solicitudAPI(`/publicaciones`);
  if (res.ok) {
    return { ok: true, data: mapearURLs(res.data) };
  }
  return res; // devuelve el error gestionado
}

export async function alternarLikePublicacion(idPublicacion) {
  const usuarioId = localStorage.getItem("usuarioId");
  const rol = localStorage.getItem("rol");
  return solicitudAPI(`/publicaciones/${idPublicacion}/like`, {
    method: "PATCH",
    params: { usuarioId, rol }
  });
}

export async function obtenerNovedades() {
  const res = await solicitudAPI(`/publicaciones/novedades`);
  if (res.ok) {
    return { ok: true, data: mapearURLs(res.data) };
  }
  return res;
}
