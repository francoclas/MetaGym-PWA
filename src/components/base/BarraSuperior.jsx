import '../../assets/estilos/base/BarraSuperior.css';

const BarraSuperior = () => {
  return (
    <header className="barra-superior">
      <img src="/logo.png" alt="Logo" className="logo" />
      <button className="notificacion-btn">
        🔔
      </button>
    </header>
  );
};

export default BarraSuperior;
