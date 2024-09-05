import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getNextAvailableSlot,
  getNearbySlots,
  formatSlotTime,
} from "../utils/timeUtils";
import Sidebar from "../hoc/Sidebar";
import { placeBet, getCurrentUserBet } from "../api/lottery";

const BetPage = () => {
  const location = useLocation();
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [message, setMessage] = useState("");
  const [nextSlot, setNextSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [betPlaced, setBetPlaced] = useState(false);
  const [userBet, setUserBet] = useState(null);

  const accountId = localStorage.getItem("accountId");

  useEffect(() => {
    const availableSlot = getNextAvailableSlot();
    setNextSlot(availableSlot);

    const nearbySlots = getNearbySlots(availableSlot);
    setSlots(nearbySlots);

    const fetchUserBet = async () => {
      try {
        const response = await getCurrentUserBet(accountId);
        if (response) {
          setUserBet(response);
          setBetPlaced(true);
        } else {
          setUserBet(null);
          setBetPlaced(false);
        }
      } catch (error) {
        setMessage("Error fetching user bet: " + error.message);
      }
    };

    fetchUserBet();
  }, [accountId]);

  const handlePlaceBet = async () => {
    if (selectedNumber === null) {
      setMessage("Please select a number.");
      return;
    }

    try {
      const data = await placeBet(selectedNumber, accountId);
      setMessage(data.message);
      setBetPlaced(true);
      setUserBet({ selectedNumber, slot: nextSlot }); // Set the placed bet data
    } catch (error) {
      setMessage(error.message);
    }
  };

  const renderNumberButtons = () => (
    <div className="grid grid-cols-5 gap-4 mt-10">
      {[...Array(10).keys()].map((num) => (
        <button
          key={num}
          className={`relative p-4 m-2 rounded ${
            selectedNumber === num ||
            (userBet && userBet.selectedNumber === num)
              ? "bg-green-500 text-white transform scale-110"
              : "bg-gray-300 text-gray-800"
          } ${
            betPlaced && selectedNumber === num
              ? "bg-green-500 cursor-not-allowed"
              : ""
          } transition-transform duration-300 ease-in-out`}
          onClick={() => !betPlaced && setSelectedNumber(num)}
          disabled={betPlaced}
        >
          {num}
        </button>
      ))}
    </div>
  );

  const renderSlots = () => (
    <div className="grid grid-cols-4 gap-4 mt-8">
      {slots.map((slot) => (
        <div
          key={slot.time}
          className={`relative p-6 m-2 rounded-lg ${
            slot.available
              ? "bg-blue-500 text-white scale-110 shadow-lg"
              : "bg-gray-300 text-gray-500"
          } transition-transform duration-300 ease-in-out`}
        >
          <span className="absolute top-2 right-2 text-xs bg-gray-900 text-white px-2 py-1 rounded-full">
            {slot.available ? "Available" : "Unavailable"}
          </span>
          {formatSlotTime(slot.time)}
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
          Place Your Bet
        </h1>
        {message && <p className="mt-4 text-red-500 font-medium">{message}</p>}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Select a Number (0-9):
          </h2>
          {renderNumberButtons()}
        </div>
        {selectedNumber !== null && !betPlaced && (
          <div className="mt-8">
            <button
              onClick={handlePlaceBet}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Place Bet on Number {selectedNumber}
            </button>
          </div>
        )}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-700">Available Slots:</h2>
          {renderSlots()}
        </div>
      </div>
    </div>
  );
};

export default BetPage;
