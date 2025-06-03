import { useEffect, useState } from "react";
import { consumirApi } from "../api/services/apiOdoo"; // Ajusta la ruta según tu estructura

interface OdooRpcParams {
  db: string;
  uid: number;
  password: string; // En Odoo, esta es la clave API o contraseña del usuario
  model: string;
  method: string;
  domain?: any[];
  kwargs?: Record<string, any>;
}

export function useApiOdoo(params: OdooRpcParams) {
  const [dataAPI, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // La URL de Odoo es fija para JSONRPC
  const odooUrl = "https://guzman.odooultimatetics.cloud/jsonrpc"; // Reemplaza con tu URL de Odoo

  useEffect(() => {
    // Para que el efecto se ejecute solo cuando los parámetros estén definidos
    if (
      !params.db ||
      !params.uid ||
      !params.password ||
      !params.model ||
      !params.method
    ) {
      setError("Faltan parámetros necesarios para la llamada a Odoo.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Construir el body del request JSON-RPC para Odoo
    const requestBody = {
      jsonrpc: "2.0",
      method: "call",
      params: {
        service: "object",
        method: "execute_kw",
        args: [
          params.db,
          params.uid,
          params.password,
          params.model,
          params.method,
          params.domain || [], // Dominio, por defecto un array vacío
          params.kwargs || {}, // Argumentos adicionales (como fields, limit)
        ],
      },
      id: 3, // Un ID de solicitud, puede ser cualquiera
    };

    consumirApi(odooUrl, "POST", requestBody)
      .then((response: any) => {
        // Odoo devuelve la data en response.result si la llamada es exitosa
        if (response && response.result) {
          setData(response.result);
        } else if (response && response.error) {
          // Odoo devuelve errores en response.error
          setError(
            `Error de Odoo: ${response.error.message || "Error desconocido"}`
          );
        } else {
          setError("Respuesta inesperada de Odoo.");
        }
      })
      .catch((err) => {
        if (err.name === "TypeError" && err.message === "Failed to fetch") {
          setError(
            "Error de red: no se pudo conectar con el servidor. " + err.message
          );
        } else if (err.name === "AbortError") {
          setError("La solicitud tardó demasiado en responder (timeout).");
        } else if (err instanceof SyntaxError) {
          setError(
            "Error al interpretar la respuesta del servidor (JSON inválido)."
          );
        } else if (err.message && err.message.includes("HTTP error!")) {
          setError(err.message); // Captura el error HTTP de consumirApi
        } else {
          setError(
            "Hubo un error al consumir Odoo: " + err.message || err.status
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [
    params.db,
    params.uid,
    params.password,
    params.model,
    params.method,
    params.domain,
    params.kwargs,
    odooUrl,
  ]); // Dependencias del useEffect

  return { dataAPI, error, loading };
}
