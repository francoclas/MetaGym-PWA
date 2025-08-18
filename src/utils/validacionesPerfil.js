export function validarPerfil(formData, perfil) {
  let errores = {};

  // Validar nombre
  if (!formData.nombreCompleto.trim() || formData.nombreCompleto.length > 30) {
    errores.nombreCompleto = "El nombre es obligatorio y debe tener menos de 30 caracteres.";
  }

  // Validar correo
  if (!formData.correo.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errores.correo = "Debe ser un correo válido.";
  }

  // Validar teléfono
  if (!formData.telefono.trim()) {
    errores.telefono = "El teléfono no puede estar vacío.";
  }

  // Validar contraseña (solo si se quiere cambiar)
  if (formData.password) {
    if (!formData.password.match(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/)) {
      errores.password = "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un caracter especial.";
    }
    if (formData.password !== formData.confirmPassword) {
      errores.confirmPassword = "Las contraseñas no coinciden.";
    }
  }

  return errores;
}
