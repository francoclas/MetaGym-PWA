const ComentarioCard = ({ comentario }) => {
  const { autor, contenido, fecha, urlImagenAutor } = comentario;

  return (
    <div className="comentario" style={{ marginBottom: '10px' }}>
      <p><strong>{autor}</strong> - {new Date(fecha).toLocaleString()}</p>
      <p>{contenido}</p>
    </div>
  );
};

export default ComentarioCard;
