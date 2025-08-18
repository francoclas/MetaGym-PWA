export default function FiltroEstados({ estados, estadoSeleccionado, onEstadoChange }) {
  return (
    <div className="filtro-estados">
      {estados.map((estado, index) => (
        <button
          key={index}
          className={`chip ${estadoSeleccionado === estado ? "activo" : ""}`}
          onClick={() => onEstadoChange(estado)}
        >
          {estado}
        </button>
      ))}
    </div>
  );
}
