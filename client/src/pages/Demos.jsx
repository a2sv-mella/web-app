import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar} from "../components";
export default function Demo(){ 
    return (
    <Wrapper>
        <HomePageNavbar location={location} />
        <div className="container page">
            <h1>Demonstration</h1>
        </div>
    </Wrapper> 
    )
}