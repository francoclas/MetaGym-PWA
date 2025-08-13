import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
//Vistas
//Inicio
import Login from './features/auth/Login';
import LayoutPrincipal from './components/base/LayoutBase';
import Inicio from './features/inicio/Inicio';
import Notificaciones from './features/notificaciones/Notificaciones';
import Novedades  from './features/publicaciones/Novedades';
//rutinas
import ClienteRutinas from './components/rutinas/ClienteRutinas';
import InformacionRutina from './components/rutinas/InformacionRutina';
import InformacionEjercicio from './components/rutinas/InformacionEjercicio';
import Entrenamiento from './components/entrenamiento/Entrenamiento';
import SesionEntrenamiento from './components/entrenamiento/SesionEntrenamiento';
//citas
//Perfil
import PerfilCliente from './components/usuario/PerfilCliente';
import HistorialSesiones from './components/rutinas/HistorialSesiones';
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
        <Route element={<LayoutPrincipal />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/notificaciones" element={<Notificaciones />} />
          <Route path="/novedades" element={<Novedades />} />
          <Route path="/rutinas" element={<ClienteRutinas />} />
          <Route path="/rutinas/:rutinaId" element={<InformacionRutina />} />
          <Route path="/ejercicio/:id" element={<InformacionEjercicio />} />
          <Route path="/entrenamiento" element={<Entrenamiento />} />
          <Route path="/historialsesiones" element={<HistorialSesiones />} />
          <Route path="/sesionentrenamiento/:sesionId" element={<SesionEntrenamiento />} />
          <Route path="/perfil" element={<PerfilCliente />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </>
    )}
  </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
