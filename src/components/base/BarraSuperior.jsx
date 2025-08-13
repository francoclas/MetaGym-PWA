import '../../assets/estilos/base/BarraSuperior.css';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
export default function BarraSuperior() {
  const location = useLocation();
  const [tieneNuevas, setTieneNuevas] = useState(false);

  useEffect(() => {
    async function cargarNoLeidas() {
      const res = await obtenerNoLeidas();
      if (res.ok && res.data && res.data.length > 0) {
        setTieneNuevas(true);
      } else {
        setTieneNuevas(false);
      }
    }
    cargarNoLeidas();
  }, []);

  return (
    <header className="barra-superior">
      <Link to="/novedades"className={location.pathname ==="/novedades" ? "activo" : ""} > 
           <img
        src="/imgs/logos/logo.png"
        alt="Logo de Metagym"
        className="logo"
        />
     
      </Link>

      <Link
        to="/Notificaciones"
        className={location.pathname === "/Notificaciones" ? "activo" : ""}
      >
        <img
          src={
            tieneNuevas
              ? "/imgs/iconos/notificacion-nuevas.png"
              : location.pathname === "/Notificaciones"
              ? "/imgs/iconos/notificacion-activo.png"
              : "/imgs/iconos/notificacion-base.png"
          }
          alt="Notificaciones"
          className="icono-notificacion"
        />
      </Link>
    </header>
  );
};
