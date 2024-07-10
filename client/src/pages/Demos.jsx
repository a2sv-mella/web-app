import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar, DemoBody } from "../components";
export default function Demo(){ 
    return (
    <Wrapper>
        <HomePageNavbar location={location} />
        <div className="container page">
            Demo
        </div>
    </Wrapper> 
    )
}