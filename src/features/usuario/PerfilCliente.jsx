import React, { useEffect, useState } from "react";
import { 
  obtenerPerfilUsuario, 
  actualizarNombre,
  actualizarCorreo,
  actualizarTelefono,
  actualizarPassword
} from "../../api/usuarioAPI";
import "../../assets/estilos/usuario/PerfilCliente.css";
import { logout } from '../../utils/logout';

const PerfilCliente = () => {
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nombreCompleto: "",
    correo: "",
    telefono: "",
    password: "",
    confPassword: ""
  });

  const usuarioId = localStorage.getItem("usuarioId");
  const nombreUsuario = localStorage.getItem("usuario");

  useEffect(() => {
    const fetchPerfil = async () => {
      const res = await obtenerPerfilUsuario(usuarioId, "Cliente");
      if (res.ok) {
        setPerfil(res.data);
        setFormData({
          nombreCompleto: res.data.nombreCompleto || "",
          correo: res.data.correo || "",
          telefono: res.data.telefono || "",
          password: "",
          confPassword: ""
        });
      }
      setLoading(false);
    };

    fetchPerfil();
  }, [usuarioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const manejoGuardarCambios = async () => {
    if (!perfil) return;

    // Validaciones simples
    if (!formData.correo.includes("@")) {
      alert("Correo inválido");
      return;
    }
    if (formData.telefono && isNaN(formData.telefono)) {
      alert("El teléfono debe ser numérico");
      return;
    }
    if (formData.password && formData.password !== formData.confPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Comparaciones y llamados a la API
    if (formData.nombreCompleto !== perfil.nombreCompleto) {
      await actualizarNombre(usuarioId, nombreUsuario, formData.nombreCompleto, "Cliente");
    }
    if (formData.correo !== perfil.correo) {
      await actualizarCorreo(usuarioId, nombreUsuario, formData.correo, "Cliente");
    }
    if (formData.telefono !== perfil.telefono) {
      await actualizarTelefono(usuarioId, nombreUsuario, formData.telefono, "Cliente");
    }
    if (formData.password) {
      await actualizarPassword(usuarioId, nombreUsuario, formData.password, formData.confPassword, "Cliente");
    }

    alert("Cambios guardados");
  };

  if (loading) return <p className="perfil-loading">Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-imagen-container">
        <img
          src={`${import.meta.env.VITE_FOTOS_BASE_URL}${perfil.imagenPerfilURL}`}
          alt="Perfil"
          className="perfil-imagen"
        />
      </div>

      <div className="perfil-info">
        <button onClick={logout}>Cerrar sesión</button>

        <h3 className="perfil-nombre-usuario">@{nombreUsuario}</h3>

        <label htmlFor="nombreCompleto">Nombre completo</label>
        <input
          type="text"
          name="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={handleChange}
        />

        <label htmlFor="correo">Correo</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />

        <label htmlFor="telefono">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />

        <label htmlFor="password">Nueva Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <label htmlFor="confPassword">Confirmar Contraseña</label>
        <input
          type="password"
          name="confPassword"
          value={formData.confPassword}
          onChange={handleChange}
        />

        <button className="btn-guardar" onClick={manejoGuardarCambios}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default PerfilCliente;
