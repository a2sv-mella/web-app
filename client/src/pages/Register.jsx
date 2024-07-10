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
const Register = () => {
  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <div className="form-row-container" style={{ marginTop: "20px" }}>
          <FormRow type="text" name="first Name" defaultValue="First Name" />
          <FormRow type="text" name="last Name" defaultValue="Last Name" />
        </div>
        <FormRow type="email" name="email" defaultValue="youremail@gmail.com" />

        <div className="form-row-container">
          <FormRow type="password" name="password" defaultValue="password" />
          <FormRow type="password" name="confirm password" defaultValue="password" />
        </div>
        <FormRow type="text" name="business name" defaultValue="Your Business Name" />
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submiting . . . " : "submit"}
        </button>
        <p>
          Already a member ?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
