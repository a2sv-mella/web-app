import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
import DemosBody from "../components/DemosBody"; 
const Demo = () => {
  const location = useLocation();
  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <div className="container page">
        <DemosBody />
      </div>
    </Wrapper>
  );
};
export default Demo;
