import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaPlayCircle, FaLightbulb } from "react-icons/fa";

const DemosBody = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Mella: simplify all your payments
      </h2>
      <div className="flex flex-col justify-around items-center mb-8">
        <div className="w-full rounded-lg shadow-md bg-blue-100 p-6 hover:translate-y-[-8px] transition-transform duration-300 ease-in-out flex flex-col items-center space-y-4">
          <iframe
            className="w-full aspect-video"
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
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
