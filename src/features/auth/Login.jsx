import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario } from "../../api/authAPI";
import "../../assets/estilos/auth/Login.css";

export default function Login() {
  const [nombreusuario, setNombreusuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [deferredPrompt, setDeferredPrompt] = useState(null); 
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_FOTOS_BASE_URL
  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const resultado = await loginUsuario(nombreusuario, password);

    if (resultado.ok) {
      const { token, usuarioId, rol, nombreCompleto } = resultado.data;
      localStorage.setItem("token", token);
      localStorage.setItem("rol", rol);
      localStorage.setItem("usuarioId", usuarioId);
      localStorage.setItem("usuario", nombreusuario);
      localStorage.setItem("nombreCompleto", nombreCompleto);
      window.dispatchEvent(new Event("token-updated"));
      navigate("/");
    }
  };

  const instalarPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log("Resultado instalación:", outcome);
    setDeferredPrompt(null);
  };

  return (
    <div className="login-wrapper">
      <img
        src="../../public/imgs/logos/metagymlogo.png"
        alt="MetaGym Logo"
        className="login-logo"
      />
      <form onSubmit={handleSubmit} className="login-card">
        <input
          type="text"
          placeholder="Ingrese usuario"
          value={nombreusuario}
          onChange={(e) => setNombreusuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">
          Iniciar sesión
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>

      <p className="login-register">
        ¿No tiene cuenta? <Link to= {BASE_URL+"Home/RegistrarUsuario"}>Regístrese aquí</Link>
      </p>

      {deferredPrompt && (
        <div className="instalar-pwa">
          <p>
            📱 <strong>Instalá la App</strong> para entrar más rápido y recibir
            notificaciones.
          </p>
          <button className="historial-btn" onClick={instalarPWA}>
            Instalar ahora
          </button>
        </div>
      )}
      <p className="login-register">
        <Link to="/ayuda-instalacion" className="detalle-btn">Cómo instalar</Link>
      </p>
    </div>
  );
}
