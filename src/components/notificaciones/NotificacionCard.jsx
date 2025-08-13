import "../../assets/estilos/notificaciones/NotificacionCard.css";

const NotificacionCard = ({ noti }) => {
  return (
    <div className={`notificacion-card ${noti.leida ? "leida" : "no-leida"}`}>
      <p className="noti-titulo"><strong>{noti.titulo}</strong></p>
      <p className="noti-mensaje">{noti.mensaje}</p>
      <p className="noti-fecha">{new Date(noti.fecha).toLocaleString()}</p>
      {noti.link && (
        <a href={noti.link} className="noti-link">Ver más</a>
      )}
    </div>
  );
};

export default NotificacionCard;