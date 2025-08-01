import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../../api/authAPI';

const Login = () => {
  const [nombreusuario, setNombreusuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const resultado = await loginUsuario(nombreusuario, password);

    if (resultado.ok) {
      const { token, Nombre,usuarioId, rol, nombreCompleto } = resultado.data;
      localStorage.setItem('token', token);
      window.dispatchEvent(new Event('token-updated'));
      localStorage.setItem('rol', rol);
      localStorage.setItem('usuarioId', usuarioId);
      localStorage.setItem('usuario', nombreusuario);
      localStorage.setItem('nombreCompleto', nombreCompleto);
      console.log("redirigiendo inicio")
    } else {
      setError(resultado.error);
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario o correo"
          value={nombreusuario}
          onChange={(e) => setNombreusuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;