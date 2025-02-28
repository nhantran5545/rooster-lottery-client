import React from "react";

const PhotoFrame = ({ images }) => {
  return (
    <div className="absolute   p-2 right-[550px] top-[400px] bg-[#ecadff7e] rounded-lg shadow-lg transform -rotate-[22deg]">
      {/* Khung viền */}

      {/* Ảnh 2x2 */}
      <div className="grid grid-cols-2 gap-1 p-2 relative z-0">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Photo ${index + 1}`}
            className="w-28 h-36  rounded-md border-2 border-white object-fill"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoFrame;
