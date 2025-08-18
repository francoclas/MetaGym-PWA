import "../../assets/estilos/publicaciones/PublicacionCard.css";
import { useState } from "react";
import ComentarioCard from "./ComentarioCard";
import { alternarLikePublicacion } from "../../api/publicacionesAPI";
import { agregarComentario } from "../../api/comentariosAPI";

export default function PublicacionCard({ publicacion }) {
  const {
    publicacionId,
    titulo,
    imagenAutorURL,
    nombreAutor,
    fechaCreacion,
    descripcion,
    urlsMedia,
    comentarios,
    cantLikes,
  } = publicacion;

  // Imagen de perfil ajustada
  const imagenPerfil =
    imagenAutorURL && imagenAutorURL.startsWith("/")
      ? `${import.meta.env.VITE_FOTOS_BASE_URL}${imagenAutorURL.replace(/^\//, "")}`
      : imagenAutorURL;

  // Ajustar URLs de media
  const mediasAjustadas =
    urlsMedia?.map((url) =>
      url.startsWith("/") && !url.toLowerCase().endsWith(".mp4")
        ? `${import.meta.env.VITE_FOTOS_BASE_URL}${url.replace(/^\//, "")}`
        : url
    ) || [];

  const [likes, setLikes] = useState(cantLikes || 0);
  const [meGusta, setMeGusta] = useState(false);
  const [mostrarComentarios, setMostrarComentarios] = useState(false);
  const [listaComentarios, setListaComentarios] = useState(comentarios || []);
  const [nuevoComentario, setNuevoComentario] = useState("");
  const [mediaIndex, setMediaIndex] = useState(0);

  // Like publicación
  const manejarLike = async () => {
    const res = await alternarLikePublicacion(publicacionId);
    if (res.ok) {
      setMeGusta(!meGusta);
      setLikes(meGusta ? likes - 1 : likes + 1);
    }
  };

  // Nuevo comentario raíz
  const enviarComentario = async () => {
    if (!nuevoComentario.trim()) return;
    const res = await agregarComentario({
      publicacionId,
      contenido: nuevoComentario,
    });
    if (res.ok) {
      const conPubli = { ...res.data, publicacionId };
      setListaComentarios([conPubli, ...listaComentarios]);
      setNuevoComentario("");
    }
  };

  // Agregar respuesta a un comentario
  const agregarRespuestaAComentario = (comentarioId, nuevaRespuesta) => {
    const conPubli = { ...nuevaRespuesta, publicacionId };
    setListaComentarios((prev) =>
      prev.map((c) =>
        c.comentarioId === comentarioId
          ? { ...c, respuestas: [...(c.respuestas || []), conPubli] }
          : c
      )
    );
  };

  const cambiarMedia = (direccion) => {
    if (mediasAjustadas.length <= 1) return;
    setMediaIndex((prev) =>
      direccion === "next"
        ? (prev + 1) % mediasAjustadas.length
        : (prev - 1 + mediasAjustadas.length) % mediasAjustadas.length
    );
  };

  return (
    <div className="post">
      {/* Encabezado */}
      <div className="post-header">
        <img className="avatar" src={imagenPerfil} alt={nombreAutor} />
        <div className="post-header-text">
          <h3 className="author">{nombreAutor}</h3>
          <span className="date">{new Date(fechaCreacion).toLocaleString()}</span>
        </div>
      </div>

      {/* Media con slider */}
      {mediasAjustadas.length > 0 && (
        <div className="post-media-slider">
          {mediasAjustadas[mediaIndex].toLowerCase().endsWith(".mp4") ? (
            <video controls>
              <source src={mediasAjustadas[mediaIndex]} type="video/mp4" />
            </video>
          ) : (
            <img src={mediasAjustadas[mediaIndex]} alt={`media-${mediaIndex}`} />
          )}

          {mediasAjustadas.length > 1 && (
            <>
              <button className="media-btn prev" onClick={() => cambiarMedia("prev")}>❮</button>
              <button className="media-btn next" onClick={() => cambiarMedia("next")}>❯</button>
              <div className="media-indicadores">
                {mediasAjustadas.map((_, i) => (
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

      {/* Descripción */}
      <div className="post-footer">
        {titulo && <h4 className="title">{titulo}</h4>}
        {descripcion && <p className="description">{descripcion}</p>}
      </div>

      {/* Botones de acción */}
      <div className="post-actions">
        <button onClick={manejarLike} className={meGusta ? "liked" : ""}>
          ❤️ {likes}
        </button>
        <button onClick={() => setMostrarComentarios(!mostrarComentarios)}>
          💬 {listaComentarios.length}
        </button>
      </div>

      {/* Comentarios */}
      {mostrarComentarios && (
        <div className="comentarios-section">
          {listaComentarios.map((com) => (
            <ComentarioCard
              key={com.comentarioId}
              comentario={{ ...com, publicacionId }}  // 👈 forzamos publicacionId en todos
              onRespuestaAgregada={agregarRespuestaAComentario}
            />
          ))}

          <div className="agregar-comentario">
            <input
              type="text"
              placeholder="Escribe un comentario..."
              value={nuevoComentario}
              onChange={(e) => setNuevoComentario(e.target.value)}
            />
            <button onClick={enviarComentario}>Enviar</button>
          </div>
        </div>
      )}
    </div>
  );
}
