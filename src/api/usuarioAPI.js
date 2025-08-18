import { solicitudAPI } from "./manejoAPI";

export async function obtenerPerfilUsuario(usuarioId, rol = "Cliente") {
  return solicitudAPI("/usuario/perfil", {
    params: { usuarioId, rol }
  });
}

export async function actualizarNombre(id, usuario, nombreNuevo, rol) {
  return solicitudAPI(`/usuario/${id}/nombre`, {
    method: "PATCH",
    params: { usuario, nombreNuevo, rol }
  });
}

export async function actualizarCorreo(id, usuario, correoNuevo, rol) {
  return solicitudAPI(`/usuario/${id}/correo`, {
    method: "PATCH",
    params: { usuario, correoNuevo, rol }
  });
}

export async function actualizarTelefono(id, usuario, telefonoNuevo, rol) {
  return solicitudAPI(`/usuario/${id}/telefono`, {
    method: "PATCH",
    params: { usuario, telefonoNuevo, rol }
  });
}

export async function actualizarPassword(id, usuario, nuevaPassword, confPassword, rol) {
  return solicitudAPI(`/usuario/${id}/password`, {
    method: "PATCH",
    params: { usuario, nuevaPassword, confPassword, rol }
  });
}
