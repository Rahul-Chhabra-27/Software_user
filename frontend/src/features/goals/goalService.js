import axios from "axios";

const API_URL = "/api/goals/";
const createGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const data = { text: goal };
  const response = await axios.post(API_URL, data, config);
  return response.data;
};
const getGoal = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};
export const goalService = {
  createGoal,
  getGoal,
};
