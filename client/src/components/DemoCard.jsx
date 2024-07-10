import PropTypes from "prop-types";
const DemoCard = ({ title, description }) => {
  return (
    <div className="rounded-lg shadow-md bg-blue-100 p-6 hover:translate-y-[-8px] transition-transform duration-300 ease-in-out flex flex-col items-center space-y-4">
      <div className="text-center">
        <h6>{description}</h6>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default DemoCard;
