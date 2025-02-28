import React from "react";

const PhotoBooth = ({ images }) => {
  return (
    <div className=" absolute right-[200px] top-[100px]  transform rotate-[22deg]">
      <div className=" w-full relative  px-8 pt-4  py-1 bg-[#D798AE]  bg-opacity-70 rounded-sm shadow-xl">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Photo ${index + 1}`}
            className="w-44 h-44 mb-4 object-cover rounded-md border border-gray-300"
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoBooth;
