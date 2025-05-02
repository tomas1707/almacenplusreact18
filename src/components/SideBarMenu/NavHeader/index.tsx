import React from "react";
import { ReactNode } from "react";

interface ChatsProps {
  children: ReactNode;
}

const NavHeader: React.FC<ChatsProps> = ({ children = "INLINE" }) => {
  return <li className="nav-header">{children}</li>;
};

export default NavHeader;
