import { solicitudAPI } from "./manejoAPI";

export function obtenerCitasCliente(clienteId, estadoEnum, rol) {
  const params = { clienteId, rol };

  if (estadoEnum !== undefined && estadoEnum !== null && estadoEnum !== "") {
    params.estadoEnum = estadoEnum;
  }

  return solicitudAPI(`/cita/cliente`, {
    params
  });
}
export function obtenerDetallesCita(citaId, rol) {
  return solicitudAPI(`/cita/${citaId}/detalles`, {
    params: { rol }
  });
}
export function obtenerEstadosCita() {
  return solicitudAPI(`/cita/estados`);
}
