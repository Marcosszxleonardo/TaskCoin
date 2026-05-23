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

/* TELAS FILHO */
import TarefaFilho from "./pages/telafilhos/tarefas/TarefasFilho.jsx";
import ConquistasFilho from "./pages/telafilhos/conquistas/ConquistasFilho.jsx";
import PerfilFilho from "./pages/telafilhos/perfil/PerfilFilho.jsx"
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