import { createContext, useContext, useState, useEffect } from "react";
import { loginUser } from "../services/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);


  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = async (email, password) => {
    try {
      const res = await loginUser({ mail: email, password });

      if (res?.token) {
        const userData = {
          name: res.name,
          surname: res.surname,
          mail: res.mail,
          role: "admin", 
        };

        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(userData));

        setUser(userData);
        setToken(res.token);
      }

      return res;
    } catch (err) {
      console.error("Login uğursuz oldu:", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
