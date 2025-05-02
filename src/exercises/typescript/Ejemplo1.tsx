import { useApi } from "./../../hooks/useApi";

const Ejemplo1 = () => {
  const apiUrl = "http://almacenplus.test/api/user/";
  const { dataAPI, error } = useApi(apiUrl);

  return (
    <div>
      <h1>Ejemplo de Consumo de API</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Si hay un error, se mostraá en rojo en rojo */}
      {dataAPI.length > 0 ? (
        <div>
          {/* Iteramos sobre los usuarios devueltos por la API */}
          <table
            border={1}
            cellPadding="10"
            cellSpacing="0"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>Folio</th>
                <th>Nombre Completo</th>
                <th>Nombre de Usuario</th>
                <th>Correo Electrónico</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataAPI.map((user, index) => (
                <tr key={index}>
                  <td style={{ color: "red", fontWeight: "bold" }}>
                    {index + 1}
                  </td>
                  <td>{user.nombre_completo}</td>
                  <td>{user.nombre_usuario}</td>
                  <td>{user.correo_electronico}</td>
                  <td>{user.activo === 1 ? "Activo" : "Inactivo"}</td>
                  <td>
                    <button style={{ marginRight: "10px" }}>Actualizar</button>
                    <button style={{ color: "white", backgroundColor: "red" }}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Consumiendo API...</p>
      )}
    </div>
  );
};

export default Ejemplo1;
