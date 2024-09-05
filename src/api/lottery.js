import axios from "axios";

const BASE_URL = "https://localhost:7266/api/Lottery";

export const placeBet = async (selectedNumber, accountId) => {
  const response = await axios.post(
    `${BASE_URL}/place-bet`,
    { selectedNumber },
    {
      headers: {
        "Content-Type": "application/json",
        accept: "text/plain",
        accountId,
      },
    }
  );
  return response.data;
};

export const getUserBets = async (accountId) => {
  const response = await axios.get(`${BASE_URL}/user-bets`, {
    headers: {
      accept: "text/plain",
      accountId,
    },
  });
  return response.data;
};
export const getCurrentUserBet = async (accountId) => {
  try {
    const response = await axios.get(`${BASE_URL}/current-bet/${accountId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // If 404, return null indicating no current bet
      return null;
    } else {
      // For other errors, throw the error to handle it elsewhere
      throw error;
    }
  }
};
