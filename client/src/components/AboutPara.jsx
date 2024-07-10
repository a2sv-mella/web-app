import PropTypes from "prop-types";
const AboutPara = ({ title, description }) => {
  return (
    <div className="flex flex-col text-center justify-center mx-auto w-[90%]">
      <div className="">
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <d>{description}</d>
      </div>
    </div>
  );
};

AboutPara.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default AboutPara;
