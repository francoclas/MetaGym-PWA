const NotificacionCard = ({ noti }) => {
  return (
    <div className="notificacion-card" style={{ border: '1px solid #333', padding: '10px', marginBottom: '8px', background: '#1a1a1a', color: 'white' }}>
      <p><strong>{noti.titulo}</strong></p>
      <p>{noti.mensaje}</p>
      <p style={{ fontSize: '12px', color: '#aaa' }}>{new Date(noti.fecha).toLocaleString()}</p>
    </div>
  );
};

export default NotificacionCard;