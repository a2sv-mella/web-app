import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Balance,
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
  DashboardLayout,
  Account,
  Product,
  UserCrowdfunding,
  DeveloperCrowdfunding,
  Donations,
  Smuni,
  Transactions,
  ApplyCrowdFund,
} from "./pages";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as productAction } from "./pages/Product";
import { action as accountAction } from "./pages/Account";

import { loader as dashboardLoader } from "./pages/DashboardLayout";
import { loader as crowdFundingLoader } from "./pages/UserCrowdfunding";

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
        path: "dashboard",
        element: <DashboardLayout />,
        loader: dashboardLoader,
        children: [
          {
            index: true,
            element: <Account />,
            action: accountAction,
          },
          {
            path: "transactions",
            element: <Transactions />,
          },
          {
            path: "user-crowd",
            element: <UserCrowdfunding />,
            loader: crowdFundingLoader,
          },
          {
            path: "developer-crowd",
            element: <DeveloperCrowdfunding />,
          },
          {
            path: "donations",
            element: <Donations />,
          },
          {
            path: "product",
            element: <Product />,
            action: productAction,
          },
          {
            path: "balance",
            element: <Balance />,
          },
          {
            path: "smuni",
            element: <Smuni />,
          },
          {
            path: "apply-crowdfund/:id",
            element: <ApplyCrowdFund />,
          },
        ],
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
