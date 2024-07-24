import Wrapper from "../assets/wrappers/SmallSidebar";
import { useCompanyContext } from "../pages/CompanyLayout";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaTimes } from "react-icons/fa";

const CompanySmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useCompanyContext();
  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button type="button" className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">
            <Link
              onClick={toggleSidebar}
              to="/company/pricing"
              className="top-btn btn"
            >
              Pricing
            </Link>
            <Link
              onClick={toggleSidebar}
              to="/company/services"
              className="top-btn btn"
            >
              Services
            </Link>
            <Link
              onClick={toggleSidebar}
              to="/company/docs"
              className="top-btn btn"
            >
              Docs
            </Link>
            <Link
              onClick={toggleSidebar}
              to="/company/demo"
              className="top-btn btn"
            >
              Demo
            </Link>
            <Link
              onClick={toggleSidebar}
              to="/company/about"
              className="top-btn btn"
            >
              About Us
            </Link>
            <Link
              onClick={toggleSidebar}
               vto="/company/contact"
              className="top-btn btn"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CompanySmallSidebar;
