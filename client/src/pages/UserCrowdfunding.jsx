import { CrowdFundsContainer, SearchContainer } from "../components";
import { useContext, createContext } from "react";
import { useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const CrowdFundingContext = createContext();

export const loader = async () => {
  try {
    const { data } = await customFetch.get("campaigns/available"); 
    /*
    const data = {
      fundsFound: [
        {
          id: 3,
          developer: "Dolphin Mulugeta",
          company_name: "Tef Tef ",
          location: "Adama",
          createdAt: "2024-06-20T11:17:15.550Z",
        },
        {
          id: 4,
          developer: "Kidus Melaku",
          company_name: "Fet Fet",
          location: "Addis Ababa",
          createdAt: "2024-07-18T11:17:15.550Z",
        },
        {
          id: 5,
          developer: "Bisrat Birhanu",
          company_name: "Fua Fesh",
          location: "Dire Dawa",
          createdAt: "2023-09-01T11:17:15.550Z",
        },
      ],
    };
    */
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
        <SearchContainer />
        <CrowdFundsContainer />
      </CrowdFundingContext.Provider>
    </>
  );
};

export default UserCrowdfunding;
export const useCrowdContext = () => useContext(CrowdFundingContext);
