import "../../assets/estilos/rutinas/EjercicioCard.css"
import { Link } from "react-router-dom";
export default function EjercicioCard({ ejercicio }) {
  return (
    <div className="tarjeta-ejercicio">
      <img
        src={ejercicio.imagenBaseUrl}
        alt={ejercicio.nombre}
        className="imagen-ejercicio"
      />
      <h4>{ejercicio.nombre}</h4>
      <p><strong>Tipo:</strong> {ejercicio.tipo}</p>
      <p><strong>Grupo muscular:</strong> {ejercicio.grupoMuscular}</p>

      <Link to={`/ejercicio/${ejercicio.id}`} className="detalle-btn">
        Ver detalles
      </Link>
    </div>
  );
}