import { useState } from "react";
import "../../assets/estilos/publicaciones/NovedadCard.css";

export default function NovedadCard({ novedad }) {
  const [mediaIndex, setMediaIndex] = useState(0);

  const cambiarMedia = (direccion) => {
    if (!novedad.urlsMedia || novedad.urlsMedia.length === 0) return;

    if (direccion === "next") {
      setMediaIndex((prev) => (prev + 1) % novedad.urlsMedia.length);
    } else {
      setMediaIndex(
        (prev) => (prev - 1 + novedad.urlsMedia.length) % novedad.urlsMedia.length
      );
    }
  };

  return (
    <div className="novedad-card">
      {/* Header */}
      <div className="novedad-header">
        {novedad.imagenAutorURL && (
          <img
            src={novedad.imagenAutorURL}
            alt="Autor"
            className="novedad-autor-img"
          />
        )}
        <div>
          <h4 className="novedad-titulo">{novedad.titulo}</h4>
          <p className="novedad-fecha">
            {new Date(novedad.fechaCreacion).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Descripción */}
      <p className="novedad-descripcion">{novedad.descripcion}</p>

      {/* Slideshow de media */}
      {novedad.urlsMedia.length > 0 && (
        <div className="post-media-slider">
          {novedad.urlsMedia[mediaIndex].toLowerCase().endsWith(".mp4") ? (
            <video controls>
              <source
                src={novedad.urlsMedia[mediaIndex]}
                type="video/mp4"
              />
            </video>
          ) : (
            <img
              src={novedad.urlsMedia[mediaIndex]}
              alt={`media-${mediaIndex}`}
            />
          )}

          {novedad.urlsMedia.length > 1 && (
            <>
              <button className="media-btn prev" onClick={() => cambiarMedia("prev")}>
                ❮
              </button>
              <button className="media-btn next" onClick={() => cambiarMedia("next")}>
                ❯
              </button>
              <div className="media-indicadores">
                {novedad.urlsMedia.map((_, i) => (
                  <span
                    key={i}
                    className={i === mediaIndex ? "activo" : ""}
                    onClick={() => setMediaIndex(i)}
                  ></span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
