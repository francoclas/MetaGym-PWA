import "../../assets/estilos/publicaciones/ComentarioCard.css";
import { useState } from "react";
import { agregarComentario } from "../../api/comentariosAPI";

export default function ComentarioCard({ comentario, onRespuestaAgregada }) {
  const { comentarioId, autor, contenido, fecha, urlImagenAutor, respuestas, publicacionId } = comentario;
  const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
  const [textoRespuesta, setTextoRespuesta] = useState("");

  // Ajustar URL imagen perfil para que use http si es relativa
const imagenPerfil = `${import.meta.env.VITE_FOTOS_BASE_URL}${urlImagenAutor}`;

  const enviarRespuesta = async () => {
    if (!textoRespuesta.trim()) return;
    const res = await agregarComentario({
      publicacionId,
      contenido: textoRespuesta,
      comentarioPadreId: comentarioId
    });
    if (res.ok) {
      setTextoRespuesta("");
      setMostrarRespuesta(false);
      onRespuestaAgregada(comentarioId, res.data);
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
          <span className="comentario-fecha">{new Date(fecha).toLocaleString()}</span>
        </div>
      </div>

      <p className="comentario-texto">{contenido}</p>

      <div className="comentario-acciones">
        <button onClick={() => setMostrarRespuesta(!mostrarRespuesta)}>💬 Responder</button>
      </div>

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
              comentario={resp}
              onRespuestaAgregada={onRespuestaAgregada}
            />
          ))}
        </div>
      )}
    </div>
  );
}