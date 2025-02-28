import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      className="bg-[#FF75A6] flex-row text-black text-[45px] font-[Jersey15-Regular] p-4  rounded-2xl hover:bg-gray-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
