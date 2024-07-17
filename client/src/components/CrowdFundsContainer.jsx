import Wrapper from "../assets/wrappers/CrowdFundsContainer";
import { useCrowdContext } from "../pages/UserCrowdfunding";
import CrowdFund from "./CrowdFund";

const CrowdFundsContainer = () => {
  const { data } = useCrowdContext();
  const { fundsFound } = data;

  if (fundsFound?.length === 0) {
    return (
      <Wrapper>
        <h2>No Crowd Funds to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className="crowd-funds">
        {fundsFound.map((fund) => {
          const campaign_id = fund.campaign_id;
          return <CrowdFund key={campaign_id} {...fund} />;
        })}
      </div>
    </Wrapper>
  );
};

export default CrowdFundsContainer;
