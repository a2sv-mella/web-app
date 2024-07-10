import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HomeLayout, Error, Landing, Login, Register } from "./pages";
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
