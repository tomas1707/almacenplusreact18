// src/hooks/useApiStore.ts

import { useState, useCallback } from "react";
import { consumirApiStore } from "../api/services/apiStore"; // Asegúrate de la ruta correcta

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export function useApiStore() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  // Define un tipo genérico para los datos de un usuario o similar
  // Esto es un ejemplo, ajústalo según la estructura de tu API
  interface UserData {
    id?: number; // Para PUT, el ID suele ir en la URL o en el cuerpo
    nombre_completo: string;
    nombre_usuario: string;
    correo_electronico: string;
    activo: number;
    // ... otras propiedades
  }

  const performAction = useCallback(
    async (
      url: string,
      method: "POST" | "PUT" | "DELETE",
      data?: UserData // Se usa UserData para el tipo de datos
    ) => {
      setLoading(true);
      setError(null);
      setResponse(null);

      try {
        const result = await consumirApiStore(url, method, data);
        setResponse({ success: true, data: result });
        return result; // Retorna el resultado para que el componente pueda reaccionar
      } catch (err: any) {
        let errorMessage = "Hubo un error desconocido.";
        if (err.name === "TypeError" && err.message === "Failed to fetch") {
          errorMessage = "Error de red: no se pudo conectar con el servidor.";
        } else if (err.name === "AbortError") {
          errorMessage = "La solicitud tardó demasiado en responder (timeout).";
        } else if (err instanceof SyntaxError) {
          errorMessage =
            "Error al interpretar la respuesta del servidor (JSON inválido).";
        } else if (err.status) {
          // Errores HTTP como 400, 401, 403, 404, 500, etc.
          errorMessage = `Error ${err.status}: ${
            err.message || "No se recibió mensaje específico."
          }`;
          if (err.status === 404) {
            errorMessage =
              "Recurso no encontrado (Error 404). Verifica la URL.";
          } else if (err.status === 400) {
            errorMessage = `Error de validación: ${
              err.message || "Datos incorrectos enviados."
            }`;
          }
        }
        setError(errorMessage);
        setResponse({ success: false, message: errorMessage });
        throw err; // Re-lanza el error para que el componente pueda manejarlo si es necesario
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const createRecord = useCallback(
    (url: string, data: UserData) => {
      return performAction(url, "POST", data);
    },
    [performAction]
  );

  const updateRecord = useCallback(
    (url: string, data: UserData) => {
      return performAction(url, "PUT", data);
    },
    [performAction]
  );

  const deleteRecord = useCallback(
    (url: string) => {
      return performAction(url, "DELETE");
    },
    [performAction]
  );

  return { loading, error, response, createRecord, updateRecord, deleteRecord };
}
