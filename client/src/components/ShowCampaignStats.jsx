import React from "react";

const ShowCampaignStats = ({
  description,
  price_per_share,
  companyPercentage,
  deadline,
}) => {
  return (
    <div className="max-w-md mx-auto bg-blue-100 shadow-md rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-bold mb-2">Campaign Stats</h3>
      <div>
        <p className="text-sm font-medium text-gray-700">Description:</p>
        <p>{description}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700"> percentage Amount Raised:</p>
        <p>${price_per_share}</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Company Percentage left :</p>
        <p>{companyPercentage  }%</p>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-700">Deadline:</p>
        <p>{deadline}</p>
      </div>
    </div>
  );
};

export default ShowCampaignStats;
