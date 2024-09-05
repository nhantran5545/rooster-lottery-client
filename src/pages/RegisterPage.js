import React, { useState } from "react";
import Layout from "../components/Layout";
import Input from "../components/UI/Input";
import Button from "../components/UI/button";
import { registerAccount } from "../api/account";
import { useNavigate } from "react-router-dom";
import {
  validatePhoneNumber,
  validateName,
  validateEmail,
  validateAge,
} from "../utils/validation";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!validateName(firstName) || !validateName(lastName)) {
      setMessage("Name must not contain numbers or special characters.");
      return false;
    }
    if (!validateEmail(email)) {
      setMessage("Invalid email format.");
      return false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      setMessage("Invalid phone number format.");
      return false;
    }
    if (!validateAge(birthday)) {
      setMessage("You must be at least 18 years old.");
      return false;
    }
    return true;
  };
  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await registerAccount({
        firstName,
        lastName,
        birthday,
        phoneNumber,
        email,
        address,
      });

      if (response && response.message) {
        setMessage(response.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage(error.response.data.message);
      } else {
        console.error("Registration failed:", error);
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  const goBack = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-white dark:border-white">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-800">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Last Name
                </label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Birdthday
                </label>
                <Input
                  type="date"
                  placeholder="Birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Phone
                </label>
                <Input
                  type="text"
                  placeholder="Ex: 0912345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Confirm password
                </label>
                <Input
                  type="email"
                  placeholder="Ex: example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-4"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Address
                </label>
                <Input
                  type="text"
                  placeholder="16 Ho Ba Phan"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="mb-4"
                />
              </div>
              <Button>Create an account</Button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?
                <button
                  onClick={goBack}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
