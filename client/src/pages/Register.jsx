import {
  Link,
  Form,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";
import customFetch from "../utils/customFetch.js";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (data.password.length < 8) {
    toast.warn("Password too Short");
    return null;
  }
  if (data.password !== data["confirm password"]) {
    toast.warn("Passwords Don't Match");
    return null;
  }
  const isDeveloperChecked =
    formData.has("is_developer") && data["is_developer"] === "on";

  if (isDeveloperChecked && data["business name"] === "") {
    toast.warn("Business Name Required for Developers");
    return null;
  }
  // TODO : add more data validation

  const role = isDeveloperChecked ? "developer" : "user";
  const user_data = {
    first_name: data["first Name"],
    last_name: data["last Name"],
    email: data.email,
    password: data.password,
    business_name: data["business name"],
    role: role,
  };

  //TODO : send data to backend
  try {
    await customFetch.post("/auth/register", user_data);
    toast.success("Registered Successfully");
    return redirect("/login");
  } catch (error) {
    toast.warn("Invalid Credentials");
    return error;
  }
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Toggle function
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const errors = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Link to="/">
          <Logo />
        </Link>
        {errors?.msg && <p style={{ color: "red" }}>{errors.msg}</p>}
        <div className="form-row-container">
          <FormRow type="text" name="first Name" defaultValue="First Name" />
          <FormRow type="text" name="last Name" defaultValue="Last Name" />
        </div>
        <FormRow type="email" name="email" defaultValue="you@example.com" />

        <div className="form-row-container">
          <FormRow
            type={showPassword ? "text" : "password"}
            name="password"
            defaultValue=""
          />
          <FormRow
            type={showPassword ? "text" : "password"}
            name="confirm password"
          />
        </div>
        <FormRow
          type="text"
          name="business name"
          defaultValue="Required for Developers"
        />
        <div className="form-row-container m-2">
          <div>
            <input
              type="checkbox"
              name="is_developer"
              className="form-check-input h-3 w-3"
              id="developerCheck"
            />
            <label className="m-1 h-3 font-bold" htmlFor="developerCheck">
              I am a Developer
            </label>
          </div>

          <div>
            <input
              type="checkbox"
              className="form-check-input h-3 mr-2 font-bold"
              id="showPassword"
              checked={showPassword}
              onChange={togglePasswordVisibility}
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
        </div>
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "submitting . . . " : "submit"}
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
