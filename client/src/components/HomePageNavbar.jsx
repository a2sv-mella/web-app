import { Link } from "react-router-dom";
import { navbarLinks } from "../utils/constants";
const HomePageNavbar = ({ location }) => {
  return (
      <nav>
        {/* <img src={logo} alt="Mella Logo" className="logo" /> */}
        <h2>Mella</h2>
        <div className="nav-links">
          {navbarLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className={`nav-link ${
                link.to === location?.pathname ? "top-btn" : "top-btn-inactive"
              } btn`}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <button className="menu-button btn">Menu</button>
      </nav>
  );
}

export default HomePageNavbar;