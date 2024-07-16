import { Link, Outlet, useLocation } from "react-router-dom";
import { createContext, useState, useContext } from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import { CompanySmallSideBar } from "../components";
import { FaAlignLeft } from "react-icons/fa";

const CompanyContext = createContext();

const CompanyLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  const location = useLocation();

  return (
    <CompanyContext.Provider
      value={{
        showSidebar,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <CompanySmallSideBar />
        <nav>
          <Link to="/">
            <h2>Mella</h2>
          </Link>

          <div className="nav-links">
            <Link
              to="/company/pricing"
              className={`nav-link btn ${
                "/company/pricing" === location?.pathname
                  ? "top-btn"
                  : "top-btn-inactive"
              }`}
            >
              Pricing
            </Link>
            <Link
              to="/company/services"
              className={`nav-link btn ${
                "/company/services" === location?.pathname
                  ? "top-btn"
                  : "top-btn-inactive"
              }`}
            >
              Services
            </Link>
            <Link
              to="/company/docs"
              className={`nav-link btn ${
                "/company/docs" === location?.pathname
                  ? "top-btn"
                  : "top-btn-inactive"
              }`}
            >
              Docs
            </Link>
            <Link
              to="/company/demo"
              className={`nav-link btn ${
                "/company/demo" === location?.pathname
                  ? "top-btn"
                  : "top-btn-inactive"
              }`}
            >
              Demo
            </Link>
            <Link
              to="/company/about"
              className={`nav-link btn ${
                "/company/about" === location?.pathname
                  ? "top-btn"
                  : "top-btn-inactive"
              }`}
            >
              About Us
            </Link>
            <Link
              to="/company/contact"
              className={`nav-link btn ${
                "/company/contact" === location?.pathname
                  ? "top-btn"
                  : "top-btn-inactive"
              }`}
            >
              Contact Us
            </Link>
          </div>
          <button
            onClick={toggleSidebar}
            className="menu-button btn bg-blue-500 text-white border border-blue-500"
          >
            <FaAlignLeft />
          </button>
        </nav>
        <Outlet />
      </Wrapper>
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = () => useContext(CompanyContext);
export default CompanyLayout;
