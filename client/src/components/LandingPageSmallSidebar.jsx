import Wrapper from "../assets/wrappers/SmallSidebar";
import { useLandingPageContext } from "../pages/Landing";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaTimes } from "react-icons/fa";

const LandingPageSmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useLandingPageContext();
  const location = useLocation();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
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
        </div>
      </div>
    </Wrapper>
  );
};

export default LandingPageSmallSidebar;
