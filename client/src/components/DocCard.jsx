import PropTypes from "prop-types";
import {
  FaCreditCard,
  FaGofore,
  FaLockOpen,
  FaPlay,
  FaQuestion,
} from "react-icons/fa";
const titleToIcon = (title) => {
  if (title === "Accept Payments") {
    return <FaCreditCard />;
  } else if (title === "SDK and Plugins") {
    return <FaLockOpen />;
  } else if (title === "Test Cards") {
    return <FaQuestion />;
  } else if (title === "Quick Start") {
    return <FaPlay/>
  }
};
const DocCard = ({ title, description }) => {
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

DocCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DocCard;
