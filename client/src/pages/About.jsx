import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar, AboutBody } from "../components";
const About = () => {
  const location = useLocation();

  return (
    <Wrapper>
      {/* <HomePageNavbar location={location} /> */}
      <div className="container page">
        <AboutBody />
      </div>
    </Wrapper>
  );
};

export default About;
