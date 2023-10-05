import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Layout from "./components/layout";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/userManager/protectedRoute";
import User from "./apps/user";
import Red from "./apps/red";
import Interest from "./apps/testForm/interest";
import { ApolloProvider } from "@apollo/client";
import client from "./components/webServices";
//import AuthProvider from "./components/userManager/authProvider";
import Super from "./apps/super";

const router = createBrowserRouter([

  {
    path: "/interest",
    element: <Interest />
  },
  {
    path: "/",
    element: (
      <Layout>
        <Red />
      </Layout>
    ),
    children: [
      {
        path: "*",
        element: <>404 - ERROR</>,
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
      {
        path: "/super",
        element: <Super />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
