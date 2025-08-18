import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
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
import CitasCliente from './features/citas/CitasCliente';
import InformacionCita from './features/citas/InformacionCita'
//Perfil
import PerfilCliente from './features/usuario/PerfilCliente'
import HistorialSesiones from './components/rutinas/HistorialSesiones';
const AppRouter = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem('token'));
    };

    window.addEventListener('storage', checkToken); 
    window.addEventListener('token-updated', checkToken);

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
          <Route path="/citas" element={<CitasCliente/>}/>
          <Route path="/cita/:citaId" element={<InformacionCita />} />
          <Route path="/perfil" element={<PerfilCliente />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </>
      
    )}
  </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
};

export default AppRouter;
