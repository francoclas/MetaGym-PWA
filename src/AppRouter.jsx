import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
//Vistas
import Login from './features/auth/Login';
import Inicio from './features/inicio/Inicio';
import Notificaciones from './features/notificaciones/Notificaciones';
const AppRouter = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkToken); // si cambia desde otra pestaña
    window.addEventListener('token-updated', checkToken); // evento manual

    return () => {
      window.removeEventListener('storage', checkToken);
      window.removeEventListener('token-updated', checkToken);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Inicio />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
