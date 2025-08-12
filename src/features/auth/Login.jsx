import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUsuario } from "../../api/authAPI";
import "../../assets/estilos/auth/Login.css";

export default function Login() {
  const [nombreusuario, setNombreusuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
    } else {
      setError(resultado.error);
    }
  };

  return (
    <div className="login-wrapper">
      <img
        src="../../public/imgs/logos/metagymlogo.png"
        alt="MetaGym Logo"
        className="login-logo"
      />
      <h2 className="login-title">INICIO DE SESIÓN</h2>

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
          Continuar
        </button>
        {error && <p className="login-error">{error}</p>}
      </form>

      <p className="login-register">
        ¿No tiene cuenta? <Link to="/registro">Regístrese aquí</Link>
      </p>
    </div>
  );
}
