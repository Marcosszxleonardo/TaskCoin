import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from "./App.jsx";

import Login from "./pages/login/Login";
import Cadastrar from "./pages/cadastro/paiMae/Cadastrar";
import Cadastro from "./pages/cadastro/confirmarFilho/Cadastro";

/* TELAS PAI */
import Tarefas from "./pages/telasPais/tarefas/Tarefas";
import Conquistas from "./pages/telasPais/conquistas/Conquistaspais";
import Perfilpais from "./pages/telasPais/perfil/Perfilpais";
import AnalisePais from "./pages/telasPais/analise/AnalisePais";
import AdicionarConquista from "./pages/telasPais/adicionarconquista/AdicionarConquista";
import AdicionarTarefa from "./pages/telasPais/adicionartarefa/AdicionarTarefa";
import TarefaExpirada from "./pages/telasPais/tarefaexpirada/TarefaExpirada";

/* TELAS FILHO */
import TarefaFilho from "./pages/telafilhos/tarefas/TarefasFilho";
import ConquistasFilho from "./pages/telafilhos/conquistas/ConquistasFilho";
import PerfilFilho from "./pages/telafilhos/perfil/PerfilFilho";

import ErrorPage from "./ErroPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,

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

      /* TELAS PAI */

      {
        path: "/tarefaspai",
        element: <Tarefas />,
      },

      {
        path: "/conquistaspai",
        element: <Conquistas />,
      },

      {
        path: "/perfilpai",
        element: <Perfilpais />,
      },

      {
        path: "/analisepai",
        element: <AnalisePais />,
      },

      {
        path: "/adicionarconquista",
        element: <AdicionarConquista />,
      },
      {
        path: "/adicionartarefa",
        element: <AdicionarTarefa />,
      },
      {
    path: "/tarefaexpirada",
    element: <TarefaExpirada />,
},

      /* TELAS FILHO */

      {
        path: "/tarefasfilho",
        element: <TarefaFilho />,
      },

      {
        path: "/conquistasfilho",
        element: <ConquistasFilho />,
      },

      {
        path: "/perfilfilho",
        element: <PerfilFilho />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);