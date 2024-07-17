import { CrowdFundsContainer, SearchContainer } from "../components";
import { useContext, createContext } from "react";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const CrowdFundingContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch.get("campaigns/available"); 
    return {
      data,
    };
  } catch (error) {
    toast.warn("Can't find Funds");
    return error;
  }
};

const UserCrowdfunding = () => {
  const { data } = useLoaderData();
  return (
    <>
      <CrowdFundingContext.Provider value={{ data }}>
        {/* <SearchContainer /> */}
        <CrowdFundsContainer />
      </CrowdFundingContext.Provider>
    </>
  );
};

export default UserCrowdfunding;
export const useCrowdContext = () => useContext(CrowdFundingContext);
