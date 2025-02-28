import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import domtoimage from "dom-to-image";
import { Camera, Download } from "lucide-react";
import { motion } from "framer-motion";

const Preview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { images, frameStyle } = location.state || {
    images: [],
    frameStyle: "2x2",
  };
  const [frameColor, setFrameColor] = useState("#ffffff");

  const colorOptions = [
    "#ffffff",
    "#000000",
    "#f8b195",
    "#f67280",
    "#c06c84",
    "#6c5b7b",
    "#355c7d",
    "#a8e6cf",
    "#dcedc1",
    "#ffd3b6",
    "#ffaaa5",
    "#FDB7EA",
    "#B7B1F2",
    "#89A8B2",
    "#C5D3E8",
    "#D4F6FF",
    "#C9E9D2",
    "#FF90BC",
    "#092635",
    "#503C3C",
    "#B4B4B8",
    "#F72798",
    "#9195F6",
    "#A5DD9B",
    "#003C43",
    "#F3D0D7",
    "#102C57",
    "#FFB1B1",
    "#CAF4FF",
    "#9AA6B2",
  ];

  const currentDate = new Date().toLocaleString();

  const captureScreenshot = () => {
    const element = document.getElementById("screenshot-container");
    domtoimage
      .toPng(element)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "photobooth.png";
        link.click();
      })
      .catch((error) => {
        console.error("Lỗi khi chụp ảnh:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-bl from-pink-200 via-indigo-100 to-pink-100 p-8">
      <h1 className="text-5xl font-bold text-gray-700 mb-8 mt-12 font-[LeagueGothic-Regular] tracking-wider">
        Ảnh đã chụp
      </h1>
      <div className="flex w-full max-w-4xl">
        {/* Phần ảnh đã chụp bên trái */}
        <div className="flex-1">
          <div
            id="screenshot-container"
            className="flex flex-col items-center"
            style={{ backgroundColor: frameColor }}
          >
            <div
              className={`grid gap-1 px-2 pt-4 rounded-xl ${
                frameStyle === "2x2" ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden"
                  style={{ borderColor: frameColor }}
                >
                  <img
                    src={image}
                    alt={`Captured ${index}`}
                    className={`object-cover ${
                      frameStyle === "2x2" ? "w-40 h-52" : "w-48 h-48"
                    }`}
                  />
                </div>
              ))}
            </div>
            <h4 className="screenshot-text text-base text-gray-800 text-center font-[LeagueGothic-Regular]">
              <span className="">Hynd</span> {currentDate}
            </h4>
          </div>
        </div>

        {/* Phần chọn màu bên phải */}
        <div className="w-1/2 ml-4">
          <label className="text-gray-700 font-[LeagueGothic-Regular] mb-4 block text-2xl tracking-wide">
            Chọn màu khung:{" "}
          </label>
          <div className="flex flex-wrap gap-2">
            {colorOptions.map((color) => (
              <button
                key={color}
                onClick={() => setFrameColor(color)}
                className={`w-14 h-14 m-2 rounded-full transition-all duration-400 transform ${
                  frameColor === color
                    ? "scale-150 border-[4px] border-white shadow-xl"
                    : "hover:scale-150"
                }`}
                style={{ backgroundColor: color }}
              ></button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex space-x-4">
        <motion.button
          onClick={captureScreenshot}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95, rotate: -2 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <Download size={20} />
          Tải ảnh về
        </motion.button>

        <motion.button
          onClick={() => navigate("/photobooth")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95, rotate: 2 }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <Camera size={20} />
          Chụp lại
        </motion.button>
      </div>
    </div>
  );
};

export default Preview;
