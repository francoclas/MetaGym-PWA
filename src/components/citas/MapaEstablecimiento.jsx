export default function MapaEstablecimiento({ latitud, longitud }) {
  if (!latitud || !longitud) {
    return <p>No se pudo cargar el mapa</p>;
  }

  const mapaSrc = `https://www.google.com/maps?q=${latitud},${longitud}&hl=es&z=16&output=embed`;

  return (
    <div style={{ marginTop: "16px" }}>
      <iframe
        title="Mapa Establecimiento"
        src={mapaSrc}
        width="100%"
        height="250"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}
