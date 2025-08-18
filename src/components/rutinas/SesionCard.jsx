import { Link } from "react-router-dom";

export default function SesionCard({ sesion }) {
  return (
    <div className="card mb-3 bg-dark text-light">
      <div className="card-body">
        <h5 className="card-title">{sesion.nombreRutina}</h5>
        <p className="card-text">
          <strong>Fecha:</strong>{" "}
          {new Date(sesion.fechaRealizada).toLocaleString()}
        </p>
        <p className="card-text">
          <strong>Duración:</strong> {sesion.duracionMin} min
        </p>
        <Link
          to={`/sesionentrenamiento/${sesion.sesionRutinaId}`}
          className="historial-btn"
        >
          Revisar entrenamiento
        </Link>
      </div>
    </div>
  );
}
