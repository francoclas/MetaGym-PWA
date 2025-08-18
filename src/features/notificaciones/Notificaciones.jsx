import { useEffect, useState } from 'react';
import { obtenerNoLeidas, obtenerLeidas, marcarTodasLeidas } from '../../api/notificacionesAPI';
import NotificacionCard from '../../components/notificaciones/NotificacionCard';

const Notificaciones = () => {
  const [vista, setVista] = useState("noLeidas"); // "noLeidas" o "leidas"
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);

  const cargar = async () => {
    setLoading(true);
    const res = vista === "noLeidas" ? await obtenerNoLeidas() : await obtenerLeidas();
    if (res.ok) setNotificaciones(res.data);
    else console.error(res.error);
    setLoading(false);
  };

  useEffect(() => {
    cargar();
  }, [vista]);

  const handleMarcarTodas = async () => {
    const res = await marcarTodasLeidas();
    if (res.ok) {
      setNotificaciones([]); // vacía la lista en la vista de "nuevas"
    }
  };

  const handleMarcarUna = (id) => {
    // elimina la notificación marcada de la lista actual
    setNotificaciones(prev => prev.filter(n => n.id !== id));
  };

  return (
    <div style={{ padding: '10px 16px 70px' }}>
      <h2>Notificaciones</h2>
      <div style={{ marginBottom: '12px' }}>
        <button 
          onClick={() => setVista("noLeidas")} 
          className={vista === "noLeidas" ? "btn-activo" : "historial-btn"}>
          Nuevas
        </button>
        <button 
          onClick={() => setVista("leidas")} 
          className={vista === "leidas" ? "btn-activo" : "historial-btn"}>
          Leídas
        </button>
      </div>

      {vista === "noLeidas" && notificaciones.length > 0 && (
        <button 
          onClick={handleMarcarTodas} 
          className="historial-btn"
          style={{ marginBottom: "12px" }}
        >
          Marcar todas como leídas
        </button>
      )}

      {loading && <p>Cargando...</p>}
      {!loading && notificaciones.length === 0 && (
        <p>{vista === "noLeidas" ? "No hay notificaciones nuevas." : "No hay notificaciones leídas."}</p>
      )}

      {notificaciones.map(n => (
        <NotificacionCard 
          key={n.id} 
          noti={n} 
          mostrarBoton={!n.leida && vista === "noLeidas"}
          onMarcar={() => handleMarcarUna(n.id)}
        />
      ))}
    </div>
  );
};

export default Notificaciones;
