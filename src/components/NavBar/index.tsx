import React, { ReactNode } from "react";

interface NavBarProps {
  children: ReactNode;
}

const NavBar: React.FC<NavBarProps> = ({
  children = <p> </p>, // Valor por defecto para children
}) => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Navbar */}
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {children}
        <li className="nav-item">
          <a
            className="nav-link"
            data-widget="fullscreen"
            href="#"
            role="button"
          >
            <i className="fas fa-expand-arrows-alt" />
          </a>
        </li>
      </ul>
      {/* /.navbar */}
    </nav>
  );
};

export default NavBar;
