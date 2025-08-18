import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function solicitudAPI(
  endpoint,
  { method = "GET", body = null, params = {}, mostrarError = true } = {}
) {
  try {
    const token = localStorage.getItem("token");

    const query = new URLSearchParams(params).toString();
    const url = `${BASE_URL}${endpoint}${query ? `?${query}` : ""}`;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    let data;
    try {
      data = await response.json();
    } catch {
      data = { success: false, message: "Respuesta inválida del servidor" };
    }

    if (response.status === 401) {
      if (mostrarError) toast.error(data.message || "Sesión expirada");
      localStorage.clear();
      window.dispatchEvent(new Event("token-updated"));
      return { ok: false, error: data.message || "Sesión expirada" };
    }

    if (!response.ok || data.success === false) {
      if (mostrarError) toast.error(data.message || "Error en la operación");
      return { ok: false, error: data.message || "Error en la operación" };
    }

    return { ok: true, data: data.data ?? data };
  } catch (error) {
    if (mostrarError) toast.error("Error de red o servidor no disponible");
    return { ok: false, error: "Error de red o servidor no disponible" };
  }
}
