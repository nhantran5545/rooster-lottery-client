import React from "react";
import Layout from "../components/Layout";
import PhotoBooth from "../components/PhotoBooth";
import CameraIcon from "../assets/images/icon_camera.png";
import Hynd from "../assets/images/title.png";
import Background from "../assets/images/background.png";
import photo1 from "../assets/images/photo.JPG";
import hynd from "../assets/images/hynd.JPG";
import photo2 from "../assets/images/photo.JPG";
import photo3 from "../assets/images/photo.JPG";
import Button from "../components/UI/button";
import { useNavigate } from "react-router-dom";
import PhotoBooth2 from "../components/PhotoBooth2";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-screen h-screen bg-cover object-c bg-center "
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="flex items-center justify-center w-full h-full bg-[#333333] bg-opacity-15">
        {/* Phần logo có animation nhịp thở hấp hối */}
        <div className="fixed top-0 mt-10 left-0 w-full py-4 flex justify-center items-center gap-2 z-50">
          <img src={Hynd} alt="HYND CHECK" className="animate-pulse-fast" />
        </div>
        <div className="bg-white w-[70%] h-[55%] px-44 mt-14 rounded-3xl items-center justify-center">
          <h1 className="font-[LeagueGothic-Regular] text-3xl mt-20 mb-14 text-pink-300">
            "Preserve your precious moments"
          </h1>
          <button
            onClick={() => navigate("/welcome")}
            className="relative mt px-20 py-2 font-bold rounded-lg bg-[#FF75A6] text-black shadow-lg 
            before:absolute before:inset-1 before:bg-[#FFDCE8] before:my-2 before:mx-2 before:rounded-sm  before:transition-all before:duration-300
            hover:border-pink-200 hover:bg-black hover:before:bg-pink-500 hover:text-white"
          >
            <span className="relative z-10 text-[45px] font-[Jersey15-Regular] tracking-wider">
              START
            </span>
            <span
              className="absolute right-7 top-[50px] -translate-y-1/2 w-2.5 h-2.5 bg-green-500 rounded-full shadow-md 
              after:content-[''] after:absolute after:w-2.5 after:h-2.5 after:bg-pink-300 after:rounded-full after:-top-5 after:left-0"
            ></span>
          </button>
        </div>
        <PhotoBooth images={[photo1, photo2, photo3]} />
        <PhotoBooth2 images={[hynd, hynd, hynd, hynd]} />
      </div>
    </div>
  );
};

export default HomePage;
