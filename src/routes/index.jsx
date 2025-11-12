import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/Layout/Layout";
import Country from "../pages/Country";
import Contact from "../pages/Contact";
import Tour from "../pages/Tour";
import AboutTMS from "../pages/About";
import ProtectedRoute from "../components/Layout/ProtectedRoute";
import AdminAbout from "../pages/Admin/pages/About";
import AdminContact from "../pages/Admin/pages/Contact";
import AdminCountry from "../pages/Admin/pages/Country";
import AdminTour from "../pages/Admin/pages/Tour";


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
        path: "countries",
        element: <Country />,
      },
      {
        path: "contacts",
        element: <Contact />,
      },
      {
        path: "tour",
        element: <Tour />,
      },
      {
        path: "about",
        element: <AboutTMS />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "about", element: <AdminAbout /> },
      { path: "countries", element: <AdminCountry /> },
      { path: "contact", element: <AdminContact /> },
      { path: "tour", element: <AdminTour /> },
    ],
  },
]);

export default router;
