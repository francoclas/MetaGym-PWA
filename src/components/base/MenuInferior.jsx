import { Link, useLocation } from 'react-router-dom';
import '../../assets/estilos/base/MenuInferior.css';

const MenuInferior = () => {
  const location = useLocation();

  return (
    <nav className="menu-inferior">
      <Link to="/" className={location.pathname === '/' ? 'activo' : ''}>Inicio</Link>
      <Link to="/rutinas" className={location.pathname === '/rutinas' ? 'activo' : ''}>Rutinas</Link>
      <Link to="/citas" className={location.pathname === '/citas' ? 'activo' : ''}>Citas</Link>
      <Link to="/perfil" className={location.pathname === '/perfil' ? 'activo' : ''}>Perfil</Link>
    </nav>
  );
};

export default MenuInferior;