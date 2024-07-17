import { Link } from "react-router-dom";
const NotEnoughStars = () => {
  return (
    <div className="flex flex-col items-center justify-center m-20">
      <h1 className="text-4xl font-bold mb-8">You don't have enough Smunis!</h1>
      <Link
        to="/dashboard/smuni"
        className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      >
        Buy More Smuni
      </Link>
    </div>
  );
};

export default NotEnoughStars;
