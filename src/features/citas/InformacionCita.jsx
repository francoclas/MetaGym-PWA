import "../../assets/estilos/citas/InformacionCita.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerDetallesCita } from "../../api/citaAPI";
import MapaEstablecimiento from "../../components/citas/MapaEstablecimiento";

const ESTADOS_MAP = {
  0: "EnEspera",
  1: "Aceptada",
  2: "Rechazada",
  3: "Cancelada",
  4: "Finalizada",
  5: "NoAsistio"
};

export default function InformacionCita() {
  const { citaId } = useParams();
  const rol = localStorage.getItem("rol");

  const [cita, setCita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      const res = await obtenerDetallesCita(citaId, rol);
      if (res.ok) {
        setCita(res.data);
      } else {
        setError(res.error);
      }
      setLoading(false);
    }
    cargar();
  }, [citaId, rol]);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p style={{ color: "tomato" }}>{error}</p>;
  if (!cita) return <p>No se encontraron datos de la cita.</p>;

  const estadoNombre = ESTADOS_MAP[cita.estado] || cita.estado;

  const esPendiente = ["EnEspera", "Aceptada"].includes(estadoNombre);

  return (
    <div className="detalle-cita" style={{ padding: "10px 16px 70px" }}>
      <h2>Detalles de la Cita</h2>
      <p><strong>Estado:</strong> {estadoNombre}</p>

      {/* 👉 Fecha de asistencia destacada si la cita está pendiente */}
      {esPendiente && (
        <div className="bloque-cita">
          <h3>Fecha de asistencia</h3>
          <p>
            {cita.fechaAsistencia
              ? new Date(cita.fechaAsistencia).toLocaleString()
              : "Pendiente de asignar"}
          </p>
        </div>
      )}

      {/* Datos Generales */}
      <div className="bloque-cita">
        <h3>Datos Generales</h3>
        <p><strong>Especialidad:</strong> {cita.especialidad}</p>
        <p><strong>Tipo de Atención:</strong> {cita.tipoAtencion}</p>
        <p><strong>Descripción:</strong> {cita.descripcion || "Sin descripción"}</p>
      </div>

      {/* Profesional */}
      <div className="bloque-cita">
        <h3>Profesional</h3>
        <p><strong>Nombre:</strong> {cita.nombreProfesional || "Pendiente"}</p>
        <p><strong>Teléfono:</strong> {cita.telefonoProfesional || "No disponible"}</p>
      </div>

      {/* Establecimiento */}
      {cita.establecimiento && (
        <div className="bloque-cita">
          <h3>Establecimiento</h3>
          <p><strong>Nombre:</strong> {cita.establecimiento.nombre}</p>
          <p><strong>Dirección:</strong> {cita.establecimiento.direccion}</p>
          <MapaEstablecimiento
            latitud={cita.establecimiento.latitud}
            longitud={cita.establecimiento.longitud}
          />
        </div>
      )}

      {/* Fechas y conclusiones solo si ya se resolvió */}
      {!esPendiente && (
        <div className="bloque-cita">
          <h3>Fechas y Conclusiones</h3>
          <p><strong>Fecha de asistencia:</strong> {cita.fechaAsistencia ? new Date(cita.fechaAsistencia).toLocaleString() : "No registrada"}</p>
          <p><strong>Conclusión:</strong> {cita.conclusion || "Sin registro"}</p>
          <p><strong>Fecha de finalización:</strong> {cita.fechaFinalizacion ? new Date(cita.fechaFinalizacion).toLocaleString() : "Sin registro"}</p>
        </div>
      )}
    </div>
  );
}
