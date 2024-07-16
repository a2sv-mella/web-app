import { Outlet, redirect, useLoaderData, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { SmallSidebar, BigSidebar, Navbar } from "../components";
import { createContext, useState, useContext } from "react";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");

    // const data = {
    //   user: {
    //     first_name: "Dolphin",
    //     last_name: "Mulugeta",
    //     email: "email@email.com",
    //     role: "developer",
    //   },
    // };
    if (!data) {
      return redirect("/");
    }
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const DashboardContext = createContext();

const DashboardLayout = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const { user } = data;
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    // TODO: use toast instead of alert
    alert("User logged out");
  };

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default DashboardLayout;
