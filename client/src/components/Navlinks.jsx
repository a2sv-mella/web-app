import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const Navlinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext(); //import user
  return (
    <div className="nav-links">
      {links.map((each_link) => {
        if (each_link.path === "transactions" && user.role !== "developer") {
          return;
        }
        if (each_link.path === "crowd" && user.role !== "developer") {
          return;
        }
        if (each_link.path === "donations" && user.role !== "developer") {
          return;
        }
        if (each_link.path === "smuni" && user.role === "developer") {
          return;
        }

        return (
          <NavLink
            to={each_link.path}
            key={each_link.text}
            className="nav-link"
            onClick={isBigSidebar ? null : toggleSidebar}
            end
          >
            <span className="icon">{each_link.icon}</span>
            {each_link.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navlinks;
