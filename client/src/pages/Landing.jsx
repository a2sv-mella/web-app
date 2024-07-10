import Wrapper from "../assets/wrappers/LandingPage";
import main1 from "../assets/images/main1.svg";
// import logo from "../assets/images/mella.png";
import { Link } from "react-router-dom";

const Landing = () => {
  const LandingMessage = `Discover amazing Ethiopian apps and services – all in one place! With Mella, you can find new ways to learn, connect, and enjoy your digital life.`;
  return (
    <Wrapper>
      <nav>
        {/* <img src={logo} alt="Mella Logo" className="logo" /> */}
        <h2>Mella</h2>
        <div className="nav-links">
          <Link to="/pricing" className="nav-link top-btn btn">
            Pricing
          </Link>
          <Link to="/services" className="nav-link top-btn btn">
            Services
          </Link>
          <Link to="/docs" className="nav-link top-btn btn">
            Docs
          </Link>
          <Link to="/demo" className="nav-link top-btn btn">
            Demo
          </Link>
          <Link to="/about" className="nav-link top-btn btn">
            About Us
          </Link>
          <Link to="/contact" className="nav-link top-btn btn">
            Contact Us
          </Link>
        </div>
        <button className="menu-button btn">Menu</button>
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
  );
};

export default Landing;
