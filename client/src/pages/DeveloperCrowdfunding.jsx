import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";

import customFetch from "../utils/customFetch";
import { ShowCampaignStats, CreateCampaign } from "../components";

export const loader = async () => {
  try {
    const { data } = await customFetch.get(`/campaigns`);

    if (data === null) {
      toast.warn("Couldn't Load Data.");
      return redirect("/dashboard");
    }
    return data;
  } catch (error) {
    toast.warn("No Product Found ! Register a Product First");
    return redirect("/dashboard");
  }
};
const DeveloperCrowdfunding = () => {
  const data = useLoaderData();
  const isDataEmpty =
    data && Object.keys(data).length === 0 && data.constructor === Object;

  if (isDataEmpty) {
    return <CreateCampaign />;
  } else {
    const { campaign } = data;
    const {
      description,
      price_per_share,
      goal_amount,
      current_amount,
      end_date,
    } = campaign;

    return (
      <ShowCampaignStats
        description={description}
        price_per_share={price_per_share}
        deadline={end_date}
        current_amount={current_amount}
        goal_amount={goal_amount}
      />
    );
  }
};

export default DeveloperCrowdfunding;
