import React from "react";
import Button from "./../Buttons/Button";

interface ButtonProps {
  //color?: string;
  titulo?: string;
  //children: ReactNode;
}

const Table: React.FC<ButtonProps> = ({
  titulo = "Sin titulo",
  // color = "btn-primary",
  // children = "<p>Sin opción</p>", // Valor por defecto para children
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{titulo}</h3>
        <div className="card-tools">
          <div className="input-group input-group-sm" style={{ width: 150 }}>
            <input
              type="text"
              name="table_search"
              className="form-control float-right"
              placeholder="Search"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-default">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* /.card-header */}
      <div className="card-body table-responsive p-0">
        <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Status</th>
              <th>Reason</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>183</td>
              <td>John Doe</td>
              <td>11-7-2014</td>
              <td>
                <span className="tag tag-success">Approved</span>
              </td>
              <td>Bacon</td>
              <td style={{ tableLayout: "fixed", width: "100px" }}>
                <Button color="primary" icono="trash">
                  Eliminar
                </Button>
              </td>
              <td style={{ tableLayout: "fixed", width: "100px" }}>
                <Button color="warning" icono="pen">
                  Actualizar
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* /.card-body */}
    </div>
  );
};

export default Table;
