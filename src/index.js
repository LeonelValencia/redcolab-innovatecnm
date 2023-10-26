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
import SingUp from "./components/userManager/singUp";
import { ApolloProvider } from "@apollo/client";
import client from "./components/webServices";
//import AuthProvider from "./components/userManager/authProvider";
import Super from "./apps/super";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: (
      <Layout />
    ),
    children: [
      {
        path: "*",
        element: <>site no found</>
      },
      {
        index: true,
        element: <Red />,
      },
      {
        path: "/newUSer",
        element: <Red />,
        children:[
          {
            path: ":site"
          }
        ]
      },
      {
        path: "/signUp",
        element: <SingUp />,
      },
      {
        path: "/super",
        element: <Super />,
      },
      {
        path: "/user",
        element: <User />,
        children: [
          {
            path: ":id",
            children:[
              {
                path:":site"
              }
            ]
          },
        ],
      },
    ]
  }
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
