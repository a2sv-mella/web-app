import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar, ServicesPage } from "../components";

const Services = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <div className="container page">
        <ServicesPage />
      </div>
    </Wrapper>
  );
};

export default Services;
