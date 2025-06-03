// archivo testOdooFetch.js
fetch("https://guzman.odooultimatetics.cloud/jsonrpc", {
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
        "585480863e465294ebf8f5180616b06290cd7c3e",
        "product.template",
        "search_read",
        [],
        {
          fields: ["name", "list_price"],
          limit: 1,
        },
      ],
    },
    id: 1,
  }),
})
  .then((res) => res.json())
  .then(console.log)
  .catch(console.error);
