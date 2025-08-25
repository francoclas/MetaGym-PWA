import "../../assets/estilos/auth/AyudaInstalacion.css"
export default function AyudaInstalacion()  {
  return (
    <div className="ayuda-wrapper">
      <main className="ayuda-contenido">
        <h1 className="ayuda-titulo">Instalar como App</h1>
        <p className="ayuda-intro">
          Seguí estos pasos para agregar MetaGym a tu teléfono como una app.
        </p>

        <section className="ayuda-card">
          <div className="ayuda-card-header">
            <span className="badge">Android</span>
            <h2>Instalar en Android (Chrome)</h2>
          </div>
          <ol className="pasos">
            <li>Abrí MetaGym en <strong>Chrome</strong>.</li>
            <li>Tocá el ícono <strong>⋮</strong> (arriba a la derecha).</li>
            <li>Elegí <strong>“Agregar a la pantalla de inicio”</strong>.</li>
            <li>Confirmá con <strong>Agregar</strong>.</li>
          </ol>
          <p className="tip">
            Tip: si ves un banner que dice <em>“Instalar app”</em>, tocá ahí y listo.
          </p>
        </section>

        <section className="ayuda-card">
          <div className="ayuda-card-header">
            <span className="badge badge-ios">iOS</span>
            <h2>Instalar en iPhone/iPad (Safari)</h2>
          </div>
          <ol className="pasos">
            <li>Abrí MetaGym en <strong>Safari</strong>.</li>
            <li>Tocá el botón <strong>Compartir</strong> (cuadrado con flecha ↑).</li>
            <li>Elegí <strong>“Añadir a pantalla de inicio”</strong>.</li>
            <li>Confirmá con <strong>Añadir</strong>.</li>
          </ol>
          <p className="tip">
            Importante: en iOS debe ser <strong>Safari</strong> para ver la opción.
          </p>
        </section>

        <section className="ayuda-faq">
          <h3>¿No te aparece la opción?</h3>
          <ul>
            <li>Actualizá el navegador a la última versión.</li>
            <li>Ingresá con la URL segura (https).</li>
            <li>Probá recargar la página.</li>
          </ul>
        </section>
      </main>
      </div>
)};