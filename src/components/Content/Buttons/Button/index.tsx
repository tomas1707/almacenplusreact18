import React, { ReactNode } from "react";

interface ButtonProps {
  color?: string;
  icono?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  icono = "trash",
  children = "<p>Sin opción</p>", // Valor por defecto para children
}) => {
  return (
    <button
      type="button"
      className={`align-items-center btn btn-block btn-${color} btn-sm`}
      style={{ height: "35px", width: "100px" }}
    >
      <i className={`fa fa-${icono}`} />
      &nbsp;
      {children}
    </button>
  );
};

export default Button;
