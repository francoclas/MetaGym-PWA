import "../../assets/estilos/entrenamiento/entrenamiento.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListaEjercicios from "../../components/entrenamiento/ListaEjercicios";
import { 
  cargarSesionEntrenamiento,
  inicializarSegundos,
  actualizarDuracion,
  finalizarEntrenamiento,
  descartarEntrenamiento
} from "../../utils/gestionEntrenamiento";

export default function Entrenamiento() {
  const navigate = useNavigate();
  const [sesion, setSesion] = useState(null);
  const [segundos, setSegundos] = useState(0);

  // Cargar sesión una vez al iniciar
  useEffect(() => {
    const init = async () => {
      const s = await cargarSesionEntrenamiento(navigate);
      if (s) {
        setSesion(s);
        setSegundos(inicializarSegundos(s));
      }
    };
    init();
  }, [navigate]);

  // Incrementar tiempo y guardar cada minuto
  useEffect(() => {
    const intervalo = setInterval(async () => {
      setSegundos(prev => {
        const nuevoTiempo = prev + 1;
        if (sesion) {
          actualizarDuracion(sesion, nuevoTiempo).then(sAct => setSesion(sAct));
        }
        return nuevoTiempo;
      });
    }, 1000);
    return () => clearInterval(intervalo);
  }, [sesion]);

  const actualizarEjercicio = (indice, cambios) => {
    const nuevaSesion = { ...sesion };
    nuevaSesion.ejercicios[indice] = { ...nuevaSesion.ejercicios[indice], ...cambios };
    setSesion(nuevaSesion);
    actualizarDuracion(nuevaSesion, segundos);
  };

  const manejarFinalizarSesion = async () => {
    const resultado = await finalizarEntrenamiento();
    if (resultado.ok) {
      alert("Entrenamiento registrado con éxito");
      navigate("/mis-rutinas");
    } else {
      alert(`Error: ${resultado.error}`);
    }
  };

  const manejarDescartar = async () => {
    await descartarEntrenamiento();
    navigate("/");
  };

  if (!sesion) return <p>Cargando...</p>;

  return (
    <div className="contenedor">
      <h2>{sesion.nombreRutina}</h2>
      <p>
        Tiempo: {Math.floor(segundos / 60)}:
        {(segundos % 60).toString().padStart(2, "0")}
      </p>
      <button onClick={() => setSegundos(prev => prev + 60)}>+1 min</button>
      <button onClick={() => setSegundos(prev => Math.max(0, prev - 60))}>-1 min</button>
      <div class="contenedor-ejercicios">
        <ListaEjercicios ejercicios={sesion.ejercicios} actualizarEjercicio={actualizarEjercicio} />
      </div>
      <div className="mt-3">
        <button onClick={manejarFinalizarSesion} className="historial-btn me-2">Finalizar</button>
        <button onClick={manejarDescartar} className="btn btn-danger">Descartar</button>
      </div>
    </div>
  );
}
