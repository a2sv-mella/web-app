import { Link } from "react-router-dom";
import { createContext, useState, useContext } from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import main1 from "../assets/images/main1.svg";
import { LandingPageSmallSideBar } from "../components";
import { FaAlignLeft } from "react-icons/fa";
import logo from "../assets/images/mella.png";

const LandingPageContext = createContext();

const Landing = () => {
  const LandingMessage = `Discover amazing Ethiopian apps and services – all in one place! With Mella, you can find new ways to learn, connect, and enjoy your digital life.`;
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <LandingPageContext.Provider
      value={{
        showSidebar,
        toggleSidebar,
      }}
    >
      <Wrapper>
        <LandingPageSmallSideBar />
        <nav>
          <Link to="/">
            <h2>Mella</h2>
          </Link>

          <div className="nav-links">
            <Link
              to="/company/pricing"
              className="nav-link top-btn-inactive btn"
            >
              Pricing
            </Link>
            <Link
              to="/company/services"
              className="nav-link top-btn-inactive btn"
            >
              Services
            </Link>
            <Link to="/company/docs" className="nav-link top-btn-inactive btn">
              Docs
            </Link>
            <Link to="/company/demo" className="nav-link top-btn-inactive btn">
              Demo
            </Link>
            <Link to="/company/about" className="nav-link top-btn-inactive btn">
              About Us
            </Link>
            <Link
              to="/company/contact"
              className="nav-link top-btn-inactive btn"
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
        <div className="container page">
          <div>
            <h1>
              Made in for <span>Ethiopia</span>.
            </h1>
            <p>
              {LandingMessage}
              <b> Start exploring today!</b>
            </p>

            <Link to="/register" className="btn register-link">
              Register
            </Link>

            <Link to="/login" className="btn">
              Log in
            </Link>
          </div>
          <img src={main1} alt="job home" className="img main-img" />
        </div>
      </Wrapper>
    </LandingPageContext.Provider>
  );
};
export const useLandingPageContext = () => useContext(LandingPageContext);
export default Landing;
