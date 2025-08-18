import "../../assets/estilos/notificaciones/NotificacionCard.css";
import { marcarNotificacionLeida } from "../../api/notificacionesAPI";

const NotificacionCard = ({ noti, mostrarBoton, onMarcar }) => {

  const handleMarcarLeida = async () => {
    const res = await marcarNotificacionLeida(noti.id);
    if (res.ok && onMarcar) {
      onMarcar();
    }
  };

  return (
    <div className={`notificacion-card ${noti.leida ? "leida" : "no-leida"}`}>
      <p className="noti-titulo"><strong>{noti.titulo}</strong></p>
      <p className="noti-mensaje">{noti.mensaje}</p>
      <p className="noti-fecha">{new Date(noti.fecha).toLocaleString()}</p>

      {noti.link && (
        <a href={noti.link} className="noti-link">Ver más</a>
      )}
      <div>
      {mostrarBoton && (
        <button 
          className="historial-btn"
          onClick={handleMarcarLeida}
          style={{ marginTop: "8px" }}
        >
          ✓
        </button>
      )}
      </div>
    </div>
  );
};

export default NotificacionCard;
