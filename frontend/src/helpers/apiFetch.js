const apiFetch = async (route, method = "GET", body) => {
  const url = `http://localhost:3000${route}`;

  const options = {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(url, options);
  } catch (error) {
    console.error("Error de conexión (Backend apagado):", error);
    return { ok: false, status: 0, data: null };
  }

  const text = await response.text();
  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch (e) {
    console.warn("El servidor respondió pero no es JSON válido:", text);
  }

  // Ya no descartamos el body en caso de error
  return { ok: response.ok, status: response.status, data };
};

export { apiFetch };