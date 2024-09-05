import React from "react";
import { HomeIcon, UserIcon, LogoutIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { RiHistoryFill } from "react-icons/ri";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-gray-800 text-white w-64 flex flex-col">
      <div className="flex items-center justify-center h-16 shadow-lg">
        <h1 className="text-2xl font-semibold">Rooster Lottery</h1>
      </div>
      <div className="flex-grow p-4">
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => navigate("/bet")}
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <HomeIcon className="h-5 w-5 mr-2" />
            Place Lottery
          </button>
          <button
            onClick={() => navigate("/history")}
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <RiHistoryFill className="h-5 w-5 mr-2" />
            History
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <UserIcon className="h-5 w-5 mr-2" />
            Profile
          </button>
          <button
            onClick={() => navigate("/")}
            className="flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <LogoutIcon className="h-5 w-5 mr-2" />
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
