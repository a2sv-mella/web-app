import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar, ServicesBody } from "../components";

const Services = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <div className="container page">
        <ServicesBody />
      </div>
    </Wrapper>
  );
};

export default Services;
