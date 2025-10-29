import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/Layout/Layout";
import Country from "../pages/Country/index";
import Contact from "../pages/Contact/index";
import Tour  from "../pages/Tour";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <div>Dashboard</div>,
      },
      {
        path: "/countries",
        element: <Country />,
      },
      {
        path: "/contacts",
        element:<Contact/>
      },
      {
        path:"/tour",
        element:<Tour/>
      }

    ],
  },
]);

export default router;
