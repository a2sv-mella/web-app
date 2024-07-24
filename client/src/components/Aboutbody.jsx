import ServiceCard from "./ServiceCard";
import { aboutCards } from "../utils/constants";
const AboutBody = () => {
  return (
    <div className="container mx-auto px-4 py-16">


      <h2 className="text-3xl font-bold text-center mb-8">
        Behind the Name and Establishment
      </h2>
      <p className="text-2xl m-auto mb-2"> Why Mella? Simple to connect with the youth through a deeper yet light-spirited humor, it made perfect sense to create a vernacular term for 'Money'. With this intention, the name 'Mella' was born.</p>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {aboutCards.map((cardData, index) => (
          <ServiceCard
            key={index}
            title={cardData.title}
            description={cardData.description}
          />
        ))}
      </div>


    </div>
  );
};

export default AboutBody;
