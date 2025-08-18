import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../assets/estilos/rutinas/ClienteRutinas.css";
import { obtenerRutinasAsignadas } from "../../api/rutinasAPI";
import ReanudarEntrenamiento from "../entrenamiento/ReanudarEntrenamiento";

export default function ClienteRutinas() {
  const [asignaciones, setAsignaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarRutinas() {
      setLoading(true);
      setError(null);

      const clienteId = localStorage.getItem("usuarioId");
      const resp = await obtenerRutinasAsignadas(clienteId);

      if (resp.ok) {
        setAsignaciones(resp.data || []);
      } else {
        setError(resp.error || "No se pudieron obtener las rutinas");
      }

      setLoading(false);
    }

    cargarRutinas();
  }, []);

  return (
    <div className="cliente-rutinas">
      <ReanudarEntrenamiento/>
      <div className="historial-btn-container">
        <Link to="/historialsesiones" className="historial-btn">
          📜 Ver historial de entrenamientos
        </Link>
      </div>

      {/* Estado de carga */}
      {loading && <p className="loading">Cargando rutinas...</p>}
      {error && <p className="error">{error}</p>}

      {/* Lista de rutinas */}
      {!loading && !error && (
        <>
  <h3 className="seccion-titulo">Mis rutinas asignadas</h3>

  {asignaciones.length === 0 ? (
    <p className="sin-rutinas">
      No tenés rutinas asignadas por el momento.
    </p>
  ) : (
    <div className="lista-rutinas">
      {asignaciones.map((asignacion) => (
        <div key={asignacion.id} className="rutina-card">
          <h4>{asignacion.rutina?.nombreRutina}</h4>
          <p className="tipo">{asignacion.rutina?.tipo}</p>

     <Link
          to={`/rutinas/${asignacion.rutina?.id}?asignacionId=${asignacion.id}`}
          className="historial-btn"
        >
          Ver informacion de la rutina
          </Link>
        </div>
      ))}
    </div>
  )}
</>
      )}
    </div>
  );
}