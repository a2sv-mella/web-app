const PricingBody = () => {
  return (
    <div className="grid items-center mx-3 grid-cols-1 md:grid-cols-2 gap-5 ">
      <div className="flex justify-center items-center rounded-md bg-blue-100 p-8 shadow-lg hover:scale-110 transition-transform duration-300 ease-in-out">
        <h1 className="text-8xl h-26  text-center font-bold">3%</h1>
      </div>
      <div className="flex flex-col justify-center items-center p-8 text-center">
        <p className="text-3xl text">Everything you need to manage payments.</p>
        <p className="text-3xl">No need to worry about finance anymore.</p>
        <p className="text-3xl">No setup fees, monthly fees, or hidden fees.</p>
      </div>
    </div>
  );
};

export default PricingBody;
