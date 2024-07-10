import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
import ContactBody from "../components/ContactBody"; // Importing the ContactBody component
const Contact = () => {
  const location = useLocation();

  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <div className="container page">
        <ContactBody /> {/* Rendering the ContactBody component */}
      </div>
    </Wrapper>
  );
};

export default Contact;
