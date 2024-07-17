import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/links";
import { NavLink } from "react-router-dom";
import { DEVELOPER_PAGES, USER_PAGES } from "../utils/constants";

const Navlinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext(); //import user
  return (
    <div className="nav-links">
      {links.map((each_link) => {
        if (
          DEVELOPER_PAGES.includes(each_link.path) &&
          user.role === "user"
        ) {
          return;
        }
        if (USER_PAGES.includes(each_link.path) && user.role === "developer") {
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
