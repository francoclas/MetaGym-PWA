import { Link, useLocation } from 'react-router-dom';
import '../../assets/estilos/base/MenuInferior.css';

const MenuInferior = () => {
  const location = useLocation();

    return (
    <nav className="menu-inferior">
      <Link to="/" className={location.pathname === "/" ? "activo" : ""}>
        <img
          src={
            location.pathname === "/"
              ? "/imgs/iconos/inicio-activo.png"
              : "/imgs/iconos/inicio.png"
          }
          alt="Inicio"
        />
      </Link>

      <Link to="/rutinas" className={location.pathname === "/rutinas" ? "activo" : ""}>
        <img
          src={
            location.pathname === "/rutinas"
              ? "/imgs/iconos/rutinas-activo.png"
              : "/imgs/iconos/rutinas.png"
          }
          alt="Rutinas"
        />
      </Link>

      <Link to="/citas" className={location.pathname === "/citas" ? "activo" : ""}>
        <img
          src={
            location.pathname === "/citas"
              ? "/imgs/iconos/citas-activo.png"
              : "/imgs/iconos/citas.png"
          }
          alt="Citas"
        />
      </Link>

      <Link to="/perfil" className={location.pathname === "/perfil" ? "activo" : ""}>
        <img
          src={
            location.pathname === "/perfil"
              ? "/imgs/iconos/perfil-activo.png"
              : "/imgs/iconos/perfil.png"
          }
          alt="Perfil"
        />
      </Link>
    </nav>
  );
};

export default MenuInferior;