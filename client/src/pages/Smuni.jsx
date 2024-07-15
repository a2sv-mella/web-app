import { useState } from "react";
import {
  useOutletContext,
  useNavigation,
  redirect,
  Form,
} from "react-router-dom";
// import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const starOptions = [
  { stars: 200, price: 50 },
  { stars: 400, price: 100 },
  { stars: 800, price: 200 },
  { stars: 2000, price: 500 },
  { stars: 4000, price: 1000 },
  { stars: 8000, price: 2000 },
];
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (Object.keys(data).length === 0) {
    console.log("Object is empty");
    toast.warn("Please select Amount of Smunis.");
    return null;
  }

  try {
    console.log(data);
    // await customFetch.post("/users/update-user", user_data);
    toast.success("User data updated Successfully.");
    return redirect(".");
  } catch (errors) {
    toast.warn("Invalid Credentials.");
    errors.msg = "Invalid Credentials";
    return errors;
  }
};
const Smuni = () => {
  const [selectedSmunis, setSelectedSmunis] = useState(starOptions[1]); // Default selection
  const [showMore, setShowMore] = useState(false);
  const { user } = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const handleStarSelection = (stars) => {
    setSelectedSmunis(starOptions.find((option) => option.stars === stars));
  };

  return (
    <Form method="post" className="p-6 rounded-lg shadow-md">
      <h2 className="text-blue-950 text-xl font-semibold mb-6">
        You currently have {user.semuni} Smunis
      </h2>
      <div>
        {starOptions.slice(0, 4).map((option) => (
          <label
            key={option.stars}
            className={`flex items-center py-2 px-4 rounded-lg cursor-pointer ${
              selectedSmunis.stars === option.stars
                ? "bg-blue-400"
                : "hover:bg-blue-300"
            }`}
          >
            <input
              type="radio"
              name="price"
              value={option.price}
              className="form-radio text-blue-500 h-5 w-5"
              style={{ opacity: 0, position: "absolute", zIndex: -1 }}
              // checked={selectedSmunis.stars === option.stars}
              onChange={() => handleStarSelection(option.stars)}
            />
            <span className="ml-3 text-black">
              <span className="text-yellow-400 text-xl mr-2">🪙</span>
              {option.stars} Smuni
            </span>
            <span className="ml-auto text-gray-800">{option.price} Birr</span>
          </label>
        ))}

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="text-blue-500 font-medium py-2 mx-4 px-4 w-full text-left hover:underline"
          >
            Show More Options{" "}
            <span className="transform transition-transform duration-300">
              {showMore ? "▲" : "▼"}
            </span>
          </button>
          {showMore && (
            <div className="absolute top-full left-0 mt-2 bg-white w-1/3 rounded-lg shadow-md z-10">
              {starOptions.slice(4).map((option) => (
                <label
                  key={option.stars}
                  className={`flex items-center py-2 px-4 rounded-lg cursor-pointer ${
                    selectedSmunis.stars === option.stars
                      ? "bg-blue-400"
                      : "hover:bg-blue-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="price"
                    value={option.price}
                    className="form-radio text-blue-500 h-5 w-5"
                    style={{ opacity: 0, position: "absolute", zIndex: -1 }}
                    // checked={selectedSmunis.stars === option.stars}
                    onChange={() => handleStarSelection(option.stars)}
                  />

                  <span className="ml-3 text-black">
                    <span className="text-yellow-400 text-xl mr-2">🪙</span>
                    {option.stars} Smunis
                  </span>

                  <span className="ml-auto text-gray-400"></span>
                  <span className="ml-4 text-gray-400">
                    {option.price} Birr{" "}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex">
        <button
          type="submit"
          className="bg-blue-500 ml-auto mr-auto hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-3/5 mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? `Buying ${selectedSmunis.stars} Smunis`
            : `Buy ${selectedSmunis.stars} Smunis`}
        </button>
      </div>
    </Form>
  );
};

export default Smuni;
