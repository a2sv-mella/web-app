import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
const Contact = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <div className="container page">
        <h1> Contact</h1>
      </div>
    </Wrapper>
  );
};

export default Contact;
