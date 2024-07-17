import { useNavigation, redirect, Form, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { FormRow, FormRowSelect } from "../components";
import Wrapper from "../assets/wrappers/Product";
import { PRODUCT_TYPE } from "../utils/constants";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/product/get-product");
    return data;
  } catch (error) {
    toast.warn("Can't fetch Product Data.");
    return redirect("/dashboard");
  }
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/product/edit", data);
    toast.success("Product Edited Successfully");
    return redirect(".");
  } catch (error) {
    return error;
  }
};

const Product = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const data = useLoaderData();
  const { product } = data;

  let name = "Unregistered";
  let category = "Unregistered";
  let link = "Unregistered";
  let description = "Unregistered";
  let location = "Unregistered";

  if (product.name) {
    name = product.name;
    category = product.category;
    link = product.link;
    description = product.description;
    location = product.location;
  }

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="from-title">Edit Product</h4>
        <div className="form-center">
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow type="text" name="category" defaultValue={category} />
          <FormRow
            type="text"
            labelText="link to source code"
            name="link"
            defaultValue={link}
          />
        </div>
        <div className="form-center">
          <FormRow type="text" name="description" defaultValue={description} />
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
          <FormRow type="text" name="location" defaultValue={location} />
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
