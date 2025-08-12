import "../../assets/estilos/rutinas/InformacionEjercicio.css"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerInformacionEjercicio } from "../../api/rutinasAPI";

export default function InformacionEjercicio() {
  const { id } = useParams();
  const [ejercicio, setEjercicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const FOTOS_BASE_URL = import.meta.env.VITE_FOTOS_BASE_URL;

  useEffect(() => {
    async function cargarEjercicio() {
      const res = await obtenerInformacionEjercicio(id);
      if (res.ok) {
        setEjercicio(res.data);
      } else {
        console.error(res.error);
      }
      setLoading(false);
    }
    cargarEjercicio();
  }, [id]);

  if (loading) return <p>Cargando ejercicio...</p>;
  if (!ejercicio) return <p>No se encontró el ejercicio.</p>;

  return (
    <div className="info-ejercicio-container">
      <h2>{ejercicio.nombre}</h2>
      <p><strong>Tipo:</strong> {ejercicio.tipo}</p>
      <p><strong>Grupo muscular:</strong> {ejercicio.grupoMuscular}</p>
      {ejercicio.instrucciones && (
        <p><strong>Instrucciones:</strong> {ejercicio.instrucciones}</p>
      )}

      {/* Slideshow de medias */}
      {ejercicio.medias && ejercicio.medias.length > 0 && (
        <div className="media-slider">
          {ejercicio.medias.map((url, index) => {
            const fullUrl = `${FOTOS_BASE_URL}${url.replace(/^\//, "")}`;
            return (
              <img
                key={index}
                src={fullUrl}
                alt={`Media ${index + 1}`}
                className="media-item"
              />
            );
          })}
        </div>
      )}

      {/* Tabla de mediciones */}
      {ejercicio.mediciones && ejercicio.mediciones.length > 0 && (
        <div className="tabla-mediciones-container">
          <h3>Mediciones</h3>
          <table className="tabla-mediciones">
            <thead>
              <tr>
                <th>Medición</th>
                <th>Descripción</th>
                <th>Unidad</th>
              </tr>
            </thead>
            <tbody>
              {ejercicio.mediciones.map((med, index) => (
                <tr key={index}>
                  <td>{med.nombreMedicion}</td>
                  <td>{med.descripcion}</td>
                  <td>{med.unidad}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}