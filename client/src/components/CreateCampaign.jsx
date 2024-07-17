import { Form, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);


  try {
    const response = await customFetch.post("/campaigns/create", data);
    // console.log(response.status)
    if (response.status !== 200 ) {
      toast.warn("Failed to create campaign.");
      return null;
    }
    
    toast.success("Campaign Created successfully.");
    return redirect(".");
  } catch (error) {
    toast.warn("Failed to create campaign.");
    console.error("Error creating campaign:", error);
    return null;
  }
};

const CreateCampaign = () => {
  return (
    // <Form method="post">
    <div className=" mx-auto px-0 py-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Campaign</h2>
      <div className="w-3/5 mx-auto max-w-full">
        <Form
          className="bg-blue-100 shadow-md rounded-lg p-6 space-y-4"
          method="post"
        >
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount of Share to Sell
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price_per_share"
              className="block text-sm font-medium text-gray-700"
            >
              Price per Share
            </label>
            <input
              type="text"
              id="price_per_share"
              name="price_per_share"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
              required
            />
          </div>
          <div>
            <label
              htmlFor="end_date"
              className="block text-sm font-medium text-gray-700"
            >
              End Date
            </label>
            <input
              type="date"
              id="end_date"
              name="end_date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              className="mt-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="btn bg-blue-500 text-white p-2 rounded margin-auto w-full "
              // to do onsubmit function
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
    // </Form>
  );
};

export default CreateCampaign;
