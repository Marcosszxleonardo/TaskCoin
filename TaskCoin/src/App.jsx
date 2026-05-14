import Login from "./pages/login/Login";
import Cadastrar from "./pages/cadastro/paiMae/Cadastrar";
import Cadastro from "./pages/cadastro/confirmarFilho/Cadastro";

import Tarefas from "./pages/telasPais/tarefas/Tarefas";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
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
    element: <Tarefas />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}