import { useEffect, useState } from "react";
import { obtenerNovedades } from "../../api/publicacionesAPI";
import NovedadCard from "../../components/publicaciones/NovedadCard";

export default function Novedades() {
  const [novedades, setNovedades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError(null);

      const res = await obtenerNovedades();
      if (res.ok) {
        setNovedades(res.data || []);
      } else {
        setError(res.error || "No se pudieron cargar las novedades");
      }

      setCargando(false);
    };

    cargar();
  }, []);

  if (cargando) return <div className="historial-sesiones"><p>Cargando...</p></div>;
  if (error) return <div className="historial-sesiones"><p style={{ color: "tomato" }}>{error}</p></div>;

  return (
    <div className="historial-sesiones">
      <h2 style={{ marginBottom: 12 }}>Novedades</h2>

      {novedades.length === 0 ? (
        <p>No hay novedades por el momento.</p>
      ) : (
        <div className="lista-sesiones">
          {novedades.map((n, i) => (
            <NovedadCard key={n.publicacionId ?? i} novedad={n} />
          ))}
        </div>
      )}
    </div>
  );
}
