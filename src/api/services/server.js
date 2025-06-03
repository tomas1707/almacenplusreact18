const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/api/productos", async (req, res) => {
  try {
    const response = await fetch(
      "https://guzman.odooultimatetics.cloud/jsonrpc",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "call",
          params: {
            service: "object",
            method: "execute_kw",
            args: [
              "guzmandb",
              2,
              "585480863e465294ebf8f5180616b06290cd7c3e", // token secreto
              "product.template",
              "search_read",
              [],
              {
                fields: [
                  "id",
                  "name",
                  "default_code",
                  "list_price",
                  "type",
                  "categ_id",
                  "uom_id",
                  "active",
                ],
                limit: 50,
              },
            ],
          },
          id: 1,
        }),
      }
    );

    const json = await response.json();
    if (json.result && Array.isArray(json.result)) {
      res.json(json.result);
    } else if (json.error) {
      res.status(500).json({ error: json.error.message });
    } else {
      res.status(500).json({ error: "Respuesta inválida del servidor Odoo" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al conectar con Odoo", detalle: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
