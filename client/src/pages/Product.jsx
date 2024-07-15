import {
  useOutletContext,
  useNavigation,
  redirect,
  Form,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/Product";
import { PRODUCT_TYPE } from "../utils/constants";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/product/edit", data);
    alert("Product Edited Successfully");
    return redirect(".");
  } catch (error) {
    return error;
  }
  // return null;
};

const Product = () => {
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="from-title">Edit Product</h4>
        <div className="form-center">
          <FormRow type="text" name="name" />
          <FormRow type="text" name="category" />
          <FormRow type="text" labelText="link to source code" name="link" />
        </div>
        <div className="form-center">
          <FormRow type="text" name="description" />
          <FormRowSelect
            labelText="Product Type"
            name="productType"
            defaultValue={PRODUCT_TYPE.PAID}
            list={Object.values(PRODUCT_TYPE)}
          ></FormRowSelect>
          {/* <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting" : "Submit"}
            </button> */}
          <FormRow type="text" name="location" />
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

export default Product;
