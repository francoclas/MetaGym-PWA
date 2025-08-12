import { useEffect, useState } from 'react';
//Api
import { obtenerPublicaciones } from '../../api/publicacionesAPI';
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
      {publicaciones.map(pub => (
        <PublicacionCard key={pub.publicacionId} publicacion={pub} />
      ))}
    </div>
  );
};

export default Inicio;
