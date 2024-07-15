import {
  useOutletContext,
  useNavigation,
  redirect,
  Form,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/Product";
import { toast } from "react-toastify";


export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const first_name = data["first name"];
  const middle_name =
    data["middle name"] === "Unregistered" ? null : data["middle name"];
  const last_name = data["last name"];
  const email = data["email"];
  const phone =
    data["phone number"] === "Unregistered" ? null : data["phone number"];
  const old_password = data["old password"];
  const confirm_password = data["confirm new password"];
  const new_password = data["new password"];

  // TODO : add more data validation
  if (confirm_password.length < 8) {
    toast.warn("Password too short !");
  }

  if (new_password !== confirm_password) {
    toast.warn("Passwords  don't Match !");
  }

  try {
    const user_data = {
      first_name,
      middle_name,
      last_name,
      email,
      phone,
      old_password,
      new_password,
    };
    await customFetch.post("/users/update-user", user_data);
    toast.success("User data updated Successfully.");
    return redirect(".");
  } catch (errors) {
    toast.warn("Invalid Credentials.");
    errors.msg = "Invalid Credentials";
    return errors;
  }
};
const Account = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { first_name, last_name, email, phone_number, middle_name } = user;

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="from-title">Account</h4>

        <div className="form-center">
          <FormRow type="text" name="first name" defaultValue={first_name} />
          <FormRow
            type="text"
            name="middle name"
            defaultValue={middle_name === null ? "Unregistered" : middle_name}
          />
          <FormRow type="text" name="last name" defaultValue={last_name} />
        </div>

        <div className="form-center">
          <FormRow type="text" name="email" defaultValue={email} />
          <FormRow
            type="text"
            name="phone number"
            defaultValue={phone_number === null ? "Unregistered" : phone_number}
          />
        </div>
        <div className="form-center">
          <FormRow type="password" name="old password" />
          <FormRow type="password" name="new password" />
          <FormRow type="password" name="confirm new password" />
        </div>

        <div className="form-center">
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Account;
