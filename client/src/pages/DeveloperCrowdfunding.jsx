import {
  redirect,
  useLoaderData,
  useNavigation,
  Form,
  useLocation,
} from "react-router-dom";

import { ShowCampaignStats, CreateCampaign } from "../components";
import { HomePageNavbar } from "../components";
import Wrapper from "../assets/wrappers/Product";
import customFetch from "../utils/customFetch";

///////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
// import ShowCampaignStats from './ShowCampaignStats';


export const loader = async () => {
  try {
    const  {data}  = await customFetch.get(`/campaigns`);
    console.log(data);

    // if (!data) {
    //   return redirect("/");
    // }
    return  data ;
  } catch (error) {
    return null;
  }
};
const DeveloperCrowdfunding = () => {
  const data = useLoaderData();
  console.log(data);
  const navigate = useNavigation();
  const location = useLocation();

  // Check if data is an empty object
  const isDataEmpty =
    data && Object.keys(data).length === 0 && data.constructor === Object;

  if (isDataEmpty) {
    return <CreateCampaign />;
  } else {
  const { description, price_per_share, end_date } = data.campaign; 

return (
  <ShowCampaignStats
    description={description}
    price_per_share={price_per_share}
    deadline={end_date}
  />
);  }
};

export default DeveloperCrowdfunding;
