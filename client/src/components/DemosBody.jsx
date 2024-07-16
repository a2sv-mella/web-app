import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DemosBody = () => {
  return (
    <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-2  bg-white text-center">
        Mella: simplify all your payments
      </h2>
      <div className="flex flex-col justify-around items-center mb-8">
        <div className="rounded-lg shadow-md bg-transparent p-6 hover:translate-y-[-8px] transition-transform duration-300 ease-in-out flex flex-col items-center space-y-4">
          <iframe
            width="560"
            height="315"
            src={import.meta.env.VITE_YOUTUBE_URL}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
      <div className="text-center">
        <Link to="/register" className="btn bg-blue-500 text-white p-2 rounded">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

DemosBody.propTypes = {
  demos: PropTypes.array, // Made optional since we're not using it in this static layout
};

export default DemosBody;
