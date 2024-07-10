import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
const Demos = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <div className="container page">
        <h1> Demonstration</h1>
      </div>
    </Wrapper>
  );
};

export default Demos;
