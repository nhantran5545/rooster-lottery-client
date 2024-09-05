import React, { useEffect, useState } from "react";
import Sidebar from "../hoc/Sidebar";
import { fetchAccountData } from "../api/account";
import ProfileInfo from "../components/ProfileInfo";

const ProfilePage = () => {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const accountId = "26ac11bb-93b9-4962-9b5a-7b4b9d9aa268";

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchAccountData(accountId);
        setAccountData(data);
      } catch {
        setAccountData(null);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [accountId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!accountData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-red-500">
          Failed to load account data.
        </div>
      </div>
    );
  }

  const { email, fullName, birthday, phoneNumber, address } = accountData;

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-grow p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-6 flex items-center">
          My Profile
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileInfo label="Full Name" value={fullName} />
          <ProfileInfo label="Email" value={email} />
          <ProfileInfo label="Phone Number" value={phoneNumber} />
          <ProfileInfo
            label="Birthday"
            value={new Date(birthday).toLocaleDateString()}
          />
          <ProfileInfo label="Address" value={address} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
