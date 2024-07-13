import Wrapper from "../assets/wrappers/CrowdFundInfo";
const CrowdFundInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="crowdfund-icon">{icon}</span>
      <span className="crowdfund-text">{text}</span>
    </Wrapper>
  );
};

export default CrowdFundInfo;
