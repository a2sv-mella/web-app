import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

import Wrapper from "../assets/wrappers/SmallSidebar";
import { useLandingPageContext } from "../pages/Landing";
import Logo from "./Logo";

const LandingPageSmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useLandingPageContext();
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
            <Link to="/company/pricing" className={`center-text btn top-btn`}>
              Pricing
            </Link>
            <Link to="/company/services" className={`center-text btn top-btn`}>
              Services
            </Link>
            <Link to="/company/docs" className={`center-text btn top-btn`}>
              Docs
            </Link>
            <Link to="/company/demo" className={`center-text btn top-btn`}>
              Demo
            </Link>
            <Link to="/company/about" className={`center-text btn top-btn`}>
              About Us
            </Link>
            <Link to="/company/contact" className={`center-text btn top-btn`}>
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default LandingPageSmallSidebar;
