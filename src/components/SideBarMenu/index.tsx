import React from "react";
import { Link } from "react-router-dom"; // Si estás usando React Router
import Empresa from "./../SideBarMenu/LogoEmpresa";
import MiAvatar from "./../SideBarMenu/Avatar";
import NavHeader from "./../SideBarMenu/NavHeader";
import NavItem from "./../SideBarMenu/NavItem";

interface SidebarProps {
  logoEmpresa: string;
  nombreEmpresa: string;
  fotoUsuario: string;
  nombreUsuario: string;
  menuItems: {
    header?: string;
    href?: string;
    icon?: string;
    label?: React.ReactNode;
    isActive?: boolean;
  }[];
  onLogout: () => void; // Prop para la función de cerrar sesión
}

const Sidebar: React.FC<SidebarProps> = ({
  logoEmpresa,
  nombreEmpresa,
  fotoUsuario,
  nombreUsuario,
  menuItems,
  onLogout,
}) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Empresa logo={logoEmpresa} href="#">
        {nombreEmpresa}
      </Empresa>

      <div className="sidebar">
        <MiAvatar foto={fotoUsuario}>{nombreUsuario}</MiAvatar>

        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {menuItems.map((item) => (
              <>
                {item.header && <NavHeader>{item.header}</NavHeader>}
                {item.href && item.icon && (
                  <NavItem
                    href={item.href}
                    icon={item.icon}
                    isActive={item.isActive}
                  >
                    {item.label}
                  </NavItem>
                )}
              </>
            ))}

            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <li className="nav-item">
                <Link to="#" className="nav-link " onClick={onLogout}>
                  <i className="fa fa-sign-out-alt" />
                  <p> Cerrar Sesión </p>
                </Link>
              </li>
            </div>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
