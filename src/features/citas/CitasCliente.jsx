import "../../assets/estilos/citas/CitasCliente.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerEstadosCita, obtenerCitasCliente } from "../../api/citaAPI";
import CitaCard from "../../components/citas/CitaCard";

export default function CitasCliente() {
  const [estados, setEstados] = useState([]);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [citas, setCitas] = useState([]);

  const clienteId = localStorage.getItem("usuarioId");
  const rol = localStorage.getItem("rol");
  const navigate = useNavigate();

  // Cargar lista de estados de cita
  useEffect(() => {
    async function cargarEstados() {
      const res = await obtenerEstadosCita();
      if (res.ok) {
        setEstados(res.data);
        setEstadoSeleccionado(2); // Valor por defecto (por ejemplo "Aceptada")
      }
    }
    cargarEstados();
  }, []);

  // Cargar citas filtradas por estado
  useEffect(() => {
    if (estadoSeleccionado !== "") {
      async function cargarCitas() {
        const res = await obtenerCitasCliente(clienteId, estadoSeleccionado, rol);
        if (res.ok) {
          setCitas(res.data);
        } else {
          console.error(res.error);
        }
      }
      cargarCitas();
    }
  }, [estadoSeleccionado, clienteId, rol]);

  return (
    <div className="contenedor-citas">
      <h2>Mis Citas</h2>

      {/* Filtro por estado */}
      <div className="filtro-estados-container">
        <label className="filtro-estados-label" htmlFor="estadoSelect">
          Filtrar por estado
        </label>
        <select
          id="estadoSelect"
          className="filtro-estados-select"
          value={estadoSeleccionado}
          onChange={(e) => setEstadoSeleccionado(e.target.value)}
        >
          <option value="">Todos los estados</option>
          {estados.map((estado) => (
            <option key={estado.id} value={estado.id}>
              {estado.estado}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de citas */}
      <div className="lista-citas">
        {citas.length > 0 ? (
          citas.map((cita) => (
            <CitaCard
              key={cita.citaId}
              cita={cita}
              onVerDetalles={() => navigate(`/cita/${cita.citaId}`)}
            />
          ))
        ) : (
          <p>No hay citas para este estado</p>
        )}
      </div>
    </div>
  );
}
