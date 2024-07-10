import {
  Link,
  Form,
  useNavigation,
  useActionData,
} from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // TODO : add more data validation
  if (data.password.length < 8) {
    alert("Password too Short");
    return null;
  }

  //TODO : send data to backend
};

const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <FormRow type="email" name="email" defaultValue="yourname@email.com" />
        <FormRow type="password" name="password" defaultValue="password" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting . . ." : "Submit"}
        </button>
      </Form>
      <p>
        Not a member yet?
        <Link to="/register" className="member-btn">
          Register
        </Link>
      </p>
    </Wrapper>
  );
};

export default Login;
