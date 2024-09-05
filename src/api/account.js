import axios from "axios";

const API_BASE_URL = "https://localhost:7266/api/Account";

export const registerAccount = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/register`, data);
  return response.data;
};

export const fetchAccountByPhone = async (phoneNumber) => {
  const response = await fetch(`${API_BASE_URL}/phone/${phoneNumber}`);

  if (!response.ok) {
    throw new Error("Account not found");
  }

  return response.json();
};

export const fetchAccountData = async (accountId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${accountId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch account data:", error);
    throw error;
  }
};
