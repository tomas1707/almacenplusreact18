import React from "react";

interface ImageProps {
  imageUrl: string;
  alt: string;
  width?: string | number;
  height?: string | number;
}

const Image: React.FC<ImageProps> = ({ imageUrl, alt, width, height }) => {
  return (
    <div>
      <img
        className="img-fluid mb-3"
        src={imageUrl}
        alt={alt}
        style={{ width: width, height: height }}
      />
    </div>
  );
};

export default Image;
