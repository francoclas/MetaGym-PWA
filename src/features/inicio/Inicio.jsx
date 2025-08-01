import { useEffect, useState } from 'react';
//Api
import { obtenerPublicaciones } from '../../api/publicacionesAPI';
//Base
import MenuInferior from '../../components/base/MenuInferior';
import BarraSuperior from '../../components/base/BarraSuperior';
import { logout } from '../../utils/logout';

//Clases
import PublicacionCard from '../../components/publicaciones/PublicacionCard';

const Inicio = () => {
  const [publicaciones, setPublicaciones] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const res = await obtenerPublicaciones();
      if (res.ok) setPublicaciones(res.data);
      else console.error(res.error);
    };
    cargar();
  }, []);

  return (
    <div style={{ paddingBottom: '60px' }}>
      <BarraSuperior />
    <button onClick={logout}>Cerrar sesión</button>
      <h2>Inicio</h2>
      {publicaciones.map(pub => (
        <PublicacionCard key={pub.publicacionId} publicacion={pub} />
      ))}
      <MenuInferior />
    </div>
  );
};

export default Inicio;
