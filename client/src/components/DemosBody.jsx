import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import { FaPlayCircle, FaLightbulb } from "react-icons/fa";

const DemosBody = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Mella: simplfiy all your payements
      </h2>
      <div className="flex flex-col md:flex-row justify-around items-center mb-8">
        <div className="rounded-lg shadow-md bg-blue-100 p-6 hover:translate-y-[-8px] transition-transform duration-300 ease-in-out flex flex-col items-center space-y-4   max-w-xs">
          <FaPlayCircle className="text-4xl mb-2" />
          <a href="@">
            {" "}
            <p> play a demo video</p>
          </a>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem,
            voluptas!
          </p>
        </div>
        <div className="rounded-lg shadow-md bg-blue-100 p-6 hover:translate-y-[-8px] transition-transform duration-300 ease-in-out flex flex-col items-center space-y-4  max-w-xs">
          <FaLightbulb className="text-4xl mb-2" />
          <a href="#">
            <p> Try Demo</p>
          </a>

          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste,
            necessitatibus.
          </p>
        </div>
      </div>
      <div className="text-center">
        <Link to="/signup" className="btn bg-blue-500 text-white p-2 rounded">
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
