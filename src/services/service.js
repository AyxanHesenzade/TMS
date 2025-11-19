import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;


const token = localStorage.getItem("token");



export const GetCountries = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Country`);
    return response.data;
  } catch (error) {
    console.error("Country məlumatı alınarkən xəta baş verdi:", error);
    return [];
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

// ===================== CONTACT APILERI ===================== //

export const GetContacts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/Contact`);
    return response.data;
  } catch (error) {
    console.error("Contact məlumatı alınarkən xəta baş verdi:", error);
    return [];
  }
};

export const postContact = async (data, token) => {
  return axios.post(`${BASE_URL}/api/Contact`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const putContact = async (id, data, token) => {
  return axios.put(`${BASE_URL}/api/Contact/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteContact = async (id, token) => {
  return axios.delete(`${BASE_URL}/api/Contact/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
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


// TOUR TYPE API

export const GetTourTypes = async () => {
  const response = await axios.get(`${BASE_URL}/api/TourType`);
  return response.data;
};

// POST tour type
export const postTourType = async (data, token) => {
  const response = await axios.post(`${BASE_URL}/api/TourType`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// PUT tour type
export const putTourType = async (id, name, token) => {
  const response = await axios.put(
    `${BASE_URL}/api/TourType/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// DELETE tour type
export const deleteTourType = async (id, token) => {
  const response = await axios.delete(`${BASE_URL}/api/TourType/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


// Tours

export const getTours = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/Tour`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Tour məlumatı alınarkən xəta baş verdi:", error);
    throw error;
  }
};

export const createTourWithImages = async (formData, token) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/Tour/create-with-images`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Tour yaratmaq mümkün olmadı:", error);
    throw error;
  }
};

// 3. DELETE /api/Tour/{id}
export const deleteTour = async (id, token) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/Tour/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error("Tour silinərkən xəta baş verdi:", error);
    throw error;
  }
};

// 4. GET /api/Tour/with-offer/{id}
export const getTourWithOffer = async (id, token) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/Tour/with-offer/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {
    console.error(`Tour id=${id} ilə təklif məlumatı alınarkən xəta baş verdi:`, error);
    throw error;
  }
};