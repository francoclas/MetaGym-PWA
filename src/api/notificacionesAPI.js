// notificacionesAPI.js
import { solicitudAPI } from "./manejoAPI";

function authParams() {
  return {
    token: localStorage.getItem('token'),
    usuarioId: localStorage.getItem('usuarioId'),
    rol: localStorage.getItem('rol')
  };
}

export function obtenerNoLeidas() {
  const { usuarioId, rol } = authParams();
  return solicitudAPI(`/notificaciones/no-leidas`, {
    params: { usuarioId, rol }
  });
}

export function obtenerLeidas() {
  const { usuarioId, rol } = authParams();
  return solicitudAPI(`/notificaciones/leidas`, {
    params: { usuarioId, rol }
  });
}

export function marcarNotificacionLeida(id) {
  const { usuarioId, rol } = authParams();
  return solicitudAPI(`/notificaciones/${id}/leer`, {
    method: "PATCH",
    params: { usuarioId, rol }
  });
}

export function marcarTodasLeidas() {
  const { usuarioId, rol } = authParams();
  return solicitudAPI(`/notificaciones/leer-todas`, {
    method: "PATCH",
    params: { usuarioId, rol }
  });
}

export function contarNoLeidas() {
  const { usuarioId, rol } = authParams();
  return solicitudAPI(`/notificaciones/no-leidas/contar`, {
    params: { usuarioId, rol }
  });
}
