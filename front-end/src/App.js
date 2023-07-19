import { createBrowserRouter, RouterProvider } from "react-router-dom";
// CSS
import "./App.css";
import Main from "./pages/Main/index";
import Signup from "./pages/Signup/index";
import Login from "./pages/LogIn/index";
import Id from "./pages/Inquiry/id";
import Pw from "./pages/Inquiry/pw";
import Guide from "./pages/Guide/index";
import Books from "./pages/Books/index";
import Select from "./pages/Select/index";
import Ready from "./pages/Ready/index";
import Check from "./pages/Check/index";
import Play from "./pages/Play/index";
import Code from "./pages/Paint/index"
import Paint from "./pages/Paint/index";
///////////////////////////////////

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/inquiry/id",
    element: <Id/>,
  },
  {
    path: "/inquiry/pw",
    element: <Pw/>,
  },
  {
    path: "/guide",
    element: <Guide/>,
  },
  {
    path: "/books",
    element: <Books/>,
  },
  {
    path: "/select",
    element: <Select/>,
  },
  {
    path: "/ready",
    element: <Ready/>,
  },
  {
    path: "/check",
    element: <Check/>,
  },
  {
    path: "/play",
    element: <Play/>,
  },
  {
    path: "/code",
    element: <Code/>,
  },
  {
    path: "/paint",
    element: <Paint/>,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
