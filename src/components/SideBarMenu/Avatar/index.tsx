import React from "react";
import { ReactNode } from "react";
import noFoto from "./../../../assets/images/NoImage.jpg";

interface AvatarProps {
  foto?: string;
  children: ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({
  foto = noFoto,
  children = "No Person",
}) => {
  return (
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src={foto} className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="d-flex flex-column position-relative">
        <div className="info order-1 ">
          <p className="d-block text-white">{children}</p>
        </div>
      </div>
    </div>
  );
};

export default Avatar;
