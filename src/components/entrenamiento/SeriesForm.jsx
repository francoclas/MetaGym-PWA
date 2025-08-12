export default function SeriesForm({ series, onChange }) {
  const actualizarSerie = (idx, campo, valor) => {
    const nuevasSeries = [...series];
    nuevasSeries[idx][campo] = valor;
    onChange(nuevasSeries);
  };

  const agregarSerie = () => {
    onChange([...series, { repeticiones: null, pesoUtilizado: null }]);
  };

  const eliminarSerie = (idx) => {
    const nuevasSeries = series.filter((_, i) => i !== idx);
    onChange(nuevasSeries);
  };

  return (
    <div>
      <h5>Series</h5>
      {series.map((serie, idx) => (
        <div key={idx} className="d-flex align-items-center gap-2 mb-1">
          <label>Serie {idx+1}: </label>
          <input
            type="number"
            placeholder="Reps"
            value={serie.repeticiones || ""}
            onChange={e =>
              actualizarSerie(idx, "repeticiones", parseInt(e.target.value, 10) || null)
            }
          />
          <input
            type="number"
            placeholder="Peso (kg)"
            value={serie.pesoUtilizado || ""}
            onChange={e =>
              actualizarSerie(idx, "pesoUtilizado", parseFloat(e.target.value) || null)
            }
          />
          <button
            type="button"
            onClick={() => eliminarSerie(idx)}
          >
            ❌
          </button>
        </div>
      ))}
      <button type="button" onClick={agregarSerie}>
        ➕ Agregar serie
      </button>
    </div>
  );
}
