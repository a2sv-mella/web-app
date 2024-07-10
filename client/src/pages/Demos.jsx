import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar} from "../components";
const Demo = ()=> { 
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
