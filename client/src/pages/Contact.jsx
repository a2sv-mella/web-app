import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
import ContactBody from "../components/ContactBody";
const Contact = () => {
  const location = useLocation();

  return (
    <Wrapper>
      {/* <HomePageNavbar location={location} /> */}
      <div className="container">
        <ContactBody />
      </div>
    </Wrapper>
  );
};

export default Contact;
