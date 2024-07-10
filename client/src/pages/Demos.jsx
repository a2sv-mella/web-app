import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
import DemosBody from "../components/DemosBody"; // Importing the DemosBody component
const Demos = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <DemosBody /> {/* Rendering the DemosBody component */}
    </Wrapper>
  );
};

export default Demos;
