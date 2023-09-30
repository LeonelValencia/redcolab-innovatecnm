import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./components/layout";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/userManager/protectedRoute";
import User from "./apps/user";
import Red from "./apps/red";
import AuthProvider from "./components/userManager/authProvider";

const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout><Red /></Layout>,
    children: [
      {
        path: "*",
        element: <>404 - ERROR</>
      },
      {
        path: ":site",
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/user",
        element: <User />,
        children: [
          {
            path: ":site",
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router}>Hola</RouterProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
