import PropTypes from "prop-types";
const AboutPara = ({ title, description }) => {
  return (
    <div className="flex flex-col items-center space-y-4 m-5">
      <div className="text-center">
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

AboutPara.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AboutPara;
