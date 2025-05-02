import React, { ReactNode } from "react";
import SinImagen from "../../assets/images/NoImage.jpg";

interface CardProps {
  imageUrl?: string;
  title: string;
  children: ReactNode;
  lastUpdated?: string; // Propiedad opcional
}

const Card: React.FC<CardProps> = ({
  imageUrl = SinImagen,
  title = "Sin titulo", // Valor por defecto para title
  children = <p>sin contenido.</p>, // Valor por defecto para children
  lastUpdated = "Sin fecha",
}) => {
  return (
    <div className="card mb-3" style={{ maxWidth: 540 }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={imageUrl} className="img-fluid rounded-start" alt={title} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">
              <strong>{title}</strong>
            </h5>
            <p className="card-text">
              {/*Children carga el contenido del tag Card*/}
              {children}
            </p>
            <p className="card-text">
              <small className="text-body-secondary">
                {lastUpdated && `Última Actualización: ${lastUpdated}`}
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
