import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Contact,
  Demos,
  Docs,
  Error,
  HomeLayout,
  Landing,
  Login,
  Pricing,
  Register,
  Services,
} from "./pages";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "demo",
        element: <Demos />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "services",
        element: <Services />,
      },
      {
        path: "docs",
        element: <Docs />,
      },
      {
        path: "login",
        element: <Login />,
        action: loginAction,
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
