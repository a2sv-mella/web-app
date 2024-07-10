import DemoCard from "./ServiceCard";
import { demoCards } from "../utils/constants";
const DemoBody = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {demoCards.map((cardData, index) => (
          <DemoCard
            key={index}
            description={cardData.description}
          />
        ))}
      </div>
    </div>
  );
};

export default DemoBody;
