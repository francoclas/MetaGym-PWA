import { useEffect, useState } from "react";
import { obtenerDato } from "../../utils/storage";
import { useNavigate } from "react-router-dom";

export default function ReanudarEntrenamiento() {
  const [sesion, setSesion] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verificarSesion = async () => {
      const sesionActiva = await obtenerDato("entrenamientoActivo");
      if (sesionActiva) setSesion(sesionActiva);
    };
    verificarSesion();
  }, []);

  if (!sesion) return null;

  return (
    <button
      className="btn btn-warning mb-3"
      onClick={() => navigate("/entrenamiento")}
    >
      Reanudar entrenamiento: {sesion.nombreRutina}
    </button>
  );
}
