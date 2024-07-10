import PropTypes from "prop-types";
import {
  FaRegMoneyBillAlt,
  FaCreditCard,
  FaCoins,
  FaHandHoldingHeart,
} from "react-icons/fa";
const titleToIcon = (title) => {
  if (title === "Payments") {
    return <FaCreditCard />;
  } else if (title === "Semuni") {
    return <FaCoins />;
  } else if (title === "Amesgnalehu") {
    return <FaHandHoldingHeart />;
  } else if (title === "Crowd Funding") {
    return <FaRegMoneyBillAlt />;
  }
};
const ServiceCard = ({ title, description }) => {
  return (
    <div className="rounded-lg shadow-md bg-blue-100 p-6 hover:translate-y-[-8px] transition-transform duration-300 ease-in-out flex flex-col items-center space-y-4">
      <div className="text-4xl">{titleToIcon(title)}</div>
      <div className="text-center">
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ServiceCard;
