import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/pages/auth/Login";
import Registro from "./components/pages/auth/Registro";
import Home from "./components/pages/Home";
import ListadoUsuario from "./components/pages/users/ListadoUsuario";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/listadoUsuario",
    element: <ListadoUsuario />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
  