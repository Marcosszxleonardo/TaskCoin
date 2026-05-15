import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global.css";

import Login from "./pages/login/Login";
import Cadastrar from "./pages/cadastro/paiMae/Cadastrar";
import Cadastro from "./pages/cadastro/confirmarFilho/Cadastro";

import Tarefas from "./pages/telasPais/tarefas/Tarefas";
import ErrorPage from "./ErroPage.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([

  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Login />,
      },

      {
        path: "/cadastrar",
        element: <Cadastrar />,
      },

      {
        path: "/confirmar-filho",
        element: <Cadastro />,
      },

      {
        path: "/tarefaspai",
        element: <Tarefas />
      }
    ]
  }

]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />;
  </React.StrictMode>
);