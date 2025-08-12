export default function MedicionesForm({ mediciones, onChange }) {
  const actualizarMedicion = (idx, valor) => {
    const nuevasMediciones = [...mediciones];
    nuevasMediciones[idx].valor = valor;
    onChange(nuevasMediciones);
  };

  return (
    <div>
      <h5>Mediciones</h5>
      {mediciones.map((med, idx) => (
        <div key={idx} className="mb-1">
          <label>
            {med.nombreMedicion} ({med.unidad}):
          </label>
          <input
            type="text"
            value={med.valor || ""}
            onChange={e => actualizarMedicion(idx, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
