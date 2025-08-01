import { useEffect, useState } from 'react';
import { obtenerNoLeidas } from '../../api/notificacionesAPI';
import NotificacionCard from '../../components/notificaciones/NotificacionCard';
import BarraSuperior from '../../components/base/BarraSuperior';
import MenuInferior from '../../components/base/MenuInferior';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const res = await obtenerNoLeidas();
      if (res.ok) setNotificaciones(res.data);
      else console.error(res.error);
    };
    cargar();
  }, []);

  return (
    <div style={{ padding: '10px 16px 70px' }}>
      <BarraSuperior />
      <h2>Notificaciones</h2>

      {notificaciones.length === 0 && <p>No hay notificaciones nuevas.</p>}

      {notificaciones.map(n => (
        <NotificacionCard key={n.id} noti={n} />
      ))}

      <MenuInferior />
    </div>
  );
};

export default Notificaciones;
