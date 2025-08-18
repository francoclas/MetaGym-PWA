import "../../assets/estilos/publicaciones/NovedadCard.css";

export default function NovedadCard({ novedad }) {
  return (
    <div className="novedad-card">
      <div className="novedad-header">
        {novedad.imagenAutorURL && (
          <img src={novedad.imagenAutorURL} alt="Autor" className="novedad-autor-img" />
        )}
        <div>
          <h4 className="novedad-titulo">{novedad.titulo}</h4>
          <p className="novedad-fecha">
            {new Date(novedad.fechaCreacion).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="novedad-descripcion">{novedad.descripcion}</p>

      {novedad.urlsMedia.length > 0 && (
        <div className="novedad-media">
          {novedad.urlsMedia.map((url, i) => (
            <img key={i} src={url} alt={`media-${i}`} className="novedad-media-img" />
          ))}
        </div>
      )}
    </div>
  );
}
