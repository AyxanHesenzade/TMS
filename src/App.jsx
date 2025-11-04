import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import { AuthProvider } from "./context/AuthContext";

function App() {
    return (

    <RouterProvider router={router} />

  )
}

export default App;
