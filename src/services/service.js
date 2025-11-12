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




export const deleteCountries = async (id, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/Country/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    console.log("Delete uğurlu oldu:", res.data);
    return res.data;
  } catch (error) {
    console.error("Delete zamanı xəta baş verdi:", error);
    throw error;
  }
};


export const putCountries = async (id, name, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/Country/${id}`,
      { name },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Update zamanı xəta baş verdi:", error);
    throw error;
  }
};


