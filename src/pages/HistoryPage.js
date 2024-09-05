import React, { useEffect, useState } from "react";
import Sidebar from "../hoc/Sidebar";
import { getUserBets } from "../api/lottery";
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/outline";

const HistoryPage = () => {
  const [bets, setBets] = useState([]);

  useEffect(() => {
    const fetchUserBets = async () => {
      const accountId = localStorage.getItem("accountId");
      try {
        const data = await getUserBets(accountId);
        setBets(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserBets();
  }, []);

  const renderBetResult = (bet) => {
    if (bet.result === null) {
      return "bg-yellow-300 text-yellow-800";
    }
    return bet.isWinner
      ? "bg-green-300 text-green-800"
      : "bg-red-300 text-red-800";
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-8 overflow-y-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
          <ClockIcon className="h-6 w-6 text-gray-600 mr-2" />
          Bet History
        </h1>
        <div className="space-y-6">
          {bets.length === 0 ? (
            <p className="text-lg text-gray-600">No bets found.</p>
          ) : (
            <div className="space-y-4">
              {bets.map((bet, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg ${renderBetResult(
                    bet
                  )} transition duration-300 ease-in-out transform hover:scale-105`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600">
                      {new Date(bet.slot).toLocaleString()}
                    </span>
                    {bet.result === null ? (
                      <span className="text-sm text-yellow-700 flex items-center font-medium">
                        <ClockIcon className="h-5 w-5 mr-1" />
                        Pending
                      </span>
                    ) : bet.isWinner ? (
                      <span className="text-sm text-green-700 flex items-center font-medium">
                        <CheckCircleIcon className="h-5 w-5 mr-1" />
                        Win
                      </span>
                    ) : (
                      <span className="text-sm text-red-700 flex items-center font-medium">
                        <XCircleIcon className="h-5 w-5 mr-1" />
                        Lose
                      </span>
                    )}
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-inner">
                    <p className="text-lg font-semibold mb-2">
                      Selected Number:{" "}
                      <span className="font-bold">{bet.selectedNumber}</span>
                    </p>
                    {bet.result !== null && (
                      <div
                        className={`flex items-center p-2 rounded-lg ${renderBetResult(
                          bet
                        )} mb-4`}
                      >
                        {bet.isWinner ? (
                          <CheckCircleIcon className="h-6 w-6 mr-2" />
                        ) : (
                          <XCircleIcon className="h-6 w-6 mr-2" />
                        )}
                        <span className="text-lg font-semibold">
                          Result: {bet.result}
                        </span>
                      </div>
                    )}
                    <p className="text-gray-800 bg-gray-200 p-3 rounded-lg">
                      {bet.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
