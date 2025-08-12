import "../../assets/estilos/entrenamiento/ejercicioSesionCard.css";

export default function EjercicioSesionCard({ ejercicio }) {
  return (
    <div className="ejercicio-card">
      <div className="ejercicio-header">
        {ejercicio.imagenBaseUrl && (
          <img src={ejercicio.imagenBaseUrl} alt={ejercicio.nombreEjercicio} className="ejercicio-img" />
        )}
        <div>
          <h4>{ejercicio.nombre}</h4>
          <p>{ejercicio.tipo} | Grupo muscular: {ejercicio.grupoMuscular}</p>
        </div>
      </div>

      {ejercicio.series && ejercicio.series.length > 0 && (
        <>
          <h5>Series realizadas</h5>
          <table className="tabla-series">
            <thead>
              <tr>
                <th>Repeticiones</th>
                <th>Peso utilizado (kg)</th>
              </tr>
            </thead>
            <tbody>
              {ejercicio.series.map((serie, idx) => (
                <tr key={idx}>
                  <td>{serie.repeticiones}</td>
                  <td>{serie.pesoUtilizado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {(!ejercicio.mediciones || ejercicio.mediciones.length === 0) ? (
        <p className="sin-mediciones">Sin mediciones registradas.</p>
      ) : (
        <div className="tabla-mediciones-container">
          <h5>Mediciones</h5>
          <table className="tabla-series">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Valor</th>
                <th>Unidad</th>
              </tr>
            </thead>
            <tbody>
              {ejercicio.mediciones.map((m, idx) => (
                <tr key={idx}>
                  <td>{m.nombreMedicion}</td>
                  <td>{m.valor}</td>
                  <td>{m.unidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
