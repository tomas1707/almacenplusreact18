import React from "react";
import { ReactNode } from "react";

interface TituloProfileProps {
  children: ReactNode;
}

const TituloProfile: React.FC<TituloProfileProps> = ({
  children = "Sin contenido",
}) => {
  return (
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>{children}</h1>
          </div>
        </div>
      </div>
      {/* /.container-fluid */}
    </section>
  );
};

export default TituloProfile;
