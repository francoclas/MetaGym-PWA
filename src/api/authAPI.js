import { solicitudAPI } from "./manejoAPI";
export async function loginUsuario(nombreusuario, password) {
  return solicitudAPI("/usuario/login", {
    method: "POST",
    body: { nombreusuario, password }
  });
}