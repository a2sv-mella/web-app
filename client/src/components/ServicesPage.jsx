import ServiceCard from "./ServiceCard";
import { serviceCards } from "../utils/constants";
const ServicesPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Here Are Some Services We Provide
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {serviceCards.map((cardData, index) => (
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

export default ServicesPage;
