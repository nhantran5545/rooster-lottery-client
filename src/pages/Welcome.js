import React from "react";
import Hynd from "../assets/images/title.png";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-200 to-white">
      {/* Phần logo có animation nhịp thở hấp hối */}
      <div className="fixed top-0 mt-10 left-0 w-full py-4 flex justify-center items-center gap-2 z-50">
        <img src={Hynd} alt="HYND CHECK" className="animate-pulse-fast" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
      <p className="text-lg text-center">
        You have <b>3 seconds or 10 seconds</b> for each shot – no retakes!
        <br />
        This photobooth captures <b>4 pictures</b> in a row, so strike your best
        pose and have fun!
        <br />
        After the session, download your digital copy and share the fun!
      </p>
      <button
        onClick={() => navigate("/photobooth")}
        className="mt-6 px-10 py-3 font-bold border-2 bg-transparent border-black rounded-full text-black bg-white hover:bg-black hover:text-white transition"
      >
        START
      </button>
    </div>
  );
};

export default Welcome;
