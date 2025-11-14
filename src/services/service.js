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
    return response.data; 
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


export const postCountries = async (data, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/Country`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("POST uğurlu oldu:", response.data);
    return response.data;
  } catch (error) {
    console.error("POST zamanı xəta baş verdi:", error);
    throw error;
  }
};



// ========== CITY API ==========
export const GetCities = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/City`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error("City məlumatı alınarkən xəta:", error);
    return [];
  }
};

export const PostCity = async (data, token) => {
  return axios.post(`${BASE_URL}/api/City`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const PutCity = async (id, data, token) => {
  return axios.put(`${BASE_URL}/api/City/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};

export const DeleteCity = async (id, token) => {
  return axios.delete(`${BASE_URL}/api/City/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
};



// Tour Səhifəsi

export const getTours = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Tour`);
    return response.data;
  } catch (error) {
    console.error("Tour məlumatları alınarkən xəta baş verdi:", error);
    return [];
  }
};



export const deleteTour = async (id) => {
  return await axios.delete(`${BASE_URL}/Tour/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const createTour = async (formData) => {
  return await axios.post(`${BASE_URL}/Tour`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const createTourWithImages = async (formData) => {
  return await axios.post(`${BASE_URL}/Tour/create-with-images`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getTourById = async (id) => {
  return (
    await axios.get(`${BASE_URL}/Tour/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
  ).data;
};