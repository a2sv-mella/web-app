import Wrapper from "../assets/wrappers/LandingPage";
import {useLocation } from "react-router-dom";
import { HomePageNavbar ,PricingBody} from "../components";
const Pricing = () => {
  const location = useLocation();

  return (
    <Wrapper>
      {/* <HomePageNavbar location={location}/> */}
      <div className="container">
        <PricingBody />
      </div>
    </Wrapper>
  );
};

export default Pricing;
