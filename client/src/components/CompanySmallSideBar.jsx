import Wrapper from "../assets/wrappers/SmallSidebar";
import { useCompanyContext } from "../pages/CompanyLayout";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import { FaTimes } from "react-icons/fa";

const CompanySmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useCompanyContext();
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
            <Link to="/company/pricing" className="top-btn btn">
              Pricing
            </Link>
            <Link to="/company/services" className="top-btn btn">
              Services
            </Link>
            <Link to="/company/docs" className="top-btn btn">
              Docs
            </Link>
            <Link to="/company/demo" className="top-btn btn">
              Demo
            </Link>
            <Link to="/company/about" className="top-btn btn">
              About Us
            </Link>
            <Link to="/company/contact" className="top-btn btn">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CompanySmallSidebar;
