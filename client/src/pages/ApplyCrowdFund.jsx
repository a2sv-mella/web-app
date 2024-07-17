import { Form, useNavigation, redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/campaigns/buy", data);
    const link_data = response.data;
    if (link_data.status === "success") {
      const { data } = link_data;
      return redirect(data.checkout_url);
    } else {
      toast.warn("Payment UnSuccessful.");
      return redirect("/dashboard");
    }
  } catch (errors) {
    toast.warn("Can't Process Payment.");
    errors.msg = "Can't Process Payment";
    return errors;
  }
};

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/campaigns/get/${params.id}`);
    return data;
  } catch (error) {
    toast.warn("Can't Campaign");
    return redirect("/dashboard");
  }
};

const ApplyCrowdFund = () => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const { data } = useLoaderData();
  const navigation = useNavigation();
  const {
    goal,
    product_name,
    product_id,
    current_amount,
    description,
    price_per_share,
  } = data;
  const percentageSold = ((current_amount / goal) * 100).toFixed(2);
  const remainingShares = (goal - current_amount) / price_per_share;

  const isSubmitting = navigation.state === "submitting";
  return (
    <Form method="post" className="flex flex-col justify-center m-20">
      <h2 className="text-3xl font-semibold mb-10">Payment Details</h2>

      <div className="mb-4">
        <span className="text-left font-bold">Product:</span> {product_name}
      </div>
      <div className="mb-4">
        <span className="text-left font-bold">Description:</span> {description}
      </div>
      <div className="mb-4">
        <span className="text-left font-bold">Share Remaining:</span>{" "}
        {remainingShares}
      </div>
      <div className="mb-4">
        <span className="text-left font-bold">Percentage Sold:</span>{" "}
        {percentageSold} %
      </div>
      <div className="mb-4">
        <span className="text-left font-bold">Price per Share:</span>{" "}
        {price_per_share}
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="sharesInput" className="block text-2xl font-bold">
          Shares to Buy
        </label>
        <input
          type="number"
          id="sharesInput"
          name="shares"
          value={inputValue}
          onChange={handleInputChange}
          className="mb-6 w-1/2 rounded-md p-3 border border-gray-600 shadow-md"
        />
        <input type="hidden" name="product_id" value={product_id} />
        <input type="hidden" name="price_per_share" value={price_per_share} />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-6 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/2 mx-auto"
      >
        {isSubmitting ? "Buying" : "Buy Share"}
      </button>
    </Form>
  );
};

export default ApplyCrowdFund;
