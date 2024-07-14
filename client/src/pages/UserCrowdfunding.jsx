import { CrowdFundsContainer, SearchContainer } from "../components";
import { useContext, createContext } from "react";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

const CrowdFundingContext = createContext();

export const loader = async () => {
  try {
    // const { data } = await customFetch.get("/available-crowdfunds");
    const data = {
      fundsFound: [
        {
          id: 3,
          developer: "Dolphin Mulugeta",
          company_name: "Tef Tef ",
          location: "Addis Ababa",
          createdAt: "2024-06-20T11:17:15.550Z",
        },
        {
          id: 3,
          developer: "Kidus Melaku",
          company_name: "Fet Fet",
          location: "Addis Ababa",
          createdAt: "2024-07-18T11:17:15.550Z",
        },
      ],
    };
    return {
      data,
    };
  } catch (error) {
    alert("Can't find Funds");
    return error;
  }
};

const UserCrowdfunding = () => {
  const { data } = useLoaderData();
  return (
    <>
      <CrowdFundingContext.Provider value={{ data }}>
        <SearchContainer />
        <CrowdFundsContainer />
      </CrowdFundingContext.Provider>
    </>
  );
};

export default UserCrowdfunding;
export const useCrowdContext = () => useContext(CrowdFundingContext);
