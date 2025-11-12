import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/Auth/login`, data);
    return response.data;
  } catch (error) {
    console.error("Login zamanı xəta baş verdi:", error);
    throw error.response?.data || error;
  }
};
