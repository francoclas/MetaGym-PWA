import SeriesForm from "./SeriesForm";
import MedicionesForm from "./MedicionesForm";

export default function EjercicioItem({ ejercicio, index, actualizarEjercicio }) {
  return (
    <div className="card-ejercicio">
      <div className="ejercicio-header">
        {ejercicio.imagenBaseUrl && (
          <img
            src={ejercicio.imagenBaseUrl}
            alt={ejercicio.nombreEjercicio}
          />
        )}
        <h4>{ejercicio.nombreEjercicio}</h4>
      </div>

      <div className="checkbox-realizado">
        <label>
          <input
            type="checkbox"
            checked={ejercicio.seRealizo}
            onChange={e =>
              actualizarEjercicio(index, { seRealizo: e.target.checked })
            }
          />{" "}
          ¿Se realizó?
        </label>
      </div>

      <div className="series-form">
        <SeriesForm
          series={ejercicio.series}
          onChange={nuevasSeries =>
            actualizarEjercicio(index, { series: nuevasSeries })
          }
        />
      </div>

      {ejercicio.mediciones.length > 0 && (
        <div className="mediciones-form">
          <MedicionesForm
            mediciones={ejercicio.mediciones}
            onChange={nuevasMediciones =>
              actualizarEjercicio(index, { mediciones: nuevasMediciones })
            }
          />
        </div>
      )}
      <div className="mt-2">
        <label>Observaciones:</label>
        <textarea
          value={ejercicio.observaciones || ""}
          onChange={e =>
            actualizarEjercicio(index, { observaciones: e.target.value })
          } placeholder="Escribe tus observaciones aquí..."
        ></textarea>
      </div>
    </div>
  );
}
