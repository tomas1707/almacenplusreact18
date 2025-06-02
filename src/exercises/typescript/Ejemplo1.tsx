import { useApi } from "./../../hooks/useApi";

const Ejemplo1 = () => {
  // const apiUrl = "http://almacenplus.test/api/usuario/";
  const apiUrl = "https://profetomas.ultimatetics.com.mx/api/usuario";
  const { dataAPI, error, loading } = useApi(apiUrl);

  return (
    <div>
      <h1>Ejemplo de Consumo de En Pint</h1>
      {/* Si hay un error, se mostraá en rojo */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Mostrar mensaje de carga */}
      {loading && <p>Cargando datos...</p>}
      {/* Mostrar datos solo si no hay error y no está cargando y hay datos */}
      {!loading && !error && dataAPI.length > 0 ? (
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
        // Mensaje cuando no hay datos o aún no se han cargado (y no hay error)
        !loading && !error && <p>No hay datos disponibles.</p>
      )}
    </div>
  );
};

export default Ejemplo1;
