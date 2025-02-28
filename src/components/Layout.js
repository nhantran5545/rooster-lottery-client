import React from "react";
import Background from "../assets/images/background.png";

const Layout = ({ children }) => {
  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="flex items-center justify-center w-full h-full bg-black bg-opacity-20"></div>
    </div>
  );
};

export default Layout;
