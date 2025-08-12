import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { obtenerInformacionRutina } from "../../api/rutinasAPI";
import { iniciarSesionEntrenamiento } from "../../utils/mapearSesion";
import EjercicioCard from "../../components/rutinas/EjercicioCard";

export default function InformacionRutina() {
  const { rutinaId } = useParams(); // Este sigue siendo el id de la rutina para mostrar info
  const location = useLocation();
  const navigate = useNavigate();

  // Leemos el id de la asignación desde query param
  const searchParams = new URLSearchParams(location.search);
  const asignacionId = parseInt(searchParams.get("asignacionId"), 10);

  const [rutina, setRutina] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      const res = await obtenerInformacionRutina(rutinaId);
      if (res.ok) {
        setRutina(res.data);
      } else {
        setError(res.error);
      }
      setCargando(false);
    };

    cargarDatos();
  }, [rutinaId]);

  const controlComenzarEntrenamiento = async () => {
    if (!rutina) return;

    // Agregamos asignacionId al objeto antes de pasarlo
    const rutinaConAsignacion = {
      ...rutina,
      asignacionId // este es el que en mapearSesion se usará como rutinaId
    };

    await iniciarSesionEntrenamiento(rutinaConAsignacion);
    navigate("/entrenamiento");
  };

  if (cargando) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="contenedor-rutina">
      <button 
        onClick={controlComenzarEntrenamiento}
        className="btn btn-primary"
      >
        Comenzar entrenamiento de esta rutina
      </button>
      
      <h2>{rutina.nombreRutina}</h2>
      <p><strong>Tipo:</strong> {rutina.tipo}</p>

      <h3>Ejercicios</h3>
      {rutina.ejercicios.map(ej => (
        <EjercicioCard key={ej.id} ejercicio={ej} />
      ))}
    </div>
  );
}
