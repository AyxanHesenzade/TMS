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


export const putCountries = async (data) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/Country/${id}`, data);
    console.log("PUT uğurlu oldu:", response.data);
    return response.data;
  } catch (error) {
    console.error("PUT zamanı xəta baş verdi:", error);
    throw error;
  }
};

export const deleteCountries = async (id) => {
  try{
    const res = await axios.delete(`${BASE_URL}/api/Country/${id}`);
    console.log("PUT uğurlu oldu:", response.data);
    return res.data;
  } catch (error){
    console.error("Delete zamanı xəta baş verdi:", error);
    throw error;
  }
};