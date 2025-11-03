import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const GetCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Country`);
    return response.data;
  } catch (error) {
    console.error("Country məlumatı alınarkən xəta baş verdi:", error);
    return [];
  }
};
export const GetContacts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Contact`);
    return response.data; // array qaytaracaq
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

