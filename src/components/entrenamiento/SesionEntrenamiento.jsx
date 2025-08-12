import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerSesionEntrenamiento } from "../../api/rutinasAPI";
import EjercicioSesionCard from "../../components/entrenamiento/EjercicioSesionCard";
import "../../assets/estilos/entrenamiento/sesionEntrenamiento.css";

export default function SesionEntrenamiento() {
  const { sesionId } = useParams();
  const [sesion, setSesion] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await obtenerSesionEntrenamiento(sesionId);
      if (res.ok) {
        setSesion(res.data);
      } else {
        setError(res.error);
      }
      setCargando(false);
    };
    cargarDatos();
  }, [sesionId]);

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="sesion-container">
      <div className="sesion-header">
        <h2>Rutina: {sesion.nombreRutina}</h2>
        <p><strong>Fecha realizada:</strong> {new Date(sesion.fechaRealizada).toLocaleDateString()}</p>
        <p><strong>Duración:</strong> {sesion.duracionMin} minutos</p>
      </div>

      {sesion.ejercicios && sesion.ejercicios.length > 0 ? (
        sesion.ejercicios.map((ej, idx) => (
          <EjercicioSesionCard key={idx} ejercicio={ej} />
        ))
      ) : (
        <p>No hay ejercicios registrados en esta sesión.</p>
      )}
    </div>
  );
}
