import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar, DemoBody } from "../components";
export default function Demo(){ 
    return (
    <Wrapper>
        <HomePageNavbar location={location} />
        <div className="flex flex-col items-center justify-center w-full m-10">
            <h3 className = "mb-10">A little bit about our platform</h3>
            <iframe
            className = "w-1/2 h-80 rounded-2xl"
            src={"https://www.youtube.com/watch?v=5QvCpg2HltE&list=PLgwJf8NK-2e4oAeDid0hwuiol_RJdscrp&index=1"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Platform"
            />
            <DemoBody />
        </div>
    </Wrapper> 
    )
}