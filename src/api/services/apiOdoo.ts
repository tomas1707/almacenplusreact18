// ../api/services/api.ts
export async function consumirApi(
  url: string,
  method: string = "GET",
  body: any = null
) {
  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    // Añadir el body solo si el método lo requiere (POST, PUT, PATCH)
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      // Manejar errores HTTP (4xx, 5xx)
      const errorData = await response.json();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data; // Odoo devuelve directamente el JSON RPC response
  } catch (error: any) {
    console.error("Error en consumirApi:", error);
    throw error;
  }
}
