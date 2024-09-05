import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen justify-center items-center bg-gray-100 p-10">
      {children}
    </div>
  );
};

export default Layout;
