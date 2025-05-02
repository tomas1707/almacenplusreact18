import React from "react";
import { ReactNode } from "react";

interface ChatsProps {
  href: string;
  icon: string;
  isActive?: boolean;
  children: ReactNode;
}

const NavItem: React.FC<ChatsProps> = ({
  href = "#",
  icon = "user",
  isActive = false,
  children = "INLINE",
}) => {
  const classNameI = `nav-icon fas fa-${icon}`;
  const classNameA = `nav-link ${isActive ? "active" : ""}`;
  return (
    <li className="nav-item">
      <a href={href} className={classNameA}>
        <i className={classNameI} />
        <p> {children} </p>
      </a>
    </li>
  );
};

export default NavItem;
