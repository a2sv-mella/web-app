import day from "dayjs";
const ShowCampaignStats = ({
  description,
  price_per_share,
  current_amount,
  goal_amount,
  deadline,
}) => {
  const companyPercentage = ((current_amount / goal_amount) * 100).toFixed(2);

  const date = day(deadline).format("MMM Do, YYYY");
  return (
    <div className="w-4/5 mx-auto bg-blue-100 shadow-md rounded-lg p-6 space-y-5">
      <h3 className="text-5xl font-bold mb-2">Campaign Stats</h3>
      <div className="space-y-6">
        <p>
          {" "}
          <span className="font-bold">Description:</span> {description}
        </p>
        <p>
          <span className="font-bold">Price per Share: </span>${price_per_share}
        </p>
        <p>
          <span className="font-bold">Campaign Percentage Sold :</span> 
           {companyPercentage} %
        </p>
        <p>
          <span className="font-bold">Deadline:</span> {date}
        </p>
      </div>
    </div>
  );
};

export default ShowCampaignStats;
