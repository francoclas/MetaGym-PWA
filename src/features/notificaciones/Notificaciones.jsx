import { useEffect, useState } from 'react';
import { obtenerNoLeidas, obtenerLeidas } from '../../api/notificacionesAPI';
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

  return (
    <div style={{ padding: '10px 16px 70px' }}>
      <h2>Notificaciones</h2>
      <div style={{ marginBottom: '12px' }}>
        <button 
          onClick={() => setVista("noLeidas")} 
          className={vista === "noLeidas" ? "btn-activo" : ""}
        >
          No leídas
        </button>
        <button 
          onClick={() => setVista("leidas")} 
          className={vista === "leidas" ? "btn-activo" : ""}
        >
          Leídas
        </button>
      </div>

      {loading && <p>Cargando...</p>}
      {!loading && notificaciones.length === 0 && (
        <p>{vista === "noLeidas" ? "No hay notificaciones nuevas." : "No hay notificaciones leídas."}</p>
      )}

      {notificaciones.map(n => (
        <NotificacionCard key={n.id} noti={n} />
      ))}
    </div>
  );
};

export default Notificaciones;
