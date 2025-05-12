import React from "react";
import { ReactNode } from "react";

interface PiePaginaProps {
  annio: number;
  children: ReactNode;
}

const Footer: React.FC<PiePaginaProps> = ({
  annio = 2000,
  children = "Prisma",
}) => {
  return (
    <footer className="main-footer">
      <strong>
        Copyright © {annio} <a href="#">{children}</a>. &nbsp;
      </strong>
      Todos los derechos reservados.
      <div className="float-right d-none d-sm-block">
        <b> React versión</b> {React.version}
      </div>
    </footer>
  );
};

export default Footer;
