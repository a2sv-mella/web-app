import Wrapper from "../assets/wrappers/LandingPage";
import {useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
const Pricing = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <HomePageNavbar location={location}/>
      <div className="container page">
        <h1> Pricing</h1>
      </div>
    </Wrapper>
  );
};

export default Pricing;
