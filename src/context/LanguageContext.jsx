import { createContext, useContext, useState, useEffect } from "react";
import az from "../config/language/az.json";
import en from "../config/language/en.json";
import ru from "../config/language/ru.json";

const languages = { az, en, ru };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "az");

  const [t, setT] = useState(languages[lang]);

  const changeLanguage = (key) => {
    setLang(key);
    localStorage.setItem("lang", key); 
  };
  useEffect(() => {
    setT(languages[lang]);
    document.documentElement.lang = lang; 
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
