import { useApiOdoo } from "./../../hooks/useApiOdoo"; // Asegúrate de la ruta correcta

const EjemploCatalogo = () => {
  // Configuración para la llamada a la API de Odoo
  const odooApiParams = {
    db: "guzmandb", // nombre de tu base de datos Odoo
    uid: 2, // ID de usuario autenticado en Odoo
    password: "585480863e465294ebf8f5180616b06290cd7c3e", // Tu clave API de Odoo
    model: "product.template", // El modelo de Odoo que quieres consultar
    method: "search_read", // El método de Odoo a ejecutar
    domain: [], // Dominio (filtro), vacío para todos los productos
    kwargs: {
      // Argumentos adicionales como los campos a recuperar y límite
      fields: [
        "id",
        "name",
        "default_code",
        "barcode",
        "list_price",
        "standard_price",
        "description",
        "type",
        "uom_id",
        "uom_po_id",
        "categ_id",
        "sale_ok",
        "purchase_ok",
        "active",
        "create_date",
        "write_date",
      ],
      limit: 100,
    },
  };

  const { dataAPI, error, loading } = useApiOdoo(odooApiParams);

  return (
    <div>
      <h1>Ejemplo de Consumo de Productos Odoo</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Cargando productos de Odoo...</p>}
      {!loading && !error && dataAPI.length > 0 ? (
        <div>
          <table
            border={1}
            cellPadding="10"
            cellSpacing="0"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>ID</th>
                <th>Nombre del Producto</th>
                <th>Referencia Interna</th>
                <th>Precio de Venta</th>
                <th>Tipo</th>
                <th>Categoría</th>
                <th>Activo</th>
              </tr>
            </thead>
            <tbody>
              {dataAPI.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.default_code || "N/A"}</td>
                  <td>
                    $
                    {product.list_price
                      ? product.list_price.toFixed(2)
                      : "0.00"}
                  </td>
                  <td>{product.type}</td>
                  <td>{product.categ_id ? product.categ_id[1] : "N/A"}</td>
                  <td>{product.active ? "Sí" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && !error && <p>No hay productos disponibles.</p>
      )}
    </div>
  );
};

export default EjemploCatalogo;
