import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
day.extend(advancedFormat);

import { Link } from "react-router-dom";
import { FaLocationArrow, FaCalendarAlt } from "react-icons/fa";
import Wrapper from "../assets/wrappers/CrowdFund";
import CrowdFundInfo from "./CrowdFundInfo";

const CrowdFund = ({ id, developer, company_name, location, createdAt }) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company_name.charAt(0)}</div>
        <div className="info">
          <h5>{company_name}</h5>
          <p>{developer}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <CrowdFundInfo
            icon={<FaLocationArrow />}
            text={location}
          ></CrowdFundInfo>
          <CrowdFundInfo icon={<FaCalendarAlt />} text={date}></CrowdFundInfo>
        </div>
        <footer className="actions">
          <Link to={`../apply-crowdfund/${id}`} className="btn apply-btn">
            Apply
          </Link>
        </footer>
      </div>
    </Wrapper>
  );
};

export default CrowdFund;
