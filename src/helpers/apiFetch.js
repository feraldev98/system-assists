const apiFetch = async (route, method = "GET", body) => {
  try {
    const url = `http://localhost:3000${route}`;
    
    const options = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    // 1. Leemos el texto crudo primero (para evitar el error JSON.parse)
    const text = await response.text();

    // 2. Verificamos si la respuesta fue exitosa
    if (!response.ok) {
      // Si el servidor mandó un error, lo mostramos en consola
      console.error(`❌ Error API (${response.status}):`, text);
      return null;
    }

    // 3. Intentamos convertir a JSON
    try {
      // Si está vacío, devolvemos array vacío o objeto vacío
      return text ? JSON.parse(text) : [];
    } catch (e) {
      console.warn("⚠️ El servidor respondió OK pero no es JSON válido:", text, e);
      return null;
    }

  } catch (error) {
    console.error("🔥 Error de conexión (Backend apagado):", error);
    return null;
  }
}

export { apiFetch };