import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
const Docs = () => {
    const location = useLocation();

  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <div className="container page">
        <h1> Documentation</h1>
      </div>
    </Wrapper>
  );
};

export default Docs;
