const EnoughSmuni = (paymentData) => {
  const { product_name, amount, description } = paymentData;
  return (
    <div className="flex flex-col justify-center m-10">
      <h2 className="text-3xl font-semibold mb-10">Payment Details</h2>

      <div className="mb-4">
        <span className="text-left font-bold">Product:</span> {product_name}
      </div>
      <div className="mb-4">
        <span className="text-left font-bold">Description:</span> {description}
      </div>
      <div className="mb-6">
        <span className="font-bold">Amount: </span>{amount} Smunis
      </div>
      <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-6 px-4 rounded focus:outline-none focus:shadow-outline w-full lg:w-1/2 mx-auto">
        Make Payment
      </button>
    </div>
  );
};

export default EnoughSmuni;
