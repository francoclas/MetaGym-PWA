import ComentarioCard from './ComentarioCard';

const PublicacionCard = ({ publicacion }) => {
  const {
    titulo,
    descripcion,
    nombreAutor,
    fechaCreacion,
    imagenAutorURL,
    urlsMedia,
    comentarios
  } = publicacion;

  return (
    <div className="publicacion">
      <h3>{titulo}</h3>
      <p><strong>{nombreAutor}</strong> - {new Date(fechaCreacion).toLocaleString()}</p>
      <p>{descripcion}</p>

      {urlsMedia?.map((url, i) => (
        <img key={i} src={url} alt={`media-${i}`} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
      ))}

      <h4>Comentarios</h4>
      {comentarios?.map(com => (
        <ComentarioCard key={com.comentarioId} comentario={com} />
      ))}
    </div>
  );
};

export default PublicacionCard;