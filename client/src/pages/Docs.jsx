import Wrapper from "../assets/wrappers/LandingPage";
import { useLocation } from "react-router-dom";
import { HomePageNavbar } from "../components";
import { forDocs,docCards } from "../utils/constants";
import DocCard from "../components/DocCard";
import { Link } from "react-router-dom";
const Docs = () => {
    const location = useLocation();

  return (
    <Wrapper>
      <HomePageNavbar location={location} />
      <div className = "m-10">
        <div className = "mr-10 h-full pr-5">
        
        </div>
        <div className="flex flex-col text-center justify-center mx-auto w-[90%]">
          {forDocs.map((cardData, index) => (
            <div className="mb-10">
                <h3 className="mb-10 font-bold ">{cardData.title}</h3>
                <d className="text-balanced">{cardData.description}</d>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10 text-center">
          {docCards.map((cardData, index) => (
            cardData.title === "Quick Start" ? (
              <Link to="/demo" key={index}>
                <DocCard
                  title={cardData.title}
                  description={cardData.description}
                />
              </Link>
            ) : (
              <DocCard
                key={index}
                title={cardData.title}
                description={cardData.description}
              />
            )
          ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default Docs;
