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
///////////////////////////////////////////////

import React, { useEffect, useState } from 'react';
import ShowCampaignStats from './ShowCampaignStats';

const ParentComponent = ({ campaignId }) => {
  const [campaignDetails, setCampaignDetails] = useState({});

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      try {
        const response = await fetch(`/api/campaigns/${campaignId}`);
        const data = await response.json();
        setCampaignDetails(data);
      } catch (error) {
        console.error('Failed to fetch campaign details:', error);
      }
    };

    fetchCampaignDetails();
  }, [campaignId]);

  return (
    <div>
      {/* Pass fetched data as props */}
      <ShowCampaignStats {...campaignDetails} />
    </div>
  );
};

/////////////////////////////////////////////


export const loader = async () => {
  try {
    // const { data } = await customFetch.get("/users/current-user");
    const data = {};

    // const data = {
    //   user: {
    //     first_name: "Dolphin",
    //     last_name: "Mulugeta",
    //     email: "email@email.com",
    //     role: "developer",
    //   },
    // };
    if (!data) {
      return redirect("/");
    }
    return { data };
  } catch (error) {
    return redirect("/");
  }
};

const DeveloperCrowdfunding = () => {
  const { data } = useLoaderData();
  const navigate = useNavigation();
  const location = useLocation();
  //  ask copilot how to check if data is empty object
  if (false) {
    return <CreateCampaign />;3
  } else {
    return <ShowCampaignStats />;
  }
};

export default DeveloperCrowdfunding;
