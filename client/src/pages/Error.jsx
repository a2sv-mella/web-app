import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/error.png";
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img}></img>
          <h3>ohh! page not found</h3>
          <p>It looks like we can't find your page.</p>
          <Link to="/">back to home</Link>
        </div>
      </Wrapper>
    );
  }
};

export default Error;
