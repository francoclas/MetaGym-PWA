const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function loginUsuario(nombreusuario, password) {
  try {
    const response = await fetch(`${BASE_URL}/usuario/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombreusuario, password })
    });

    const data = await response.json();

    if (response.status == 200) {
      return {
        ok: true,
        data: data.data // token, usuarioId, rol, nombreCompleto
      };
    } else {
      return {
        ok: false,
        error: data.message || 'Credenciales inválidas'
      };
    }
  } catch (error) {
    return {
      ok: false,
      error: 'Error de red o servidor no disponible'
    };
  }
}