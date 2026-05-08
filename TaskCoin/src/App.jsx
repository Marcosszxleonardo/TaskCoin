import Login from "./pages/login/Login";
import Cadastrar from "./pages/cadastro/paiMae/Cadastrar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/cadastrar",
    element: <Cadastrar />
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}


/*   
import Index from "./pages/cadastro/associarFilho/Index"; 

import Index from "./pages/login/Login"; 
return <login />;



*/