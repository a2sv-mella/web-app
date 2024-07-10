import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
import DemosBody from "../components/DemosBody";
import { HomePageNavbar } from "../components";
const Demo = () => {
  const location = useLocation();
  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <div className="container page">
        <DemosBody /> {/* Rendering the DemosBody component */}
      </div>
    </Wrapper>
  );
};
export default Demo;
