import React, { useEffect, useState } from "react";
import { obtenerPerfilUsuario } from "../../api/usuarioAPI";
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

  const handleGuardar = () => {
    console.log("Guardar cambios", formData);
    // acá después implementamos el PUT para actualizar datos
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

        <label for="nombreCompleto">Nombre completo</label>
        <input
          type="text"
          name="nombreCompleto"
          value={formData.nombreCompleto}
          onChange={handleChange}
        />

        <label for="correo">Correo</label>
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
        />

        <label for="telefono">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
        />

        <label for="password">Contraseña</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="btn-guardar" onClick={handleGuardar}>
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default PerfilCliente;
