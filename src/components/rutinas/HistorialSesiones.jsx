import "../../assets/estilos/rutinas/historialSesiones.css";
import { useEffect, useState } from "react";
import { obtenerHistorialSesiones } from "../../api/rutinasAPI";
import SesionCard from "../../components/rutinas/SesionCard";

export default function HistorialSesiones() {
  const [sesiones, setSesiones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fechaFiltro, setFechaFiltro] = useState("");

  useEffect(() => {
    const cargarHistorial = async () => {
      setLoading(true);
      const clienteId = localStorage.getItem("usuarioId");
      const resp = await obtenerHistorialSesiones(clienteId);

      if (resp.ok) {
        setSesiones(resp.data || []);
      } else {
        setError(resp.error || "No se pudo obtener el historial");
      }

      setLoading(false);
    };

    cargarHistorial();
  }, []);

  const sesionesFiltradas = fechaFiltro
    ? sesiones.filter(
        (s) =>
          new Date(s.fechaRealizada).toISOString().split("T")[0] === fechaFiltro
      )
    : sesiones;

  if (loading) return <p>Cargando historial...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="historial-container">
      <h2>Historial de Entrenamientos</h2>

      {/* Filtro por fecha */}
      <div className="mb-3">
        <label className="form-label">Filtrar por fecha:</label>
        <input
          type="date"
          className="form-control"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
      </div>

      {sesionesFiltradas.length === 0 ? (
            <p className="sin-sesiones">
                No tenés sesiones registradas para la fecha seleccionada.
            </p>
            ) : (
            <div className="lista-sesiones">
                {sesionesFiltradas.map((sesion) => (
                <SesionCard key={sesion.sesionRutinaId} sesion={sesion} />
                ))}
            </div>
            )}
    </div>
  );
}
