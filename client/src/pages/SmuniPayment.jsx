import {
  Form,
  useNavigation,
  useOutletContext,
  redirect,
  useLoaderData,
} from "react-router-dom";
import { NotEnoughSmuni } from "../components";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/smuni/pay", data);
    toast.success("Payment Successfully Done.");
    return redirect("/dashboard");
  } catch (errors) {
    toast.warn("Invalid Credentials.");
    errors.msg = "Invalid Credentials";
    return errors;
  }
};

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/smuni/get/${params.id}`);
    return { data };
  } catch (error) {
    toast.warn("Can't find Job to edit");
    return redirect("/dashboard");
  }
};

const SmuniPayment = () => {
  const { data } = useLoaderData();
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const { smuni_payment_id, product_id, product_name, amount, description } =
    data;
  const { smuni, user_id } = user;
  const isSubmitting = navigation.state === "submitting";
  if (smuni < amount) {
    return <NotEnoughSmuni />;
  } else {
    return (
      <Form method="post" className="flex flex-col justify-center m-20">
        <h2 className="text-3xl font-semibold mb-10">Payment Details</h2>

        <div className="mb-4">
          <span className="text-left font-bold">Product:</span> {product_name}
        </div>
        <div className="mb-4">
          <span className="text-left font-bold">Description:</span>{" "}
          {description}
        </div>
        <div className="mb-6">
          <span className="font-bold">Amount: </span>
          {amount} Smunis
        </div>
        <input
          type="hidden"
          name="smuni_payment_id"
          value={smuni_payment_id}
        />
        <input type="hidden" name="product_id" value={product_id} />
        <input type="hidden" name="user_id" value={user_id} />
        <input type="hidden" name="amount" value={amount} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-6 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/2 mx-auto"
        >
          {isSubmitting ? "Paying" : "Make Payment"}
        </button>
      </Form>
    );
  }
};

export default SmuniPayment;
