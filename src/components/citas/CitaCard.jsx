import "../../assets/estilos/citas/CitaCard.css";

export default function CitaCard({ cita, onVerDetalles }) {
  return (
    <div className="cita-card">
      <h2>{cita.especialidad || "Especialidad"}</h2>
      <h3>{cita.tipoAtencion || "Atención"}</h3>
      <p>
        Fecha de asistencia: {new Date(cita.fechaAsistencia).toLocaleString()}
      </p>
      <p>
        Profesional: {cita.nombreProfesional || "Pendiente"}
      </p>
      <button onClick={onVerDetalles}>
        Ver detalles
      </button>
    </div>
  );
}
