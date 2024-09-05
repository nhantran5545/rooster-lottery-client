import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
