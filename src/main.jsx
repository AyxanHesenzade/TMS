import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeProvider";
import { LayoutProvider } from "./context/LayoutContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LayoutProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </LayoutProvider>

  </StrictMode>
);
