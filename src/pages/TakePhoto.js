import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const TakePhoto = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const [frameStyle, setFrameStyle] = useState("2x2"); // "2x2" hoặc "4-vertical"
  const [timer, setTimer] = useState(3);
  const [filter, setFilter] = useState("none"); // Lọc màu ảnh
  const [capturedImages, setCapturedImages] = useState([]); // Lưu ảnh đã chụp
  const [countdown, setCountdown] = useState(0); // Đếm ngược
  const [isCapturing, setIsCapturing] = useState(false); // Trạng thái đang chụp ảnh

  const applyFilter = (imageSrc, filter) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Đặt kích thước canvas bằng với ảnh
        canvas.width = img.width;
        canvas.height = img.height;

        // Áp dụng bộ lọc
        switch (filter) {
          case "grayscale":
            ctx.filter = "grayscale(100%)";
            break;
          case "sepia":
            ctx.filter = "sepia(100%)";
            break;
          case "soft":
            ctx.filter = "brightness(1.1) contrast(0.9) saturate(0.8)";
            break;
          case "vibrant":
            ctx.filter = "brightness(1.1) contrast(1.1) saturate(1.5)";
            break;
          case "smooth-skin":
            ctx.filter =
              "brightness(1.1) contrast(0.9) saturate(0.8) blur(1px)";
            break;
          case "brighten":
            ctx.filter = "brightness(1.2) contrast(0.9)";
            break;
          default:
            ctx.filter = "none"; // Không áp dụng bộ lọc
            break;
        }

        // Vẽ ảnh lên canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Lấy ảnh sau khi áp dụng bộ lọc
        const filteredImage = canvas.toDataURL("image/jpeg");

        resolve(filteredImage); // Trả về ảnh đã lọc
      };
    });
  };

  const captureAndFlip = async () => {
    if (!webcamRef.current) return null;

    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return null;

    // Lật ảnh
    const flippedImage = await new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Đặt kích thước canvas bằng với ảnh
        canvas.width = img.width;
        canvas.height = img.height;

        // Lật ảnh ngang
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);

        // Vẽ ảnh đã lật lên canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Lấy ảnh sau khi lật
        const flippedImage = canvas.toDataURL("image/jpeg");

        resolve(flippedImage); // Trả về ảnh đã lật
      };
    });

    // Áp dụng bộ lọc
    const filteredImage = await applyFilter(flippedImage, filter);

    return filteredImage; // Trả về ảnh đã lật và lọc
  };

  const startPhotoSession = async () => {
    setIsCapturing(true); // Bắt đầu chụp ảnh
    setCapturedImages([]); // Xóa ảnh cũ

    // Tạo một mảng tạm để lưu ảnh đã chụp
    const newCapturedImages = [];

    for (let i = 0; i < 4; i++) {
      // Bắt đầu đếm ngược và chụp ảnh
      await new Promise((resolve) => {
        setCountdown(timer); // Bắt đầu đếm ngược
        let count = timer;
        const countdownInterval = setInterval(() => {
          setCountdown((prev) => prev - 1);
          count--;
          if (count === 0) {
            clearInterval(countdownInterval);

            // Chụp ảnh và lật ảnh
            captureAndFlip().then((filteredImage) => {
              if (filteredImage) {
                newCapturedImages.push(filteredImage); // Lưu ảnh đã lật và lọc vào mảng tạm
                setCapturedImages((prev) => [...prev, filteredImage]); // Cập nhật state
              }
              resolve();
            });
          }
        }, 1000);
      });
    }

    // Kết thúc chụp ảnh và chuyển trang
    setIsCapturing(false);
    setCountdown(0);
    navigate("/preview", { state: { images: newCapturedImages, frameStyle } }); // Truyền dữ liệu
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-pink-200 to-white relative backdrop-blur-lg">
      {/* Thanh điều khiển cố định trên cùng */}
      <div className="fixed top-0 left-0 w-full flex flex-col items-center z-50 gap-6  pt-6 pb-4 ">
        {/* Chọn khung hình và Hẹn giờ */}
        <div className="flex flex-row gap-8">
          {/* Chọn khung hình */}
          <div className="flex flex-col items-center">
            <h1 className="font-light text-center text-gray-600 text-xl mb-2">
              Chọn khung mà bạn muốn
            </h1>
            <div className="flex gap-4">
              {["2x2", "4-vertical"].map((style) => (
                <button
                  key={style}
                  onClick={() => setFrameStyle(style)}
                  disabled={isCapturing}
                  className={`px-4 py-2 border-2 border-black bg-transparent rounded-full transition-all 
                    ${
                      frameStyle === style
                        ? "font-bold scale-110 bg-pink-300 text-white"
                        : "bg-white"
                    } 
                    hover:scale-110 hover:bg-pink-200 hover:border-gray-600
                    ${isCapturing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {style === "2x2" ? "Khung 2x2" : "Khung 4 dọc"}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn hẹn giờ */}
          <div className="flex flex-col items-center">
            <h1 className="font-light text-center text-gray-600 text-xl mb-2">
              Hẹn giờ
            </h1>
            <div className="flex gap-4">
              {[3, 10].map((time) => (
                <button
                  key={time}
                  onClick={() => setTimer(time)}
                  disabled={isCapturing}
                  className={`px-4 py-2 border-2 border-black bg-transparent rounded-full transition-all 
                    ${
                      timer === time
                        ? "font-bold scale-110 bg-pink-300 text-white"
                        : "bg-white"
                    } 
                    hover:scale-110 hover:bg-pink-200 hover:border-gray-600
                    ${isCapturing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {time === 0 ? "Không hẹn giờ" : `Hẹn giờ ${time}s`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chọn bộ lọc ảnh */}
        <div className="flex flex-col items-center">
          <h1 className="font-light text-center text-gray-600 text-xl mb-2">
            Chọn bộ lọc ảnh
          </h1>
          <div className="flex gap-4">
            {[
              { value: "none", label: "Không filter" },
              { value: "grayscale", label: "Đen trắng" },
              { value: "sepia", label: "Sepia" },
              { value: "soft", label: "Soft" },
              { value: "vibrant", label: "Tươi tắn" },
              { value: "smooth-skin", label: "Mịn da" },
              { value: "brighten", label: "Trắng hơn" },
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setFilter(value)}
                disabled={isCapturing}
                className={`px-4 py-2 border-2 border-black bg-transparent rounded-full transition-all 
          ${
            filter === value
              ? "font-bold scale-110 bg-pink-300 text-white"
              : "bg-white"
          } 
          hover:scale-110 hover:bg-pink-200 hover:border-gray-600
          ${isCapturing ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="flex flex-col items-center justify-center pt-56">
        <div className="flex justify-center items-center gap-12">
          {/* Camera */}
          <div className=" w-[800px]  rounded-xl relative flex flex-col items-center border-black border-[3px] mr-40">
            <Webcam
              style={{ transform: "scaleX(-1)" }}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className={`w-full rounded-xl ${filter}`}
            />
            {countdown > 0 && (
              <div className="animate-pulse-slow absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-red-500 bg-white bg-opacity-20 rounded-2xl px-8 py-4">
                {countdown}
              </div>
            )}
          </div>

          {/* Hiển thị ảnh đã chụp */}
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-semibold text-gray-600 mb-4">
              Your Picture
            </h1>
            <div
              className={`grid ${
                frameStyle === "2x2" ? "grid-cols-2" : "grid-cols-1"
              } gap-1 p-4 bg-gray-100 rounded-xl shadow-md border border-gray-300`}
            >
              {capturedImages.length > 0 ? (
                capturedImages.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Captured ${index}`}
                    className={`object-cover border-2 border-white rounded-sm shadow-md transition-transform duration-300 
          ${frameStyle === "2x2" ? "w-40 h-52" : "w-48 h-48"}`}
                  />
                ))
              ) : (
                <p className="text-gray-400 italic">No Photo</p>
              )}
            </div>
          </div>
        </div>

        {/* Nút Chụp */}
        <button
          onClick={startPhotoSession}
          disabled={isCapturing}
          className={`mt-8 px-6 py-3 bg-pink-500 mb-20 text-white rounded-lg shadow-lg hover:bg-pink-600 transition
          ${isCapturing ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          Start Capture
        </button>
      </div>
    </div>
  );
};

export default TakePhoto;
