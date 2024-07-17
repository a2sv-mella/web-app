import {
  Link,
  Form,
  redirect,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { useState } from "react";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch.js";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  // TODO : add more data validation
  if (data.password.length < 8) {
    toast.warn("Password too Short");
    return null;
  }

  try {
    await customFetch.post("/auth/login", data);
    toast.success("Logged In Successfully");
    return redirect("/dashboard");
  } catch (errors) {
    errors.msg = "Invalid Credentials";
    return errors;
  }
};

const Login = () => {
  const errors = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const [showPassword, setShowPassword] = useState(false);

  // Toggle function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Link to="/">
          <Logo />
        </Link>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <FormRow type="email" name="email" defaultValue="you@example.com" />
        <FormRow type={showPassword ? "text" : "password"} name="password" />
        <div>
          <input
            type="checkbox"
            className="form-check-input m-3"
            id="showPassword"
            checked={showPassword}
            onChange={togglePasswordVisibility}
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting . . ." : "Submit"}
        </button>
        <p>
          Not a member yet?
          <Link to="/register" className="member-btn">
            Register
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Login;
