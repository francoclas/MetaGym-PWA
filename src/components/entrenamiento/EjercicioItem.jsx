import SeriesForm from "./SeriesForm";
import MedicionesForm from "./MedicionesForm";
import { useState } from "react";

export default function EjercicioItem({ ejercicio, index, actualizarEjercicio }) {
  const [expandido, setExpandido] = useState(ejercicio.seRealizo || false);

  const toggleRealizado = (checked) => {
    setExpandido(checked);
    actualizarEjercicio(index, { seRealizo: checked });
  };

  return (
    <div className={`card-ejercicio ${expandido ? "ejercicio-activo" : ""}`}>
      {/* Encabezado */}
      <div className="ejercicio-header">
        {ejercicio.imagenBaseUrl && (
          <img
            src={ejercicio.imagenBaseUrl}
            alt={ejercicio.nombreEjercicio}
          />
        )}
        <h4>{ejercicio.nombreEjercicio}</h4>
      </div>

      {/* Checkbox */}
      <div className="checkbox-realizado">
        <label>
          <input
            type="checkbox"
            checked={ejercicio.seRealizo}
            onChange={(e) => toggleRealizado(e.target.checked)}
          />{" "}
          ¿Se realizó?
        </label>
      </div>

      {/* Contenido expandible */}
      {expandido && (
        <div className="contenido-ejercicio">
          <div className="series-form">
            <SeriesForm
              series={ejercicio.series}
              onChange={(nuevasSeries) =>
                actualizarEjercicio(index, { series: nuevasSeries })
              }
            />
          </div>

          {ejercicio.mediciones.length > 0 && (
            <div className="mediciones-form">
              <MedicionesForm
                mediciones={ejercicio.mediciones}
                onChange={(nuevasMediciones) =>
                  actualizarEjercicio(index, { mediciones: nuevasMediciones })
                }
              />
            </div>
          )}

          <div className="observaciones-form mt-2">
            <label>Observaciones:</label>
            <textarea
              value={ejercicio.observaciones || ""}
              onChange={(e) =>
                actualizarEjercicio(index, { observaciones: e.target.value })
              }
              placeholder="Escribe tus observaciones aquí..."
            ></textarea>
          </div>
        </div>
      )}
    </div>
  );
}
