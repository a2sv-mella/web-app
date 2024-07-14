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
          return <CrowdFund key={fund.id} {...fund} />;
        })}
      </div>
    </Wrapper>
  );
};

export default CrowdFundsContainer;
