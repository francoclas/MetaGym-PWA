import { Link } from "react-router-dom";
export default function EjercicioCard({ ejercicio }) {
  return (
    <div className="tarjeta-ejercicio">
      <div>
        <img
          src={ejercicio.imagenBaseUrl}
          alt={ejercicio.nombre}
          className="imagen-ejercicio"
        />
        </div>
      <h4>{ejercicio.nombre}</h4>
      <p><strong>Tipo:</strong> {ejercicio.tipo}</p>
      <p><strong>Grupo muscular:</strong> {ejercicio.grupoMuscular}</p>

      <Link to={`/ejercicio/${ejercicio.id}`} className="historial-btn">
        Ver detalles
      </Link>
    </div>
  );
}