// src/api/services/apiStore.ts

export async function consumirApiStore(
  url: string,
  method: "POST" | "PUT" | "DELETE" | "PATCH",
  data?: any, // 'data' es opcional para DELETE
  timeout: number = 5000
): Promise<any> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const options: RequestInit = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      // Aquí puedes añadir otos headers como 'Authorization' esto es para laravel sanctum
    },
    signal: controller.signal,
  };

  // Para POST y PUT, se añade el cuerpo de la solicitud
  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const error = new Error(
        `Error al consumir la API: ${response.status} - ${response.statusText}`
      );
      (error as any).status = response.status;
      throw error;
    }

    // Para DELETE, la respuesta puede no tener cuerpo JSON (ej. 204 No Content)
    // Se verifica si la respuesta tiene contenido antes de intentar parsear como JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      return result;
    } else {
      // Si no es JSON o es un 204 No Content, retornamos una señal de éxito
      return { success: true, message: `Operación ${method} exitosa` };
    }
  } catch (error: any) {
    if (error.name === "AbortError") {
      console.error("La solicitud fue cancelada por timeout");
    } else {
      console.error(
        `Ocurrió un error en la operación ${method}:`,
        error.message
      );
    }
    throw error;
  } finally {
    clearTimeout(id);
  }
}
