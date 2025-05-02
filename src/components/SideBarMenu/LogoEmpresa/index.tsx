import React from "react";
import { ReactNode } from "react";

interface LogoEmpresaProps {
  logo: string;
  href: string;
  children: ReactNode;
}

const LogoEmpresa: React.FC<LogoEmpresaProps> = ({ logo, href, children }) => {
  return (
    <a href={href} className="brand-link">
      <img
        src={logo}
        alt={`${children} logo`}
        className="brand-image img-circle elevation-3"
        style={{ opacity: ".8" }}
      />
      <span className="brand-text font-weight-light">{children}</span>
    </a>
  );
};

export default LogoEmpresa;
