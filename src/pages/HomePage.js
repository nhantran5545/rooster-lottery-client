import React, { useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/UI/button";
import { useNavigate } from "react-router-dom";
import { fetchAccountByPhone } from "../api/account";
import Input from "../components/UI/Input";

const HomePage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetchAccountByPhone(phoneNumber);
      const account = response.account;
      setMessage(`Welcome back, ${account.fullName}`);
      localStorage.setItem("accountId", account.accountId);
      navigate("/bet");
    } catch (error) {
      setMessage("Login failed. Please check your phone number.");
    }
  };

  return (
    <Layout>
      <div className="py-20">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
          <div
            className="hidden lg:block lg:w-1/2 bg-cover"
            style={{
              backgroundImage:
                'url("https://www.wikihow.com/images/2/28/Choose-Lottery-Numbers-Step-20-Version-3.jpg")',
            }}
          />
          <div className="w-full p-8 lg:w-1/2">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              Rooster Lottery
            </h2>
            <p className="text-xl text-gray-600 text-center">Welcome back!</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 lg:w-1/4" />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Phone
              </label>
              <Input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            {message && (
              <p className="mt-4 text-center text-red-500">{message}</p>
            )}
            <div className="mt-8">
              <Button onClick={handleLogin}>Login</Button>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4" />
              <button
                className="text-xs text-gray-500 uppercase"
                onClick={() => navigate("/register")}
              >
                or register
              </button>
              <span className="border-b w-1/5 md:w-1/4" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
