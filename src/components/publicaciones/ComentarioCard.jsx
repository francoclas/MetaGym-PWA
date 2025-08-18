import "../../assets/estilos/publicaciones/ComentarioCard.css";
import { useState } from "react";
import { agregarComentario } from "../../api/comentariosAPI";

export default function ComentarioCard({ comentario, onRespuestaAgregada }) {
  const {
    comentarioId,
    autor,
    contenido,
    fecha,
    urlImagenAutor,
    respuestas,
    publicacionId,
    comentarioPadreId,
  } = comentario;

  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [textoRespuesta, setTextoRespuesta] = useState("");

  const imagenPerfil = urlImagenAutor
    ? `${import.meta.env.VITE_FOTOS_BASE_URL}${urlImagenAutor}`
    : "/default-avatar.png";

  const enviarRespuesta = async () => {
    if (!textoRespuesta.trim()) return;
    const res = await agregarComentario({
      publicacionId,
      contenido: textoRespuesta,
      comentarioPadreId: comentarioId,
    });
    if (res.ok) {
      const nuevaResp = { ...res.data, publicacionId };
      setTextoRespuesta("");
      setMostrarRespuesta(false);
      onRespuestaAgregada(comentarioId, nuevaResp);
    } else {
      console.error(res.error);
    }
  };

  return (
    <div className="comentario">
      <div className="comentario-header">
        <img src={imagenPerfil} alt={autor} className="comentario-avatar" />
        <div>
          <strong>{autor}</strong>
          <span className="comentario-fecha">
            {fecha ? new Date(fecha).toLocaleString() : ""}
          </span>
        </div>
      </div>

      <p className="comentario-texto">{contenido}</p>

      {/* ✅ Solo mostrar el botón de responder en comentarios raíz */}
      {!comentarioPadreId && (
        <div className="comentario-acciones">
          <button onClick={() => setMostrarRespuesta(!mostrarRespuesta)}>
            💬 Responder
          </button>
        </div>
      )}

      {mostrarRespuesta && (
        <div className="comentario-responder">
          <input
            type="text"
            placeholder="Escribe una respuesta..."
            value={textoRespuesta}
            onChange={(e) => setTextoRespuesta(e.target.value)}
          />
          <button onClick={enviarRespuesta}>Enviar</button>
        </div>
      )}

      {respuestas && respuestas.length > 0 && (
        <div className="comentario-respuestas">
          {respuestas.map((resp) => (
            <ComentarioCard
              key={resp.comentarioId}
              comentario={{ ...resp, publicacionId }}
              onRespuestaAgregada={onRespuestaAgregada}
            />
          ))}
        </div>
      )}
    </div>
  );
}
